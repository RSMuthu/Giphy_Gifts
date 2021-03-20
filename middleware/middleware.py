## All the necessary middleware are configured here
from fastapi.middleware.cors import CORSMiddleware

def setup_CORS(app):
    '''
    Helps to setup the CORS middleware

    Args:
    app -- FastAPI object to add the middleware for the CORS setup
    '''
    origins = [
        "http://localhost",
        "http://localhost:3000",
        ]
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
