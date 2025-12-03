import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Badge } from '../components/Badge'
import { appsByCategory } from '../data/apps'
import {
  Shield,
  Users,
  Lock,
  Sparkles,
  RefreshCw,
  Trophy,
  ChevronRight,
  Apple,
  Star,
  ArrowRight,
  X,
} from '../components/Icons'

// ============================================
// IMAGE MODAL
// ============================================
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
        className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-3 rounded-full backdrop-blur-md"
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

// ============================================
// APP GALLERY (Sliding panel)
// ============================================
const AppGallery = ({ 
  images, 
  isOpen, 
  onClose 
}: { 
  images: string[]
  isOpen: boolean
  onClose: () => void 
}) => {
  const [index, setIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  useEffect(() => {
    if (!isOpen || isZoomed) return
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [images.length, isOpen, isZoomed])

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute right-0 top-0 bottom-0 w-[280px] lg:w-[320px] z-20 flex items-center"
          >
            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                onClose()
              }}
              className="absolute -left-3 top-1/2 -translate-y-1/2 z-30 w-6 h-12 bg-dark-700 hover:bg-dark-600 border border-dark-600 rounded-l-lg flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            
            <div 
              className="relative w-full h-[85%] rounded-2xl overflow-hidden cursor-zoom-in bg-dark-800/90 backdrop-blur-sm border border-dark-700"
        onClick={() => setIsZoomed(true)}
      >
         <AnimatePresence mode="wait">
           <motion.img
             key={images[index]}
             src={images[index]}
                  initial={{ opacity: 0, scale: 1.05 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0 }}
             transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full object-contain p-3"
             alt="App screenshot"
           />
         </AnimatePresence>
         
         {/* Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
           {images.map((_, i) => (
             <button
               key={i}
               onClick={(e) => {
                 e.stopPropagation()
                 setIndex(i)
               }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === index 
                        ? 'bg-cyan-400 w-5 shadow-lg shadow-cyan-400/50' 
                        : 'bg-white/30 hover:bg-white/50'
               }`}
               aria-label={`Go to slide ${i + 1}`}
             />
           ))}
         </div>
      </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isZoomed && (
          <ImageModal 
            src={images[index]} 
            onClose={() => setIsZoomed(false)} 
          />
        )}
      </AnimatePresence>
    </>
  )
}

// ============================================
// APP CARD with interactive gallery
// ============================================
const AppCardWithGallery = ({ 
  app, 
  index: cardIndex 
}: { 
  app: typeof appsByCategory.apps[0]
  index: number 
}) => {
  const [showGallery, setShowGallery] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: cardIndex * 0.1 }}
    >
      <Card
        variant={app.comingSoon ? 'default' : 'gradient'}
        className={`group p-6 lg:p-8 overflow-hidden relative ${
          app.comingSoon ? 'opacity-80' : ''
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          {/* App Icon - Click/Hover to show gallery */}
          <div className="flex-shrink-0 relative">
  <motion.div
              className={`cursor-pointer relative ${app.images && app.images.length > 0 ? 'group/icon' : ''}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (app.images && app.images.length > 0) {
                  setShowGallery(!showGallery)
                }
              }}
            >
              <app.icon className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl shadow-xl shadow-dark-950" />
              
              {/* Hover indicator for gallery */}
              {app.images && app.images.length > 0 && (
                <div className={`absolute inset-0 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  showGallery 
                    ? 'bg-cyan-500/20 border-2 border-cyan-500' 
                    : 'bg-dark-900/0 group-hover/icon:bg-dark-900/60'
                }`}>
                  <motion.div 
                    className={`text-white text-xs font-medium px-2 py-1 rounded-full bg-dark-900/80 backdrop-blur-sm transition-opacity ${
                      showGallery ? 'opacity-100' : 'opacity-0 group-hover/icon:opacity-100'
                    }`}
                  >
                    {showGallery ? 'Hide' : 'Preview'}
                  </motion.div>
                </div>
              )}
            </motion.div>
          </div>
          
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
              <Badge variant={app.comingSoon ? 'secondary' : 'success'}>
                {app.status}
              </Badge>
              {!app.comingSoon && (
                <Badge variant="outline" className="gap-1">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  4.9
                </Badge>
              )}
            </div>
            
            <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
              {app.name}
            </h3>
            <p className="text-cyan-400 font-medium mb-3">
              {app.tagline}
            </p>
            <p className="text-slate-400 mb-5 leading-relaxed">
              {app.description}
            </p>
            
            {/* Features */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-6">
              {app.features.slice(0, 4).map((feature) => (
                <span
                  key={feature}
                  className="text-xs px-3 py-1.5 rounded-full bg-dark-700/50 text-slate-300 border border-dark-600/50"
                >
                  {feature}
                </span>
              ))}
            </div>
            
            {/* Actions */}
            {!app.comingSoon ? (
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Button size="sm" className="gap-2 w-full sm:w-auto">
                  <Apple className="w-4 h-4" />
                  App Store
                </Button>
                <Button variant="outline" size="sm" className="gap-2 w-full sm:w-auto" asChild>
                  <Link to={`/apps/${app.id}`}>
                    Learn More
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            ) : (
              <Button variant="secondary" size="sm" className="gap-2">
                Get Notified
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Sliding Gallery */}
        {app.images && app.images.length > 0 && (
          <AppGallery 
            images={app.images} 
            isOpen={showGallery}
            onClose={() => setShowGallery(false)}
          />
        )}
      </Card>
    </motion.div>
  )
}

// ============================================
// PHONE MOCKUP
// ============================================
const PhoneMockup = ({ images }: { images?: string[] }) => {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    if (!images || images.length <= 1) return
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [images])

  return (
    <motion.div 
      className="phone-mockup relative"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      {/* Glow effect behind phone */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[100px]" />
        <div className="absolute top-1/4 right-0 w-[200px] h-[200px] bg-violet-500/15 rounded-full blur-[80px]" />
      </div>
      
      <div className="phone-screen">
        {images && images.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.img
              key={images[currentImage]}
              src={images[currentImage]}
              alt="App screenshot"
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-dark-800 to-dark-900 flex items-center justify-center">
            <span className="text-4xl">📱</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ============================================
// BENTO FEATURES
// ============================================
const features = [
  {
    icon: Shield,
    title: 'Engineering Excellence',
    description: '25+ years of full-stack development experience delivering rock-solid, high-performance applications.',
    gradient: 'from-cyan-500/20 to-cyan-600/5',
    span: 'md:col-span-2',
    iconColor: 'text-cyan-400',
    iconBg: 'bg-cyan-500/10 border-cyan-500/20',
  },
  {
    icon: Users,
    title: 'User-First Design',
    description: 'Every interaction crafted for clarity and delight.',
    gradient: 'from-violet-500/20 to-violet-600/5',
    span: '',
    iconColor: 'text-violet-400',
    iconBg: 'bg-violet-500/10 border-violet-500/20',
  },
  {
    icon: Lock,
    title: 'Secure & Reliable',
    description: 'Industry-leading security practices.',
    gradient: 'from-emerald-500/20 to-emerald-600/5',
    span: '',
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10 border-emerald-500/20',
  },
  {
    icon: Sparkles,
    title: 'Polished UI/UX',
    description: 'Beautiful visuals and smooth interactions define every product.',
    gradient: 'from-orange-500/20 to-orange-600/5',
    span: '',
    iconColor: 'text-orange-400',
    iconBg: 'bg-orange-500/10 border-orange-500/20',
  },
  {
    icon: RefreshCw,
    title: 'Continuous Updates',
    description: 'Regular improvements based on real-world feedback.',
    gradient: 'from-rose-500/20 to-rose-600/5',
    span: '',
    iconColor: 'text-rose-400',
    iconBg: 'bg-rose-500/10 border-rose-500/20',
  },
  {
    icon: Trophy,
    title: 'Proven Track Record',
    description: 'Successful products across multiple categories—always focusing on quality and user satisfaction.',
    gradient: 'from-amber-500/20 to-amber-600/5',
    span: 'md:col-span-2',
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-500/10 border-amber-500/20',
  },
]

// ============================================
// STATS DATA
// ============================================
const stats = [
  { value: '25+', label: 'Years Experience', icon: '🎯' },
  { value: '100%', label: 'User Focused', icon: '💎' },
  { value: '5★', label: 'App Quality', icon: '⭐' },
  { value: '24/7', label: 'Support Ready', icon: '🛡️' },
]

// ============================================
// MAIN COMPONENT
// ============================================
export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Get featured app (ReefScan)
  const featuredApp = appsByCategory.apps.find(app => app.id === 'reefscan')

  return (
    <Layout>
      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section 
        ref={heroRef} 
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Animated gradient orbs */}
          <motion.div 
            className="orb orb-cyan w-[600px] h-[600px] -top-32 -right-32"
            style={{ y: backgroundY }}
          />
          <motion.div 
            className="orb orb-violet w-[500px] h-[500px] top-1/3 -left-48"
            style={{ y: backgroundY }}
          />
          <motion.div 
            className="orb orb-orange w-[300px] h-[300px] bottom-0 right-1/4"
            style={{ y: backgroundY }}
          />
          
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-grid opacity-20" />
          
          {/* Radial gradient overlay */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-dark-900/50 to-dark-900" />
        </div>

        {/* Main Hero Content */}
          <motion.div 
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32"
          style={{ opacity }}
          >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Badge variant="glow" className="mb-6">
                  <motion.span 
                    className="mr-2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    ✦
                  </motion.span>
                  25+ Years of Engineering Excellence
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-display text-hero font-bold tracking-tight mb-6"
              >
                <span className="block text-white">Exceptional Apps.</span>
                <span className="block">
                    <span className="text-gradient">Built With Precision.</span>
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg lg:text-xl text-slate-400 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
              >
                BitCraft builds secure, reliable, and polished mobile apps for iOS and
                Android. Backed by decades of full-stack engineering experience.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12"
              >
                <Button size="lg" className="group w-full sm:w-auto" asChild>
                  <a href="#apps">
                    Explore Our Apps
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
                  <Link to="/contact">Partner With Us</Link>
                </Button>
              </motion.div>

              {/* Stats Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="glass rounded-2xl p-6"
              >
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {stats.map((stat, index) => (
                      <motion.div 
                        key={stat.label} 
                        className="text-center"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <div className="text-2xl mb-1">{stat.icon}</div>
                      <div className="text-2xl lg:text-3xl font-bold text-gradient mb-1">
                          {stat.value}
                        </div>
                      <div className="text-xs text-slate-500 uppercase tracking-wider">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Phone Mockup (hidden on mobile) */}
            <div className="hidden lg:flex justify-center">
              <PhoneMockup images={featuredApp?.images} />
            </div>
          </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          >
            <motion.div
            className="flex flex-col items-center gap-2 text-slate-500"
            animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
            <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center pt-2">
                <motion.div 
                className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
                animate={{ y: [0, 12, 0], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          </motion.div>
        </section>

      {/* ============================================
          APPS SECTION
          ============================================ */}
      <section id="apps" className="py-20 lg:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            className="text-center mb-16"
            >
            <Badge variant="coral" className="mb-4">
              <span className="mr-2">📱</span>
                Our Portfolio
              </Badge>
            <h2 className="font-display text-display font-bold mb-4">
                Apps We've <span className="text-gradient">Crafted</span>
              </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-lg">
                Quality mobile experiences designed for real users. Each app reflects
                our commitment to excellence.
              </p>
            </motion.div>

            {/* Apps Category */}
          <div className="mb-16">
            <h3 className="text-xl font-semibold text-white mb-8 flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                📱
              </span>
              Apps
              </h3>
            
            <div className="space-y-8">
                {appsByCategory.apps.map((app, index) => (
                <AppCardWithGallery key={app.id} app={app} index={index} />
                ))}
              </div>
            </div>

            {/* Games Category */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-8 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20">
                  🎮
                </span>
                Games
              </h3>
              
              <div className="space-y-8">
                {appsByCategory.games.map((app, index) => (
                  <AppCardWithGallery key={app.id} app={app} index={index} />
                ))}
              </div>
            </div>
          </div>
        </section>

      {/* ============================================
          FEATURES - BENTO GRID
          ============================================ */}
        <section id="features" className="py-20 lg:py-32 relative">
        {/* Background accent */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[150px]" />
        </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4">
              <span className="mr-2">⭐</span>
                Why Choose BitCraft
              </Badge>
            <h2 className="font-display text-display font-bold mb-4">
              World-Class Engineering
                <br />
                <span className="text-gradient">Meets Beautiful Design</span>
              </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-lg">
                We don't just build apps—we craft experiences that users love and
                businesses trust.
              </p>
            </motion.div>

          {/* Features Grid - Mobile Optimized */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={feature.span}
              >
                <Card 
                  variant="glass"
                  className={`h-full p-4 sm:p-5 lg:p-6 group hover:border-cyan-500/20 bg-gradient-to-br ${feature.gradient}`}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${feature.iconBg} border flex items-center justify-center`}>
                      <feature.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${feature.iconColor}`} />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base sm:text-lg text-white mb-1 group-hover:text-cyan-400 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          </div>
        </section>

      {/* ============================================
          CTA SECTION
          ============================================ */}
        <section className="py-20 lg:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
            <Card 
              variant="gradient"
              className="relative overflow-hidden p-8 lg:p-16 text-center"
            >
              {/* Background glow */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-500/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-violet-500/15 rounded-full blur-[100px]" />
              </div>

              <div className="relative z-10">
                <Badge variant="coral" className="mb-6">
                  <span className="mr-2">🚀</span>
                    Ready to Build?
                  </Badge>

                <h2 className="font-display text-3xl lg:text-5xl font-bold mb-6 text-white">
                    Let's Create Something
                    <br />
                    <span className="text-gradient-warm">Extraordinary Together</span>
                  </h2>

                <p className="text-slate-400 max-w-xl mx-auto mb-10 text-lg">
                    Whether you're looking to download our apps or partner with us on
                    your next project, we'd love to hear from you.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button size="lg" className="group w-full sm:w-auto" asChild>
                      <a href="#apps">
                        Download Our Apps
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    </Button>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
                      <Link to="/contact">Partner With BitCraft</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
    </Layout>
  )
}
