from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from db.database import Base

class Organization(Base):
    __tablename__ = "organizations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    type = Column(String)  # Supplier, Manufacturer, etc.
    created_at = Column(DateTime, default=datetime.utcnow)

    users = relationship("User", back_populates="organization")
    warehouses = relationship("Warehouse", back_populates="organization")

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    role = Column(String)
    organization_id = Column(Integer, ForeignKey("organizations.id"))
    created_at = Column(DateTime, default=datetime.utcnow)

    organization = relationship("Organization", back_populates="users")

class Warehouse(Base):
    __tablename__ = "warehouses"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    type = Column(String)
    capacity = Column(Integer)
    organization_id = Column(Integer, ForeignKey("organizations.id"))
    created_at = Column(DateTime, default=datetime.utcnow)

    organization = relationship("Organization", back_populates="warehouses")

class Asset(Base):
    __tablename__ = "assets"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    category = Column(String)
    serial_number = Column(String, unique=True, index=True)
    current_owner_id = Column(Integer, ForeignKey("organizations.id"))
    current_location_id = Column(Integer, ForeignKey("warehouses.id"))
    status = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

    current_owner = relationship("Organization")
    current_location = relationship("Warehouse")

class InventoryEvent(Base):
    __tablename__ = "inventory_events"

    id = Column(Integer, primary_key=True, index=True)
    asset_id = Column(Integer, ForeignKey("assets.id"))
    event_type = Column(String) # Receiving, Storage, Transfer, Shipping
    from_location_id = Column(Integer, ForeignKey("warehouses.id"), nullable=True)
    to_location_id = Column(Integer, ForeignKey("warehouses.id"), nullable=True)
    performed_by_id = Column(Integer, ForeignKey("users.id"))
    timestamp = Column(DateTime, default=datetime.utcnow)

class BlockchainTransaction(Base):
    __tablename__ = "blockchain_transactions"

    id = Column(Integer, primary_key=True, index=True)
    event_id = Column(Integer, ForeignKey("inventory_events.id"))
    hash = Column(String, unique=True, index=True)
    previous_hash = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)
    status = Column(String, default="Verified")

class IoTDevice(Base):
    __tablename__ = "iot_devices"

    id = Column(Integer, primary_key=True, index=True)
    device_id = Column(String, unique=True, index=True)
    type = Column(String) # RFID, Temperature, etc.
    location_id = Column(Integer, ForeignKey("warehouses.id"))
    status = Column(String, default="Active")

class IoTTelemetry(Base):
    __tablename__ = "iot_telemetry"

    id = Column(Integer, primary_key=True, index=True)
    device_id = Column(Integer, ForeignKey("iot_devices.id"))
    data = Column(String) # JSON string simulation
    timestamp = Column(DateTime, default=datetime.utcnow)
