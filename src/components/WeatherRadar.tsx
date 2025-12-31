export const WeatherRadar = () => {
  const lat = 46.855298;
  const lon = 17.347733;
  
  // Using RainViewer API for weather radar
  const radarUrl = `https://www.rainviewer.com/map.html?loc=${lat},${lon},10&oFa=0&oC=0&oU=0&oCS=1&oF=0&oAP=0&c=1&o=83&lm=0&th=0&sm=1&sn=1`;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all hover:shadow-xl">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
        <span className="text-3xl">🌦️</span>
        Wetter-Radar
      </h2>
      <div className="relative w-full" style={{ paddingBottom: '75%' }}>
        <iframe
          src={radarUrl}
          className="absolute top-0 left-0 w-full h-full rounded-lg border-0"
          title="Wetter-Radar"
          allowFullScreen
        />
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
        Standort: {lat}, {lon}
      </p>
    </div>
  );
};

