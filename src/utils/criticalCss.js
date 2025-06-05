/**
 * Critical CSS utility for inlining essential styles
 * This helps reduce render-blocking CSS
 */

export const criticalCSS = `
  /* Critical styles that should be inlined */
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .loading-spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .header {
    position: sticky;
    top: 0;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
  }

  .search-form {
    margin-bottom: 1rem;
  }

  /* Prevent layout shift for weather cards */
  .weather-card {
    min-height: 200px;
    contain: layout;
  }
`;

export const injectCriticalCSS = () => {
  if (typeof document !== "undefined") {
    const style = document.createElement("style");
    style.textContent = criticalCSS;
    document.head.appendChild(style);
  }
};
