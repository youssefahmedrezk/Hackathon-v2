from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from cv_parser.extractor import router as cv_router
from scraper.linkedin_scraper import router as linkedin_router
from scraper.wuzzuf_scraper import router as wuzzuf_router
from skill_matcher.gap_analyzer import router as gap_router

app = FastAPI(title="PathForge AI Engine", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(cv_router, prefix="/cv", tags=["CV Parser"])
app.include_router(linkedin_router, prefix="/scraper/linkedin", tags=["LinkedIn Scraper"])
app.include_router(wuzzuf_router, prefix="/scraper/wuzzuf", tags=["Wuzzuf Scraper"])
app.include_router(gap_router, prefix="/analyze", tags=["Skill Gap & Demand"])


@app.get("/health")
def health_check():
    return {"status": "ok", "service": "PathForge AI Engine"}
