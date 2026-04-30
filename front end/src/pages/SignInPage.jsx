import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Zap } from 'lucide-react'

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/dashboard')
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
            Sign in to access your personalized AI-powered career roadmap and live job matches.
          </p>
        </div>

        <div className="flex items-end justify-center">
          <div className="w-72 h-56 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center text-white/60">
              <div className="text-6xl mb-2">🗺️</div>
              <p className="text-sm">Career Roadmap Visualization</p>
            </div>
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

          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Welcome back</h1>
          <p className="text-slate-500 mb-8">Sign in to continue your career journey</p>

          <form onSubmit={handleSubmit} className="space-y-5">
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
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-slate-700">Password</label>
                <a href="#" className="text-sm text-blue-600 hover:underline font-medium">Forgot password?</a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
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

            <button
              type="submit"
              className="w-full py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-lg"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 text-center">
            <span className="text-slate-500">Don&apos;t have an account? </span>
            <Link to="/signup" className="text-blue-600 font-bold hover:underline">Sign Up</Link>
          </div>

          <div className="flex items-center gap-4 my-6">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-slate-400 text-sm">or continue with</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {['Google', 'GitHub'].map((provider) => (
              <button
                key={provider}
                className="py-3 px-4 border-2 border-slate-200 rounded-xl font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all text-sm"
              >
                {provider}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
