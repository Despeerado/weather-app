// WeatherMap.jsx - Main weather map component with Leaflet integration
import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { useWeatherMaps } from '../../hooks/useWeatherMaps.js';
import WeatherMapControls from './WeatherMapControls.jsx';
import WeatherMapLegend from './WeatherMapLegend.jsx';
import './WeatherMaps.css';

// Fix for default markers in react-leaflet
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

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
  
  // Debug URL construction
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY || import.meta.env.VITE_WEATHER_API_KEY;
  
  if (!apiKey || apiKey === 'your-api-key-here') {
    console.error('Missing or invalid OpenWeatherMap API key');
    return null;
  }
  
  const tileUrl = `https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=${apiKey}`;
  
  return (
    <TileLayer
      key={`${layer}-${opacity}`}
      url={tileUrl}
      opacity={opacity}
      attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
      eventHandlers={{
        loading: () => onTileLoadStart && onTileLoadStart(layer),
        load: () => onTileLoadComplete && onTileLoadComplete(layer),
        tileerror: (error) => onTileLoadError && onTileLoadError(layer, error)
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
  // Check if Leaflet is available
  if (typeof window !== 'undefined' && !window.L) {
    return (
      <div style={{
        height,
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '20px',
        border: '1px solid rgba(255,255,255,0.2)'
      }}>
        <div style={{ textAlign: 'center', color: '#666' }}>
          <p>⚠️ Načítání mapy...</p>
          <p>Pokud se mapa nenačítá, zkontrolujte internetové připojení</p>
        </div>
      </div>
    );
  }

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
      style={{ height, minHeight: '400px' }}
      ref={mapContainerRef}
    >
      {/* Debug info */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        background: 'rgba(0,0,0,0.7)',
        color: 'white',
        padding: '5px',
        borderRadius: '5px',
        fontSize: '12px',
        zIndex: 1001
      }}>
        Map: {mapCenter.lat.toFixed(2)}, {mapCenter.lon.toFixed(2)} | Zoom: {zoomLevel} | Layers: {activeLayers.length}
      </div>
      
      <MapContainer
        center={[mapCenter.lat, mapCenter.lon]}
        zoom={zoomLevel}
        style={{ height: '100%', width: '100%', minHeight: '400px' }}
        className="weather-map"
        ref={mapRef}
        whenCreated={(map) => {
          console.log('Weather map created successfully');
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
          <div className="map-loading-spinner">🔄 Načítám meteorologické vrstvy...</div>
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
