from pydantic import BaseModel


class CVRequest(BaseModel):
    cv_text: str


class JobItem(BaseModel):
    title: str
    company: str
    location: str
    url: str
    source: str


class SkillItem(BaseModel):
    name: str
    demand_score: float
    estimated_hours: int


class AnalyzeRequest(BaseModel):
    cv_text: str
    target_role: str
    job_descriptions: list[str] = []


class AnalyzeResponse(BaseModel):
    user_skills: list[str]
    skill_gaps: list[SkillItem]
