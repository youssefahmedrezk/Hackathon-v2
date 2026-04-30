import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY", ""))
_model = genai.GenerativeModel("gemini-pro")


def extract_skills_from_cv(cv_text: str) -> list[str]:
    """
    Send CV text to Google Gemini and extract a list of technical skills.

    Returns:
        list[str]: Extracted skill names (e.g. ["Python", "SQL", "React"]).
    """
    prompt = f"""
You are an expert technical recruiter. Read the CV below and extract ONLY the technical skills
(programming languages, frameworks, tools, platforms). Return them as a comma-separated list
with no extra explanation.

CV:
{cv_text}
"""
    response = _model.generate_content(prompt)
    raw = response.text.strip()
    skills = [s.strip() for s in raw.split(",") if s.strip()]
    return skills
