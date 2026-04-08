from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
import sys

# connect model folder
sys.path.append(os.path.abspath("../model"))
from predict import predict_disease

app = FastAPI()

# CORS fix (VERY IMPORTANT)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Backend working 🚀"}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    
    file_path = f"temp_{file.filename}"
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    result = predict_disease(file_path)
    
    return result