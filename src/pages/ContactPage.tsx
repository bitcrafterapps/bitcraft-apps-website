import { useState } from 'react'
import { Layout } from '../components/Layout'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { Badge } from '../components/Badge'
import { Mail, MapPin, Clock, Send, MessageSquare, Briefcase, Bug } from '../components/Icons'

const contactReasons = [
  { id: 'general', label: 'General Inquiry', icon: MessageSquare },
  { id: 'partnership', label: 'Partnership', icon: Briefcase },
  { id: 'support', label: 'App Support', icon: Bug },
]

export default function ContactPage() {
  const [selectedReason, setSelectedReason] = useState('general')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', { ...formData, reason: selectedReason })
    alert('Thank you for your message! We\'ll get back to you soon.')
  }

  return (
    <Layout>
      <main className="pt-24 lg:pt-32 pb-16 lg:pb-24 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16">
            <Badge className="mb-4">
              <span className="mr-1.5">💬</span>
              Get in Touch
            </Badge>
            <h1 className="font-display text-3xl lg:text-5xl font-bold mb-4 text-black">
              Let's <span className="text-gradient">Talk</span>
            </h1>
            <p className="text-white max-w-xl mx-auto">
              Have a question, feedback, or want to partner with us? We'd love to hear from you.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6 bg-slate-900 text-white border-slate-800">
                <h3 className="font-semibold mb-4 text-white">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-brand-500/20">
                      <Mail className="w-5 h-5 text-brand-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Email</p>
                      <a href="mailto:hello@bitcraft.app" className="text-sm text-white hover:text-brand-400 transition-colors">
                        hello@bitcraft.app
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-brand-500/20">
                      <MapPin className="w-5 h-5 text-brand-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Location</p>
                      <p className="text-sm text-white">Remote-first company</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-brand-500/20">
                      <Clock className="w-5 h-5 text-brand-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Response Time</p>
                      <p className="text-sm text-white">Within 24-48 hours</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-slate-900 text-white border-slate-800">
                <h3 className="font-semibold mb-4 text-white">Quick Links</h3>
                <div className="space-y-3">
                  <a 
                    href="mailto:support@bitcraft.app" 
                    className="block text-sm text-slate-300 hover:text-brand-400 transition-colors"
                  >
                    → App Support
                  </a>
                  <a 
                    href="mailto:partnerships@bitcraft.app" 
                    className="block text-sm text-slate-300 hover:text-brand-400 transition-colors"
                  >
                    → Partnership Inquiries
                  </a>
                  <a 
                    href="mailto:press@bitcraft.app" 
                    className="block text-sm text-slate-300 hover:text-brand-400 transition-colors"
                  >
                    → Press & Media
                  </a>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <Card className="p-6 lg:p-8 bg-slate-900 text-white border-slate-800">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Reason Selection */}
                  <div>
                    <label className="block text-sm font-medium mb-3">What can we help you with?</label>
                    <div className="grid grid-cols-3 gap-3">
                      {contactReasons.map((reason) => (
                        <button
                          key={reason.id}
                          type="button"
                          onClick={() => setSelectedReason(reason.id)}
                          className={`p-3 rounded-xl border text-center transition-all ${
                            selectedReason === reason.id
                              ? 'border-brand-500 bg-brand-500/20 text-brand-400'
                              : 'border-slate-700 text-slate-300 hover:border-brand-500/50'
                          }`}
                        >
                          <reason.icon className="w-5 h-5 mx-auto mb-1" />
                          <span className="text-xs">{reason.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors outline-none"
                      placeholder="Your name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors outline-none"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors outline-none resize-none"
                      placeholder="Tell us what's on your mind..."
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Send Message
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
