from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_recommends_and_creates_order():
    rec = client.post("/recommend", json={"qr_code": "ST-LINER-55"})
    assert rec.status_code == 200
    assert rec.json()["recommended"] == 5
    order = client.post("/orders", json={"qr_code": "ST-LINER-55", "packs": 3})
    assert order.status_code == 201
    assert order.json()["status"] == "awaiting_approval"
    assert order.json()["demo_only"] is True

def test_unknown_item_is_named():
    response = client.post("/recommend", json={"qr_code": "ST-MISSING"})
    assert response.status_code == 404
    assert response.json()["detail"]["code"] == "ITEM_NOT_FOUND"

def test_invalid_and_limit_failures():
    assert client.post("/orders", json={"qr_code": "ST-LINER-55", "packs": 0}).status_code == 422
    response = client.post("/orders", json={"qr_code": "ST-LINER-55", "packs": 9})
    assert response.status_code == 422
    assert response.json()["detail"]["code"] == "PACK_LIMIT_EXCEEDED"
