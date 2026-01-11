# 🚀 Astro Cheat Sheet

Quick reference untuk Astro Island Architecture development.

---

## 📦 Project Setup

```bash
# Create new Astro project
npm create astro@latest

# Add integrations
npx astro add svelte
npx astro add react
npx astro add tailwind
npx astro add sitemap

# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build
npm run astro check      # Type check
```

---

## 🎯 Component Basics

### .astro Component

```astro
---
// Component Script (runs at BUILD TIME)
interface Props {
  title: string;
  count?: number;
}

const { title, count = 0 } = Astro.props;

// Fetch data at build time
const data = await fetch('https://api.example.com/data').then(r => r.json());
---

<!-- Template (pure HTML) -->
<div class="component">
  <h1>{title}</h1>
  <p>Count: {count}</p>
  
  {data.map(item => (
    <div>{item.name}</div>
  ))}
</div>

<!-- Scoped Styles -->
<style>
  .component {
    padding: 1rem;
  }
  
  h1 {
    color: var(--primary);
  }
</style>

<!-- Component Scripts (runs in BROWSER) -->
<script>
  console.log('This runs in browser');
  document.querySelector('h1').addEventListener('click', () => {
    alert('Clicked!');
  });
</script>
```

### Import & Use Components

```astro
---
import Header from '../components/Header.astro';
import Card from '../components/Card.astro';
---

<Header title="My Site" />

<Card title="Card 1" />
<Card title="Card 2" count={5} />
```

---

## 🏝️ Island Components

### Client Directives

```astro
---
import Counter from './Counter.svelte';
import Modal from './Modal.jsx';
import Chart from './Chart.vue';
---

<!-- Load immediately (critical) -->
<Counter client:load />

<!-- Load when browser idle (non-critical) -->
<Modal client:idle />

<!-- Load when visible (below-fold) -->
<Chart client:visible />

<!-- Load based on media query -->
<MobileMenu client:media="(max-width: 768px)" />

<!-- Never hydrate (server only) -->
<StaticComponent />

<!-- Client-side only (no SSR) -->
<BrowserOnlyWidget client:only="react" />
```

### Svelte Island Example

```svelte
<!-- Counter.svelte -->
<script>
  let count = 0;
  
  function increment() {
    count += 1;
  }
</script>

<button on:click={increment}>
  Count: {count}
</button>

<style>
  button {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
  }
</style>
```

### React Island Example

```jsx
// Modal.jsx
import { useState } from 'react';

export default function Modal() {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <button onClick={() => setOpen(true)}>Open Modal</button>
      {open && (
        <div className="modal">
          <h2>Modal Content</h2>
          <button onClick={() => setOpen(false)}>Close</button>
        </div>
      )}
    </>
  );
}
```

---

## 📄 Pages & Routing

### File-Based Routing

```
src/pages/
├── index.astro           → /
├── about.astro           → /about
├── blog/
│   ├── index.astro       → /blog
│   └── [slug].astro      → /blog/post-1
└── api/
    └── newsletter.ts     → /api/newsletter
```

### Dynamic Routes

```astro
---
// src/pages/blog/[slug].astro

export async function getStaticPaths() {
  const posts = await fetch('https://api.example.com/posts')
    .then(r => r.json());
  
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
---

<article>
  <h1>{post.title}</h1>
  <div>{post.content}</div>
</article>
```

---

## 🎨 Layouts

### Base Layout

```astro
---
// src/layouts/Base.astro
interface Props {
  title: string;
  description?: string;
}

const { title, description = '' } = Astro.props;
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content={description}>
  <title>{title}</title>
</head>
<body>
  <slot />
</body>
</html>
```

### Using Layouts

```astro
---
// src/pages/index.astro
import Base from '../layouts/Base.astro';
---

<Base title="Home" description="Welcome to my site">
  <h1>Welcome!</h1>
  <p>Content here</p>
</Base>
```

---

## 🔧 Configuration

### astro.config.mjs

```javascript
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  // Integrations
  integrations: [svelte(), react(), tailwind()],
  
  // Site URL for sitemap
  site: 'https://example.com',
  
  // Base path
  base: '/my-app',
  
  // Output mode
  output: 'static', // or 'server' or 'hybrid'
  
  // Build options
  build: {
    inlineStylesheets: 'auto',
  },
  
  // Markdown options
  markdown: {
    shikiConfig: {
      theme: 'dracula',
    },
  },
  
  // Vite options
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "src/styles/variables";'
        }
      }
    }
  }
});
```

