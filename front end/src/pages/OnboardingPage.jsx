import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, Clock, Target, ChevronRight, X, FileText } from 'lucide-react'
import Navbar from '../components/Navbar'
import { createUserProfile, generateRoadmap, saveSession } from '../lib/pathforgeApi'

const ROLES = ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Data Scientist', 'ML Engineer', 'Mobile Developer', 'DevOps Engineer']

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [cvFile, setCvFile] = useState(null)
  const [cvSummary, setCvSummary] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const [hours, setHours] = useState(15)
  const [selectedRole, setSelectedRole] = useState('')
  const [goal, setGoal] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) setCvFile(file)
  }

  const handleGenerate = async () => {
    if (!selectedRole || !goal) {
      setError('Please choose a target role and goal before generating your roadmap.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const slug = selectedRole.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'candidate'
      const uniqueSeed = Date.now().toString(36)
      const username = `${slug}-${uniqueSeed}`
      const email = `${username}@pathforge.local`

      const user = await createUserProfile({
        username,
        email,
        target_role: selectedRole,
        available_hours_per_week: hours,
        goal,
      })

      const cvText = [cvSummary, cvFile?.name, selectedRole, goal, `${hours} hours per week`]
        .filter(Boolean)
        .join('\n')

      const roadmap = await generateRoadmap({
        user_id: user.id,
        cv_text: cvText,
      })

      saveSession({
        user,
        roadmapId: roadmap.id,
        roadmap,
      })

      navigate('/dashboard', { state: { user, roadmapId: roadmap.id } })
    } catch (requestError) {
      setError(requestError.message || 'We could not generate your roadmap right now.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pt-20 pb-12">
        <div className="max-w-2xl mx-auto px-4">
          {/* Progress */}
          <div className="flex items-center justify-between mb-10">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    s <= step ? 'bg-blue-600 text-white shadow-lg' : 'bg-white border-2 border-slate-200 text-slate-400'
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div className={`flex-1 h-0.5 mx-2 transition-all ${s < step ? 'bg-blue-500' : 'bg-slate-200'}`} />
                )}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 border border-blue-100">
            {/* Step 1: CV Upload */}
            {step === 1 && (
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Upload className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900">Upload Your CV</h2>
                </div>
                <p className="text-slate-500 mb-8">Our AI will extract your skills so you don&apos;t re-study what you know.</p>

                {cvFile ? (
                  <div className="border-2 border-blue-300 bg-blue-50 rounded-2xl p-8 text-center">
                    <FileText className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                    <p className="font-semibold text-slate-800">{cvFile.name}</p>
                    <p className="text-sm text-slate-500 mt-1">{(cvFile.size / 1024).toFixed(1)} KB</p>
                    <button
                      onClick={() => setCvFile(null)}
                      className="mt-4 flex items-center gap-1 text-sm text-red-500 hover:text-red-600 mx-auto"
                    >
                      <X className="w-4 h-4" /> Remove file
                    </button>
                  </div>
                ) : (
                  <div
                    className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
                      dragOver ? 'border-blue-500 bg-blue-50 scale-[1.02]' : 'border-blue-200 hover:border-blue-400 hover:bg-blue-50'
                    }`}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('cvInput').click()}
                  >
                    <Upload className="w-12 h-12 text-blue-300 mx-auto mb-4" />
                    <p className="text-slate-700 font-semibold mb-2">Drag &amp; drop your CV here</p>
                    <p className="text-slate-400 text-sm mb-4">or click to browse files</p>
                    <span className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">Browse Files</span>
                    <input id="cvInput" type="file" hidden accept=".pdf,.doc,.docx" onChange={(e) => setCvFile(e.target.files[0])} />
                  </div>
                )}

                <div className="mt-6">
                  <label className="block text-sm font-bold text-slate-700 mb-3">Paste a CV summary or key skills</label>
                  <textarea
                    value={cvSummary}
                    onChange={(e) => setCvSummary(e.target.value)}
                    rows={5}
                    placeholder="Example: React developer with 2 years of experience, built dashboards with TypeScript, REST APIs, and PostgreSQL..."
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 resize-none"
                  />
                </div>

                <p className="text-center text-sm text-slate-400 mt-4">Supports PDF, DOC, DOCX</p>
              </div>
            )}

            {/* Step 2: Role + Hours */}
            {step === 2 && (
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900">Your Time &amp; Goals</h2>
                </div>
                <p className="text-slate-500 mb-8">Tell us how much time you have and what role you&apos;re targeting.</p>

                {/* Target role */}
                <div className="mb-8">
                  <label className="block text-sm font-bold text-slate-700 mb-3">Target Role</label>
                  <div className="grid grid-cols-2 gap-3">
                    {ROLES.map((role) => (
                      <button
                        key={role}
                        onClick={() => setSelectedRole(role)}
                        className={`p-3 rounded-xl border-2 text-sm font-medium transition-all text-left ${
                          selectedRole === role
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-slate-200 text-slate-600 hover:border-blue-300'
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hours slider */}
                <div>
                  <label className="flex items-center justify-between text-sm font-bold text-slate-700 mb-3">
                    <span>Available Hours Per Week</span>
                    <span className="text-2xl font-extrabold text-blue-600">{hours} hrs</span>
                  </label>
                  <input
                    type="range"
                    min={2}
                    max={40}
                    value={hours}
                    onChange={(e) => setHours(Number(e.target.value))}
                    className="w-full h-3 rounded-full appearance-none cursor-pointer accent-blue-600"
                    style={{ background: `linear-gradient(to right, #2563eb ${((hours - 2) / 38) * 100}%, #e2e8f0 ${((hours - 2) / 38) * 100}%)` }}
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-2">
                    <span>2 hrs (Very busy)</span>
                    <span>40 hrs (Full time)</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Goal */}
            {step === 3 && (
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Target className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900">What&apos;s Your Goal?</h2>
                </div>
                <p className="text-slate-500 mb-8">Choose what you&apos;re aiming for so we can tailor your roadmap perfectly.</p>

                <div className="space-y-4">
                  {[
                    { id: 'internship', emoji: '🎓', title: 'Summer Internship', desc: 'Land a paid internship at a top tech company this summer' },
                    { id: 'fulltime', emoji: '💼', title: 'Full-Time Job', desc: 'Secure an entry-level or junior developer role' },
                    { id: 'upskill', emoji: '📈', title: 'Career Switch', desc: 'Transition from another field into tech' },
                    { id: 'freelance', emoji: '🌐', title: 'Freelancing', desc: 'Build skills to get freelance projects online' },
                  ].map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setGoal(g.id)}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        goal === g.id ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{g.emoji}</span>
                        <div>
                          <div className={`font-bold ${goal === g.id ? 'text-blue-700' : 'text-slate-800'}`}>{g.title}</div>
                          <div className="text-sm text-slate-500">{g.desc}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between mt-10">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 border-2 border-slate-200 rounded-xl font-semibold text-slate-600 hover:bg-slate-50 transition-all"
                >
                  Back
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-md"
                >
                  Continue <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? 'Generating...' : 'Generate My Roadmap 🚀'}
                </button>
              )}
            </div>
            {error && <p className="mt-4 text-sm font-medium text-red-600">{error}</p>}
          </div>
        </div>
      </div>
    </>
  )
}
