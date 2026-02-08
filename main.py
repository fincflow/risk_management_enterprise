from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import os

app = FastAPI()

# 1. 首页：访问 IP 直接看 index.html
@app.get("/")
async def read_index():
    return FileResponse('index.html')

# 2. 状态检查
@app.get("/status")
async def get_status():
    return {"status": "FincFlow Cloud is Active", "ui_version": "2.0"}

# 3. 自动点兵：让服务器自动去目录下找 style.css 和 script.js
# 这一行比手动写 @app.get 稳得多
app.mount("/", StaticFiles(directory="./"), name="static")