from fastapi import APIRouter
from . import organizations, users, warehouses, assets, inventory, blockchain, iot

router = APIRouter()

router.include_router(organizations.router)
router.include_router(users.router)
router.include_router(warehouses.router)
router.include_router(assets.router)
router.include_router(inventory.router)
router.include_router(blockchain.router)
router.include_router(iot.router)
