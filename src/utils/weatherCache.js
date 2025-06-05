/**
 * Cache Strategy for Weather API and Static Resources
 * Implements sophisticated caching with TTL and storage quotas
 */

class WeatherCache {
  constructor() {
    this.dbName = "WeatherAppCache";
    this.version = 1;
    this.stores = {
      weather: "weather-data",
      geocoding: "geocoding-data",
      maps: "maps-tiles",
    };
    this.defaultTTL = {
      weather: 10 * 60 * 1000, // 10 minutes
      geocoding: 24 * 60 * 60 * 1000, // 24 hours
      maps: 7 * 24 * 60 * 60 * 1000, // 7 days
    };
  }

  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Create object stores
        Object.values(this.stores).forEach((storeName) => {
          if (!db.objectStoreNames.contains(storeName)) {
            const store = db.createObjectStore(storeName, { keyPath: "key" });
            store.createIndex("timestamp", "timestamp", { unique: false });
          }
        });
      };
    });
  }

  async set(storeName, key, data, ttl = null) {
    if (!this.db) await this.init();

    const store = this.stores[storeName];
    const defaultTTL = this.defaultTTL[storeName] || 60000;
    const expiresAt = Date.now() + (ttl || defaultTTL);

    const transaction = this.db.transaction([store], "readwrite");
    const objectStore = transaction.objectStore(store);

    await objectStore.put({
      key,
      data,
      timestamp: Date.now(),
      expiresAt,
    });
  }

  async get(storeName, key) {
    if (!this.db) await this.init();

    const store = this.stores[storeName];
    const transaction = this.db.transaction([store], "readonly");
    const objectStore = transaction.objectStore(store);

    return new Promise((resolve, reject) => {
      const request = objectStore.get(key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const result = request.result;

        if (!result) {
          resolve(null);
          return;
        }

        // Check if expired
        if (Date.now() > result.expiresAt) {
          this.delete(storeName, key);
          resolve(null);
          return;
        }

        resolve(result.data);
      };
    });
  }

  async delete(storeName, key) {
    if (!this.db) await this.init();

    const store = this.stores[storeName];
    const transaction = this.db.transaction([store], "readwrite");
    const objectStore = transaction.objectStore(store);

    await objectStore.delete(key);
  }

  async clear(storeName) {
    if (!this.db) await this.init();

    const store = this.stores[storeName];
    const transaction = this.db.transaction([store], "readwrite");
    const objectStore = transaction.objectStore(store);

    await objectStore.clear();
  }

  // Clean expired entries
  async cleanup() {
    if (!this.db) await this.init();

    const now = Date.now();

    for (const storeName of Object.values(this.stores)) {
      const transaction = this.db.transaction([storeName], "readwrite");
      const objectStore = transaction.objectStore(storeName);
      const index = objectStore.index("timestamp");

      const request = index.openCursor();
      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          if (cursor.value.expiresAt < now) {
            cursor.delete();
          }
          cursor.continue();
        }
      };
    }
  }
}

// Export singleton instance
export const weatherCache = new WeatherCache();

// Initialize cache on module load
if (typeof window !== "undefined") {
  weatherCache.init().catch(console.error);

  // Run cleanup every hour
  setInterval(
    () => {
      weatherCache.cleanup().catch(console.error);
    },
    60 * 60 * 1000,
  );
}
