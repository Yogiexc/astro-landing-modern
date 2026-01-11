<script>
  import { onMount } from 'svelte';
  
  let theme = 'light';
  let mounted = false;
  
  onMount(() => {
    const saved = localStorage.getItem('theme');
    theme = saved || 'light';
    document.documentElement.setAttribute('data-theme', theme);
    mounted = true;
  });
  
  function toggleTheme() {
    theme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }
</script>

<button 
  class="theme-toggle" 
  on:click={toggleTheme}
  aria-label="Toggle theme"
  class:mounted={mounted}
>
  {#if theme === 'light'}
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 3V2m0 16v-1m7-7h1M2 10h1m13.071 5.071l.707.707M3.222 3.222l.707.707m11.142 0l.707-.707M3.222 16.778l.707-.707" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <circle cx="10" cy="10" r="4" stroke="currentColor" stroke-width="2"/>
    </svg>
  {:else}
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  {/if}
  
  <span class="theme-label">
    {theme === 'light' ? 'Dark' : 'Light'} Mode
  </span>
</button>

<style>
  .theme-toggle {
    position: fixed;
    top: 2rem;
    right: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    background: var(--color-bg);
    border: 2px solid var(--color-border);
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.938rem;
    font-weight: 500;
    color: var(--color-text);
    transition: all 200ms ease-in-out;
    box-shadow: var(--shadow-md);
    z-index: 100;
    opacity: 0;
  }
  
  .theme-toggle.mounted {
    opacity: 1;
  }
  
  .theme-toggle:hover {
    border-color: var(--color-primary);
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
  
  .theme-toggle:active {
    transform: translateY(0);
  }
  
  .theme-toggle svg {
    color: var(--color-primary);
    flex-shrink: 0;
  }
  
  .theme-label {
    white-space: nowrap;
  }
  
  @media (max-width: 640px) {
    .theme-toggle {
      top: 1rem;
      right: 1rem;
      padding: 0.625rem 1rem;
      font-size: 0.875rem;
    }
    
    .theme-label {
      display: none;
    }
  }
</style>