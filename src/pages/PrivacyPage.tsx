import { motion } from 'framer-motion'
import { Layout } from '../components/Layout'
import { Card } from '../components/Card'

export default function PrivacyPage() {
  return (
    <Layout>
      <main className="pt-24 lg:pt-32 pb-16 lg:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-display text-3xl lg:text-5xl font-bold mb-4 text-black">
              Privacy <span className="text-gradient">Policy</span>
            </h1>
            <p className="text-slate-600 mb-8">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="p-6 lg:p-8 space-y-8 bg-white">
              <section>
                <h2 className="text-xl font-semibold mb-4 text-black">1. Information We Collect</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  At BitCraft, we are committed to protecting your privacy. We collect minimal information necessary to provide our services:
                </p>
                <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
                  <li>Device information (operating system, device type)</li>
                  <li>App usage analytics (anonymized)</li>
                  <li>Crash reports and performance data</li>
                  <li>Information you voluntarily provide (support requests, feedback)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4 text-black">2. How We Use Your Information</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  We use the collected information to:
                </p>
                <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
                  <li>Improve our apps and services</li>
                  <li>Fix bugs and enhance performance</li>
                  <li>Respond to your inquiries and support requests</li>
                  <li>Send important updates about our apps (with your consent)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4 text-black">3. Data Security</h2>
                <p className="text-slate-600 leading-relaxed">
                  We implement industry-standard security measures to protect your data. All data transmission is encrypted using SSL/TLS protocols. We regularly review and update our security practices to ensure your information remains safe.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4 text-black">4. Third-Party Services</h2>
                <p className="text-slate-600 leading-relaxed">
                  Our apps may use third-party services for analytics and crash reporting. These services have their own privacy policies and we encourage you to review them. We only partner with reputable providers who share our commitment to privacy.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4 text-black">5. Your Rights</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
                  <li>Access the personal data we hold about you</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4 text-black">6. Children's Privacy</h2>
                <p className="text-slate-600 leading-relaxed">
                  Our apps are not directed at children under 13. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4 text-black">7. Changes to This Policy</h2>
                <p className="text-slate-600 leading-relaxed">
                  We may update this privacy policy from time to time. We will notify you of any significant changes through our apps or website. Your continued use of our services after changes indicates acceptance of the updated policy.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4 text-black">8. Contact Us</h2>
                <p className="text-slate-600 leading-relaxed">
                  If you have questions about this privacy policy or our data practices, please contact us at{' '}
                  <a href="mailto:privacy@bitcraft.app" className="text-brand-400 hover:underline">
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