---

## 🎭 CSS & Styling

### Scoped Styles

```astro
<div class="card">
  <h2>Title</h2>
</div>

<style>
  /* Scoped to this component only */
  .card {
    padding: 1rem;
  }
  
  h2 {
    color: blue;
  }
</style>
```

### Global Styles

```astro
<style is:global>
  /* Applies globally */
  body {
    margin: 0;
    font-family: system-ui;
  }
</style>
```

### CSS Variables

```css
/* src/styles/global.css */
:root {
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 2rem;
}

[data-theme="dark"] {
  --color-primary: #60a5fa;
}
```

### Import Global CSS

```astro
---
import '../styles/global.css';
---
```

---

## 🗂️ Data Fetching

### Build-Time Data (SSG)

```astro
---
// Runs once at build time
const posts = await fetch('https://api.example.com/posts')
  .then(r => r.json());
---

<ul>
  {posts.map(post => (
    <li>{post.title}</li>
  ))}
</ul>
```

### API Routes

```typescript
// src/pages/api/hello.ts
export async function GET() {
  return new Response(JSON.stringify({
    message: 'Hello World'
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export async function POST({ request }) {
  const data = await request.json();
  
  // Process data
  
  return new Response(JSON.stringify({
    success: true
  }));
}
```

---

## 🧩 Slots

### Basic Slot

```astro
---
// Card.astro
---
<div class="card">
  <slot />
</div>
```

```astro
<Card>
  <h2>Title</h2>
  <p>Content</p>
</Card>
```

### Named Slots

```astro
---
// Modal.astro
---
<div class="modal">
  <header>
    <slot name="header" />
  </header>
  
  <main>
    <slot />
  </main>
  
  <footer>
    <slot name="footer" />
  </footer>
</div>
```

```astro
<Modal>
  <h2 slot="header">Modal Title</h2>
  
  <p>Main content</p>
  
  <button slot="footer">Close</button>
</Modal>
```

### Fallback Content

```astro
<div class="card">
  <slot>
    <p>Default content if no slot provided</p>
  </slot>
</div>
```

---

## 📸 Assets

### Images

```astro
---
import { Image } from 'astro:assets';
import logo from '../assets/logo.png';
---

<!-- Optimized image -->
<Image src={logo} alt="Logo" width={200} height={200} />

<!-- Remote image -->
<Image 
  src="https://example.com/image.jpg"
  alt="Remote"
  width={400}
  height={300}
/>
```

### Public Assets

```astro
<!-- Files in public/ folder -->
<img src="/favicon.svg" alt="Icon">
<link rel="stylesheet" href="/custom.css">
```

---

## 🎯 TypeScript

### Component Props

```astro
---
interface Props {
  title: string;
  count?: number;
  items: Array<{ id: number; name: string }>;
}

const { title, count = 0, items } = Astro.props;
---

<h1>{title}</h1>
<p>{count}</p>
<ul>
  {items.map(item => <li key={item.id}>{item.name}</li>)}
</ul>
```

### Type Imports

```astro
---
import type { CollectionEntry } from 'astro:content';

type Post = CollectionEntry<'blog'>;

const posts: Post[] = await getCollection('blog');
---
```

---

## 📝 Content Collections

### Define Schema

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
    draft: z.boolean().default(false),
  })
});

export const collections = { blog };
```

### Create Content

```markdown
---
# src/content/blog/post-1.md
title: "My First Post"
date: 2024-01-15
tags: ["astro", "web"]
---

# Hello World

This is my first blog post!
```

### Query Content

```astro
---
import { getCollection } from 'astro:content';

const posts = await getCollection('blog', ({ data }) => {
  return data.draft !== true;
});
---

{posts.map(post => (
  <article>
    <h2>{post.data.title}</h2>
    <time>{post.data.date.toDateString()}</time>
  </article>
))}
```

---

## 🔍 SEO

### Meta Tags

```astro
---
const { title, description, image } = Astro.props;
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---

