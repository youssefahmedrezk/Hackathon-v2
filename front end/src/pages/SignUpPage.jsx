import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Zap } from 'lucide-react'

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '', role: '' })
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/onboarding')
  }

  return (
    <div className="min-h-screen flex">
      {/* Left pane - blue */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-500 to-indigo-700 flex-col justify-between p-12">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">PathForge AI</span>
        </Link>

        <div>
          <h2 className="text-5xl font-extrabold text-white leading-tight mb-6">
            Forge Your<br />Future
          </h2>
          <p className="text-blue-200 text-lg leading-relaxed max-w-sm">
            Join thousands of learners using PathForge AI to land their dream jobs with a perfectly optimized roadmap.
          </p>
          <div className="flex items-center gap-3 mt-8">
            <div className="flex -space-x-2">
              {['bg-yellow-400', 'bg-pink-400', 'bg-green-400', 'bg-purple-400'].map((c, i) => (
                <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-white`} />
              ))}
            </div>
            <span className="text-blue-100 text-sm">Join 2,000+ learners this month</span>
          </div>
        </div>

        <div className="w-72 h-56 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center text-white/60">
            <div className="text-6xl mb-2">🚀</div>
            <p className="text-sm">Start Your Journey</p>
          </div>
        </div>
      </div>

      {/* Right pane - white form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-blue-700">PathForge AI</span>
          </Link>

          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Create your account</h1>
          <p className="text-slate-500 mb-8">Start your optimized career journey today</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-slate-800"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-slate-800"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Min. 8 characters"
                  className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-slate-800"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Target Role</label>
              <select
                required
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-slate-800 bg-white"
              >
                <option value="" disabled>Select your target role</option>
                <option value="frontend">Frontend Developer</option>
                <option value="backend">Backend Developer</option>
                <option value="fullstack">Full Stack Developer</option>
                <option value="data">Data Scientist</option>
                <option value="ml">ML Engineer</option>
                <option value="mobile">Mobile Developer</option>
                <option value="devops">DevOps Engineer</option>
                <option value="product">Product Manager</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-lg"
            >
              Create Account
            </button>
          </form>

          <div className="mt-8 text-center">
            <span className="text-slate-500">Already have an account? </span>
            <Link to="/signin" className="text-blue-600 font-bold hover:underline">Sign In</Link>
          </div>

          <p className="text-center text-xs text-slate-400 mt-4">
            By signing up, you agree to our{' '}
            <a href="#" className="text-blue-500 hover:underline">Terms of Service</a> and{' '}
            <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  )
}
