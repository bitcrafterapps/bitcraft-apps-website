import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import { useState, useEffect } from 'react'
import { Layout } from '../components/Layout'
import { Button } from '../components/Button'
import { Badge } from '../components/Badge'
import { Card } from '../components/Card'
import { apps } from '../data/apps'
import { ArrowRight, Apple, Star, ChevronRight, X } from '../components/Icons'

// Reuse ImageModal from HomePage or refactor to shared component. 
// For now, duplicating to keep pages self-contained as per request "reusable page"
const ImageModal = ({ src, onClose }: { src: string; onClose: () => void }) => {
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors bg-black/20 p-2 rounded-full backdrop-blur-md"
      >
        <X className="w-8 h-8" />
      </button>
      <motion.img
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        src={src}
        className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
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
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-2xl font-bold mb-4 text-slate-900">App Not Found</h1>
          <p className="text-muted-foreground mb-8">The app you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/">Return Home</Link>
          </Button>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="pt-20 pb-10 lg:pt-24 lg:pb-16">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 lg:mb-16 min-h-[80vh] flex items-center">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 w-full">
            {/* App Icon & Info */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1 text-center lg:text-left"
            >
              <div className="flex justify-center lg:justify-start mb-6">
                <app.icon className="w-24 h-24 lg:w-32 lg:h-32 rounded-[1.5rem] shadow-2xl shadow-brand-500/20" />
              </div>
              
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                <Badge variant={app.comingSoon ? 'secondary' : 'default'}>
                  {app.status}
                </Badge>
                {!app.comingSoon && (
                  <Badge variant="outline" className="gap-1">
                    <Star className="w-3 h-3 fill-brand-400 text-brand-400" />
                    4.9 Rating
                  </Badge>
                )}
              </div>

              <h1 className="font-display text-3xl lg:text-5xl font-bold text-black mb-3">
                {app.name}
              </h1>
              <p className="text-lg text-brand-600 font-medium mb-4">
                {app.tagline}
              </p>
              <p className="text-base text-brand-700 leading-relaxed mb-6 max-w-2xl mx-auto lg:mx-0 font-medium">
                {app.longDescription || app.description}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                {!app.comingSoon ? (
                  <>
                    <Button size="lg" className="w-full sm:w-auto gap-2">
                      <Apple className="w-5 h-5" />
                      Download on App Store
                    </Button>
                    <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2">
                      Read Docs <ArrowRight className="w-4 h-4" />
                    </Button>
                  </>
                ) : (
                  <Button size="lg" className="gap-2">
                    Notify Me <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </motion.div>

            {/* Hero Image / Gallery Preview */}
            {app.images && app.images.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex-1 w-full max-w-[280px] lg:max-w-sm mx-auto"
              >
                <div 
                  className="relative aspect-[9/19.5] rounded-[2rem] border-4 border-slate-900 overflow-hidden shadow-2xl bg-slate-900"
                  onClick={() => setSelectedImage(app.images![0])}
                >
                  <img 
                    src={app.images[0]} 
                    alt={`${app.name} Screenshot`}
                    className="w-full h-full object-cover cursor-zoom-in hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <section className="bg-slate-50 py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl font-bold text-black mb-4">Key Features</h2>
              <p className="text-brand-600 max-w-2xl mx-auto font-medium">
                Designed to make your life easier and your experience better.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {app.features.map((feature, idx) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="p-6 h-full hover:shadow-md transition-shadow bg-white">
                    <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center mb-4 text-brand-700 font-bold">
                      {idx + 1}
                    </div>
                    <h3 className="font-semibold text-lg text-black mb-2">{feature}</h3>
                    <p className="text-brand-600 text-sm font-medium">
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
              <h2 className="font-display text-3xl font-bold text-black mb-12 text-center">
                App Screenshots
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {app.images.map((img, idx) => (
                  <motion.div
                    key={img}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="aspect-[9/19.5] rounded-2xl overflow-hidden shadow-lg border border-slate-200 cursor-zoom-in"
                    onClick={() => setSelectedImage(img)}
                  >
                    <img 
                      src={img} 
                      alt={`Screenshot ${idx + 1}`} 
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-20">
          <Card className="p-12 bg-slate-900 border-slate-800 text-white">
            <h2 className="font-display text-3xl font-bold mb-6">Ready to get started?</h2>
            <p className="text-brand-300 mb-8 text-lg font-medium">
              Join thousands of users who trust {app.name} for their daily needs.
            </p>
            <Button size="lg" className="gap-2">
              <Apple className="w-5 h-5" />
              Download Now
            </Button>
          </Card>
        </section>
      </div>

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

