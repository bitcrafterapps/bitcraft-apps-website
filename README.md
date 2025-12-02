# BitCraft Apps Landing Page

A beautiful, modern landing page for BitCraft — Building Apps People Trust.

## Tech Stack

- **React 19** with TypeScript
- **Vite** for blazing fast development
- **Tailwind CSS** for styling
- **Framer Motion** for smooth animations
- **shadcn/ui** inspired components

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Design System

This project uses a custom design system inspired by the parent design system in `/design`. Key features:

- **Dark theme** by default with ocean/reef-inspired brand colors
- **Glass morphism** effects for cards and navigation
- **Mesh gradient** backgrounds for depth
- **Custom animations** including floating, pulsing, and shimmer effects

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   └── Icons.tsx
├── lib/
│   └── utils.ts        # Utility functions (cn helper)
├── App.tsx             # Main landing page
├── main.tsx            # Entry point
└── index.css           # Global styles & Tailwind config
```

## Features

- ✨ Hero section with animated gradient orbs
- 📱 Apps showcase with ReefScan featured app
- ⭐ Feature grid highlighting BitCraft values
- 🚀 Call-to-action section
- 📍 Responsive footer with social links

## License

© BitCraft. All rights reserved.

