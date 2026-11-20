from __future__ import annotations

import json
from pathlib import Path
from typing import Annotated

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

DATA = json.loads((Path(__file__).parents[1] / "data" / "demo.json").read_text())
ITEMS = {item["qr_code"]: item for item in DATA["items"]}
FACILITY = DATA["facility"]

app = FastAPI(title="SupplyTap API", version="0.1.0")

class Request(BaseModel):
    qr_code: Annotated[str, Field(min_length=3, max_length=80)]
    packs: Annotated[int | None, Field(ge=1, le=100)] = None

def calculate(qr_code: str, packs: int | None = None) -> dict:
    item = ITEMS.get(qr_code)
    if not item:
        raise HTTPException(404, detail={"code": "ITEM_NOT_FOUND", "message": "This QR label is not mapped."})
    recommended = max(1, item["reorder_point"] * 2 - item["stock"])
    selected = recommended if packs is None else packs
    if selected > item["max_packs"]:
        raise HTTPException(422, detail={"code": "PACK_LIMIT_EXCEEDED", "message": f"Maximum is {item['max_packs']} packs."})
    subtotal = round(item["unit_price"] * selected, 2)
    if subtotal > FACILITY["approval_limit"]:
        raise HTTPException(422, detail={"code": "BUDGET_LIMIT_EXCEEDED", "message": "Order exceeds the site approval limit."})
    return {"item": item, "packs": selected, "recommended": recommended, "subtotal": subtotal,
            "reason": f"Raise stock from {item['stock']} to {item['stock'] + selected} packs; target is {item['reorder_point'] * 2}."}

@app.get("/health")
def health() -> dict: return {"status": "ok"}

@app.get("/items")
def items() -> dict: return {"facility": FACILITY, "items": list(ITEMS.values())}

@app.post("/recommend")
def recommendation(request: Request) -> dict: return calculate(request.qr_code, request.packs)

@app.post("/orders", status_code=201)
def create_order(request: Request) -> dict:
    result = calculate(request.qr_code, request.packs)
    return {**result, "order_id": f"DEMO-{request.qr_code[-4:]}-{result['packs']}", "status": "awaiting_approval", "demo_only": True}
