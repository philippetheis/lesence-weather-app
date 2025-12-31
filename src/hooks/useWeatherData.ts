import { useState, useEffect, useCallback } from 'react';
import { fetchWeatherData } from '../services/api';
import type { ApiResponse } from '../types/api';

const REFRESH_INTERVAL = 60000; // 60 seconds

export const useWeatherData = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchWeatherData();
      setData(response);
      setLastUpdate(new Date());
    } catch (err) {
      setError('Fehler beim Laden der Wetterdaten');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [loadData]);

  return { data, loading, error, lastUpdate, refresh: loadData };
};

