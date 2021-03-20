from fastapi import FastAPI
from database import initialize_db
from middleware import setup_CORS

## Initialise the FastAPI object to process
app = FastAPI()
## Initialise the database and tables as needed
initialize_db()

## Set up & configure the middleware for permit CORS
setup_CORS(app)

## Pull in the endpoints for Rest View
from endpoints import gift_endpoints
