## DB Models definitions
from sqlalchemy import DateTime, Column, Text, String
from sqlalchemy.dialects.postgresql import ARRAY
from datetime import datetime

from .db import Base

class Gift(Base):
    '''
    Model - Gift
    Table for Gifts -- holds the ID and corresponding giphy URL of the jobs created
    '''
    __tablename__ = "Gift"
    id = Column(String(21), primary_key=True, default=lambda : datetime.utcnow().strftime('%Y%m%d%H%M%S%f')) # str of timestamp
    #create_date = Column(DateTime, nullable=False, default=datetime.utcnow)
    urls = Column(ARRAY(Text), nullable=False)

    def __repr__(self):
        return f"{id} - {urls}"
