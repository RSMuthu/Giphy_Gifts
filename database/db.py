### Make necessary PostgreSQL DB configs & sqlalchemy ORM configs

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

##### --- Masked the Username & Passphrase --- ######
SQLALCHEMY_DATABASE_URI = "postgresql://*****:******@localhost/my_db"


engine = create_engine(SQLALCHEMY_DATABASE_URI)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    '''
    Provides database session for the database operations
    '''
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
