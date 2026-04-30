from collections import Counter


SKILL_HOURS_MAP = {
    "python": 20,
    "django": 15,
    "fastapi": 10,
    "sql": 15,
    "postgresql": 10,
    "react": 20,
    "javascript": 25,
    "html": 8,
    "css": 8,
    "git": 5,
    "docker": 12,
    "machine learning": 30,
    "scikit-learn": 15,
    "pandas": 10,
    "numpy": 8,
    "rest api": 10,
    "aws": 20,
    "linux": 10,
}


def calculate_demand_scores(job_descriptions: list[str]) -> dict[str, float]:
    """
    Count how often each skill appears across all job descriptions
    and normalize to a 0–10 demand score.

    Args:
        job_descriptions (list[str]): Raw text of scraped job postings.

    Returns:
        dict[str, float]: skill → demand_score (0–10).
    """
    counter: Counter = Counter()
    for desc in job_descriptions:
        desc_lower = desc.lower()
        for skill in SKILL_HOURS_MAP:
            if skill in desc_lower:
                counter[skill] += 1

    if not counter:
        return {}

    max_count = max(counter.values())
    return {skill: round((count / max_count) * 10, 2) for skill, count in counter.items()}
