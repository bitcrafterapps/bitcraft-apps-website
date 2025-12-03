import { 
  Shield, 
  Users, 
  Lock, 
  Sparkles, 
  RefreshCw, 
  Trophy,
  Smartphone,
  Fish,
  Gamepad2,
  Calculator,
  Camera,
  Music,
  Menu,
  X,
  ChevronRight,
  ExternalLink,
  Apple,
  Play,
  Star,
  ArrowRight,
  ArrowLeft,
  Github,
  Twitter,
  Linkedin,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Briefcase,
  Bug,
  Check,
  Zap
} from 'lucide-react'

export {
  Shield,
  Users,
  Lock,
  Sparkles,
  RefreshCw,
  Trophy,
  Smartphone,
  Fish,
  Gamepad2,
  Calculator,
  Camera,
  Music,
  Menu,
  X,
  ChevronRight,
  ExternalLink,
  Apple,
  Play,
  Star,
  ArrowRight,
  ArrowLeft,
  Github,
  Twitter,
  Linkedin,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Briefcase,
  Bug,
  Check,
  Zap
}

// Custom BitCraft logo
export const BitCraftLogo = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M10 8C10 6.89543 10.8954 6 12 6H22C27.5228 6 32 10.4772 32 16C32 18.3865 31.1636 20.5829 29.7538 22.3126C31.1531 24.0376 32 26.226 32 28.6C32 31.5823 29.5823 34 26.6 34H12C10.8954 34 10 33.1046 10 32V8Z"
      fill="url(#logo-gradient)"
    />
    <path
      d="M16 12H22C24.2091 12 26 13.7909 26 16C26 18.2091 24.2091 20 22 20H16V12Z"
      fill="white"
      fillOpacity="0.2"
    />
    <path
      d="M16 20H24.6C25.9255 20 27 21.0745 27 22.4V23.6C27 24.9255 25.9255 26 24.6 26H16V20Z"
      fill="white"
      fillOpacity="0.2"
    />
    <defs>
      <linearGradient id="logo-gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#38bdf8" />
        <stop offset="1" stopColor="#6366f1" />
      </linearGradient>
    </defs>
  </svg>
)

// ReefScan app icon
export const ReefScanIcon = ({ className }: { className?: string }) => (
  <img 
    src="/rs-icon.png" 
    alt="ReefScan Icon" 
    className={className}
  />
)

// FishyOnMe app icon
export const FishyOnMeIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect width="80" height="80" rx="18" fill="url(#fishy-gradient)" />
    {/* Water bubbles */}
    <circle cx="20" cy="20" r="3" fill="white" fillOpacity="0.3" />
    <circle cx="60" cy="15" r="2" fill="white" fillOpacity="0.2" />
    <circle cx="15" cy="55" r="2.5" fill="white" fillOpacity="0.25" />
    {/* Fish body */}
    <ellipse cx="40" cy="42" rx="18" ry="12" fill="white" fillOpacity="0.95" />
    {/* Fish tail */}
    <path
      d="M58 42L70 32V52L58 42Z"
      fill="white"
      fillOpacity="0.9"
    />
    {/* Fish eye */}
    <circle cx="28" cy="40" r="4" fill="#0ea5e9" />
    <circle cx="27" cy="39" r="1.5" fill="white" />
    {/* Fish fin */}
    <path
      d="M40 30C40 30 45 22 50 30"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
      opacity="0.8"
    />
    {/* Fish smile */}
    <path
      d="M24 46C26 48 30 48 32 46"
      stroke="#0ea5e9"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
    <defs>
      <linearGradient id="fishy-gradient" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
        <stop stopColor="#06b6d4" />
        <stop offset="1" stopColor="#0284c7" />
      </linearGradient>
    </defs>
  </svg>
)

// MenuMaker app icon
export const MenuMakerIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect width="80" height="80" rx="18" fill="url(#menu-gradient)" />
    {/* Recipe card/menu */}
    <rect x="18" y="15" width="44" height="50" rx="4" fill="white" fillOpacity="0.95" />
    {/* Lines on menu */}
    <rect x="24" y="22" width="24" height="3" rx="1.5" fill="#f97316" fillOpacity="0.8" />
    <rect x="24" y="30" width="32" height="2" rx="1" fill="#9ca3af" fillOpacity="0.5" />
    <rect x="24" y="36" width="28" height="2" rx="1" fill="#9ca3af" fillOpacity="0.5" />
    <rect x="24" y="42" width="30" height="2" rx="1" fill="#9ca3af" fillOpacity="0.5" />
    {/* Checkmarks */}
    <path d="M24 52L27 55L32 49" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="38" y="50" width="18" height="2" rx="1" fill="#9ca3af" fillOpacity="0.5" />
    {/* Fork icon */}
    <path d="M58 20V28M58 32V28M58 28H62M54 20V28H58" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
    <defs>
      <linearGradient id="menu-gradient" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
        <stop stopColor="#f97316" />
        <stop offset="1" stopColor="#ea580c" />
      </linearGradient>
    </defs>
  </svg>
)

