import { useWeatherData } from './hooks/useWeatherData';
import { Header } from './components/Header';
import { WeatherCard } from './components/WeatherCard';
import { WeatherRadar } from './components/WeatherRadar';
import { WeatherForecast } from './components/WeatherForecast';
import { PowerCard } from './components/PowerCard';
import { LightCard } from './components/LightCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';

function App() {
  const { data, loading, error, lastUpdate, refresh } = useWeatherData();

  if (loading && !data) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <Header lastUpdate={lastUpdate} onRefresh={refresh} loading={loading} />
      
      <main className="container mx-auto px-4 py-8">
        {error && !data ? (
          <ErrorMessage message={error} onRetry={refresh} />
        ) : (
          <>
            {data && (
              <>
                <div className="mb-8">
                  <WeatherCard data={data.data.weather} />
                </div>
                
                <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <WeatherRadar />
                  <WeatherForecast />
                </div>
                
                <div className="mb-8">
                  <LightCard data={data.data.light} />
                </div>
                
                <div className="mb-8">
                  <PowerCard data={data.data.power} />
                </div>
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;

