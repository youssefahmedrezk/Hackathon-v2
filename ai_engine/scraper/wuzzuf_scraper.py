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

WUZZUF_BASE = "https://wuzzuf.net"


def scrape_wuzzuf_jobs(role: str) -> list[dict]:
    """
    Scrape Wuzzuf job listings for a given role.

    Returns:
        list[dict]: List of job dicts with title, company, location, url.
    """
    query = role.replace(" ", "+")
    url = f"{WUZZUF_BASE}/search/jobs/?q={query}"
    jobs = []

    try:
        response = requests.get(url, headers=HEADERS, timeout=15)
        soup = BeautifulSoup(response.text, "html.parser")
        cards = soup.select("div.css-1gatmva")

        for card in cards[:20]:
            title_tag = card.select_one("h2.css-m604qf a")
            company_tag = card.select_one("a.css-17s97q8")
            location_tag = card.select_one("span.css-5wys0k")

            jobs.append({
                "title": title_tag.text.strip() if title_tag else "",
                "company": company_tag.text.strip() if company_tag else "",
                "location": location_tag.text.strip() if location_tag else "",
                "url": WUZZUF_BASE + title_tag["href"] if title_tag else "",
                "source": "wuzzuf",
            })
    except Exception:
        pass

    return jobs


@router.get("/jobs")
def get_wuzzuf_jobs(role: str):
    """Scrape and return Wuzzuf jobs for a role."""
    return scrape_wuzzuf_jobs(role)
