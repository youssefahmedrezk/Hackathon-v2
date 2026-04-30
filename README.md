# PathForge AI — The Algorithmic Career Compiler

## Project Name
**PathForge AI - The Time-Constrained Career Compiler**

---

## Problem Statement

- Students, fresh graduates, and career-switchers don't know what skills are actually required by real companies right now.
- **"Time Poverty":** People are busy with college or their current lives and don't have 40 hours a week to learn everything.
- Standard roadmaps are static, generic, and ignore a user's personal time constraints.
- Huge disconnect between academic studies and what companies actually ask for on platforms like LinkedIn or Wuzzuf.

---

## Solution

An algorithmic, AI-powered engine that acts as a "Time-Packer" and a direct bridge to employment:

- **Smart Skill Extraction:** AI reads the user's current resume and instantly crosses off what they already know.
- **The Knapsack Engine:** User inputs their target role (e.g., Software Engineer at a Company) and "Available Hours Per Week." The backend uses a mathematical algorithm to pack only the highest-demand global skills into their limited schedule.
- **Live Company Job Radar:** Directly connects the generated roadmap to live, active company jobs and internships so users can apply immediately.

---

## Key Features (MVP — 7 Days)

- ✅ User profile with a "Time Availability" slider and "Goal Selection" (Internships / Full-Time Company Jobs).
- ✅ AI resume/skill extraction (so users don't relearn what they already know).
- ✅ Web scraping (LinkedIn / Wuzzuf) to calculate real-time "Demand Scores" for skills in the market.
- ✅ **The Core Algorithm:** Knapsack-based roadmap generation mathematically optimized for the user's free time.
- ✅ **Smart Job Matcher:** A live board showing company jobs and internships that perfectly match the user's current skill progress.

---

## Target Users

- University students looking for summer internships at tech companies.
- Fresh graduates looking for full-time entry-level roles.
- Anyone looking to upskill for a specific company role but has very limited free time.

---

## Competitive Advantage

- **Algorithmic Time-Packing:** We don't just say "Learn this." We say *"You have 10 hours this week, this skill is 9/10 in market demand right now, so we allocated 6 hours to it."*
- **Actionable Earning:** Doesn't just teach — directly displays real company jobs and internships you can apply for today based on your progress.

---

## Team Distribution (4 Members)

### 💻 Frontend Developer
**Responsibilities:** Build the User Interface using HTML/CSS/JS, relying heavily on AI coding assistants to write code fast.

**Key Deliverables:**
- Onboarding flow (where users set their target role and available hours)
- Visual Roadmap Timeline (Gantt chart or timeline layout)
- Side-panel displaying live company jobs and internships

---

### ⚙️ Backend Developer — Habiba
**Responsibilities:** Set up the server and database infrastructure to connect the whole app.

**Core Task:** Write the core mathematical optimization algorithm (Knapsack logic). This algorithm takes the user's "Available Time" and matches it against the highest-demand skills in the database to output a perfectly optimized, constraint-based study schedule.

---

### 🤖 AI Data & Scraping — Marly
**Responsibilities:** Act as the bridge to the real-world job market.

**Key Deliverables:**
- Build a web scraper to pull live company jobs and internships from LinkedIn and Wuzzuf.
- Clean and structure scraped data so the database always has a fresh, up-to-date feed of what companies are hiring for today.

---

### 🧠 AI Logic & LLM — Malak
**Responsibilities:** Handle prompt engineering and API integrations for language models.

**Key Deliverables:**
1. Use AI to read a user's CV and extract their current skills so they don't have to study what they already know.
2. Use AI to read raw job descriptions scraped by Marly, extract the exact technical skills companies are asking for, and assign a numerical "Demand Score" out of 10 so the algorithm can use those numbers to build the roadmap.

---

## 📁 File Hierarchy

```
Hackathon_Team/
│
├── front end/                          # 💻 Frontend (User Interface)
│   ├── index.html                      # Main HTML page
│   ├── style.css                       # Styling
│   └── script.js                       # UI logic & API calls
│
├── backend/                            # ⚙️ Backend (Core System Hub — Django + PostgreSQL)
│   ├── manage.py                       # Django management entry point
│   ├── requirements.txt                # Python dependencies
│   ├── .env.example                    # Environment variable template
│   │
│   ├── pathforge/                      # Django project config
│   │   ├── __init__.py
│   │   ├── settings.py                 # Database, CORS, installed apps
│   │   ├── urls.py                     # Root URL dispatcher
│   │   └── wsgi.py                     # WSGI server entry point
│   │
│   ├── users/                          # User profile app
│   │   ├── __init__.py
│   │   ├── models.py                   # UserProfile model (role, hours, goal)
│   │   ├── serializers.py              # DRF serializers
│   │   ├── views.py                    # CRUD endpoints
│   │   ├── urls.py                     # /api/users/ routes
│   │   └── admin.py                    # Admin registration
│   │
│   ├── roadmap/                        # Roadmap generation app
│   │   ├── __init__.py
│   │   ├── models.py                   # Skill, Roadmap, RoadmapSkill models
│   │   ├── knapsack.py                 # ⭐ Core Knapsack optimization algorithm
│   │   ├── serializers.py              # DRF serializers
│   │   ├── views.py                    # /api/roadmap/generate/ endpoint
│   │   ├── urls.py                     # /api/roadmap/ routes
│   │   └── admin.py                    # Admin registration
│   │
│   └── jobs/                           # Live job listings app
│       ├── __init__.py
│       ├── models.py                   # Job model (title, company, skills)
│       ├── serializers.py              # DRF serializers
│       ├── views.py                    # Job list & skill-match endpoints
│       ├── urls.py                     # /api/jobs/ routes
│       └── admin.py                    # Admin registration
│
├── ai_engine/                          # 🤖 AI Engine (Intelligence Layer — FastAPI + Gemini)
│   ├── main.py                         # FastAPI app entry point
│   ├── requirements.txt                # Python dependencies
│   ├── .env.example                    # Environment variable template
│   │
│   ├── cv_parser/                      # CV skill extraction
│   │   ├── __init__.py
│   │   ├── gemini_client.py            # Google Gemini API integration
│   │   └── extractor.py                # POST /cv/extract endpoint
│   │
│   ├── scraper/                        # Job market web scrapers
│   │   ├── __init__.py
│   │   ├── linkedin_scraper.py         # LinkedIn jobs scraper (BeautifulSoup)
│   │   └── wuzzuf_scraper.py           # Wuzzuf jobs scraper (BeautifulSoup)
│   │
│   ├── skill_matcher/                  # Skill gap analysis
│   │   ├── __init__.py
│   │   ├── demand_scorer.py            # Calculates demand scores from job data
│   │   └── gap_analyzer.py             # POST /analyze endpoint (skill gaps)
│   │
│   └── models/                         # Shared Pydantic schemas
│       ├── __init__.py
│       └── schemas.py                  # Request/response data models
│
└── README.md                           # Project documentation
```

### Component Responsibilities

| Layer | Tech Stack | Main Role |
|---|---|---|
| **Frontend** | HTML, CSS, JavaScript | User interface — collects CV, hours, target role; displays roadmap & jobs |
| **Backend** | Django, PostgreSQL | System controller — runs Knapsack algorithm, stores data, serves API |
| **AI Engine** | FastAPI, Gemini API, scikit-learn, BeautifulSoup | Intelligence — extracts CV skills, scrapes jobs, scores skill demand |