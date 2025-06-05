/**
 * Web Vitals Performance Monitoring
 * Tracks Core Web Vitals and sends metrics for analysis
 */

import { onCLS, onINP, onFCP, onLCP, onTTFB } from "web-vitals";

const vitalsUrl = "https://vitals.vercel-analytics.com/v1/vitals";

function getConnectionSpeed() {
  return "connection" in navigator && "effectiveType" in navigator.connection
    ? navigator.connection.effectiveType
    : "";
}

function sendToAnalytics(metric, options) {
  const page = Object.assign(
    {
      page: window.location.pathname,
      ...options,
    },
    options.params,
  );

  const body = {
    dsn: options.analyticsId, // You can set this via environment variable
    id: metric.id,
    page: page.page,
    href: location.href,
    event_name: metric.name,
    value: metric.value.toString(),
    speed: getConnectionSpeed(),
  };

  if (options.debug) {
    console.log("[Web Vitals]", metric.name, Math.round(metric.value), "ms");
  }

  // Send to your analytics endpoint
  if (body.dsn && navigator.sendBeacon) {
    navigator.sendBeacon(vitalsUrl, JSON.stringify(body));
  }
}

export function initWebVitals(options = {}) {
  try {
    onINP((metric) => sendToAnalytics(metric, options));
    onTTFB((metric) => sendToAnalytics(metric, options));
    onLCP((metric) => sendToAnalytics(metric, options));
    onCLS((metric) => sendToAnalytics(metric, options));
    onFCP((metric) => sendToAnalytics(metric, options));
  } catch (err) {
    console.error("Error initializing web vitals:", err);
  }
}

export { onCLS, onINP, onFCP, onLCP, onTTFB };
