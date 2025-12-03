import { motion } from 'framer-motion'
import { Layout } from '../components/Layout'
import { Card } from '../components/Card'
import { Badge } from '../components/Badge'

export default function PrivacyPage() {
  return (
    <Layout>
      <main className="pt-24 lg:pt-32 pb-16 lg:pb-24 relative">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="orb orb-cyan w-[400px] h-[400px] -top-32 -right-32 opacity-30" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <Badge className="mb-4">
              <span className="mr-2">🔒</span>
              Legal
            </Badge>
            <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4 text-white">
              Privacy <span className="text-gradient">Policy</span>
            </h1>
            <p className="text-slate-400">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card variant="glass" className="p-6 lg:p-10 space-y-10">
              <section>
                <h2 className="text-xl font-semibold mb-4 text-white flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 text-sm border border-cyan-500/20">1</span>
                  Information We Collect
                </h2>
                <p className="text-slate-400 leading-relaxed mb-4">
                  At BitCraft, we are committed to protecting your privacy. We collect minimal information necessary to provide our services:
                </p>
                <ul className="space-y-3 ml-11">
                  {[
                    'Device information (operating system, device type)',
                    'App usage analytics (anonymized)',
                    'Crash reports and performance data',
                    'Information you voluntarily provide (support requests, feedback)'
                  ].map((item, i) => (
                    <li key={i} className="text-slate-400 flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4 text-white flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 text-sm border border-cyan-500/20">2</span>
                  How We Use Your Information
                </h2>
                <p className="text-slate-400 leading-relaxed mb-4">
                  We use the collected information to:
                </p>
                <ul className="space-y-3 ml-11">
                  {[
                    'Improve our apps and services',
                    'Fix bugs and enhance performance',
                    'Respond to your inquiries and support requests',
                    'Send important updates about our apps (with your consent)'
                  ].map((item, i) => (
                    <li key={i} className="text-slate-400 flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4 text-white flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 text-sm border border-cyan-500/20">3</span>
                  Data Security
                </h2>
                <p className="text-slate-400 leading-relaxed">
                  We implement industry-standard security measures to protect your data. All data transmission is encrypted using SSL/TLS protocols. We regularly review and update our security practices to ensure your information remains safe.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4 text-white flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 text-sm border border-cyan-500/20">4</span>
                  Third-Party Services
                </h2>
                <p className="text-slate-400 leading-relaxed">
                  Our apps may use third-party services for analytics and crash reporting. These services have their own privacy policies and we encourage you to review them. We only partner with reputable providers who share our commitment to privacy.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4 text-white flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 text-sm border border-cyan-500/20">5</span>
                  Your Rights
                </h2>
                <p className="text-slate-400 leading-relaxed mb-4">
                  You have the right to:
                </p>
                <ul className="space-y-3 ml-11">
                  {[
                    'Access the personal data we hold about you',
                    'Request correction of inaccurate data',
                    'Request deletion of your data',
                    'Opt-out of marketing communications',
                    'Withdraw consent at any time'
                  ].map((item, i) => (
                    <li key={i} className="text-slate-400 flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4 text-white flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 text-sm border border-cyan-500/20">6</span>
                  Children's Privacy
                </h2>
                <p className="text-slate-400 leading-relaxed">
                  Our apps are not directed at children under 13. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4 text-white flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 text-sm border border-cyan-500/20">7</span>
                  Changes to This Policy
                </h2>
                <p className="text-slate-400 leading-relaxed">
                  We may update this privacy policy from time to time. We will notify you of any significant changes through our apps or website. Your continued use of our services after changes indicates acceptance of the updated policy.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4 text-white flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 text-sm border border-cyan-500/20">8</span>
                  Contact Us
                </h2>
                <p className="text-slate-400 leading-relaxed">
                  If you have questions about this privacy policy or our data practices, please contact us at{' '}
                  <a href="mailto:privacy@bitcraft.app" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                    privacy@bitcraft.app
                  </a>
                </p>
              </section>
            </Card>
          </motion.div>
        </div>
      </main>
    </Layout>
  )
}
