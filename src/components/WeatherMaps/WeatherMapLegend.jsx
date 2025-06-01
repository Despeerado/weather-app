// WeatherMapLegend.jsx - Legend component for weather map layers
import React, { useState } from 'react';

const WeatherMapLegend = ({
  layers = [],
  getLegendData,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Get legend data for all active layers
  const legendsData = layers
    .map(layerId => {
      const legendData = getLegendData(layerId);
      return legendData ? { layerId, ...legendData } : null;
    })
    .filter(Boolean);

  if (legendsData.length === 0) {
    return null;
  }

  return (
    <div className={`weather-map-legend ${className}`}>
      {/* Legend toggle button */}
      <button
        className="legend-toggle"
        onClick={toggleExpanded}
        aria-label={isExpanded ? 'Skrýt legendu' : 'Zobrazit legendu'}
      >
        <span className="legend-icon">
          {isExpanded ? '📋' : '📊'}
        </span>
        <span className="legend-label">Legenda</span>
        <span className="legend-arrow">
          {isExpanded ? '▼' : '▶'}
        </span>
      </button>

      {/* Legend content */}
      {isExpanded && (
        <div className="legend-content">
          {legendsData.map(legend => (
            <div key={legend.layerId} className="legend-item">
              <h4 className="legend-title">{legend.title}</h4>
              <div className="legend-scale">
                {legend.colors.map((colorData, index) => (
                  <div key={index} className="legend-color-item">
                    <div
                      className="legend-color-box"
                      style={{ backgroundColor: colorData.color }}
                    ></div>
                    <span className="legend-color-label">
                      {colorData.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <div className="legend-footer">
            <p className="legend-note">
              Data poskytuje OpenWeatherMap
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherMapLegend;
