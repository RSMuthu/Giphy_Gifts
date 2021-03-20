## Different Endpoints for Job(s)
from datetime import datetime
from fastapi import Depends, HTTPException, Request
from sqlalchemy.orm import Session
from typing import List

from database.db import get_db
from database.schema import Gift_Wrap
from database.model import Gift
from Giphy_Gifts import app

import requests

@app.get("/api/gift_wrap/{id}", response_model=Gift_Wrap)
def wrap_gift_urls(id:str, db: Session = Depends(get_db)):
    '''
    Get the list of URLs available for given gift wrap ID.
    '''
    gift = db.query(Gift).filter(Gift.id == id).first()
    if not gift:
        raise HTTPException(status_code=404, detail="Gift not found")
    return gift

@app.get("/api/all_gift_wraps", response_model=List[Gift_Wrap])
def wrap_gift_urls(db: Session = Depends(get_db)):
    '''
    Get the list of all the gift wrappings made so far.
    '''
    gifts = db.query(Gift).all()
    return gifts

@app.delete("/api/gift_wrap/{id}")
def delete_gift(id:str, db: Session = Depends(get_db)):
    '''
    delete the gift wrap associated with the given ID.
    '''
    gift = db.query(Gift).filter(Gift.id == id).first()
    if not gift:
        raise HTTPException(status_code=404, detail="Gift not found")
    db.delete(gift)
    db.commit()
    return {'msg': "Deletion successful"}


@app.post("/api/gift_wrap", response_model=Gift_Wrap)
def create_gift_wrap(urls:Gift_Wrap, db: Session = Depends(get_db)):
    '''
    Creates a new gift wrap
    '''
    try:
        gift = Gift(**urls.dict())
        if not bool(gift.urls):
            raise HTTPException(status_code=401, detail="No URLs provided to Wrap")
        db.add(gift)
        db.commit()
        db.refresh(gift)
        return gift
    except:
        raise HTTPException(status_code=500, detail="Gift Wrapping Failed !")
