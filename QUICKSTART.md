# 🚀 Quick Start Guide

Panduan cepat untuk menjalankan Astro Landing Modern project.

---

## ⚡ Super Quick Start (3 Langkah)

```bash
# 1. Create project
npm create astro@latest astro-landing-modern
# Pilih: Empty template, TypeScript Strict, Install dependencies

# 2. Add Svelte
cd astro-landing-modern
npx astro add svelte

# 3. Start dev server
npm run dev
```

Server berjalan di: http://localhost:4321

---

## 📋 Detailed Setup

### Step 1: Create Project

```bash
npm create astro@latest astro-landing-modern
```

**Interactive Prompts:**
```
? How would you like to start your new project?
  → Empty

? Install dependencies?
  → Yes

? Do you plan to write TypeScript?
  → Yes

? How strict should TypeScript be?
  → Strict

? Initialize a new git repository?
  → Yes (optional)
```

### Step 2: Navigate to Project

```bash
cd astro-landing-modern
```

### Step 3: Add Svelte Integration

```bash
npx astro add svelte
```

**Interactive Prompts:**
```
? Continue?
  → Yes

Astro will run the following command:
  npm install @astrojs/svelte svelte

? Continue?
  → Yes

Astro will make the following changes to your config file:
  → Adding svelte to integrations

? Continue?
  → Yes
```

### Step 4: Copy Source Files

Copy semua files dari artifacts ke project folder:

```
src/
├── pages/index.astro
├── components/
│   ├── Hero.astro
│   ├── Features.astro
│   ├── Benefits.astro
│   ├── CTA.astro
│   ├── Footer.astro
│   └── ThemeToggle.svelte
├── layouts/Layout.astro
└── styles/global.css
```

### Step 5: Update Configuration

Copy file configuration:
- `astro.config.mjs`
- `tsconfig.json`
- `package.json` (optional - cek version numbers)

### Step 6: Start Development Server

```bash
npm run dev
```

Output:
```
🚀 astro v4.x.x started in Xms

  ┃ Local    http://localhost:4321/
  ┃ Network  use --host to expose

watching for file changes...
```

### Step 7: Open Browser

Buka http://localhost:4321

✅ Landing page sudah berjalan!

---

## 🏗️ Build untuk Production

### Build Static Site

```bash
npm run build
```

Output:
```
building client (vite) 
✓ built in XXXms

building server (vite) 
✓ built in XXms

generating static routes 
▶ src/pages/index.astro
  └─ /index.html (+XXms)
✓ Completed in XXms.

@astrojs/svelte: Astro is building your optimized build directory.
```

### Preview Production Build

```bash
npm run preview
```

Server running at: http://localhost:4321

### Check Build Output

```bash
ls -lh dist/

# Output example:
# dist/
# ├── index.html              (~30kb)
# ├── _astro/
# │   ├── ThemeToggle.hash.js (~2kb)
# │   └── global.hash.css     (~5kb)
# └── favicon.svg
```

---

## 🔍 Verify Installation

### Check Package Versions

```bash
npm list astro @astrojs/svelte svelte
```

Expected output:
```
astro-landing-modern@1.0.0
├── @astrojs/svelte@5.x.x
├── astro@4.x.x
└── svelte@4.x.x
```

### Run Type Check

```bash
npm run astro check
```

Expected output:
```
Result (X file): 
- 0 errors
- 0 warnings
- 0 hints
```

---

## 🧪 Test Features

### 1. Test Static Rendering
- Buka http://localhost:4321
- View page source (Ctrl+U / Cmd+Option+U)
- ✅ Semua content should be di HTML source

### 2. Test Theme Toggle Island
- Click theme toggle di pojok kanan atas
- ✅ Theme should switch light/dark
- ✅ Preference saved di localStorage

### 3. Test Performance
- Open DevTools > Lighthouse
- Run audit
- ✅ Expect 100 scores di semua metrics

### 4. Test Build Output
```bash
npm run build
npm run preview
```
- ✅ Production build should load instantly
- ✅ No console errors

---

## 🛠️ Troubleshooting

### Issue: Port 4321 Already in Use

```bash
# Kill process on port 4321
lsof -ti:4321 | xargs kill -9

# Or use different port
npm run dev -- --port 3000
```

### Issue: Module Not Found Error

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: TypeScript Errors

```bash
# Check TypeScript version
npm list typescript

# Update if needed
npm install -D typescript@latest
```

### Issue: Svelte Not Working

```bash
# Re-add Svelte integration
npx astro add svelte --yes
```

### Issue: CSS Not Loading

```bash
# Check if global.css exists
ls src/styles/global.css

# Verify import in Layout.astro
cat src/layouts/Layout.astro | grep global.css
```

---

## 📊 Performance Checklist

### Development Mode
- [ ] HMR working (edit file, see instant change)
- [ ] No console errors
- [ ] Theme toggle functional
- [ ] All sections rendering

### Production Build
- [ ] Build completes without errors
- [ ] HTML contains all content
- [ ] CSS properly scoped
- [ ] JS only for ThemeToggle

### Lighthouse Audit
- [ ] Performance: 90+
- [ ] Accessibility: 90+
- [ ] Best Practices: 90+
- [ ] SEO: 90+

---

## 🔧 Customization Quick Tips

### Change Colors

Edit `src/styles/global.css`:
```css
:root {
  --color-primary: #3b82f6;    /* Change this */
  --color-accent: #8b5cf6;     /* And this */
}
```

### Add New Section

1. Create component:
```bash
touch src/components/Testimonials.astro
```

2. Import in `index.astro`:
```astro
import Testimonials from '../components/Testimonials.astro';
```

3. Add to page:
```astro
<Testimonials />
```

### Add Another Island

1. Create Svelte component:
```bash
touch src/components/Newsletter.svelte
```

2. Import with client directive:
```astro
import Newsletter from '../components/Newsletter.svelte';
<Newsletter client:visible />
```

---

## 📦 Deploy to Production

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy
```

### GitHub Pages
```bash
# Add to package.json
"build": "astro build",
"deploy": "npm run build && gh-pages -d dist"
```

### Cloudflare Pages
```bash
# Connect repo to Cloudflare Pages
# Build command: npm run build
# Output directory: dist
```

---

## 🎓 Next Steps

### Extend Project
- [ ] Add blog section dengan Markdown
- [ ] Implement view transitions
- [ ] Add more interactive islands
- [ ] Integrate CMS (Contentful, Sanity)

### Learn More
- [ ] Read Astro docs: https://docs.astro.build
- [ ] Explore Astro themes: https://astro.build/themes
- [ ] Join Discord: https://astro.build/chat

### Performance Optimization
- [ ] Add image optimization (@astrojs/image)
- [ ] Implement sitemap (@astrojs/sitemap)
- [ ] Add RSS feed (@astrojs/rss)
- [ ] Enable compression

---

## 💬 Get Help

### Resources
- 📖 **Docs**: https://docs.astro.build
- 💬 **Discord**: https://astro.build/chat
- 🐦 **Twitter**: @astrodotbuild
- 🔍 **GitHub Issues**: https://github.com/withastro/astro/issues

### Common Questions

**Q: Why Astro over Next.js?**  
A: Astro untuk content sites, Next.js untuk app-like experiences.

**Q: Can I use React components?**  
A: Yes! `npx astro add react` then use with client directives.

**Q: How to share state between islands?**  
A: Use nanostores or URL params. Islands are intentionally isolated.

**Q: Is Astro production-ready?**  
A: Absolutely! Used by many companies in production.

---

**Happy building with Astro! 🚀🏝️**