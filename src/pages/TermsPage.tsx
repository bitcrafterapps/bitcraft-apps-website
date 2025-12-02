import { motion } from 'framer-motion'
import { Layout } from '../components/Layout'
import { Card } from '../components/Card'

export default function TermsPage() {
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
              Terms of <span className="text-gradient">Service</span>
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
                <h2 className="text-xl font-semibold mb-4 text-black">1. Acceptance of Terms</h2>
                <p className="text-slate-600 leading-relaxed">
                  By downloading, installing, or using any BitCraft application ("Apps"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Apps.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4 text-black">2. License Grant</h2>
                <p className="text-slate-600 leading-relaxed">
                  BitCraft grants you a limited, non-exclusive, non-transferable, revocable license to use our Apps for personal, non-commercial purposes. This license does not include the right to modify, distribute, sell, or create derivative works based on our Apps.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4 text-black">3. User Responsibilities</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  When using our Apps, you agree to:
                </p>
                <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
                  <li>Use the Apps only for lawful purposes</li>
                  <li>Not attempt to reverse engineer or decompile the Apps</li>
                  <li>Not use the Apps in any way that could damage or impair them</li>
                  <li>Not use automated systems to access the Apps</li>
                  <li>Comply with all applicable laws and regulations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4 text-black">4. Intellectual Property</h2>
                <p className="text-slate-600 leading-relaxed">
                  All content, features, and functionality of our Apps are owned by BitCraft and are protected by international copyright, trademark, and other intellectual property laws. The BitCraft name, logo, and all related names, logos, and product names are trademarks of BitCraft.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4 text-black">5. In-App Purchases</h2>
                <p className="text-slate-600 leading-relaxed">
                  Some of our Apps may offer in-app purchases. All purchases are final and non-refundable, except as required by applicable law. Prices are subject to change without notice. You are responsible for all charges incurred through your account.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4 text-black">6. Disclaimer of Warranties</h2>
                <p className="text-slate-600 leading-relaxed">
                  Our Apps are provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that the Apps will be uninterrupted, error-free, or free of harmful components. Use the Apps at your own risk.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4 text-black">7. Limitation of Liability</h2>
                <p className="text-slate-600 leading-relaxed">
                  To the maximum extent permitted by law, BitCraft shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our Apps. Our total liability shall not exceed the amount you paid for the App.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4 text-black">8. Updates and Changes</h2>
                <p className="text-slate-600 leading-relaxed">
                  We may update our Apps from time to time to add new features, fix bugs, or improve performance. We reserve the right to modify these Terms at any time. Continued use of the Apps after changes constitutes acceptance of the new Terms.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4 text-black">9. Termination</h2>
                <p className="text-slate-600 leading-relaxed">
                  We may terminate or suspend your access to our Apps at any time, without prior notice, for any reason, including breach of these Terms. Upon termination, your license to use the Apps will immediately cease.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4 text-black">10. Governing Law</h2>
                <p className="text-slate-600 leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which BitCraft operates, without regard to conflict of law principles.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4 text-black">11. Contact</h2>
                <p className="text-slate-600 leading-relaxed">
                  For questions about these Terms of Service, please contact us at{' '}
                  <a href="mailto:legal@bitcraft.app" className="text-brand-400 hover:underline">
                    legal@bitcraft.app
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

