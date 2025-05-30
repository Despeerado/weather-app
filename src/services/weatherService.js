// Weather service for React app
import { apiClient } from './apiClient';
import { CONFIG } from '../config/config';

class WeatherService {
  constructor() {
    this.apiKey = CONFIG.WEATHER_API_KEY;
    this.baseUrl = CONFIG.WEATHER_API_BASE_URL;
  }

  async getCurrentWeather(city) {
    try {
      const response = await apiClient.get('/weather', {
        params: {
          q: city,
          appid: this.apiKey,
          units: 'metric',
          lang: 'cs'
        }
      });

      return this.formatCurrentWeatherData(response.data);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getForecast(city) {
    try {
      const response = await apiClient.get('/forecast', {
        params: {
          q: city,
          appid: this.apiKey,
          units: 'metric',
          lang: 'cs'
        }
      });

      return this.formatForecastData(response.data);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  formatCurrentWeatherData(data) {
    return {
      id: data.id,
      name: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      windSpeed: data.wind.speed,
      windDirection: data.wind.deg,
      visibility: data.visibility,
      cloudiness: data.clouds.all,
      sunrise: new Date(data.sys.sunrise * 1000),
      sunset: new Date(data.sys.sunset * 1000),
      timezone: data.timezone,
      dt: new Date(data.dt * 1000)
    };
  }

  formatForecastData(data) {
    const forecasts = data.list.map(item => ({
      dt: new Date(item.dt * 1000),
      temperature: Math.round(item.main.temp),
      minTemp: Math.round(item.main.temp_min),
      maxTemp: Math.round(item.main.temp_max),
      description: item.weather[0].description,
      icon: item.weather[0].icon,
      humidity: item.main.humidity,
      pressure: item.main.pressure,
      windSpeed: item.wind.speed,
      windDirection: item.wind.deg,
      cloudiness: item.clouds.all,
      pop: item.pop // Probability of precipitation
    }));

    // Group by days
    const dailyForecasts = this.groupForecastsByDay(forecasts);

    return {
      city: {
        name: data.city.name,
        country: data.city.country,
        coord: data.city.coord,
        timezone: data.city.timezone
      },
      list: forecasts,
      daily: dailyForecasts
    };
  }

  groupForecastsByDay(forecasts) {
    const days = {};

    forecasts.forEach(forecast => {
      const dateKey = forecast.dt.toDateString();
      if (!days[dateKey]) {
        days[dateKey] = {
          date: forecast.dt,
          items: [],
          minTemp: forecast.minTemp,
          maxTemp: forecast.maxTemp
        };
      }

      days[dateKey].items.push(forecast);
      days[dateKey].minTemp = Math.min(days[dateKey].minTemp, forecast.minTemp);
      days[dateKey].maxTemp = Math.max(days[dateKey].maxTemp, forecast.maxTemp);
    });

    return Object.values(days).slice(0, 5); // Return 5 days
  }

  handleError(error) {
    if (error.response) {
      switch (error.response.status) {
        case 404:
          return new Error('Město nebylo nalezeno. Zkontrolujte název a zkuste to znovu.');
        case 401:
          return new Error('Neplatný API klíč. Kontaktujte správce aplikace.');
        case 429:
          return new Error('Příliš mnoho požadavků. Zkuste to prosím později.');
        case 500:
          return new Error('Chyba serveru. Zkuste to prosím později.');
        default:
          return new Error('Nepodařilo se načíst data o počasí. Zkuste to prosím později.');
      }
    } else if (error.request) {
      return new Error('Nepodařilo se připojit k serveru. Zkontrolujte internetové připojení.');
    } else {
      return new Error('Došlo k neočekávané chybě.');
    }
  }
}

export const weatherService = new WeatherService();
