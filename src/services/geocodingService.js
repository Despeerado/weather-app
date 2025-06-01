// Geocoding service for city search
import axios from "axios";
import { CONFIG } from "../config/config";

class GeocodingService {
  constructor() {
    this.apiKey = CONFIG.WEATHER_API_KEY;
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes

    // Create separate axios instance for geocoding API
    this.geocodingClient = axios.create({
      baseURL: CONFIG.GEOCODING_API_BASE_URL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async searchCities(query, limit = 5) {
    const cacheKey = `${query}-${limit}`;

    // Check cache first
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.cacheTimeout) {
        return cached.data;
      }
      this.cache.delete(cacheKey);
    }

    try {
      const response = await this.geocodingClient.get("/direct", {
        params: {
          q: query,
          limit: limit,
          appid: this.apiKey,
        },
      });

      const cities = response.data.map((city) => ({
        name: city.name,
        country: city.country,
        state: city.state,
        lat: city.lat,
        lon: city.lon,
      }));

      // Cache the result
      this.cache.set(cacheKey, {
        data: cities,
        timestamp: Date.now(),
      });

      return cities;
    } catch (error) {
      console.error("Error searching cities:", error);
      return [];
    }
  }

  async reverseGeocode(lat, lon) {
    const cacheKey = `reverse-${lat.toFixed(4)}-${lon.toFixed(4)}`;

    // Check cache first
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.cacheTimeout) {
        return cached.data;
      }
      this.cache.delete(cacheKey);
    }

    try {
      const response = await this.geocodingClient.get("/reverse", {
        params: {
          lat: lat,
          lon: lon,
          limit: 1,
          appid: this.apiKey,
        },
      });

      if (response.data && response.data.length > 0) {
        const location = response.data[0];
        const result = {
          name: location.name,
          country: location.country,
          state: location.state,
          lat: location.lat,
          lon: location.lon,
        };

        // Cache the result
        this.cache.set(cacheKey, {
          data: result,
          timestamp: Date.now(),
        });

        return result;
      }

      return null;
    } catch (error) {
      console.error("Error reverse geocoding:", error);
      throw new Error("Nepodařilo se určit název města z vaší polohy");
    }
  }

  clearCache() {
    this.cache.clear();
  }
}

export const geocodingService = new GeocodingService();
