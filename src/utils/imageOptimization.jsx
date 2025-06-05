/**
 * Image Optimization Utilities
 * Handles WebP conversion, lazy loading, and responsive images
 */

// Check for WebP support
export const supportsWebP = () => {
  if (typeof window === "undefined") return false;

  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0;
};

// Generate optimized image URLs
export const getOptimizedImageUrl = (originalUrl, options = {}) => {
  const {
    width = "auto",
    height = "auto",
    quality = 80,
    format = supportsWebP() ? "webp" : "jpg",
  } = options;

  // For external weather icon URLs, we can't optimize directly
  // But we can implement caching and preloading strategies
  return originalUrl;
};

// Preload critical images
export const preloadImages = (imageUrls) => {
  imageUrls.forEach((url) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = url;
    document.head.appendChild(link);
  });
};

// Image component with lazy loading and WebP support
export const OptimizedImage = ({
  src,
  alt,
  className,
  style,
  loading = "lazy",
  sizes = "100vw",
  ...props
}) => {
  const webpSrc = supportsWebP()
    ? src.replace(/\.(jpg|jpeg|png)$/i, ".webp")
    : src;

  return (
    <picture>
      {supportsWebP() && (
        <source srcSet={webpSrc} type="image/webp" sizes={sizes} />
      )}
      <img
        src={src}
        alt={alt}
        className={className}
        style={style}
        loading={loading}
        decoding="async"
        {...props}
      />
    </picture>
  );
};
