# 🍎 macOS Interface — Web Simulation

A **pixel-perfect macOS desktop** experience built entirely for the browser. No frameworks, no build step — just clean HTML, CSS, and JavaScript delivering an authentic Apple experience on the web.

> 🖥️ **Want to run this as a native Windows desktop app?**
> Check out the [Desktop App Build Guide](DESKTOP_APP.md) to learn how to compile and run the `.exe`!

---

## ✨ Features

- **Finder** — Full multi-window Finder with sidebar, grid/list view, file navigation
- **Apple Music** — Streaming music player with search, library, playlists, queue, lyrics
- **Settings** — Complete System Settings with Appearance, Wi-Fi, Bluetooth, Wallpaper, and 20+ views
- **Dynamic Island** — Interactive Dynamic Island with notifications and media controls
- **Lock Screen** — Animated lock screen with Touch ID simulation
- **Control Center** — Slide-out Control Center with toggles, brightness, volume
- **Dock** — Magnification dock with bounce animations and app launching
- **Menu Bar** — Clock, battery, Wi-Fi, Spotlight search
- **Custom Cursor** — Paper-plane pointer that auto-switches black/white by background
- **Dark Mode** — Full system-wide dark/light/auto theme switching
- **Liquid Glass Toggles** — macOS-style physics-based toggle animations

---

## 🚀 Deployment

### Option 1 — Netlify (Recommended)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

1. Fork this repo
2. Connect to Netlify → **New site from Git**
3. Build command: *(leave empty)*
4. Publish directory: `.`
5. Click **Deploy** — done!

### Option 2 — Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Fork this repo
2. Import into Vercel
3. No build configuration needed
4. Click **Deploy**

### Option 3 — GitHub Pages
1. Push to GitHub
2. Go to **Settings → Pages**
3. Set source branch to `main`, folder to `/ (root)`
4. Your site is live at `https://<username>.github.io/<repo>`

### Option 4 — Cloudflare Pages
1. Connect your GitHub repo in Cloudflare Pages
2. Build command: *(leave empty)*
3. Output directory: `.`

---

## 💻 Local Development

**Requires Python 3 or Node.js**

```bash
# Clone
git clone https://github.com/yourusername/macos-interface.git
cd macos-interface

# Run with Python (built-in)
python -m http.server 3000

# OR run with Node.js serve
npm run preview

# Open
open http://localhost:3000
```

---

## 🏗 Tech Stack

| Technology | Usage |
|---|---|
| Vanilla HTML / CSS / JS | Core runtime — no framework |
| React 18 (CDN) | Apple Music app component |
| Tailwind CSS (CDN) | Utility classes |
| Font Awesome 6 | Icons |
| Google Fonts (SF Pro) | Typography |
| Babel Standalone | JSX transpilation (CDN) |

---

## 📁 Project Structure

```
macos-interface/
├── index.html          # Main entry point
├── script.js           # Core macOS interface logic (~210KB)
├── finder.js           # Finder app (~106KB)
├── island.js           # Dynamic Island logic
├── settings_engine.js  # Settings system engine
├── style.css           # Global styles
├── apps/
│   └── Music/          # Apple Music app (React)
│       ├── MusicApp.jsx
│       ├── MusicApp.css
│       └── mockData.js
├── images/
│   ├── Icons/          # App icons
│   ├── Wallpapers/     # Desktop wallpapers
│   ├── Music_Alums/    # Music album art
│   └── settings/       # Settings assets
├── netlify.toml        # Netlify deployment config
├── vercel.json         # Vercel deployment config
└── _headers            # Cloudflare Pages / cache headers
```

---

## 📄 License

MIT © macOS Interface
