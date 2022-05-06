import { useContext } from 'react';
import { WeatherContext, WeatherService } from '../services/api/WeatherProvider';

export const useWeatherService = () => {
  const context = useContext<WeatherService | undefined>(WeatherContext);
  if (context === undefined) {
    throw new Error('WeatherContext was not provided. Make sure your component is a child of the WeatherService.');
  }
  return context;
};
