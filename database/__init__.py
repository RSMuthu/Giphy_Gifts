## DB initialisation
from .db import engine as __engine
from .model import Base as __base

def initialize_db():
    '''
    Helps to bind the DB engine with the metadata of the Base
    '''
    __base.metadata.create_all(bind=__engine)
