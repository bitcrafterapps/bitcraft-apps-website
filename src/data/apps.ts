import {
  ReefScanIcon,
  FishyOnMeIcon,
  MenuMakerIcon,
} from '../components/Icons'

export type AppCategory = 'apps' | 'games'

export interface App {
  id: string
  name: string
  tagline: string
  description: string
  longDescription?: string
  icon: React.ComponentType<{ className?: string }>
  status: string
  features: string[]
  images?: string[]
  comingSoon: boolean
  downloadLink?: string
  externalLink?: string
  category: AppCategory
}

export const apps: App[] = [
  {
    id: 'reefscan',
    name: 'ReefScan',
    tagline: 'Beyond the Glass',
    description:
      'AI-powered scanner for your reef aquarium. Identifies fish, corals, pests, and problems—then provides solutions to keep your reef thriving.',
    longDescription: `
      ReefScan is the ultimate companion for reef aquarium enthusiasts. Using advanced AI technology, it instantly identifies marine life, diagnoses pests and diseases, and provides expert care recommendations.
      
      Whether you're a beginner trying to identify a new coral fragment or an expert dealing with a sudden algae outbreak, ReefScan puts marine biologist knowledge right in your pocket.
    `,
    icon: ReefScanIcon,
    status: 'Featured',
    features: ['Fish & Coral ID', 'Pest Detection', 'Care Guides', 'Problem Solver'],
    images: ['/rs-home.jpg', '/rs-scan.jpg', '/rs-scan1.jpg', '/rs-scan2.jpg', '/rs-tanks.jpg'],
    comingSoon: false,
    downloadLink: '#',
    externalLink: 'https://reef-scan.vercel.app',
    category: 'apps',
  },
  {
    id: 'menumaker',
    name: 'Menu Maker',
    tagline: 'Cooking made effortless',
    description:
      'Scan the items in your fridge or pantry, and Menu Maker instantly creates personalized recipes based on what you already have.',
    longDescription: `
      Menu Maker makes cooking effortless.
      
      Just scan the items in your fridge or pantry, and Menu Maker instantly creates personalized recipes based on what you already have. Whether you're eating healthy, cooking for your family, avoiding certain ingredients, or following a specific diet, Menu Maker adapts to your tastes, habits, and lifestyle.
      
      Save time, reduce food waste, and enjoy delicious meals tailored just for you—without the stress of planning.
    `,
    icon: MenuMakerIcon,
    status: 'Coming Soon',
    features: ['Scan Ingredients', 'Custom Recipes', 'Diet Friendly', 'Reduce Waste'],
    comingSoon: true,
    category: 'apps',
  },
  {
    id: 'fishyonme',
    name: 'FishyOnMe',
    tagline: 'Dive into the ultimate underwater adventure!',
    description:
      'Build your dream tank, care for adorable fish, and discover rare aquatic creatures as you create the most vibrant underwater world on mobile.',
    longDescription: `
      Dive into Fishy On Me, the ultimate underwater adventure!
      
      Build your dream tank, care for adorable fish, and discover rare aquatic creatures as you create the most vibrant underwater world on mobile. Level up, unlock new species, customize your tank with decorations, and complete fun challenges as your fish grow, explore, and interact with their environment. Simple to play, relaxing to watch, and endlessly rewarding—Fishy On Me brings the joy of underwater life right to your screen.
    `,
    icon: FishyOnMeIcon,
    status: 'Coming Soon',
    features: ['Build Tanks', 'Collect Fish', 'Unlock Species', 'Fun Challenges'],
    comingSoon: true,
    externalLink: 'https://fishy-on-me.vercel.app',
    category: 'games',
  },
]

export const appsByCategory = {
  apps: apps.filter(app => app.category === 'apps'),
  games: apps.filter(app => app.category === 'games'),
}

