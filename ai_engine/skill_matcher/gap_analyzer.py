from fastapi import APIRouter
from pydantic import BaseModel

from .demand_scorer import calculate_demand_scores, SKILL_HOURS_MAP

router = APIRouter()


class AnalyzeRequest(BaseModel):
    cv_text: str
    target_role: str
    job_descriptions: list[str] = []


class SkillItem(BaseModel):
    name: str
    demand_score: float
    estimated_hours: int


class AnalyzeResponse(BaseModel):
    user_skills: list[str]
    skill_gaps: list[SkillItem]


@router.post("", response_model=AnalyzeResponse)
def analyze_skill_gaps(body: AnalyzeRequest):
    """
    1. Extract skills from CV text (simple keyword match as fallback).
    2. Calculate demand scores from provided job descriptions.
    3. Return skills the user is missing (skill gaps) with demand scores.
    """
    # Extract user skills from CV (keyword-based fallback)
    cv_lower = body.cv_text.lower()
    user_skills = [skill for skill in SKILL_HOURS_MAP if skill in cv_lower]

    # Calculate demand scores from scraped job descriptions
    demand_scores = calculate_demand_scores(body.job_descriptions)

    # Identify skill gaps: high-demand skills the user doesn't have
    skill_gaps = []
    for skill, score in demand_scores.items():
        if skill not in user_skills and score > 0:
            skill_gaps.append(
                SkillItem(
                    name=skill,
                    demand_score=score,
                    estimated_hours=SKILL_HOURS_MAP.get(skill, 10),
                )
            )

    # Sort by demand score descending
    skill_gaps.sort(key=lambda s: s.demand_score, reverse=True)

    return AnalyzeResponse(user_skills=user_skills, skill_gaps=skill_gaps)
