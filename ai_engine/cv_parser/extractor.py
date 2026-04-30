from fastapi import APIRouter
from pydantic import BaseModel

from .gemini_client import extract_skills_from_cv

router = APIRouter()


class CVRequest(BaseModel):
    cv_text: str


class CVResponse(BaseModel):
    extracted_skills: list[str]


@router.post("/extract", response_model=CVResponse)
def extract_cv_skills(body: CVRequest):
    """
    Extract technical skills from a CV using Google Gemini.
    """
    skills = extract_skills_from_cv(body.cv_text)
    return CVResponse(extracted_skills=skills)