<head>
  <title>{title}</title>
  <meta name="description" content={description}>
  <link rel="canonical" href={canonicalURL}>
  
  <!-- Open Graph -->
  <meta property="og:title" content={title}>
  <meta property="og:description" content={description}>
  <meta property="og:image" content={image}>
  <meta property="og:url" content={canonicalURL}>
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content={title}>
  <meta name="twitter:description" content={description}>
  <meta name="twitter:image" content={image}>
</head>
```

### Sitemap

```bash
npx astro add sitemap
```

```javascript
// astro.config.mjs
export default defineConfig({
  site: 'https://example.com',
  integrations: [sitemap()],
});
```

---

## 🚀 Performance Tips

### 1. Prefer Static Components

```astro
<!-- ✅ Good: Static -->
<Header />
<Hero />
<Features />

<!-- ❌ Avoid: Unnecessary island -->
<Header client:load />
```

### 2. Lazy Load Islands

```astro
<!-- ✅ Good: Lazy load below-fold -->
<Comments client:visible />
<Newsletter client:idle />

<!-- ❌ Avoid: Load everything immediately -->
<Comments client:load />
```

### 3. Optimize Images

```astro
---
import { Image } from 'astro:assets';
import hero from '../assets/hero.jpg';
---

<!-- ✅ Good: Optimized -->
<Image src={hero} alt="Hero" />

<!-- ❌ Avoid: Unoptimized -->
<img src="/hero.jpg" alt="Hero">
```

### 4. Use Proper Framework

```astro
<!-- ✅ Good: Svelte for simple -->
<ThemeToggle client:load />  <!-- 2kb -->

<!-- ❌ Avoid: React for simple -->
<ThemeToggle client:load />  <!-- 45kb -->
```

---

## 🐛 Debugging

### DevTools

```astro
<script>
  console.log('Client-side log');
</script>
```

```astro
---
console.log('Build-time log');
---
```

### Astro DevToolbar

Access at `/__devtools__` in dev mode

### Type Checking

```bash
npm run astro check
```

---

## 📦 Common Patterns

### Theme Toggle

```svelte
<!-- ThemeToggle.svelte -->
<script>
  import { onMount } from 'svelte';
  
  let theme = 'light';
  
  onMount(() => {
    theme = localStorage.getItem('theme') || 'light';
    document.documentElement.dataset.theme = theme;
  });
  
  function toggle() {
    theme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }
</script>

<button on:click={toggle}>
  {theme === 'light' ? '🌙' : '☀️'}
</button>
```

### Loading State

```svelte
<script>
  let loading = false;
  let data = null;
  
  async function fetchData() {
    loading = true;
    data = await fetch('/api/data').then(r => r.json());
    loading = false;
  }
</script>

{#if loading}
  <p>Loading...</p>
{:else if data}
  <p>{data.message}</p>
{/if}
```

### Form Handling

```svelte
<script>
  let email = '';
  let submitted = false;
  
  async function handleSubmit(e) {
    e.preventDefault();
    
    await fetch('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
    
    submitted = true;
  }
</script>

<form on:submit={handleSubmit}>
  <input type="email" bind:value={email} required>
  <button type="submit">Subscribe</button>
</form>

{#if submitted}
  <p>Thanks for subscribing!</p>
{/if}
```

---

## 🎓 Quick Decision Guide

### Static vs Island?

```
Need JavaScript? 
├─ No → .astro component (static)
└─ Yes → Continue
    │
    Critical/Above-fold?
    ├─ Yes → client:load
    └─ No → Continue
        │
        Below-fold?
        ├─ Yes → client:visible
        └─ No → Continue
            │
            Can wait?
            ├─ Yes → client:idle
            └─ No → client:load
```

### Which Framework for Islands?

```
Simple toggle/counter?
└─ Svelte (2kb)

Complex UI/rich ecosystem?
└─ React (45kb)

Middle ground?
└─ Preact (4kb) or Solid (7kb)

Familiar syntax?
└─ Vue (20kb)
```

---

## 📚 Resources

- **Docs**: https://docs.astro.build
- **Discord**: https://astro.build/chat
- **Examples**: https://astro.build/themes
- **GitHub**: https://github.com/withastro/astro

---

**Print this cheat sheet for quick reference! 📄**