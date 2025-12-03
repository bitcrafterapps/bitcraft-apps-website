import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BitCraftLogo,
  Menu,
  X,
} from './Icons'

interface LayoutProps {
  children: React.ReactNode
}

const navLinks = [
  { href: '/#apps', label: 'Apps' },
  { href: '/#features', label: 'Features' },
  { href: '/contact', label: 'Contact', isRoute: true },
]

export function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="min-h-screen bg-dark-900 text-white overflow-hidden">
      {/* Fixed Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid opacity-30" />
        
        {/* Noise texture */}
        <div className="absolute inset-0 bg-noise opacity-[0.02]" />
        
        {/* Gradient orbs - only on non-home pages */}
        {!isHome && (
          <>
            <div className="hero-glow hero-glow-cyan w-[500px] h-[500px] -top-48 -right-24" />
            <div className="hero-glow hero-glow-violet w-[400px] h-[400px] top-1/3 -left-32" />
          </>
        )}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="absolute inset-0 bg-dark-900/80 backdrop-blur-xl border-b border-white/5" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <BitCraftLogo className="w-10 h-10" />
              </motion.div>
              <span className="font-display font-bold text-xl text-white">
                BitCraft
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = link.isRoute 
                  ? location.pathname === link.href
                  : isHome && location.hash === link.href.replace('/', '')

                return link.isRoute ? (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-full ${
                      isActive 
                        ? 'text-white' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute inset-0 bg-white/10 rounded-full"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
                  >
                    {link.label}
                  </a>
                )
              })}
            </div>

            {/* CTA Button - Desktop */}
            <div className="hidden md:block">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-dark-900 hover:shadow-lg hover:shadow-cyan-500/25 transition-all hover:scale-105"
              >
                Get in Touch
              </Link>
            </div>

            {/* Mobile menu button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/5 bg-dark-900/95 backdrop-blur-xl"
            >
              <div className="px-4 py-6 space-y-2">
                {navLinks.map((link) => (
                  link.isRoute ? (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={`block px-4 py-3 rounded-xl font-medium transition-colors ${
                        location.pathname === link.href 
                          ? 'text-white bg-white/10' 
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 font-medium transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  )
                ))}
                
                <div className="pt-4 border-t border-white/5">
                  <Link
                    to="/contact"
                    className="block w-full text-center px-4 py-3 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-cyan-400 text-dark-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get in Touch
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-dark-950/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center gap-3 mb-6">
                <BitCraftLogo className="w-10 h-10" />
                <span className="font-display font-bold text-xl text-white">BitCraft</span>
              </Link>
              <p className="text-slate-400 max-w-sm mb-8 leading-relaxed">
                Building apps people trust. Secure, reliable, and polished mobile
                experiences backed by 25+ years of engineering excellence.
              </p>
              
              {/* Social proof */}
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-dark-600 to-dark-700 border-2 border-dark-900 flex items-center justify-center text-xs text-slate-400"
                    >
                      {['🎯', '⚡', '🛡️', '✨'][i - 1]}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-slate-500">
                  Trusted by thousands
                </span>
              </div>
            </div>

            {/* Apps Links */}
            <div>
              <h4 className="font-semibold text-white mb-6 text-sm uppercase tracking-wider">
                Apps
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    to="/apps/reefscan"
                    className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 group-hover:bg-cyan-500 transition-colors" />
                    ReefScan
                  </Link>
                </li>
                <li>
                  <span className="text-slate-500 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                    Menu Maker
                    <span className="text-xs text-slate-600">(Coming Soon)</span>
                  </span>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-semibold text-white mb-6 text-sm uppercase tracking-wider">
                Company
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    to="/contact"
                    className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 group-hover:bg-cyan-500 transition-colors" />
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 group-hover:bg-cyan-500 transition-colors" />
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 group-hover:bg-cyan-500 transition-colors" />
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} BitCraft. All rights reserved.
            </p>
            <p className="text-sm text-slate-500 flex items-center gap-2">
              Crafted with
              <motion.span 
                className="text-red-500"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ♥
              </motion.span>
              by engineers who care
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
