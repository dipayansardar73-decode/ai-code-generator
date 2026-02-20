import re
import hashlib
import json
import redis.asyncio as redis
from openai import AsyncAzureOpenAI
from app.config import settings
from app.schemas.generation import GenerationOptions, GeneratedFile

# Setup Redis Client
redis_client = redis.from_url(settings.REDIS_URL, decode_responses=True)

# Azure OpenAI Client
openai_client = AsyncAzureOpenAI(
    api_key=settings.AZURE_OPENAI_API_KEY,
    api_version=settings.AZURE_OPENAI_API_VERSION,
    azure_endpoint=settings.AZURE_OPENAI_ENDPOINT
)

def generate_cache_key(prompt: str, options: GenerationOptions) -> str:
    """Generate a unique SHA-256 hash for the prompt and options to use as a Redis key."""
    data = f"{prompt}_{options.model_dump_json()}"
    return hashlib.sha256(data.encode()).hexdigest()

def extract_code_blocks(response_text: str) -> list[GeneratedFile]:
    """
    Extracts markdown code blocks from the LLM response.
    Expects format:
    ```cpp\n// filename: MyClass.hpp\n...code...\n```
    """
    blocks = re.findall(r'```(?:cpp|c\+\+)?(.*?)```', response_text, re.DOTALL)
    files = []
    
    for i, block in enumerate(blocks):
        block = block.strip()
        filename = f"GeneratedFile_{i}.cpp"
        
        # Try to extract filename from the first line if it's a comment
        first_line = block.split('\n')[0]
        if first_line.startswith('// filename:'):
            filename = first_line.replace('// filename:', '').strip()
            block = '\n'.join(block.split('\n')[1:])
        
        files.append(GeneratedFile(filename=filename, content=block))
        
    return files if files else [GeneratedFile(filename="GeneratedCode.cpp", content=response_text.strip())]

async def generate_cpp_code(prompt: str, options: GenerationOptions) -> dict:
    """Generate C++ code using Azure OpenAI."""
    # Check cache first
    cache_key = f"codegen:{generate_cache_key(prompt, options)}"
    cached_result = await redis_client.get(cache_key)
    
    if cached_result:
        # Cache hit
        files_dict = json.loads(cached_result)
        return {
            "files": [GeneratedFile(**f) for f in files_dict],
            "model_used": "cache"
        }
    
    system_prompt = "You are an expert C++ engineer. Generate clean, modern C++ code. "
    if options.split_files:
        system_prompt += "Ensure you split the implementation (.cpp) and definitions (.hpp). "
        system_prompt += "For EACH file, start with a comment `// filename: <name>.<ext>` inside the markdown code block."
    else:
        system_prompt += "Provide the solution in a single file or code block. "
        
    if not options.with_comments:
        system_prompt += "DO NOT include any inline comments or docstrings."
    else:
        system_prompt += "Include helpful inline comments explaining the logic."
        
    system_prompt += f" target version is {options.modern_cpp_version}."

    if options.template_name:
        system_prompt += f"\nNote: The user wants to strictly use the {options.template_name} pattern/template."
        
    response = await openai_client.chat.completions.create(
        model=settings.AZURE_OPENAI_DEPLOYMENT_NAME,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt}
        ],
        temperature=0.2,
        max_tokens=2000
    )
    
    content = response.choices[0].message.content
    model_used = response.model
    
    files = extract_code_blocks(content)
    
    # Cache the structured files
    # TTL: 24 hours (86400 seconds)
    await redis_client.setex(
        cache_key,
        86400,
        json.dumps([f.model_dump() for f in files])
    )
    
    return {"files": files, "model_used": model_used}
