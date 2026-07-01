from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from db.database import get_db
import models.domain as models
import schemas.domain as schemas

router = APIRouter(
    prefix="/iot",
    tags=["iot"]
)

@router.post("/devices/", response_model=schemas.IoTDevice)
def create_iot_device(device: schemas.IoTDeviceCreate, db: Session = Depends(get_db)):
    db_device = models.IoTDevice(**device.dict())
    db.add(db_device)
    db.commit()
    db.refresh(db_device)
    return db_device

@router.get("/devices/", response_model=List[schemas.IoTDevice])
def read_iot_devices(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    devices = db.query(models.IoTDevice).offset(skip).limit(limit).all()
    return devices

@router.post("/telemetry/", response_model=schemas.IoTTelemetry)
def create_iot_telemetry(telemetry: schemas.IoTTelemetryCreate, db: Session = Depends(get_db)):
    db_telemetry = models.IoTTelemetry(**telemetry.dict())
    db.add(db_telemetry)
    db.commit()
    db.refresh(db_telemetry)
    return db_telemetry

@router.get("/telemetry/", response_model=List[schemas.IoTTelemetry])
def read_iot_telemetries(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    telemetries = db.query(models.IoTTelemetry).offset(skip).limit(limit).all()
    return telemetries
