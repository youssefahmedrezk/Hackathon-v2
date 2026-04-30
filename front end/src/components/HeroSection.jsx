import { Link } from 'react-router-dom'
import { ArrowRight, Clock, Target, TrendingUp } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <TrendingUp className="w-4 h-4" />
              AI-Powered Career Optimization
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
              The Algorithmic{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Career Compiler
              </span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              Don't have 40 hours a week? We analyze your resume, calculate market demand, and generate a 
              mathematically optimized learning roadmap tailored to your free time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                to="/signup"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Start Your Journey <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#how-it-works"
                className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-blue-200 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all"
              >
                See How It Works
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { label: 'Skills Analyzed', value: '500+' },
                { label: 'Jobs Matched', value: '10K+' },
                { label: 'Time Saved', value: '80%' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-extrabold text-blue-600">{stat.value}</div>
                  <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right visual */}
          <div className="relative">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-blue-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-800">Your Optimized Roadmap</h3>
                <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">Live</span>
              </div>
              
              {/* Time constraint badge */}
              <div className="flex items-center gap-2 mb-6 p-3 bg-blue-50 rounded-xl">
                <Clock className="w-5 h-5 text-blue-500" />
                <span className="text-slate-700 font-medium text-sm">15 hours/week available</span>
              </div>

              {/* Timeline bars */}
              {[
                { skill: 'React Fundamentals', hours: 20, color: 'bg-blue-500', week: 'Week 1-2', percent: 80 },
                { skill: 'TypeScript', hours: 15, color: 'bg-indigo-500', week: 'Week 2-3', percent: 60 },
                { skill: 'Node.js & APIs', hours: 18, color: 'bg-cyan-500', week: 'Week 3-4', percent: 70 },
                { skill: 'SQL Basics', hours: 10, color: 'bg-violet-500', week: 'Week 4', percent: 40 },
              ].map((item) => (
                <div key={item.skill} className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-slate-700">{item.skill}</span>
                    <span className="text-xs text-slate-500">{item.week} · {item.hours}h</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3">
                    <div className={`${item.color} h-3 rounded-full transition-all duration-1000`} style={{ width: `${item.percent}%` }}></div>
                  </div>
                </div>
              ))}

              {/* Job match */}
              <div className="mt-6 p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  <span className="text-sm font-semibold">3 jobs matched your current progress</span>
                </div>
              </div>
            </div>

            {/* Floating cards */}
            <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-blue-100">
              <div className="text-xs text-slate-500">Demand Score</div>
              <div className="text-2xl font-bold text-blue-600">9.2/10</div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-blue-100">
              <div className="text-xs text-slate-500">Roadmap ready in</div>
              <div className="text-xl font-bold text-green-600">2 mins</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
