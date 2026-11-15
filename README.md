# Ananya Desai: Interactive Portfolio

Built with Next.js 14 (App Router), TypeScript, Tailwind CSS and Framer Motion.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Features

- Interactive terminal in the hero (`help`, `about`, `skills`, `projects`, `education`, `certs`, `contact`, `clear`)
- Command palette (Ctrl/Cmd + K) for navigation and quick actions
- Animated neural-network canvas background that reacts to the cursor
- Light and dark themes, remembered between visits
- Filterable skills, project detail modals with animated diagrams, education timeline
- Respects reduced-motion settings and is keyboard accessible

## Edit content

All text lives in `lib/data.ts`. Change it there and every section updates.

## Deploy

Push to GitHub and import into Vercel or Netlify. No environment variables needed.
