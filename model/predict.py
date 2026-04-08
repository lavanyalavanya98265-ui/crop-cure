import random

def predict_disease(image_path):
    diseases = ["Leaf Spot", "Blight", "Healthy", "Powdery Mildew"]
    
    result = {
        "disease": random.choice(diseases),
        "confidence": round(random.uniform(80, 98), 2)
    }
    
    return result


if __name__ == "__main__":
    print(predict_disease("test.jpg"))