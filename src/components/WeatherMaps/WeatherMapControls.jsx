// WeatherMapControls.jsx - Controls for weather map layers and settings
import React, { useState } from 'react';
import { weatherMapsService } from '../../services/weatherMapsService.js';

const WeatherMapControls = ({
  activeLayers = [],
  layerOpacity = 0.6,
  onLayerToggle,
  onOpacityChange,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const availableLayers = weatherMapsService.getAvailableLayers();

  const handleLayerToggle = (layerId) => {
    if (onLayerToggle) {
      onLayerToggle(layerId);
    }
  };

  const handleOpacityChange = (e) => {
    const opacity = parseFloat(e.target.value);
    if (onOpacityChange) {
      onOpacityChange(opacity);
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`weather-map-controls ${className}`}>
      {/* Control toggle button */}
      <button
        className="controls-toggle"
        onClick={toggleExpanded}
        aria-label={isExpanded ? 'Skrýt ovládání' : 'Zobrazit ovládání'}
      >
        <span className="controls-icon">
          {isExpanded ? '✕' : '⚙️'}
        </span>
        {!isExpanded && <span className="controls-label">Vrstvy</span>}
      </button>

      {/* Controls panel */}
      {isExpanded && (
        <div className="controls-panel">
          <div className="controls-header">
            <h3 className="controls-title">Meteorologické vrstvy</h3>
          </div>

          {/* Layer selection */}
          <div className="controls-section">
            <h4 className="section-title">Dostupné vrstvy</h4>
            <div className="layer-list">
              {availableLayers.map(layer => (
                <label key={layer.id} className="layer-item">
                  <input
                    type="checkbox"
                    checked={activeLayers.includes(layer.id)}
                    onChange={() => handleLayerToggle(layer.id)}
                    className="layer-checkbox"
                  />
                  <span className="layer-icon">{layer.icon}</span>
                  <span className="layer-name">{layer.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Opacity control */}
          {activeLayers.length > 0 && (
            <div className="controls-section">
              <h4 className="section-title">Průhlednost vrstev</h4>
              <div className="opacity-control">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={layerOpacity}
                  onChange={handleOpacityChange}
                  className="opacity-slider"
                />
                <span className="opacity-value">
                  {Math.round(layerOpacity * 100)}%
                </span>
              </div>
            </div>
          )}

          {/* Active layers info */}
          {activeLayers.length > 0 && (
            <div className="controls-section">
              <h4 className="section-title">Aktivní vrstvy ({activeLayers.length})</h4>
              <div className="active-layers">
                {activeLayers.map(layerId => {
                  const layer = availableLayers.find(l => l.id === layerId);
                  return layer ? (
                    <span key={layerId} className="active-layer-tag">
                      <span className="active-layer-icon">{layer.icon}</span>
                      <span className="active-layer-name">{layer.name}</span>
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherMapControls;
