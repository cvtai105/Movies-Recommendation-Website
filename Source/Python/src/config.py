import os

class Config:
    MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/movies_db")
    LLM_API_KEY = os.getenv("LLM_API_KEY", "your_llm_api_key_here")
    DEBUG = os.getenv("DEBUG", "False") == "True"