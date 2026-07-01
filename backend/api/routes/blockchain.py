from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from db.database import get_db
import models.domain as models
import schemas.domain as schemas

router = APIRouter(
    prefix="/blockchain",
    tags=["blockchain"]
)

@router.post("/transactions/", response_model=schemas.BlockchainTransaction)
def create_blockchain_transaction(tx: schemas.BlockchainTransactionCreate, db: Session = Depends(get_db)):
    db_tx = models.BlockchainTransaction(**tx.dict())
    db.add(db_tx)
    db.commit()
    db.refresh(db_tx)
    return db_tx

@router.get("/transactions/", response_model=List[schemas.BlockchainTransaction])
def read_blockchain_transactions(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    txs = db.query(models.BlockchainTransaction).offset(skip).limit(limit).all()
    return txs

@router.get("/transactions/{tx_id}", response_model=schemas.BlockchainTransaction)
def read_blockchain_transaction(tx_id: int, db: Session = Depends(get_db)):
    db_tx = db.query(models.BlockchainTransaction).filter(models.BlockchainTransaction.id == tx_id).first()
    if db_tx is None:
        raise HTTPException(status_code=404, detail="Blockchain transaction not found")
    return db_tx
