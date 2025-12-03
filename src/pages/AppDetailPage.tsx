import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import { useState } from 'react'
import { Layout } from '../components/Layout'
import { Button } from '../components/Button'
import { Badge } from '../components/Badge'
import { Card } from '../components/Card'
import { apps } from '../data/apps'
import { ArrowRight, Apple, Star, ChevronRight, X, ArrowLeft } from '../components/Icons'

// Image Modal
const ImageModal = ({ src, onClose }: { src: string; onClose: () => void }) => {
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-dark-950/95 backdrop-blur-xl p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-3 rounded-full"
      >
        <X className="w-6 h-6" />
      </button>
      <motion.img
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        src={src}
        className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </motion.div>,
    document.body
  )
}

export default function AppDetailPage() {
  const { appId } = useParams()
  const app = apps.find((a) => a.id === appId)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  if (!app) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 pt-20">
          <div className="text-6xl mb-6">🔍</div>
          <h1 className="text-3xl font-bold mb-4 text-white">App Not Found</h1>
          <p className="text-slate-400 mb-8 max-w-md">
            The app you're looking for doesn't exist or may have been removed.
          </p>
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return Home
            </Link>
          </Button>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="orb orb-cyan w-[500px] h-[500px] -top-32 -right-32" />
          <div className="orb orb-violet w-[400px] h-[400px] top-1/2 -left-48" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* App Info */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-center lg:text-left"
            >
              <div className="flex justify-center lg:justify-start mb-6">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <app.icon className="w-28 h-28 lg:w-36 lg:h-36 rounded-3xl shadow-2xl shadow-dark-950" />
                </motion.div>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                <Badge variant={app.comingSoon ? 'secondary' : 'success'}>
                  {app.status}
                </Badge>
                {!app.comingSoon && (
                  <Badge variant="outline" className="gap-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    4.9 Rating
                  </Badge>
                )}
              </div>

              <h1 className="font-display text-4xl lg:text-6xl font-bold text-white mb-4">
                {app.name}
              </h1>
              <p className="text-xl text-cyan-400 font-medium mb-4">
                {app.tagline}
              </p>
              <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                {app.longDescription || app.description}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                {!app.comingSoon ? (
                  <>
                    <Button size="lg" className="w-full sm:w-auto gap-2">
                      <Apple className="w-5 h-5" />
                      Download on App Store
                    </Button>
                    <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2">
                      Read Docs
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </>
                ) : (
                  <Button size="lg" className="gap-2">
                    Notify Me
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </motion.div>

            {/* Hero Image */}
            {app.images && app.images.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex justify-center"
              >
                <div className="phone-mockup">
                  <div 
                    className="phone-screen cursor-zoom-in"
                    onClick={() => setSelectedImage(app.images![0])}
                  >
                    <img 
                      src={app.images[0]} 
                      alt={`${app.name} Screenshot`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Glow behind phone */}
                  <div className="absolute inset-0 -z-10">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-cyan-500/20 rounded-full blur-[100px]" />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 lg:py-32 bg-dark-850/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4">
              <span className="mr-2">✨</span>
              Features
            </Badge>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
              Key Features
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Designed to make your life easier and your experience better.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {app.features.map((feature, idx) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="h-full p-6 group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/10 flex items-center justify-center mb-4 text-xl font-bold text-cyan-400 border border-cyan-500/20">
                    {idx + 1}
                  </div>
                  <h3 className="font-semibold text-lg text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {feature}
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Powerful capability integrated seamlessly into the app experience.
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {app.images && app.images.length > 0 && (
        <section className="py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-white">
                App Screenshots
              </h2>
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {app.images.map((img, idx) => (
                <motion.div
                  key={img}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="aspect-[9/19.5] rounded-2xl overflow-hidden border border-dark-700 cursor-zoom-in group"
                  onClick={() => setSelectedImage(img)}
                >
                  <img 
                    src={img} 
                    alt={`Screenshot ${idx + 1}`} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Card variant="gradient" className="p-8 lg:p-12 text-center relative overflow-hidden">
              {/* Background glow */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-cyan-500/20 rounded-full blur-[80px]" />
              </div>
              
              <div className="relative z-10">
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-6">
                  Ready to get started?
                </h2>
                <p className="text-slate-400 mb-8 text-lg max-w-md mx-auto">
                  Join thousands of users who trust {app.name} for their daily needs.
                </p>
                <Button size="lg" className="gap-2">
                  <Apple className="w-5 h-5" />
                  Download Now
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <ImageModal 
            src={selectedImage} 
            onClose={() => setSelectedImage(null)} 
          />
        )}
      </AnimatePresence>
    </Layout>
  )
}
