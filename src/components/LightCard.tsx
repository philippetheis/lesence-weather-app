import { WiDaySunny } from 'react-icons/wi';
import { MdWbSunny, MdOutlineWbSunny } from 'react-icons/md';
import { useLanguage } from '../hooks/useLanguage';
import type { LightData } from '../types/api';

interface LightCardProps {
  data: LightData;
}

export const LightCard = ({ data }: LightCardProps) => {
  const { ambient_lux, uvi, uva, uvb } = data.data;
  const { t } = useLanguage();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all hover:shadow-xl">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
        <WiDaySunny className="text-3xl text-yellow-400" />
        {t('lightSensor')}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex items-center gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <MdWbSunny className="text-4xl text-yellow-500" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('ambientLight')}</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{ambient_lux.toFixed(2)} lux</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
          <MdOutlineWbSunny className="text-4xl text-orange-500" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('uvIndex')}</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{uvi}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <MdOutlineWbSunny className="text-4xl text-red-500" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">UVA</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{uva}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <MdOutlineWbSunny className="text-4xl text-purple-500" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">UVB</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{uvb}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

