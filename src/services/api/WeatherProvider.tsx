import axios from 'axios';
import { createContext, ReactNode, useCallback, useEffect, useState } from 'react';
import { CurrentWeather, Forecast } from '../models';
import keys from './keys.json';

export interface WeatherService {
  weatherData: CurrentWeather | undefined;
  getUVAdvice: (uvIndex: number) => string;
}

export const WeatherContext = createContext<WeatherService | undefined>(undefined);
type Props = { children?: ReactNode };

interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}
interface RawForecast {
  dt: number;
  weather: [WeatherCondition];
  temp: {
    min: number;
    max: number;
  };
}
interface OneCallResponse {
  current: {
    dt: number;
    temp: number;
    uvi: number;
    weather: [WeatherCondition];
  };
  daily: [RawForecast];
}

const client = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const WeatherProvider = ({ children }: Props) => {
  const [weatherData, setWeatherData] = useState<CurrentWeather | undefined>();

  const getUVAdvice = (uvIndex: number): string => {
    const risk = riskLevel(uvIndex);
    return [
      'Wear sunglasses on bright days. If you burn easily, cover up and use broad spectrum SPF 30+ sunscreen. ' +
        'Bright surfaces, such as sand, water and snow, will increase UV exposure.',
      'Stay in the shade near midday when the sun is strongest. If outdoors, wear sun protective clothing, ' +
        'a wide-brimmed hat, and UV-blocking sunglasses. Generously apply broad spectrum SPF 30+ sunscreen every ' +
        '2 hours, even on cloudy days, and after swimming or sweating. Bright surfaces, such as sand, water and ' +
        'snow, will increase UV exposure.',
      'Reduce time in the sun between 10 a.m. and 4 p.m. If outdoors, seek shade and wear sun protective clothing, ' +
        'a wide-brimmed hat, and UV-blocking sunglasses. Generously apply broad spectrum SPF 30+ sunscreen every 2 ' +
        'hours, even on cloudy days, and after swimming or sweating. Bright surfaces, such sand, water and snow, will ' +
        'increase UV exposure.',
      'Minimize sun exposure between 10 a.m. and 4 p.m. If outdoors, seek shade and wear sun protective clothing, ' +
        'a wide-brimmed hat, and UV-blocking sunglasses. Generously apply broad spectrum SPF 30+ sunscreen every 2 ' +
        'hours, even on cloudy days, and after swimming or sweating. Bright surfaces, such as sand, water and snow, ' +
        'will increase UV exposure.',
      'Try to avoid sun exposure between 10 a.m. and 4 p.m. If outdoors, seek shade and wear sun protective clothing, ' +
        'a wide-brimmed hat, and UV-blocking sunglasses. Generously apply broad spectrum SPF 30+ sunscreen every ' +
        '2 hours, even on cloudy days, and after swimming or sweating. Bright surfaces, such as sand, water and snow, ' +
        'will increase UV exposure.',
    ][risk];
  };

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

  const getData = useCallback(async (): Promise<OneCallResponse> => {
    const res = await client.get(
      `/onecall?lat=43.074085&lon=-89.381027&exclude=minutely,hourly&appid=${keys.openWeatherMap}`
    );
    return res.data;
  }, []);

  const convertForecast = useCallback((daily: Array<RawForecast>): Array<Forecast> => {
    const result: Array<Forecast> = [];
    daily.forEach((day: RawForecast) => {
      result.push({
        date: new Date(day.dt * 1000),
        condition: day.weather[0].id,
        low: day.temp.min,
        high: day.temp.max,
      });
    });
    return result;
  }, []);

  const convert = useCallback(
    (data: OneCallResponse): CurrentWeather => {
      return {
        condition: data.current.weather[0].id,
        temperature: data.current.temp,
        uvIndex: data.current.uvi,
        forecasts: convertForecast(data.daily),
      };
    },
    [convertForecast]
  );

  const refresh = useCallback(async () => {
    const response = await getData();
    setWeatherData(convert(response));
  }, [getData, convert]);

  useEffect(() => {
    refresh();
    const id = setInterval(refresh, 1000 * 60 * 5);

    return () => {
      clearInterval(id);
    };
  }, [refresh]);

  return <WeatherContext.Provider value={{ weatherData, getUVAdvice }}>{children}</WeatherContext.Provider>;
};

export default WeatherProvider;
