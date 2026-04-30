import requests
from bs4 import BeautifulSoup
from fastapi import APIRouter

router = APIRouter()

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0.0.0 Safari/537.36"
    )
}


def scrape_linkedin_jobs(role: str, location: str = "Egypt") -> list[dict]:
    """
    Scrape LinkedIn job listings for a given role and location.

    Returns:
        list[dict]: List of job dicts with title, company, location, url.
    """
    query = role.replace(" ", "%20")
    url = f"https://www.linkedin.com/jobs/search/?keywords={query}&location={location}"
    jobs = []

    try:
        response = requests.get(url, headers=HEADERS, timeout=15)
        soup = BeautifulSoup(response.text, "html.parser")
        cards = soup.select("div.job-search-card")

        for card in cards[:20]:
            title_tag = card.select_one("h3.base-search-card__title")
            company_tag = card.select_one("h4.base-search-card__subtitle")
            location_tag = card.select_one("span.job-search-card__location")
            link_tag = card.select_one("a.base-card__full-link")

            jobs.append({
                "title": title_tag.text.strip() if title_tag else "",
                "company": company_tag.text.strip() if company_tag else "",
                "location": location_tag.text.strip() if location_tag else "",
                "url": link_tag["href"] if link_tag else "",
                "source": "linkedin",
            })
    except Exception:
        pass

    return jobs


@router.get("/jobs")
def get_linkedin_jobs(role: str, location: str = "Egypt"):
    """Scrape and return LinkedIn jobs for a role."""
    return scrape_linkedin_jobs(role, location)
