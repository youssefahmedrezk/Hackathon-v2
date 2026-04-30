import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Zap } from 'lucide-react'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  
  const isDashboard = location.pathname === '/dashboard' || location.pathname === '/jobs' || location.pathname === '/onboarding'

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-blue-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-blue-700">PathForge <span className="text-blue-500">AI</span></span>
          </Link>

          {/* Desktop nav links */}
          {!isDashboard && (
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Features</a>
              <a href="#how-it-works" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">How It Works</a>
              <a href="#pricing" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Pricing</a>
            </div>
          )}
          
          {isDashboard && (
            <div className="hidden md:flex items-center gap-8">
              <Link to="/dashboard" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Dashboard</Link>
              <Link to="/jobs" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Jobs</Link>
            </div>
          )}

          {/* Auth buttons */}
          <div className="hidden md:flex items-center gap-3">
            {!isDashboard ? (
              <>
                <Link to="/signin" className="px-4 py-2 text-blue-600 font-semibold hover:bg-blue-50 rounded-lg transition-colors">Sign In</Link>
                <Link to="/signup" className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md">Get Started</Link>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">U</div>
                <Link to="/" className="text-slate-500 hover:text-red-500 text-sm transition-colors">Log Out</Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 text-slate-600" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-blue-100 flex flex-col gap-3">
            <a href="#features" className="text-slate-600 font-medium py-2">Features</a>
            <a href="#pricing" className="text-slate-600 font-medium py-2">Pricing</a>
            <a href="#how-it-works" className="text-slate-600 font-medium py-2">How It Works</a>
            <Link to="/signin" className="text-blue-600 font-semibold py-2">Sign In</Link>
            <Link to="/signup" className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg text-center">Get Started</Link>
          </div>
        )}
      </div>
    </nav>
  )
}
