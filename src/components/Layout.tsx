import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './Button'
import {
  BitCraftLogo,
  Menu,
  X,
} from './Icons'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Fixed Background Grid */}
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-20" />
      
      {/* Background mesh for non-home pages */}
      {!isHome && (
        <div className="fixed inset-0 opacity-40 pointer-events-none">
          <div className="absolute inset-0 bg-mesh" />
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900 border-b border-slate-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center gap-3 group">
              <BitCraftLogo className="w-10 h-10 transition-transform group-hover:scale-105" />
              <span className="font-display font-bold text-xl text-white">
                BitCraft
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="/#apps"
                className={`text-sm transition-colors font-medium ${
                  isHome ? 'text-slate-300 hover:text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Apps
              </a>
              <a
                href="/#features"
                className={`text-sm transition-colors font-medium ${
                  isHome ? 'text-slate-300 hover:text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Features
              </a>
              <Link
                to="/contact"
                className={`text-sm transition-colors font-medium ${
                  location.pathname === '/contact' 
                    ? 'text-white' 
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Contact
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-slate-800 bg-slate-900 backdrop-blur-xl"
            >
              <div className="px-4 py-6 space-y-4">
                <a
                  href="/#apps"
                  className="block text-slate-300 hover:text-white py-2 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Apps
                </a>
                <a
                  href="/#features"
                  className="block text-slate-300 hover:text-white py-2 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </a>
                <Link
                  to="/contact"
                  className={`block py-2 font-medium ${
                    location.pathname === '/contact' 
                      ? 'text-white' 
                      : 'text-slate-300 hover:text-white'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      {children}

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center gap-3 mb-4">
                <BitCraftLogo className="w-10 h-10" />
                <span className="font-display font-bold text-xl text-white">BitCraft</span>
              </Link>
              <p className="text-sm text-slate-400 max-w-xs mb-6">
                Building apps people trust. Secure, reliable, and polished mobile
                experiences backed by 25+ years of engineering excellence.
              </p>
              {/* Social Icons - Removed dead links for now */}
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-slate-500">
                Apps
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/apps/reefscan"
                    className="text-sm text-slate-300 hover:text-white transition-colors"
                  >
                    ReefScan
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-slate-500">
                Company
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/contact"
                    className="text-sm text-slate-300 hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="text-sm text-slate-300 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-sm text-slate-300 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} BitCraft. All rights reserved.
            </p>
            <p className="text-xs text-slate-500">
              Crafted with{' '}
              <span className="text-rose-500">♥</span> by engineers who care.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

