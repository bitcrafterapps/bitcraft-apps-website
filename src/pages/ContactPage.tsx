import { useState } from 'react'
import { motion } from 'framer-motion'
import { Layout } from '../components/Layout'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Badge } from '../components/Badge'

const contactReasons = [
  { id: 'partnership', label: 'Partnership Inquiry', icon: '🤝' },
  { id: 'support', label: 'App Support', icon: '💬' },
  { id: 'feedback', label: 'Feedback', icon: '💡' },
  { id: 'other', label: 'Other', icon: '📝' },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <Layout>
      <section className="pt-24 pb-20 lg:pt-32 lg:pb-32 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="orb orb-cyan w-[500px] h-[500px] -top-48 -right-48" />
          <div className="orb orb-violet w-[400px] h-[400px] bottom-0 -left-48" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4">
              <span className="mr-2">💬</span>
              Get in Touch
            </Badge>
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
              Let's <span className="text-gradient">Connect</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-lg mx-auto">
              Have a question, idea, or want to partner with us? We'd love to hear from you.
            </p>
          </motion.div>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card variant="gradient" className="p-8 lg:p-12 text-center">
                <div className="text-6xl mb-6">🎉</div>
                <h2 className="font-display text-2xl font-bold text-white mb-4">
                  Message Sent!
                </h2>
                <p className="text-slate-400 mb-8 max-w-md mx-auto">
                  Thanks for reaching out! We'll get back to you as soon as possible, usually within 24-48 hours.
                </p>
                <Button onClick={() => setIsSubmitted(false)}>
                  Send Another Message
                </Button>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card variant="glass" className="p-6 lg:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Reason Selection */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-3">
                      What brings you here?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {contactReasons.map((reason) => (
                        <label
                          key={reason.id}
                          className={`
                            flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all
                            ${formData.reason === reason.id 
                              ? 'bg-cyan-500/10 border-cyan-500/50' 
                              : 'bg-dark-800/50 border-dark-700 hover:border-dark-600'
                            }
                            border
                          `}
                        >
                          <input
                            type="radio"
                            name="reason"
                            value={reason.id}
                            checked={formData.reason === reason.id}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <span className="text-2xl">{reason.icon}</span>
                          <span className={`text-sm font-medium ${
                            formData.reason === reason.id ? 'text-cyan-400' : 'text-slate-300'
                          }`}>
                            {reason.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Name & Email */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-dark-800/50 border border-dark-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-dark-800/50 border border-dark-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-dark-800/50 border border-dark-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none"
                      placeholder="Tell us what's on your mind..."
                    />
                  </div>

                  {/* Submit */}
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-dark-900 border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </form>
              </Card>
            </motion.div>
          )}

          {/* Additional info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12 text-center"
          >
            <p className="text-slate-500 text-sm">
              We typically respond within 24-48 hours during business days.
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  )
}
