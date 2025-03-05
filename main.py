from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles

app = FastAPI()

answer_word = 'TRAIN'

@app.get("/answer")
def get_answer():
    return answer_word

app.mount("/", StaticFiles(directory="static", html=True), name="static")

