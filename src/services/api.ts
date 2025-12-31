import axios from 'axios';
import type { ApiResponse } from '../types/api';

// Use proxy endpoint to avoid CORS issues
const API_URL = '/api/latest?token=lesence_live_7d9f6g1c9a3e5f0a2c8e7d1b6a5f9c2';

export const fetchWeatherData = async (): Promise<ApiResponse> => {
  try {
    const response = await axios.get<ApiResponse>(API_URL, {
      headers: {
        'Accept': 'application/json',
      },
      timeout: 10000, // 10 seconds timeout
    });
    return response.data;
  } catch (error: any) {
    console.error('Error fetching weather data:', error);
    
    // Provide more detailed error information
    if (error.response) {
      // Server responded with error status
      console.error('Response error:', error.response.status, error.response.data);
      throw new Error(`API Error: ${error.response.status} - ${error.response.statusText}`);
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received:', error.request);
      throw new Error('Keine Antwort vom Server. Bitte prüfe deine Internetverbindung.');
    } else if (error.code === 'ERR_NETWORK' || error.message?.includes('CORS')) {
      // CORS or network error
      console.error('CORS/Network error:', error.message);
      throw new Error('CORS-Fehler: Die API erlaubt keine Anfragen von diesem Browser. Bitte prüfe die API-Konfiguration.');
    } else {
      // Something else happened
      throw new Error(error.message || 'Unbekannter Fehler beim Laden der Daten');
    }
  }
};

