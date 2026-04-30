import { useEffect, useState } from 'react'
import { Search, MapPin, Clock, Star, Filter } from 'lucide-react'
import Navbar from '../components/Navbar'
import { formatJobs, getJobs, getSession } from '../lib/pathforgeApi'

export default function JobsPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function loadJobs() {
      setLoading(true)
      setError('')

      try {
        const session = getSession()
        const skillNames = session?.roadmap?.skills?.map((step) => step?.skill?.name).filter(Boolean) || []
        const response = await getJobs()
        const formattedJobs = formatJobs(response, skillNames).sort((left, right) => right.match - left.match)

        if (!cancelled) {
          setJobs(formattedJobs)
        }
      } catch (requestError) {
        if (!cancelled) {
          setError(requestError.message || 'Unable to load jobs from the backend.')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadJobs()

    return () => {
      cancelled = true
    }
  }, [])

  const filtered = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase()) || job.company.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === 'all' || job.typeKey === filter
    return matchesSearch && matchesFilter
  })

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 pt-16">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold mb-3">🎯 Live Job Radar</h1>
            <p className="text-blue-200 text-lg mb-8">Jobs matched to your current skill set — updated daily from LinkedIn &amp; Wuzzuf</p>
            
            {/* Search */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by job title or company..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl text-slate-800 text-lg focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg"
              />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filters */}
          <div className="flex items-center gap-3 mb-8 flex-wrap">
            <Filter className="w-4 h-4 text-slate-500" />
            {['all', 'internship', 'full-time'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-full font-semibold text-sm capitalize transition-all ${
                  filter === f ? 'bg-blue-600 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-300'
                }`}
              >
                {f === 'all' ? 'All Jobs' : f}
              </button>
            ))}
            <span className="ml-auto text-slate-500 text-sm">{filtered.length} jobs found</span>
          </div>

          {loading && <p className="mb-6 text-sm text-slate-500">Loading jobs from the backend...</p>}
          {error && <p className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}

          {/* Jobs grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((job) => (
              <div key={job.id} className="bg-white rounded-2xl border-2 border-slate-100 hover:border-blue-300 hover:shadow-lg transition-all p-6 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-lg leading-tight">{job.title}</h3>
                    <p className="text-blue-600 font-semibold mt-1">{job.company}</p>
                  </div>
                  <div className="text-center bg-green-50 rounded-xl px-3 py-2">
                    <div className="text-lg font-extrabold text-green-600">{job.match}%</div>
                    <div className="text-xs text-green-500">match</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-500 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> {job.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" /> {job.type}
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-4 text-sm">
                  <Star className="w-4 h-4 text-amber-400 fill-current" />
                  <span className="font-semibold text-slate-700">{job.rating}</span>
                  <span className="text-slate-400">· {job.salary}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {job.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">{tag}</span>
                  ))}
                  <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-xs">via {job.source}</span>
                </div>

                <div className="mt-auto grid grid-cols-2 gap-2">
                  <button className="py-2.5 border-2 border-blue-200 text-blue-600 rounded-xl font-semibold text-sm hover:bg-blue-50 transition-colors">
                    Save
                  </button>
                  <button className="py-2.5 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
