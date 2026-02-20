import pytest
from httpx import AsyncClient
from app.main import app

@pytest.mark.asyncio
async def test_health_check():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

@pytest.mark.asyncio
async def test_get_templates():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.get("/api/templates/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) > 0
    assert "name" in data[0]
