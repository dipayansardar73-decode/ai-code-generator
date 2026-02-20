# AI-Powered C++ Code Generation Tool

A production-grade, cloud-native code generation tool that utilizes Azure OpenAI to translate natural language prompts into robust C++17 boilerplate code (classes, singletons, logic algorithms). 

## Features
- **Fluent Dashboard**: A premium UI built with React and Microsoft Fluent UI 2, featuring light/dark mode and Monaco Editor.
- **FastAPI Backend**: Asynchronous high-performance Python backend managing code generation.
- **Azure OpenAI Integration**: Uses GPT-4 for code generation context specific to modern C++ methodologies.
- **Redis Caching**: Caches identical generation prompts to save compute cost and token expenditure.
- **Python CLI Tool**: Fully functional Click CLI tool accessible via pip.
- **Infrastructure as Code**: Full deployment via Azure Bicep to AKS, PostgreSQL, and Redis.

## Architecture
```
User -> React Dashboard / CLI 
       -> FastAPI Backend -> Redis (Cache Lookup)
          -> (Miss) -> Azure OpenAI -> clang-format
          -> PostgreSQL (Save History)
       <- JSON Payload (Header & CPP split files)
```

## Setup Instructions

### Local Development
1. **Backend**:
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```
2. **Frontend**:
```bash
cd frontend
npm install
npm run dev
```
3. **CLI**:
```bash
cd cli
pip install -e .
codegen generate "Create a robust thread safe queue" --split
```

### Azure Deployment
1. Navigate to `infrastructure/bicep`.
2. Run Azure CLI setup: `az deployment group create --resource-group CodeGenRG --template-file main.bicep`
3. The Azure DevOps pipeline (`.azure/azure-pipelines.yml`) will handle Docker image building and pushing to AKS automatically upon merge to `main`.

## API Documentation
Once the backend is running, the interactive Swagger UI API documentation is available at:
`http://localhost:8000/docs`

## Assumptions & Limitations
- Azure subscription is required for deploying AI services and infrastructure.
- Clang-format must be installed on the host machine running the backend for AST formatting to trigger correctly.
- Currently, database transactions rely on asyncpg with local testing defaulting to SQLite/in-memory if env vars are unset.
