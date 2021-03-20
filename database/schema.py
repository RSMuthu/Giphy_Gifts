## Define the DB schemas to get the data serialised to/from ORM
from pydantic import BaseModel, HttpUrl
from typing import List, Optional
from datetime import datetime

class Gift_Wrap(BaseModel):
    '''
    Scheme holding url list & ID
    '''
    id: Optional[str]
    urls: List[HttpUrl]

    class Config:
        '''
        Config for Schema to mention thats its might be from ORM
        '''
        orm_mode = True
