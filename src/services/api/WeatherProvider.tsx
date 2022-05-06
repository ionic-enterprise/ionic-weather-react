import React, { createContext, useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { CurrentWeather, Forecast } from '../models';
import keys from './keys.json';

export interface WeatherService {
  currentWeatherData: CurrentWeather | undefined;
}

export const WeatherContext = createContext<WeatherService | undefined>(undefined);

const client = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const WeatherProvider: React.FC = ({ children }) => {
  const [weatherData, setWeatherData] = useState<CurrentWeather | undefined>();

  const getData = useCallback(async (): Promise<any> => {
    const res = await client.get(
      `/onecall?lat=43.074085&lon=-89.381027&exclude=minutely,hourly&appid=${keys.openWeatherMap}`
    );
    return res.data;
  }, []);

  const convertForecast = useCallback((daily: Array<any>): Array<Array<Forecast>> => {
    const result: Array<Array<Forecast>> = [];
    daily.forEach((day: any) => {
      result.push([
        {
          date: new Date(day.dt * 1000),
          condition: day.weather[0].id,
          temperature: day.temp.min,
        },
        {
          date: new Date(day.dt * 1000),
          condition: day.weather[0].id,
          temperature: day.temp.max,
        },
      ]);
    });
    return result;
  }, []);

  const riskLevel = useCallback((value: number): number => {
    if (value < 3) {
      return 0;
    }
    if (value < 6) {
      return 1;
    }
    if (value < 8) {
      return 2;
    }
    if (value < 11) {
      return 3;
    }
    return 4;
  }, []);

  const convert = useCallback(
    (data: any): CurrentWeather => {
      return {
        condition: data.current.weather[0].id,
        temperature: data.current.temp,
        uvIndex: data.current.uvi,
        uvRiskIndex: riskLevel(data.current.uvi),
        forecasts: convertForecast(data.daily),
      };
    },
    [convertForecast, riskLevel]
  );

  const refresh = useCallback(async () => {
    console.log('refreshing...');
    const response = await getData();
    setWeatherData(convert(response));
  }, [getData, convert]);

  useEffect(() => {
    refresh();
    setInterval(refresh, 1000 * 60 * 5);
  }, [refresh]);

  return <WeatherContext.Provider value={{ currentWeatherData: weatherData }}>{children}</WeatherContext.Provider>;
};

export default WeatherProvider;
