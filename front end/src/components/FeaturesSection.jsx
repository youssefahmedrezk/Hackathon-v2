import { Brain, Clock, Target, TrendingUp, Upload, Zap } from 'lucide-react'

const features = [
  {
    icon: Upload,
    title: 'Smart CV Analysis',
    description: 'Upload your resume and our AI instantly identifies your existing skills, so you never waste time relearning what you already know.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: Brain,
    title: 'Knapsack Algorithm',
    description: 'Our patented algorithm mathematically packs the highest-demand skills into your exact available time budget. No guesswork.',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
  },
  {
    icon: Clock,
    title: 'Time-Poverty Aware',
    description: 'Whether you have 5 hours or 40 hours per week, we optimize every minute. Study less, achieve more.',
    color: 'text-cyan-600',
    bg: 'bg-cyan-50',
  },
  {
    icon: TrendingUp,
    title: 'Real-Time Market Data',
    description: 'We scrape LinkedIn and Wuzzuf daily to calculate live demand scores for every skill. Always relevant, never outdated.',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    icon: Target,
    title: 'Live Job Radar',
    description: "See exactly which companies are hiring for your current skill set right now. Apply while you're still learning.",
    color: 'text-rose-600',
    bg: 'bg-rose-50',
  },
  {
    icon: Zap,
    title: 'Instant Roadmap',
    description: 'Get your personalized learning roadmap in under 2 minutes. From CV upload to optimized schedule in record time.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Get Hired Faster
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            PathForge AI combines AI, real-world job data, and mathematical optimization to give you 
            the most efficient path to your dream job.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="p-8 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all group"
              >
                <div className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
