const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '')
const SESSION_STORAGE_KEY = 'pathforge-session'

const ROADMAP_COLORS = ['bg-blue-500', 'bg-indigo-500', 'bg-cyan-500', 'bg-violet-500', 'bg-sky-500', 'bg-emerald-500']

async function request(path, options = {}) {
  const { body, headers = {}, ...rest } = options

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  })

  const rawText = await response.text()
  let data = null

  if (rawText) {
    try {
      data = JSON.parse(rawText)
    } catch {
      data = rawText
    }
  }

  if (!response.ok) {
    const errorMessage = data?.error || data?.detail || `Request failed with status ${response.status}`
    throw new Error(errorMessage)
  }

  return data
}

export function saveSession(session) {
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session))
}

export function getSession() {
  const stored = localStorage.getItem(SESSION_STORAGE_KEY)

  if (!stored) {
    return null
  }

  try {
    return JSON.parse(stored)
  } catch {
    return null
  }
}

export function clearSession() {
  localStorage.removeItem(SESSION_STORAGE_KEY)
}

export function createUserProfile(payload) {
  return request('/users/', {
    method: 'POST',
    body: payload,
  })
}

export function generateRoadmap(payload) {
  return request('/roadmap/generate/', {
    method: 'POST',
    body: payload,
  })
}

export function getRoadmap(roadmapId) {
  return request(`/roadmap/${roadmapId}/`)
}

export function getJobs() {
  return request('/jobs/')
}

export function getMatchedJobs(skills = []) {
  const query = skills.filter(Boolean).join(',')
  return request(`/jobs/match/?skills=${encodeURIComponent(query)}`)
}

export function formatRoadmapSteps(roadmap) {
  const skills = Array.isArray(roadmap?.skills) ? roadmap.skills : []

  return skills.map((step, index) => {
    const skill = step?.skill || {}
    const estimatedHours = Number(skill.estimated_hours || step.allocated_hours || 1)
    const allocatedHours = Number(step.allocated_hours || 0)
    const demandScore = Number(skill.demand_score || 0)
    const progress = Math.max(0, Math.min(100, Math.round((allocatedHours / Math.max(estimatedHours, 1)) * 100)))

    return {
      id: `${roadmap?.id || 'roadmap'}-${skill.id || index}`,
      skill: skill.name || `Skill ${index + 1}`,
      hours: allocatedHours,
      color: ROADMAP_COLORS[index % ROADMAP_COLORS.length],
      week: `Week ${step.order || index + 1}`,
      demand: Number.isFinite(demandScore) ? demandScore.toFixed(1) : '0.0',
      progress,
    }
  })
}

export function formatJobType(jobType) {
  return jobType === 'internship' ? 'internship' : 'full-time'
}

export function formatJobTypeLabel(jobType) {
  return jobType === 'internship' ? 'Internship' : 'Full-Time'
}

export function scoreJobMatch(job, selectedSkills = []) {
  const requiredSkills = Array.isArray(job?.required_skills) ? job.required_skills : []
  const normalizedSelectedSkills = selectedSkills.map((skill) => skill.toLowerCase())
  const matchedSkills = requiredSkills.filter((skill) => normalizedSelectedSkills.includes(String(skill).toLowerCase()))

  if (!normalizedSelectedSkills.length) {
    return Math.max(55, 85 - requiredSkills.length * 3)
  }

  if (!requiredSkills.length) {
    return 50
  }

  const coverage = matchedSkills.length / requiredSkills.length
  const breadth = matchedSkills.length / normalizedSelectedSkills.length
  const score = 45 + coverage * 35 + breadth * 20

  return Math.max(50, Math.min(99, Math.round(score)))
}

export function formatJobs(jobs, selectedSkills = []) {
  return (Array.isArray(jobs) ? jobs : []).map((job, index) => ({
    id: job.id ?? `${job.title}-${index}`,
    title: job.title,
    company: job.company,
    location: job.location || 'Remote',
    type: formatJobTypeLabel(job.job_type),
    typeKey: formatJobType(job.job_type),
    match: scoreJobMatch(job, selectedSkills),
    tags: Array.isArray(job.required_skills) ? job.required_skills.slice(0, 3) : [],
    salary: job.job_type === 'internship' ? 'Internship role' : 'Full-time role',
    source: job.source || 'Backend',
    rating: Math.min(5, 3.8 + ((Array.isArray(job.required_skills) ? job.required_skills.length : 0) * 0.2)).toFixed(1),
    sourceUrl: job.source_url,
    requiredSkills: Array.isArray(job.required_skills) ? job.required_skills : [],
    scrapedAt: job.scraped_at,
  }))
}