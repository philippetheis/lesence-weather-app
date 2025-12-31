import { WiThermometer, WiHumidity, WiStrongWind, WiRain } from 'react-icons/wi';
import { getWindDirectionIcon } from '../utils/format';
import type { WeatherData } from '../types/api';

interface WeatherCardProps {
  data: WeatherData;
}

export const WeatherCard = ({ data }: WeatherCardProps) => {
  const { temperature_c, humidity_pct, wind_speed_ms, wind_gust_ms, wind_direction_cardinal, rain_total_mm, rain_day_mm } = data.data;
  
  // Convert m/s to km/h (multiply by 3.6)
  const windSpeedKmh = (wind_speed_ms * 3.6).toFixed(1);
  const windGustKmh = (wind_gust_ms * 3.6).toFixed(1);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all hover:shadow-xl">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
        <WiThermometer className="text-3xl text-blue-500" />
        Wetterdaten
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <WiThermometer className="text-4xl text-blue-500" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Temperatur</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{temperature_c.toFixed(2)} °C</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <WiHumidity className="text-4xl text-green-500" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Luftfeuchtigkeit</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{humidity_pct} %</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <WiStrongWind className="text-4xl text-purple-500" />
          <div className="flex-1">
            <p className="text-sm text-gray-600 dark:text-gray-400">Wind</p>
            <p className="text-xl font-bold text-gray-800 dark:text-white">
              {windSpeedKmh} km/h <span className="text-sm font-normal text-gray-600 dark:text-gray-400">({wind_speed_ms.toFixed(1)} m/s)</span>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Böen: {windGustKmh} km/h ({wind_gust_ms.toFixed(1)} m/s)
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
              Richtung: {getWindDirectionIcon(wind_direction_cardinal)} {wind_direction_cardinal.toUpperCase()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
          <WiRain className="text-4xl text-cyan-500" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Regen</p>
            <p className="text-xl font-bold text-gray-800 dark:text-white">
              {rain_day_mm} mm (heute)
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Gesamt: {rain_total_mm} mm
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

