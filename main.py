from fastapi import FastAPI
from fastapi.responses import FileResponse
import os

app = FastAPI()

@app.get("/")
async def read_index():
    # 告诉程序：当有人访问根目录时，把 index.html 扔给他
    return FileResponse('index.html')

@app.get("/status")
async def get_status():
    return {"status": "FincFlow Cloud is Active", "version": "1.1.0"}