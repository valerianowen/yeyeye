from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from db.database import get_db
import models.domain as models
import schemas.domain as schemas

router = APIRouter(
    prefix="/inventory",
    tags=["inventory"]
)

@router.post("/events/", response_model=schemas.InventoryEvent)
def create_inventory_event(event: schemas.InventoryEventCreate, db: Session = Depends(get_db)):
    db_event = models.InventoryEvent(**event.dict())
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event

@router.get("/events/", response_model=List[schemas.InventoryEvent])
def read_inventory_events(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    events = db.query(models.InventoryEvent).offset(skip).limit(limit).all()
    return events

@router.get("/events/{event_id}", response_model=schemas.InventoryEvent)
def read_inventory_event(event_id: int, db: Session = Depends(get_db)):
    db_event = db.query(models.InventoryEvent).filter(models.InventoryEvent.id == event_id).first()
    if db_event is None:
        raise HTTPException(status_code=404, detail="Inventory event not found")
    return db_event
