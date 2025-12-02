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

// Image Modal Component
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

// App Gallery Component
const AppGallery = ({ images }: { images: string[] }) => {
  const [index, setIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  useEffect(() => {
    if (isZoomed) return

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [images.length, isZoomed])

  return (
    <>
      <div 
        className="relative w-full h-full rounded-xl overflow-hidden group-hover:shadow-lg transition-shadow duration-500 cursor-zoom-in"
        onClick={() => setIsZoomed(true)}
      >
         <AnimatePresence mode="wait">
           {/* Main Image - Fitted */}
           <motion.img
             key={images[index]}
             src={images[index]}
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0 }}
             transition={{ duration: 0.5 }}
             className="absolute inset-0 w-full h-full object-contain p-4 z-10"
             alt="App screenshot"
           />
         </AnimatePresence>
         
         {/* Dots */}
         <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
           {images.map((_, i) => (
             <button
               key={i}
               onClick={(e) => {
                 e.preventDefault()
                 e.stopPropagation()
                 setIndex(i)
               }}
               className={`w-2 h-2 rounded-full transition-all duration-300 shadow-sm ${
                 i === index ? 'bg-brand-500 w-4' : 'bg-slate-300 hover:bg-brand-400'
               }`}
               aria-label={`Go to slide ${i + 1}`}
             />
           ))}
         </div>
      </div>

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

// Floating geometric shapes for parallax
const FloatingShape = ({ 
  className, 
  delay = 0 
}: { 
  className?: string
  delay?: number 
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ 
      opacity: 1, 
      scale: 1,
      y: [0, -15, 0],
    }}
    transition={{ 
      opacity: { duration: 0.8, delay },
      scale: { duration: 0.8, delay },
      y: { duration: 4 + delay, repeat: Infinity, ease: "easeInOut" }
    }}
  />
)

// Feature data
const features = [
  {
    icon: Shield,
    title: 'Engineering You Can Trust',
    description:
      'With over 25 years of full-stack development experience, BitCraft delivers rock-solid, high-performance applications built on proven engineering principles.',
    gradient: 'from-brand-500/20 to-brand-600/10',
  },
  {
    icon: Users,
    title: 'User-First Design',
    description:
      'Every screen, interaction, and detail is crafted for clarity, ease of use, and enjoyment—ensuring our apps feel intuitive from the very first tap.',
    gradient: 'from-violet-500/20 to-violet-600/10',
  },
  {
    icon: Lock,
    title: 'Secure & Reliable',
    description:
      'We follow industry-leading security and QA practices, ensuring stable performance, safe data handling, and dependable long-term operation.',
    gradient: 'from-emerald-500/20 to-emerald-600/10',
  },
  {
    icon: Sparkles,
    title: 'Polished, Modern UI/UX',
    description:
      'Beautiful visuals, smooth interactions, and clean layouts define every BitCraft product—because great design builds trust.',
    gradient: 'from-amber-500/20 to-amber-600/10',
  },
  {
    icon: RefreshCw,
    title: 'Continuous Updates & Support',
    description:
      "Our commitment doesn't stop at launch. We refine, improve, and enhance our apps regularly based on real-world feedback and evolving platform standards.",
    gradient: 'from-rose-500/20 to-rose-600/10',
  },
  {
    icon: Trophy,
    title: 'Proven Track Record',
    description:
      'From mobile games to utility apps, BitCraft has delivered successful products across multiple categories—always focusing on quality, performance, and user satisfaction.',
    gradient: 'from-cyan-500/20 to-cyan-600/10',
  },
]

// Apps data
// Now imported from ../data/apps

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null)
  
  // Parallax scroll transforms
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  
  // Different parallax speeds for floating elements
  const floatY1 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const floatY3 = useTransform(scrollYProgress, [0, 1], ["0%", "45%"])
  const floatRotate = useTransform(scrollYProgress, [0, 1], [0, 45])

  return (
    <Layout>
      <main>
        {/* Hero Section with Parallax - Fits in Viewport */}
        <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-white">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/hero-bg.png" 
              alt="Technology Background" 
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white" />
          </div>

          {/* Multi-layer gradient background with parallax */}
          <motion.div 
            className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-30"
            style={{ y: backgroundY }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-50/30 to-white" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(56,189,248,0.25),transparent)]" />
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_60%_40%_at_80%_100%,rgba(139,92,246,0.15),transparent)]" />
          </motion.div>

          {/* Animated mesh gradient overlay */}
          <div className="absolute inset-0 opacity-50 pointer-events-none">
            <div className="absolute inset-0 bg-mesh" />
          </div>

          {/* Floating geometric shapes */}
          <motion.div 
            className="absolute inset-0 pointer-events-none overflow-hidden"
            style={{ y: floatY1 }}
          >
            <FloatingShape 
              className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-brand-500/25 to-brand-600/10 blur-[80px]"
              delay={0}
            />
            <FloatingShape 
              className="absolute top-1/4 -left-20 w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-violet-500/15 to-purple-600/5 blur-[60px]"
              delay={0.2}
            />
          </motion.div>

          {/* Geometric decorations */}
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            style={{ y: floatY3, rotate: floatRotate }}
          >
            <div className="absolute top-24 right-[12%] w-16 h-16 border border-brand-500/20 rounded-2xl rotate-12 hidden lg:block" />
            <div className="absolute top-32 right-[9%] w-6 h-6 bg-brand-500/10 rounded-lg rotate-45 hidden lg:block" />
            <div className="absolute bottom-1/4 left-[8%] w-12 h-12 border border-violet-500/15 rounded-full hidden lg:block" />
          </motion.div>

          {/* Code-like floating elements */}
          <motion.div className="absolute inset-0 pointer-events-none" style={{ y: floatY1 }}>
            <motion.div 
              className="absolute top-28 left-[6%] font-mono text-xs text-brand-500/25 hidden xl:block"
              animate={{ opacity: [0.2, 0.35, 0.2] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {'<BitCraft />'}
            </motion.div>
            <motion.div 
              className="absolute bottom-1/3 right-[6%] font-mono text-xs text-violet-500/20 hidden xl:block"
              animate={{ opacity: [0.15, 0.3, 0.15] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            >
              {'{ quality: 100 }'}
            </motion.div>
          </motion.div>

          {/* Main hero content */}
          <motion.div 
            className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24"
            style={{ y: textY, opacity, scale }}
          >
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="text-center"
            >
              <motion.div variants={fadeInUp}>
                <Badge className="mb-4 backdrop-blur-sm">
                  <motion.span 
                    className="mr-1.5 inline-block"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    ✦
                  </motion.span>
                  25+ Years of Engineering Excellence
                </Badge>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1] mb-4 lg:mb-6 text-slate-900"
              >
                <span className="block">Exceptional Apps.</span>
                <span className="block">
                  <span className="relative inline-block">
                    <span className="text-gradient">Built With Precision.</span>
                    <motion.span 
                      className="absolute -bottom-1 left-0 h-0.5 lg:h-1 bg-gradient-to-r from-brand-500 to-brand-400 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                    />
                  </span>
                </span>
                <span className="block text-slate-900">Trusted Worldwide.</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-base lg:text-lg text-slate-600 max-w-2xl mx-auto mb-6 lg:mb-8 leading-relaxed font-medium"
              >
                BitCraft builds secure, reliable, and polished mobile apps for iOS and
                Android. Backed by decades of full-stack engineering experience.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8 lg:mb-10"
              >
                <Button size="lg" className="group" asChild>
                  <a href="#apps">
                    Explore Our Apps
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
                <Button variant="secondary" size="lg" asChild>
                  <Link to="/contact">Partner With Us</Link>
                </Button>
              </motion.div>

              {/* Stats - Compact */}
              <motion.div variants={fadeInUp}>
                <div className="glass rounded-2xl p-4 lg:p-6 max-w-3xl mx-auto">
                  <div className="grid grid-cols-4 gap-4 lg:gap-8">
                    {[
                      { value: '25+', label: 'Years' },
                      { value: '100%', label: 'User Focus' },
                      { value: '5★', label: 'Quality' },
                      { value: '24/7', label: 'Support' },
                    ].map((stat, index) => (
                      <motion.div 
                        key={stat.label} 
                        className="text-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                      >
                        <div className="text-xl lg:text-2xl font-bold text-gradient">
                          {stat.value}
                        </div>
                        <div className="text-[10px] lg:text-xs text-muted-foreground uppercase tracking-wider">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <motion.div
              className="flex flex-col items-center gap-1 text-muted-foreground"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-[10px] uppercase tracking-wider">Scroll</span>
              <div className="w-5 h-8 border border-muted-foreground/30 rounded-full flex justify-center pt-1.5">
                <motion.div 
                  className="w-1 h-1 bg-brand-400 rounded-full"
                  animate={{ y: [0, 10, 0], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Apps Section */}
        <section id="apps" className="py-12 sm:py-20 lg:py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-12 lg:mb-16"
            >
              <Badge variant="coral" className="mb-3 sm:mb-4">
                <span className="mr-1.5">📱</span>
                Our Portfolio
              </Badge>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-5xl font-bold mb-3 sm:mb-4">
                Apps We've <span className="text-gradient">Crafted</span>
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto px-2">
                Quality mobile experiences designed for real users. Each app reflects
                our commitment to excellence.
              </p>
            </motion.div>

            {/* Apps Category */}
            <div className="mb-8 sm:mb-12">
              <h3 className="text-lg sm:text-xl font-semibold text-slate-300 mb-4 sm:mb-6 flex items-center gap-2">
                <span className="text-brand-400">📱</span> Apps
              </h3>
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                {appsByCategory.apps.map((app, index) => (
                  <motion.div
                    key={app.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="md:col-span-2"
                  >
                    <Card
                      className={`group p-4 sm:p-6 lg:p-8 app-card-hover h-full overflow-hidden bg-slate-900 border-slate-800 text-white ${
                        app.comingSoon ? 'opacity-90' : ''
                      }`}
                    >
                      <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-8 items-center">
                        <div className="order-2 md:order-1">
                          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5">
                            <div className="flex-shrink-0">
                              <app.icon className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl shadow-lg" />
                            </div>
                            <div className="flex-1 min-w-0 text-center sm:text-left">
                              <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                                <Badge
                                  variant={app.comingSoon ? 'secondary' : 'default'}
                                  className="text-2xs"
                                >
                                  {app.status}
                                </Badge>
                              </div>
                              <h3 className="font-display text-lg sm:text-xl font-bold mb-1 group-hover:text-brand-400 transition-colors">
                                {app.name}
                              </h3>
                              <p className="text-sm text-brand-400 font-medium mb-2 sm:mb-3">
                                {app.tagline}
                              </p>
                              <p className="text-xs sm:text-sm text-slate-400 mb-3 sm:mb-4 line-clamp-3 sm:line-clamp-2">
                                {app.description}
                              </p>
                              <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 sm:gap-2 mb-4 sm:mb-5">
                                {app.features.slice(0, 4).map((feature) => (
                                  <span
                                    key={feature}
                                    className="text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-slate-800 text-slate-300"
                                  >
                                    {feature}
                                  </span>
                                ))}
                              </div>
                              {!app.comingSoon ? (
                                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                                  <Button size="sm" className="gap-2 w-full sm:w-auto text-xs sm:text-sm">
                                    <Apple className="w-4 h-4" />
                                    App Store
                                  </Button>
                                  <Button variant="outline" size="sm" className="gap-2 w-full sm:w-auto text-xs sm:text-sm" asChild>
                                    <Link to={`/apps/${app.id}`}>
                                      <Star className="w-4 h-4" />
                                      Learn More
                                    </Link>
                                  </Button>
                                </div>
                              ) : (
                                <Button variant="secondary" size="sm" className="gap-2 w-full sm:w-auto">
                                  Get Notified
                                  <ChevronRight className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="order-1 md:order-2 w-full h-[120px] sm:h-[180px] md:h-full md:min-h-[300px]">
                          {app.images && app.images.length > 0 ? (
                            <AppGallery images={app.images} />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center rounded-xl bg-slate-800/50 border border-slate-700/50">
                              <div className="text-center p-4">
                                <div className="text-3xl sm:text-4xl mb-2">🚀</div>
                                <p className="text-slate-400 text-sm sm:text-base font-medium">Coming Soon</p>
                                <p className="text-slate-500 text-xs mt-1">Stay tuned for updates</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Games Category */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-300 mb-4 sm:mb-6 flex items-center gap-2">
                <span className="text-brand-400">🎮</span> Games
              </h3>
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                {appsByCategory.games.map((app, index) => (
                  <motion.div
                    key={app.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="md:col-span-2"
                  >
                    <Card
                      className={`group p-4 sm:p-6 lg:p-8 app-card-hover h-full overflow-hidden bg-slate-900 border-slate-800 text-white ${
                        app.comingSoon ? 'opacity-90' : ''
                      }`}
                    >
                      <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-8 items-center">
                        <div className="order-2 md:order-1">
                          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5">
                            <div className="flex-shrink-0">
                              <app.icon className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl shadow-lg" />
                            </div>
                            <div className="flex-1 min-w-0 text-center sm:text-left">
                              <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                                <Badge
                                  variant={app.comingSoon ? 'secondary' : 'default'}
                                  className="text-2xs"
                                >
                                  {app.status}
                                </Badge>
                              </div>
                              <h3 className="font-display text-lg sm:text-xl font-bold mb-1 group-hover:text-brand-400 transition-colors">
                                {app.name}
                              </h3>
                              <p className="text-sm text-brand-400 font-medium mb-2 sm:mb-3">
                                {app.tagline}
                              </p>
                              <p className="text-xs sm:text-sm text-slate-400 mb-3 sm:mb-4 line-clamp-3 sm:line-clamp-2">
                                {app.description}
                              </p>
                              <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 sm:gap-2 mb-4 sm:mb-5">
                                {app.features.slice(0, 4).map((feature) => (
                                  <span
                                    key={feature}
                                    className="text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-slate-800 text-slate-300"
                                  >
                                    {feature}
                                  </span>
                                ))}
                              </div>
                              {!app.comingSoon ? (
                                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                                  <Button size="sm" className="gap-2 w-full sm:w-auto text-xs sm:text-sm">
                                    <Apple className="w-4 h-4" />
                                    App Store
                                  </Button>
                                  <Button variant="outline" size="sm" className="gap-2 w-full sm:w-auto text-xs sm:text-sm" asChild>
                                    <Link to={`/apps/${app.id}`}>
                                      <Star className="w-4 h-4" />
                                      Learn More
                                    </Link>
                                  </Button>
                                </div>
                              ) : (
                                <Button variant="secondary" size="sm" className="gap-2 w-full sm:w-auto">
                                  Get Notified
                                  <ChevronRight className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="order-1 md:order-2 w-full h-[120px] sm:h-[180px] md:h-full md:min-h-[300px]">
                          {app.images && app.images.length > 0 ? (
                            <AppGallery images={app.images} />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center rounded-xl bg-slate-800/50 border border-slate-700/50">
                              <div className="text-center p-4">
                                <div className="text-3xl sm:text-4xl mb-2">🎮</div>
                                <p className="text-slate-400 text-sm sm:text-base font-medium">Coming Soon</p>
                                <p className="text-slate-500 text-xs mt-1">Stay tuned for updates</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 lg:py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-100/40 to-transparent pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4">
                <span className="mr-1.5">⭐</span>
                Why Choose BitCraft
              </Badge>
              <h2 className="font-display text-3xl lg:text-5xl font-bold mb-4">
                Where World-Class Engineering
                <br />
                <span className="text-gradient">Meets Beautiful Design</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                We don't just build apps—we craft experiences that users love and
                businesses trust.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="group h-full p-6 hover:border-brand-500/30 transition-all duration-300 bg-slate-900 border-slate-800 text-white">
                    <div
                      className={`feature-icon mb-5 bg-gradient-to-br ${feature.gradient}`}
                    >
                      <feature.icon className="w-6 h-6 text-brand-400" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-brand-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <Card className="relative overflow-hidden p-8 lg:p-16 text-center bg-slate-900 border-slate-800 shadow-2xl">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-brand-500/20 rounded-full blur-[100px]" />

                <div className="relative">
                  <Badge variant="coral" className="mb-6 bg-coral-500/10 text-coral-300 border-coral-500/20">
                    <span className="mr-1.5">🚀</span>
                    Ready to Build?
                  </Badge>

                  <h2 className="font-display text-3xl lg:text-5xl font-bold mb-4 text-white">
                    Let's Create Something
                    <br />
                    <span className="text-gradient-warm">Extraordinary Together</span>
                  </h2>

                  <p className="text-slate-400 max-w-xl mx-auto mb-8 text-lg">
                    Whether you're looking to download our apps or partner with us on
                    your next project, we'd love to hear from you.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button size="lg" className="group" asChild>
                      <a href="#apps">
                        Download Our Apps
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <Link to="/contact">Partner With BitCraft</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>
    </Layout>
  )
}

