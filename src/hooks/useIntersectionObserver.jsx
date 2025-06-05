/**
 * Lazy Loading Hook using Intersection Observer
 * Optimizes loading of heavy components and images
 */

import { useState, useEffect, useRef } from "react";

export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !("IntersectionObserver" in window)) {
      setIsIntersecting(true);
      setHasIntersected(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;
        setIsIntersecting(isElementIntersecting);

        if (isElementIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
        ...options,
      },
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [hasIntersected, options]);

  return { elementRef, isIntersecting, hasIntersected };
};

// Lazy component wrapper
export const LazyComponent = ({
  children,
  placeholder = null,
  once = true,
}) => {
  const { elementRef, isIntersecting, hasIntersected } =
    useIntersectionObserver();

  const shouldRender = once ? hasIntersected : isIntersecting;

  return <div ref={elementRef}>{shouldRender ? children : placeholder}</div>;
};
