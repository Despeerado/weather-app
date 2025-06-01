// useWeatherMaps Hook - Manage weather maps state and interactions
import { useState, useEffect, useCallback, useRef } from 'react';
import { weatherMapsService } from '../services/weatherMapsService.js';
import { CONFIG } from '../config/config.js';

export const useWeatherMaps = (initialCenter = { lat: 49.75, lon: 15.5 }) => {
  // State management
  const [mapCenter, setMapCenter] = useState(initialCenter);
  const [zoomLevel, setZoomLevel] = useState(CONFIG.WEATHER_MAPS.DEFAULT_ZOOM);
  const [activeLayers, setActiveLayers] = useState(['clouds_new']);
  const [layerOpacity, setLayerOpacity] = useState(CONFIG.WEATHER_MAPS.DEFAULT_OPACITY);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mapBounds, setMapBounds] = useState(null);

  // Refs
  const mapRef = useRef(null);
  const tilesLoadingRef = useRef(new Set());

  /**
   * Update map center
   */
  const updateMapCenter = useCallback((lat, lon) => {
    setMapCenter({ lat, lon });
  }, []);

  /**
   * Update zoom level with validation
   */
  const updateZoomLevel = useCallback((zoom) => {
    const clampedZoom = Math.max(
      CONFIG.WEATHER_MAPS.MIN_ZOOM,
      Math.min(CONFIG.WEATHER_MAPS.MAX_ZOOM, zoom)
    );
    setZoomLevel(clampedZoom);
  }, []);

  /**
   * Toggle weather layer on/off
   */
  const toggleLayer = useCallback((layerId) => {
    if (!weatherMapsService.isValidLayer(layerId)) {
      setError(`Neplatná vrstva: ${layerId}`);
      return;
    }

    setActiveLayers(prev => {
      if (prev.includes(layerId)) {
        return prev.filter(id => id !== layerId);
      } else {
        return [...prev, layerId];
      }
    });
  }, []);

  /**
   * Set active layers
   */
  const setLayers = useCallback((layers) => {
    const validLayers = layers.filter(layerId => 
      weatherMapsService.isValidLayer(layerId)
    );
    
    if (validLayers.length !== layers.length) {
      setError('Některé vrstvy jsou neplatné');
    }
    
    setActiveLayers(validLayers);
  }, []);

  /**
   * Update layer opacity
   */
  const updateLayerOpacity = useCallback((opacity) => {
    const clampedOpacity = Math.max(0, Math.min(1, opacity));
    setLayerOpacity(clampedOpacity);
  }, []);

  /**
   * Get tile URL for specific layer and coordinates
   */
  const getTileUrl = useCallback((layer, z, x, y) => {
    return weatherMapsService.getTileUrl(layer, z, x, y, layerOpacity);
  }, [layerOpacity]);

  /**
   * Handle tile loading start
   */
  const handleTileLoadStart = useCallback((tileId) => {
    tilesLoadingRef.current.add(tileId);
    if (tilesLoadingRef.current.size === 1) {
      setIsLoading(true);
    }
  }, []);

  /**
   * Handle tile loading complete
   */
  const handleTileLoadComplete = useCallback((tileId) => {
    tilesLoadingRef.current.delete(tileId);
    if (tilesLoadingRef.current.size === 0) {
      setIsLoading(false);
    }
  }, []);

  /**
   * Handle tile loading error
   */
  const handleTileLoadError = useCallback((tileId, error) => {
    tilesLoadingRef.current.delete(tileId);
    console.error(`Chyba při načítání tile ${tileId}:`, error);
    
    if (tilesLoadingRef.current.size === 0) {
      setIsLoading(false);
    }
  }, []);

  /**
   * Center map on specific coordinates
   */
  const centerMapOn = useCallback((lat, lon, zoom = null) => {
    updateMapCenter(lat, lon);
    if (zoom !== null) {
      updateZoomLevel(zoom);
    }
  }, [updateMapCenter, updateZoomLevel]);

  /**
   * Fit map to bounds
   */
  const fitToBounds = useCallback((bounds, containerSize) => {
    const { north, south, east, west } = bounds;
    const centerLat = (north + south) / 2;
    const centerLon = (east + west) / 2;
    
    const optimalZoom = weatherMapsService.getOptimalZoom(bounds, containerSize);
    
    setMapCenter({ lat: centerLat, lon: centerLon });
    setZoomLevel(optimalZoom);
    setMapBounds(bounds);
  }, []);

  /**
   * Get available layers
   */
  const availableLayers = weatherMapsService.getAvailableLayers();

  /**
   * Get layer info
   */
  const getLayerInfo = useCallback((layerId) => {
    return weatherMapsService.getLayerInfo(layerId);
  }, []);

  /**
   * Get layer legend
   */
  const getLayerLegend = useCallback((layerId) => {
    return weatherMapsService.getLayerLegend(layerId);
  }, []);

  /**
   * Clear error
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Reset map to default state
   */
  const resetMap = useCallback(() => {
    setMapCenter(initialCenter);
    setZoomLevel(CONFIG.WEATHER_MAPS.DEFAULT_ZOOM);
    setActiveLayers(['clouds_new']);
    setLayerOpacity(CONFIG.WEATHER_MAPS.DEFAULT_OPACITY);
    setMapBounds(null);
    setError(null);
  }, [initialCenter]);

  // Effect to handle map bounds changes
  useEffect(() => {
    if (mapRef.current && mapBounds) {
      // Map bounds changed, could trigger tile reload
      setIsLoading(true);
    }
  }, [mapBounds]);

  // Return hook interface
  return {
    // State
    mapCenter,
    zoomLevel,
    activeLayers,
    layerOpacity,
    isLoading,
    error,
    mapBounds,
    availableLayers,
    
    // Refs
    mapRef,
    
    // Actions
    updateMapCenter,
    updateZoomLevel,
    toggleLayer,
    setLayers,
    updateLayerOpacity,
    centerMapOn,
    fitToBounds,
    resetMap,
    clearError,
    
    // Utilities
    getTileUrl,
    getLayerInfo,
    getLayerLegend,
    
    // Tile loading handlers
    handleTileLoadStart,
    handleTileLoadComplete,
    handleTileLoadError
  };
};
