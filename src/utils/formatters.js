// Date and formatting utility functions
export const formatDate = (date, locale = 'cs-CZ') => {
  return new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

export const formatTime = (date, locale = 'cs-CZ') => {
  return new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

export const formatDateTime = (date, locale = 'cs-CZ') => {
  return new Intl.DateTimeFormat(locale, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

export const formatShortDate = (date, locale = 'cs-CZ') => {
  return new Intl.DateTimeFormat(locale, {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  }).format(date);
};

export const formatRelativeTime = (date, locale = 'cs-CZ') => {
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (Math.abs(diffDays) < 1) {
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    if (Math.abs(diffHours) < 1) {
      const diffMinutes = Math.ceil(diffTime / (1000 * 60));
      return rtf.format(diffMinutes, 'minute');
    }
    return rtf.format(diffHours, 'hour');
  }

  return rtf.format(diffDays, 'day');
};

export const isToday = date => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

export const isTomorrow = date => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return date.toDateString() === tomorrow.toDateString();
};

export const isYesterday = date => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return date.toDateString() === yesterday.toDateString();
};

export const getDayName = (date, locale = 'cs-CZ') => {
  if (isToday(date)) return 'Dnes';
  if (isTomorrow(date)) return 'Zítra';
  if (isYesterday(date)) return 'Včera';

  return new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date);
};

export const getShortDayName = (date, locale = 'cs-CZ') => {
  if (isToday(date)) return 'Dnes';
  if (isTomorrow(date)) return 'Zítra';

  return new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date);
};

// Debounce function
export const debounce = (func, wait, immediate) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
};

// Throttle function
export const throttle = (func, limit) => {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Capitalize first letter
export const capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Format number with units
export const formatWithUnit = (value, unit, decimals = 0) => {
  const formatted = typeof value === 'number' ? value.toFixed(decimals) : value;
  return `${formatted} ${unit}`;
};

// Generate unique ID
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
};
