from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles # 虽然这次没用上文件夹，但以后会用
import os

app = FastAPI()

# 1. 首页入口
@app.get("/")
async def read_index():
    return FileResponse('index.html')

# 2. 专门负责发 CSS 样式表
@app.get("/style.css")
async def read_css():
    return FileResponse('style.css')

# 3. 专门负责发 JS 脚本
@app.get("/script.js")
async def read_js():
    return FileResponse('script.js')

# 4. 状态检查接口
@app.get("/status")
async def get_status():
    return {"status": "FincFlow Cloud is Active", "version": "UI_Update_v1"}