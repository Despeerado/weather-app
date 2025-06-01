// SimpleWeatherMap.jsx - Simplified weather map for debugging
import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

const SimpleWeatherMap = ({ height = '600px' }) => {
  console.log('SimpleWeatherMap rendering with height:', height);
  
  return (
    <div style={{ height, width: '100%', border: '2px solid red', backgroundColor: 'lightblue' }}>
      <h3 style={{ margin: 0, padding: '10px', color: 'black' }}>Mapa by se měla zobrazit zde:</h3>
      <div style={{ height: 'calc(100% - 50px)', width: '100%' }}>
        <MapContainer
          center={[49.75, 15.5]} // Czech Republic center
          zoom={6}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </MapContainer>
      </div>
    </div>
  );
};

export default SimpleWeatherMap;
