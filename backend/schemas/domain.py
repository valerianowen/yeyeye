from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class OrganizationBase(BaseModel):
    name: str
    type: str

class OrganizationCreate(OrganizationBase):
    pass

class Organization(OrganizationBase):
    id: int
    created_at: datetime
    class Config:
        orm_mode = True

class UserBase(BaseModel):
    name: str
    email: str
    role: str
    organization_id: int

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int
    created_at: datetime
    class Config:
        orm_mode = True

class WarehouseBase(BaseModel):
    name: str
    type: str
    capacity: int
    organization_id: int

class WarehouseCreate(WarehouseBase):
    pass

class Warehouse(WarehouseBase):
    id: int
    created_at: datetime
    class Config:
        orm_mode = True

class AssetBase(BaseModel):
    name: str
    category: str
    serial_number: str
    current_owner_id: int
    current_location_id: int
    status: str

class AssetCreate(AssetBase):
    pass

class Asset(AssetBase):
    id: int
    created_at: datetime
    class Config:
        orm_mode = True

class InventoryEventBase(BaseModel):
    asset_id: int
    event_type: str
    from_location_id: Optional[int] = None
    to_location_id: Optional[int] = None
    performed_by_id: int

class InventoryEventCreate(InventoryEventBase):
    pass

class InventoryEvent(InventoryEventBase):
    id: int
    timestamp: datetime
    class Config:
        orm_mode = True

class BlockchainTransactionBase(BaseModel):
    event_id: int
    hash: str
    previous_hash: str
    status: str

class BlockchainTransactionCreate(BlockchainTransactionBase):
    pass

class BlockchainTransaction(BlockchainTransactionBase):
    id: int
    timestamp: datetime
    class Config:
        orm_mode = True

class IoTDeviceBase(BaseModel):
    device_id: str
    type: str
    location_id: int
    status: str

class IoTDeviceCreate(IoTDeviceBase):
    pass

class IoTDevice(IoTDeviceBase):
    id: int
    class Config:
        orm_mode = True

class IoTTelemetryBase(BaseModel):
    device_id: int
    data: str

class IoTTelemetryCreate(IoTTelemetryBase):
    pass

class IoTTelemetry(IoTTelemetryBase):
    id: int
    timestamp: datetime
    class Config:
        orm_mode = True
