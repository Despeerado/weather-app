// MinimalMap.jsx - Minimal test map to verify Leaflet functionality
import React, { useEffect, useRef } from 'react';

const MinimalMap = ({ height = '400px' }) => {
  const mapRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Check if Leaflet is available
    if (typeof window === 'undefined' || !window.L) {
      console.error('Leaflet is not loaded');
      return;
    }

    // Only create map if container exists and map doesn't already exist
    if (containerRef.current && !mapRef.current) {
      try {
        console.log('Creating minimal map...');
        const map = window.L.map(containerRef.current, {
          center: [49.75, 15.5],
          zoom: 6,
          zoomControl: true
        });

        // Add tile layer
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        mapRef.current = map;
        console.log('Minimal map created successfully');

        // Trigger resize after a moment
        setTimeout(() => {
          map.invalidateSize();
        }, 100);

      } catch (error) {
        console.error('Error creating minimal map:', error);
      }
    }

    // Cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div style={{
      height,
      width: '100%',
      minHeight: '400px',
      border: '2px solid #1976d2',
      borderRadius: '10px',
      position: 'relative'
    }}>
      <div
        ref={containerRef}
        style={{
          height: '100%',
          width: '100%',
          minHeight: '400px'
        }}
      />
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: 'rgba(0,0,0,0.7)',
        color: 'white',
        padding: '5px',
        borderRadius: '5px',
        fontSize: '12px',
        zIndex: 1000
      }}>
        Minimal Test Map
      </div>
    </div>
  );
};

export default MinimalMap;
