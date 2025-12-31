import { useLanguage } from '../hooks/useLanguage';

export const WeatherRadar = () => {
  const lat = 46.855298;
  const lon = 17.347733;
  const { t } = useLanguage();
  
  // Using Windy.com as alternative to RainViewer
  // Windy offers better control and cleaner embed options
  // Parameters: level=surface (surface level), overlay=radar (radar overlay), lat/lon/zoom for location
  const windyUrl = `https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&detailLat=${lat}&detailLon=${lon}&width=650&height=450&zoom=10&level=surface&overlay=radar&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1`;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all hover:shadow-xl h-full">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
        <span className="text-3xl">🌦️</span>
        {t('weatherRadar')}
      </h2>
      <div className="relative w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-900" style={{ paddingBottom: '75%', minHeight: '300px' }}>
        <iframe
          src={windyUrl}
          className="absolute top-0 left-0 w-full h-full border-0"
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
            zIndex: 1
          }}
          title={t('weatherRadar')}
          allowFullScreen
          scrolling="no"
        />
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
        {t('location')}: {lat}, {lon} | {t('poweredBy')} <a href="https://www.windy.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Windy.com</a>
      </p>
    </div>
  );
};

