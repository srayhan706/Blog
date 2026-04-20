from fastapi import FastAPI
from . import models
from .database import  engine
from .routers import post,user,auth,vote
from fastapi.middleware.cors import CORSMiddleware


models.Base.metadata.create_all(bind=engine)

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, change "*" to "http://localhost:5173" etc.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(post.router)
app.include_router(user.router)
app.include_router(auth.router)
app.include_router(vote.router)

@app.get("/")
async def root():
    return {"message": "Hello Worl"}







