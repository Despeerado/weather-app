// HomePage.jsx - Main weather page
import React from 'react';
import WeatherApp from '../WeatherApp/WeatherApp';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const HomePage = () => {
  useDocumentTitle('Aktuální počasí');
  
  return <WeatherApp />;
};

export default HomePage;
