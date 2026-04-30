import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import FeaturesSection from '../components/FeaturesSection'
import HowItWorksSection from '../components/HowItWorksSection'
import PricingSection from '../components/PricingSection'
import Footer from '../components/Footer'
import { Mail, MapPin, Phone } from 'lucide-react'

function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Get In Touch</h2>
          <p className="text-xl text-slate-600">Have questions? We'd love to hear from you.</p>
        </div>
        <div className="bg-white rounded-3xl shadow-xl p-10 border border-blue-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-6">Send us a message</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                />
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                />
                <textarea
                  rows={4}
                  placeholder="Your message..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-md"
                >
                  Send Message
                </button>
              </form>
            </div>
            <div className="flex flex-col justify-center gap-6">
              {[
                { icon: Mail, label: 'Email', value: 'hello@pathforgeai.com' },
                { icon: MapPin, label: 'Location', value: 'Cairo, Egypt' },
                { icon: Phone, label: 'Phone', value: '+20 100 000 0000' },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm text-slate-500">{item.label}</div>
                      <div className="font-semibold text-slate-800">{item.value}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <ContactSection />
      <Footer />
    </>
  )
}
