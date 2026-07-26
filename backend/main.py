import os
import json
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from google import genai

# -----------------------------
# Load Environment Variables
# -----------------------------
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY not found in .env")

client = genai.Client(api_key=api_key)

# -----------------------------
# FastAPI App
# -----------------------------
app = FastAPI(title="PromoChef AI Backend")

# -----------------------------
# CORS
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Upload Folder
# -----------------------------
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


@app.get("/")
def home():
    return {"message": "PromoChef AI Backend Running 🚀"}


@app.post("/generate")
async def generate_campaign(
    description: str = Form(...),
    style: str = Form(...),
    image: UploadFile | None = File(default=None),
):
    # -----------------------------
    # Save uploaded image (optional)
    # -----------------------------
    if image:
        image_path = UPLOAD_DIR / image.filename
        with open(image_path, "wb") as f:
            f.write(await image.read())

    prompt = f"""
You are an expert food marketing assistant.

Generate ONLY valid JSON.

Description:
{description}

Style:
{style}

Return exactly in this format:

{{
  "headline": "...",
  "caption": "...",
  "hashtags": [
      "#Food",
      "#Offer"
  ]
}}

Do not return markdown.
Do not return explanation.
Only JSON.
"""

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
        )

        text = response.text.strip()

        try:
            result = json.loads(text)
        except Exception:
            result = {
                "headline": "Unable to parse Gemini response",
                "caption": text,
                "hashtags": [],
            }

    except Exception as e:
        result = {
            "headline": "Generation Failed",
            "caption": str(e),
            "hashtags": [],
        }

    result["videoUrl"] = ""
    result["voiceUrl"] = ""

    return result