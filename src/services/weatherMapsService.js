// Weather Maps Service - OpenWeatherMap Weather Maps API integration
import { CONFIG } from "../config/config.js";

class WeatherMapsService {
  constructor() {
    this.baseUrl = CONFIG.WEATHER_MAPS_BASE_URL;
    this.apiKey = CONFIG.WEATHER_API_KEY;
  }

  /**
   * Get tile URL for weather map layer
   * @param {string} layer - Weather layer (clouds_new, precipitation_new, etc.)
   * @param {number} z - Zoom level
   * @param {number} x - Tile X coordinate
   * @param {number} y - Tile Y coordinate
   * @param {number} opacity - Layer opacity (0-1)
   * @returns {string} Tile URL
   */
  getTileUrl(layer, z, x, y, opacity = CONFIG.WEATHER_MAPS.DEFAULT_OPACITY) {
    return `${this.baseUrl}/${layer}/${z}/${x}/${y}.png?appid=${this.apiKey}&opacity=${opacity}`;
  }

  /**
   * Get available weather map layers
   * @returns {Array} Array of available layers
   */
  getAvailableLayers() {
    return CONFIG.WEATHER_MAPS.AVAILABLE_LAYERS;
  }

  /**
   * Validate layer ID
   * @param {string} layerId - Layer ID to validate
   * @returns {boolean} True if layer is valid
   */
  isValidLayer(layerId) {
    return CONFIG.WEATHER_MAPS.AVAILABLE_LAYERS.some(
      (layer) => layer.id === layerId,
    );
  }

  /**
   * Get layer info by ID
   * @param {string} layerId - Layer ID
   * @returns {Object|null} Layer info or null if not found
   */
  getLayerInfo(layerId) {
    return (
      CONFIG.WEATHER_MAPS.AVAILABLE_LAYERS.find(
        (layer) => layer.id === layerId,
      ) || null
    );
  }

  /**
   * Calculate tile coordinates from lat/lon
   * @param {number} lat - Latitude
   * @param {number} lon - Longitude
   * @param {number} zoom - Zoom level
   * @returns {Object} Tile coordinates {x, y, z}
   */
  getTileCoordinates(lat, lon, zoom) {
    const n = Math.pow(2, zoom);
    const x = Math.floor(((lon + 180) / 360) * n);
    const y = Math.floor(
      ((1 - Math.asinh(Math.tan((lat * Math.PI) / 180)) / Math.PI) / 2) * n,
    );

    return { x, y, z: zoom };
  }

  /**
   * Calculate lat/lon from tile coordinates
   * @param {number} x - Tile X coordinate
   * @param {number} y - Tile Y coordinate
   * @param {number} zoom - Zoom level
   * @returns {Object} Coordinates {lat, lon}
   */
  getCoordinatesFromTile(x, y, zoom) {
    const n = Math.pow(2, zoom);
    const lon = (x / n) * 360 - 180;
    const lat =
      (Math.atan(Math.sinh(Math.PI * (1 - (2 * y) / n))) * 180) / Math.PI;

    return { lat, lon };
  }

  /**
   * Get optimal zoom level for given bounds
   * @param {Object} bounds - Map bounds {north, south, east, west}
   * @param {Object} containerSize - Container size {width, height}
   * @returns {number} Optimal zoom level
   */
  getOptimalZoom(bounds, containerSize) {
    const { north, south, east, west } = bounds;
    const { width, height } = containerSize;

    const latDiff = north - south;
    const lonDiff = east - west;

    // Calculate zoom based on the difference
    const latZoom = Math.log2(360 / latDiff);
    const lonZoom = Math.log2(360 / lonDiff);

    // Take the minimum to ensure both dimensions fit
    const zoom = Math.min(latZoom, lonZoom);

    // Clamp to valid zoom range
    return Math.max(
      CONFIG.WEATHER_MAPS.MIN_ZOOM,
      Math.min(CONFIG.WEATHER_MAPS.MAX_ZOOM, Math.floor(zoom)),
    );
  }

  /**
   * Create legend data for a layer
   * @param {string} layerId - Layer ID
   * @returns {Object} Legend configuration
   */
  getLayerLegend(layerId) {
    const legends = {
      clouds_new: {
        title: "Oblačnost (%)",
        colors: [
          { value: 0, color: "#ffffff", label: "0%" },
          { value: 25, color: "#cccccc", label: "25%" },
          { value: 50, color: "#999999", label: "50%" },
          { value: 75, color: "#666666", label: "75%" },
          { value: 100, color: "#333333", label: "100%" },
        ],
      },
      precipitation_new: {
        title: "Srážky (mm/h)",
        colors: [
          { value: 0, color: "#ffffff", label: "0" },
          { value: 0.1, color: "#87ceeb", label: "0.1" },
          { value: 0.5, color: "#4169e1", label: "0.5" },
          { value: 1, color: "#0000ff", label: "1" },
          { value: 5, color: "#8b00ff", label: "5+" },
        ],
      },
      pressure_new: {
        title: "Tlak (hPa)",
        colors: [
          { value: 980, color: "#0000ff", label: "980" },
          { value: 1000, color: "#00ff00", label: "1000" },
          { value: 1013, color: "#ffff00", label: "1013" },
          { value: 1030, color: "#ff8c00", label: "1030" },
          { value: 1050, color: "#ff0000", label: "1050+" },
        ],
      },
      wind_new: {
        title: "Vítr (m/s)",
        colors: [
          { value: 0, color: "#ffffff", label: "0" },
          { value: 5, color: "#87ceeb", label: "5" },
          { value: 10, color: "#4169e1", label: "10" },
          { value: 15, color: "#0000ff", label: "15" },
          { value: 20, color: "#8b00ff", label: "20+" },
        ],
      },
      temp_new: {
        title: "Teplota (°C)",
        colors: [
          { value: -30, color: "#0000ff", label: "-30°" },
          { value: 0, color: "#87ceeb", label: "0°" },
          { value: 15, color: "#ffff00", label: "15°" },
          { value: 30, color: "#ff8c00", label: "30°" },
          { value: 45, color: "#ff0000", label: "45°+" },
        ],
      },
    };

    return legends[layerId] || null;
  }
}

export const weatherMapsService = new WeatherMapsService();
export default weatherMapsService;
