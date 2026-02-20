import subprocess
import logging

logger = logging.getLogger(__name__)

def format_cpp_code(code: str) -> str:
    """Format C++ code using clang-format via subprocess."""
    try:
        # Run clang-format assuming it's correctly installed in the environment/docker
        process = subprocess.Popen(
            ["clang-format", "-style=Google"],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        stdout, stderr = process.communicate(input=code)
        
        if process.returncode == 0:
            return stdout
        else:
            logger.warning(f"clang-format failed: {stderr}")
            return code
            
    except Exception as e:
        logger.error(f"Error formatting code: {e}")
        return code
