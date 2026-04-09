import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image
import os

# correct paths
BASE_DIR = os.path.dirname(__file__)

model_path = os.path.join(BASE_DIR, "plant_model.h5")
dataset_path = os.path.join(BASE_DIR, "dataset")

# load model
model = tf.keras.models.load_model(model_path)

# get class names
class_names = os.listdir(dataset_path)

def predict_disease(img_path):
    img = image.load_img(img_path, target_size=(128,128))
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    prediction = model.predict(img_array)
    
    predicted_class = np.argmax(prediction)
    confidence = float(np.max(prediction)) * 100

    return {
        "disease": class_names[predicted_class],
        "confidence": round(confidence, 2)
    }