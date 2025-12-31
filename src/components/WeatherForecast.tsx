import { useState, useEffect } from 'react';
import { WiRain, WiStrongWind } from 'react-icons/wi';
import { useLanguage } from '../hooks/useLanguage';
import axios from 'axios';

interface ForecastDay {
  date: string;
  temp_max: number;
  temp_min: number;
  description: string;
  icon: string;
  humidity: number;
  wind_speed: number;
  rain?: number;
}

export const WeatherForecast = () => {
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t, language } = useLanguage();

  // Lesencetomaj, Ungarn Koordinaten
  const lat = 46.855298;
  const lon = 17.347733;

  const getWeatherDescription = (code: number): string => {
    const codeMap: Record<number, string> = {
      0: 'clear',
      1: 'mainlyClear',
      2: 'partlyCloudy',
      3: 'overcast',
      45: 'fog',
      48: 'freezingFog',
      51: 'lightDrizzle',
      53: 'moderateDrizzle',
      55: 'heavyDrizzle',
      56: 'lightDrizzle',
      57: 'heavyDrizzle',
      61: 'lightRain',
      63: 'moderateRain',
      65: 'heavyRain',
      66: 'lightRain',
      67: 'heavyRain',
      71: 'lightSnow',
      73: 'moderateSnow',
      75: 'heavySnow',
      77: 'lightSnow',
      80: 'lightShowers',
      81: 'moderateShowers',
      82: 'heavyShowers',
      85: 'lightSnow',
      86: 'heavySnow',
      95: 'thunderstorm',
      96: 'thunderstorm',
      99: 'thunderstorm',
    };
    const key = codeMap[code] || 'unknown';
    return t(key);
  };

  const getWeatherIcon = (code: number): string => {
    if (code === 0 || code === 1) return '☀️';
    if (code === 2 || code === 3) return '⛅';
    if (code >= 45 && code <= 48) return '🌫️';
    if (code >= 51 && code <= 67) return '🌧️';
    if (code >= 71 && code <= 77) return '❄️';
    if (code >= 80 && code <= 86) return '🌦️';
    if (code >= 95) return '⛈️';
    return '☁️';
  };

  const getLocale = (): string => {
    if (language === 'hu') return 'hu-HU';
    if (language === 'en') return 'en-US';
    return 'de-DE';
  };

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_sum,windspeed_10m_max&timezone=Europe/Budapest&forecast_days=5`
        );

        const data = response.data;
        const locale = getLocale();
        const forecastData: ForecastDay[] = data.daily.time.map((date: string, index: number) => {
          const weatherCode = data.daily.weathercode[index];
          const description = getWeatherDescription(weatherCode);
          const icon = getWeatherIcon(weatherCode);

          return {
            date: new Date(date).toLocaleDateString(locale, { weekday: 'short', day: 'numeric', month: 'short' }),
            temp_max: Math.round(data.daily.temperature_2m_max[index]),
            temp_min: Math.round(data.daily.temperature_2m_min[index]),
            description,
            icon,
            humidity: 0,
            wind_speed: Math.round(data.daily.windspeed_10m_max[index] * 3.6),
            rain: data.daily.precipitation_sum[index] || 0,
          };
        });

        setForecast(forecastData);
      } catch (err: any) {
        console.error('Error fetching forecast:', err);
        setError(t('forecastError'));
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [language, t]);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
          <span className="text-3xl">📅</span>
          {t('weatherForecast')}
        </h2>
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
          <span className="text-3xl">📅</span>
          {t('weatherForecast')}
        </h2>
        <p className="text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all hover:shadow-xl h-full">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
        <span className="text-3xl">📅</span>
        {t('weatherForecast')}
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{t('lesencetomaj')}</p>
      
      <div className="space-y-3">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
          >
            <div className="flex items-center gap-3 flex-1">
              <span className="text-2xl">{day.icon}</span>
              <div className="flex-1">
                <p className="font-semibold text-gray-800 dark:text-white text-sm">{day.date}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{day.description}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-right">
              <div>
                <p className="text-lg font-bold text-gray-800 dark:text-white">
                  {day.temp_max}°
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {day.temp_min}°
                </p>
              </div>
              
              <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                {day.rain && day.rain > 0 && (
                  <p className="flex items-center gap-1">
                    <WiRain className="text-base" /> {day.rain.toFixed(1)}mm
                  </p>
                )}
                <p className="flex items-center gap-1">
                  <WiStrongWind className="text-base" /> {day.wind_speed} km/h
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
