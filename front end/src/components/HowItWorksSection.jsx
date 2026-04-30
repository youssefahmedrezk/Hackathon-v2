import { ArrowRight, Upload, Settings, Map, Briefcase } from 'lucide-react'

const steps = [
  {
    step: '01',
    icon: Upload,
    title: 'Upload Your CV',
    description: 'Drop your resume and let our AI extract your existing skills. It takes seconds.',
    color: 'border-blue-300 bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    step: '02',
    icon: Settings,
    title: 'Set Your Constraints',
    description: 'Tell us your target role (e.g. Frontend Dev, Data Scientist) and how many hours per week you can study.',
    color: 'border-indigo-300 bg-indigo-50',
    iconColor: 'text-indigo-600',
  },
  {
    step: '03',
    icon: Map,
    title: 'Get Your Roadmap',
    description: 'Our Knapsack algorithm generates a personalized, time-optimized roadmap ranked by market demand.',
    color: 'border-violet-300 bg-violet-50',
    iconColor: 'text-violet-600',
  },
  {
    step: '04',
    icon: Briefcase,
    title: 'Apply to Real Jobs',
    description: 'Browse live job listings from LinkedIn and Wuzzuf that match your current and target skill set.',
    color: 'border-cyan-300 bg-cyan-50',
    iconColor: 'text-cyan-600',
  },
]

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">How It Works</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            From resume to roadmap in four simple steps. No fluff, no generic advice — just pure algorithmic precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.step} className="relative">
                <div className={`p-6 rounded-2xl border-2 ${step.color} h-full`}>
                  <div className="text-5xl font-extrabold text-slate-200 mb-4">{step.step}</div>
                  <div className={`w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm`}>
                    <Icon className={`w-6 h-6 ${step.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-blue-400 bg-white rounded-full p-1 shadow-sm" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
