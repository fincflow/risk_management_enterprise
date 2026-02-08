from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"status": "FincFlow Cloud is Active", "version": "1.0.0"}

@app.get("/health")
def health_check():
    return {"message": "Service is running perfectly on Tencent Cloud"}