// Weather utility functions
export const getWeatherIconUrl = (icon, size = '2x') => {
  return `https://openweathermap.org/img/wn/${icon}@${size}.png`;
};

export const formatTemperature = temp => {
  return Math.round(temp);
};

export const formatWindSpeed = speed => {
  return Math.round(speed * 10) / 10;
};

export const getWindDirection = degrees => {
  const directions = [
    'S',
    'SSV',
    'SV',
    'VSV',
    'V',
    'VJV',
    'JV',
    'JJV',
    'J',
    'JJZ',
    'JZ',
    'ZJZ',
    'Z',
    'ZSZ',
    'SZ',
    'SSZ'
  ];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

export const formatPressure = pressure => {
  return Math.round(pressure);
};

export const formatVisibility = visibility => {
  // Convert from meters to kilometers
  return Math.round(visibility / 100) / 10;
};

export const getWeatherConditionClass = conditionId => {
  // Weather condition IDs from OpenWeatherMap
  if (conditionId >= 200 && conditionId < 300) return 'thunderstorm';
  if (conditionId >= 300 && conditionId < 400) return 'drizzle';
  if (conditionId >= 500 && conditionId < 600) return 'rain';
  if (conditionId >= 600 && conditionId < 700) return 'snow';
  if (conditionId >= 700 && conditionId < 800) return 'atmosphere';
  if (conditionId === 800) return 'clear';
  if (conditionId > 800) return 'clouds';
  return 'unknown';
};

export const isDay = (current, sunrise, sunset) => {
  const currentTime = current.getTime();
  const sunriseTime = sunrise.getTime();
  const sunsetTime = sunset.getTime();

  return currentTime >= sunriseTime && currentTime <= sunsetTime;
};

export const getTimeOfDay = (current, sunrise, sunset) => {
  if (isDay(current, sunrise, sunset)) {
    return 'day';
  }
  return 'night';
};

export const calculateHumidityLevel = humidity => {
  if (humidity < 30) return 'low';
  if (humidity < 60) return 'optimal';
  if (humidity < 80) return 'high';
  return 'very-high';
};

export const calculateUVLevel = uvIndex => {
  if (uvIndex <= 2) return 'low';
  if (uvIndex <= 5) return 'moderate';
  if (uvIndex <= 7) return 'high';
  if (uvIndex <= 10) return 'very-high';
  return 'extreme';
};

export const getWeatherAdvice = weatherData => {
  const { temperature, humidity, windSpeed, description } = weatherData;
  const advice = [];

  if (temperature < 0) {
    advice.push('Oblečte se teplo, teploty jsou pod bodem mrazu');
  } else if (temperature < 10) {
    advice.push('Doporučujeme teplé oblečení');
  } else if (temperature > 30) {
    advice.push('Vysoké teploty - zůstaňte v chládku a hydratujte se');
  }

  if (humidity > 80) {
    advice.push('Vysoká vlhkost vzduchu');
  }

  if (windSpeed > 10) {
    advice.push('Silný vítr - buďte opatrní venku');
  }

  if (description.includes('rain')) {
    advice.push('Očekává se déšť - nezapomeňte deštník');
  }

  if (description.includes('snow')) {
    advice.push('Sněžení - počítejte s komplikacemi v dopravě');
  }

  return advice;
};
