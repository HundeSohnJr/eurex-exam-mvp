# Eurex Trader Exam MVP

Mobile-First PWA-ready Lern-App für das Eurex Trader Exam.

## 📱 Design Principles

### Mobile-First Strategy
- **Default (no prefix)**: Smartphone Styles
- **`md:`**: Tablet (768px+)
- **`lg:`**: Desktop (1024px+)

### Touch Targets
- **Minimum**: 44px
- **Recommended**: 48px
- All clickable elements follow this standard

### Dark Mode
- **Background**: `slate-900` (#0f172a)
- **Cards**: `slate-800` (#1e293b)
- **Text**: `slate-100` (light gray)

### SafeArea Support
- PWA-ready with `viewport-fit=cover`
- Automatic padding for Notch/Home Bar
- Uses `env(safe-area-inset-*)` CSS variables

## 🏗️ Tech Stack

- **React 18** + **Vite**
- **TypeScript**
- **Tailwind CSS** + Typography Plugin
- **Zustand** (State Management)
- **Lucide React** (Icons)

## 📁 Project Structure

```
src/
├── components/     # React Components
├── hooks/         # Custom React Hooks
├── store/         # Zustand Stores
│   └── examStore.ts
├── types/         # TypeScript Types
│   └── exam.ts
├── utils/         # Helper Functions
│   └── cn.ts      # Tailwind class merger
├── data/          # Exam Questions (JSON)
│   └── questions.json
├── App.tsx        # Main App Component
└── main.tsx       # Entry Point
```

## 🚀 Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📊 Exam Data

- **105 Questions** total
- **2 Chapters**: Rules & Regulations (15 Q), Trading Functionality (20 Q)
- **3 Question Types**: True/False, Multiple Choice, Single Choice
- **20 Minutes** duration
- **75%** pass threshold

## 🎨 Design System Components

### Utility Classes

- `.container-mobile` - Mobile-first container with responsive max-width
- `.touch-target` - 48px minimum height with flex centering
- `.card` - Dark mode card with slate-800 background
- `.safe-bottom` - Safe area padding for bottom navigation

### Button Variants

- `.btn-primary` - Blue action buttons
- `.btn-secondary` - Gray secondary buttons
- `.btn-success` - Green success buttons
- `.btn-danger` - Red danger/delete buttons

All buttons include:
- 48px minimum touch target
- Active state scale animation
- Hover states for desktop

## 📦 Dependencies

```json
{
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "lucide-react": "latest",
    "clsx": "latest",
    "tailwind-merge": "latest",
    "zustand": "latest"
  },
  "devDependencies": {
    "tailwindcss": "latest",
    "postcss": "latest",
    "autoprefixer": "latest",
    "@tailwindcss/typography": "latest",
    "typescript": "latest",
    "vite": "latest"
  }
}
```

## 🔧 Configuration

### Tailwind Config
- Typography plugin enabled for clean table rendering
- Custom slate-850 color
- Mobile-first breakpoints (md: 768px, lg: 1024px)

### TypeScript
- Strict mode enabled
- Verbatim module syntax for clean imports

### Vite
- Fast HMR (Hot Module Replacement)
- Optimized for React + TypeScript

## 📱 PWA Features (Ready)

- Viewport fit cover for fullscreen
- Theme color for status bar
- Apple mobile web app capable
- Status bar style configured
- Ready for manifest.json and service worker

## 🎯 Next Steps

1. Build Question Component
2. Implement Exam Navigation
3. Add Timer Functionality
4. Create Results/Score View
5. Add Practice Mode
6. Implement Progress Tracking
7. Add PWA Manifest
8. Add Service Worker for Offline Support

---

**Version**: 1.0.0  
**Last Updated**: January 2026
