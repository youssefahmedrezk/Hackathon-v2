import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Clock, TrendingUp, Target, BookOpen, ChevronRight, Star, MapPin } from 'lucide-react'
import Navbar from '../components/Navbar'
import { formatJobs, formatRoadmapSteps, getJobs, getMatchedJobs, getRoadmap, getSession, saveSession } from '../lib/pathforgeApi'

export default function DashboardPage() {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('roadmap')
  const [session] = useState(() => {
    const storedSession = getSession()
    const routeSession = location.state || {}

    return {
      ...storedSession,
      ...routeSession,
      user: routeSession.user || storedSession?.user,
      roadmapId: routeSession.roadmapId || storedSession?.roadmapId,
      roadmap: routeSession.roadmap || storedSession?.roadmap,
    }
  })
  const [roadmap, setRoadmap] = useState([])
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const roadmapId = session?.roadmapId
  const cachedRoadmap = session?.roadmap

  useEffect(() => {
    let cancelled = false

    async function loadDashboardData() {
      if (!roadmapId) {
        setLoading(false)
        setError('Complete onboarding first to generate a roadmap.')
        return
      }

      setLoading(true)
      setError('')

      try {
        const roadmapResponse = cachedRoadmap?.id === roadmapId
          ? cachedRoadmap
          : await getRoadmap(roadmapId)

        const skillNames = (roadmapResponse.skills || [])
          .map((step) => step?.skill?.name)
          .filter(Boolean)

        const jobsResponse = skillNames.length ? await getMatchedJobs(skillNames) : await getJobs()

        if (!cancelled) {
          setRoadmap(formatRoadmapSteps(roadmapResponse))
          setJobs(formatJobs(jobsResponse, skillNames).sort((left, right) => right.match - left.match))
          saveSession({
            ...session,
            roadmap: roadmapResponse,
          })
        }
      } catch (requestError) {
        if (!cancelled) {
          setError(requestError.message || 'Unable to load your roadmap right now.')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadDashboardData()

    return () => {
      cancelled = true
    }
  }, [cachedRoadmap, roadmapId, session])

  const displayUserName = session?.user?.username || 'there'
  const targetRole = session?.roadmap?.target_role || session?.user?.target_role || 'your target role'
  const availableHours = session?.roadmap?.total_hours_available || session?.user?.available_hours_per_week || 15
  const roadmapSkills = roadmap.length
  const totalHours = roadmap.reduce((sum, item) => sum + item.hours, 0)
  const averageDemand = roadmap.length
    ? (roadmap.reduce((sum, item) => sum + Number(item.demand), 0) / roadmap.length).toFixed(1)
    : '0.0'
  const jobMatches = jobs.length

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 pt-16">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-extrabold mb-2">Welcome back, {displayUserName}! 👋</h1>
            <p className="text-blue-200">Your AI-optimized roadmap is ready. You&apos;re targeting <strong>{targetRole}</strong> with <strong>{availableHours} hrs/week</strong>.</p>
            
            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {[
                { label: 'Skills To Learn', value: String(roadmapSkills), icon: BookOpen },
                { label: 'Total Hours', value: String(totalHours), icon: Clock },
                { label: 'Job Matches', value: String(jobMatches), icon: Target },
                { label: 'Avg Demand', value: averageDemand, icon: TrendingUp },
              ].map((stat) => {
                const Icon = stat.icon
                return (
                  <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                    <Icon className="w-5 h-5 text-blue-200 mb-2" />
                    <div className="text-2xl font-extrabold">{stat.value}</div>
                    <div className="text-blue-200 text-sm">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Tabs */}
          <div className="flex gap-2 mb-8 bg-white rounded-2xl p-1.5 shadow-sm border border-slate-200 w-fit">
            {['roadmap', 'jobs', 'progress'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-xl font-semibold text-sm capitalize transition-all ${
                  activeTab === tab ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main panel */}
            <div className="lg:col-span-2 space-y-6">
              {activeTab === 'roadmap' && (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-6">📍 Your Optimized Timeline</h2>
                  {loading && <p className="text-sm text-slate-500 mb-4">Loading roadmap from the backend...</p>}
                  {error && <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
                  <div className="space-y-5">
                    {roadmap.map((item) => (
                      <div key={item.skill} className="p-4 rounded-xl border border-slate-100 hover:border-blue-200 transition-all">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-bold text-slate-900">{item.skill}</h3>
                            <p className="text-sm text-slate-500">{item.week} · {item.hours} hours</p>
                          </div>
                          <div className="flex items-center gap-1 text-amber-500">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-sm font-bold">{item.demand}</span>
                          </div>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2.5">
                          <div
                            className={`${item.color} h-2.5 rounded-full transition-all duration-500`}
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-slate-400">{item.progress}% complete</span>
                          <button className="text-xs text-blue-600 font-medium hover:underline flex items-center gap-1">
                            Start Learning <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'jobs' && (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-6">🎯 Live Job Matches</h2>
                  {loading && <p className="text-sm text-slate-500 mb-4">Loading matched jobs from the backend...</p>}
                  <div className="space-y-4">
                    {jobs.map((job) => (
                      <div key={job.title} className="p-5 rounded-xl border-2 border-slate-100 hover:border-blue-200 hover:shadow-md transition-all">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-bold text-slate-900 text-lg">{job.title}</h3>
                            <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
                              <span className="font-medium text-slate-700">{job.company}</span>
                              <span>·</span>
                              <MapPin className="w-3.5 h-3.5" />
                              <span>{job.location}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-extrabold text-green-600">{job.match}</div>
                            <div className="text-xs text-slate-400">match</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap mb-4">
                          {job.tags.map((tag) => (
                            <span key={tag} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">{tag}</span>
                          ))}
                          <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-xs">via {job.source}</span>
                        </div>
                        <button className="w-full py-2.5 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors">
                          Apply Now
                        </button>
                      </div>
                    ))}
                  </div>
                  {!loading && !jobs.length && <p className="mt-4 text-sm text-slate-500">No matched jobs were returned yet.</p>}
                </div>
              )}

              {activeTab === 'progress' && (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-6">📊 Your Progress</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Hours Completed', value: '23 / 75', percent: 31, color: 'bg-blue-500' },
                      { label: 'Skills Started', value: '2 / 5', percent: 40, color: 'bg-indigo-500' },
                      { label: 'Skills Mastered', value: '0 / 5', percent: 0, color: 'bg-violet-500' },
                      { label: 'Job Applications', value: '2', percent: 20, color: 'bg-cyan-500' },
                    ].map((item) => (
                      <div key={item.label} className="p-4 bg-slate-50 rounded-xl">
                        <div className="text-slate-500 text-sm mb-1">{item.label}</div>
                        <div className="text-2xl font-extrabold text-slate-900 mb-3">{item.value}</div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.percent}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Algorithm summary */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
                <h3 className="font-bold mb-4">⚡ Algorithm Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-200">Strategy</span>
                    <span className="font-medium">Knapsack Optimized</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-200">Available hours</span>
                    <span className="font-medium">15 hrs/week</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-200">Total roadmap</span>
                    <span className="font-medium">5 weeks</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-200">Skills skipped</span>
                    <span className="font-medium">3 (from CV)</span>
                  </div>
                </div>
              </div>

              {/* Live jobs sidebar */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-900">🔴 Live Jobs</h3>
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                </div>
                {jobs.slice(0, 2).map((job) => (
                  <div key={job.title} className="py-3 border-b border-slate-100 last:border-0">
                    <div className="font-semibold text-slate-800 text-sm">{job.title}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{job.company} · {job.match} match</div>
                    <div className="flex gap-1 mt-2">
                      {job.tags.slice(0, 2).map((t) => (
                        <span key={t} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
                {!loading && !jobs.length && <p className="text-sm text-slate-500">No live jobs were returned yet.</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
