import { HiLightningBolt } from 'react-icons/hi';
import { MdBatteryChargingFull, MdPower } from 'react-icons/md';
import { useLanguage } from '../hooks/useLanguage';
import type { PowerData } from '../types/api';

interface PowerCardProps {
  data: PowerData;
}

export const PowerCard = ({ data }: PowerCardProps) => {
  const { voltage_v, current_a, power_w } = data.data;
  const { t } = useLanguage();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all hover:shadow-xl">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
        <HiLightningBolt className="text-3xl text-yellow-500" />
        {t('remoteStation')}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <MdBatteryChargingFull className="text-4xl text-yellow-500" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('voltage')}</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{voltage_v.toFixed(2)} V</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
          <HiLightningBolt className="text-4xl text-orange-500" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('current')}</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{current_a.toFixed(3)} A</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <MdPower className="text-4xl text-red-500" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('power')}</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{power_w.toFixed(2)} W</p>
          </div>
        </div>
      </div>
    </div>
  );
};

