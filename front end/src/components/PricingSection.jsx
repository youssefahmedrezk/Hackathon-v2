import { Check, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for trying out PathForge AI',
    features: [
      '1 roadmap generation per month',
      'Basic CV skill extraction',
      'Top 5 job matches',
      'Standard support',
    ],
    cta: 'Get Started Free',
    href: '/signup',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$12',
    period: 'per month',
    description: 'For serious job seekers who want results fast',
    features: [
      'Unlimited roadmap generations',
      'Advanced AI CV analysis',
      'Live job radar (100+ matches)',
      'Priority support',
      'Roadmap export (PDF)',
      'Weekly demand score updates',
    ],
    cta: 'Start Pro Trial',
    href: '/signup',
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    name: 'Team',
    price: '$49',
    period: 'per month',
    description: 'For bootcamps and career centers',
    features: [
      'Everything in Pro',
      'Up to 10 team members',
      'Group progress dashboard',
      'Custom role targets',
      'Dedicated success manager',
    ],
    cta: 'Contact Sales',
    href: '#contact',
    highlighted: false,
  },
]

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
            Simple, Transparent{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Start free, upgrade when you need more power. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-8 rounded-2xl border-2 ${
                plan.highlighted
                  ? 'border-blue-500 bg-gradient-to-b from-blue-600 to-indigo-700 text-white shadow-2xl scale-105'
                  : 'border-slate-200 bg-white hover:border-blue-200 hover:shadow-lg'
              } transition-all`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-amber-400 text-amber-900 text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1">
                    <Zap className="w-3 h-3" /> {plan.badge}
                  </span>
                </div>
              )}

              <h3 className={`text-2xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>
                {plan.name}
              </h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className={`text-5xl font-extrabold ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>
                  {plan.price}
                </span>
                <span className={`text-sm ${plan.highlighted ? 'text-blue-200' : 'text-slate-500'}`}>
                  /{plan.period}
                </span>
              </div>
              <p className={`text-sm mb-8 ${plan.highlighted ? 'text-blue-200' : 'text-slate-600'}`}>
                {plan.description}
              </p>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <Check className={`w-5 h-5 flex-shrink-0 ${plan.highlighted ? 'text-blue-200' : 'text-blue-600'}`} />
                    <span className={plan.highlighted ? 'text-blue-100' : 'text-slate-700'}>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to={plan.href}
                className={`block w-full text-center py-3 px-6 rounded-xl font-bold transition-all ${
                  plan.highlighted
                    ? 'bg-white text-blue-700 hover:bg-blue-50 shadow-lg'
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
