// WeatherMapsContainer.jsx - Main container for weather maps functionality
import React, { useState, useEffect } from 'react';
import WeatherMap from './WeatherMap.jsx';
import { CONFIG } from '../../config/config.js';

const WeatherMapsContainer = ({ 
  currentLocation = null,
  className = '',
  height = '600px',
  showHeader = true
}) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 49.75, lon: 15.5 }); // Czech Republic center

  // Update map center when current location changes
  useEffect(() => {
    if (currentLocation && currentLocation.coord) {
      const newCenter = {
        lat: currentLocation.coord.lat,
        lon: currentLocation.coord.lon
      };
      setMapCenter(newCenter);
      setSelectedLocation(newCenter);
    }
  }, [currentLocation]);

  // Handle location selection from map click
  const handleLocationSelect = (lat, lon) => {
    const location = { lat, lon };
    setSelectedLocation(location);
    
    // You could emit this to parent component to trigger weather fetch
    // onLocationChange?.(location);
  };

  // Don't render if weather maps are disabled
  if (!CONFIG.ENABLE_WEATHER_MAPS) {
    return null;
  }

  return (
    <div className={`weather-maps-container ${className}`}>
      {showHeader && (
        <div className="maps-header">
          <h2 className="maps-title">
            🗺️ Meteorologické mapy
          </h2>
          <p className="maps-description">
            Klikněte na mapu pro výběr lokace nebo prohlédněte meteorologické vrstvy
          </p>
        </div>
      )}

      <div className="maps-content">
        <WeatherMap
          initialCenter={mapCenter}
          height={height}
          onLocationSelect={handleLocationSelect}
          showControls={true}
          showLegend={true}
          className="main-weather-map"
        />
      </div>

      {selectedLocation && (
        <div className="location-info">
          <div className="location-coords">
            <span className="coord-label">📍 Vybraná pozice:</span>
            <span className="coord-value">
              {selectedLocation.lat.toFixed(4)}°, {selectedLocation.lon.toFixed(4)}°
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherMapsContainer;
