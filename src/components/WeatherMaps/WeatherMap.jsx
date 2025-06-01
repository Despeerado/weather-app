// WeatherMap.jsx - Main weather map component with Leaflet integration
import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { useWeatherMaps } from '../../hooks/useWeatherMaps.js';
import WeatherMapControls from './WeatherMapControls.jsx';
import WeatherMapLegend from './WeatherMapLegend.jsx';
import './WeatherMaps.css';

// Component to handle map events and updates
const MapEventHandler = ({ 
  onMapMove, 
  onZoomChange, 
  centerPosition, 
  zoomLevel 
}) => {
  const map = useMap();
  const prevCenter = useRef(centerPosition);
  const prevZoom = useRef(zoomLevel);

  // Handle map events
  useMapEvents({
    moveend: () => {
      const center = map.getCenter();
      onMapMove(center.lat, center.lng);
    },
    zoomend: () => {
      const zoom = map.getZoom();
      onZoomChange(zoom);
    }
  });

  // Update map when props change
  useEffect(() => {
    if (
      prevCenter.current.lat !== centerPosition.lat ||
      prevCenter.current.lon !== centerPosition.lon
    ) {
      map.setView([centerPosition.lat, centerPosition.lon], map.getZoom());
      prevCenter.current = centerPosition;
    }
  }, [map, centerPosition]);

  useEffect(() => {
    if (prevZoom.current !== zoomLevel) {
      map.setZoom(zoomLevel);
      prevZoom.current = zoomLevel;
    }
  }, [map, zoomLevel]);

  return null;
};

// Weather tile layer component
const WeatherTileLayer = ({ layer, opacity, onTileLoadStart, onTileLoadComplete, onTileLoadError }) => {
  const map = useMap();
  
  return (
    <TileLayer
      key={`${layer}-${opacity}`}
      url={`https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=${import.meta.env.VITE_OPENWEATHER_API_KEY || import.meta.env.VITE_WEATHER_API_KEY}&opacity=${opacity}`}
      opacity={opacity}
      attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
      eventHandlers={{
        loading: () => onTileLoadStart(layer),
        load: () => onTileLoadComplete(layer),
        tileerror: (error) => onTileLoadError(layer, error)
      }}
    />
  );
};

const WeatherMap = ({ 
  initialCenter = { lat: 49.75, lon: 15.5 },
  height = '500px',
  onLocationSelect,
  showControls = true,
  showLegend = true,
  className = ''
}) => {
  const {
    mapCenter,
    zoomLevel,
    activeLayers,
    layerOpacity,
    isLoading,
    error,
    mapRef,
    updateMapCenter,
    updateZoomLevel,
    toggleLayer,
    updateLayerOpacity,
    clearError,
    handleTileLoadStart,
    handleTileLoadComplete,
    handleTileLoadError,
    getLayerLegend
  } = useWeatherMaps(initialCenter);

  const mapContainerRef = useRef(null);

  // Handle map click for location selection
  const handleMapClick = (e) => {
    if (onLocationSelect) {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    }
  };

  return (
    <div 
      className={`weather-map-container ${className}`}
      style={{ height }}
      ref={mapContainerRef}
    >
      <MapContainer
        center={[mapCenter.lat, mapCenter.lon]}
        zoom={zoomLevel}
        style={{ height: '100%', width: '100%' }}
        className="weather-map"
        ref={mapRef}
        whenCreated={(map) => {
          if (onLocationSelect) {
            map.on('click', handleMapClick);
          }
        }}
      >
        {/* Base tile layer */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Weather layers */}
        {activeLayers.map(layer => (
          <WeatherTileLayer
            key={layer}
            layer={layer}
            opacity={layerOpacity}
            onTileLoadStart={handleTileLoadStart}
            onTileLoadComplete={handleTileLoadComplete}
            onTileLoadError={handleTileLoadError}
          />
        ))}

        {/* Map event handler */}
        <MapEventHandler
          onMapMove={updateMapCenter}
          onZoomChange={updateZoomLevel}
          centerPosition={mapCenter}
          zoomLevel={zoomLevel}
        />
      </MapContainer>

      {/* Loading overlay */}
      {isLoading && (
        <div className="map-loading-overlay">
          <div className="map-loading-spinner"></div>
        </div>
      )}

      {/* Error overlay */}
      {error && (
        <div className="map-error-overlay">
          <p className="map-error-text">{error}</p>
          <button
            className="map-error-button"
            onClick={clearError}
          >
            Zavřít
          </button>
        </div>
      )}

      {/* Map controls */}
      {showControls && (
        <WeatherMapControls
          activeLayers={activeLayers}
          layerOpacity={layerOpacity}
          onLayerToggle={toggleLayer}
          onOpacityChange={updateLayerOpacity}
        />
      )}

      {/* Map legend */}
      {showLegend && activeLayers.length > 0 && (
        <WeatherMapLegend
          layers={activeLayers}
          getLegendData={getLayerLegend}
        />
      )}
    </div>
  );
};

export default WeatherMap;
