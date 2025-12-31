import axios from 'axios';
import type { ApiResponse } from '../types/api';

const API_URL = 'https://lesence-live.stackforge.cc/latest?token=lesence_live_7d9f6g1c9a3e5f0a2c8e7d1b6a5f9c2';

export const fetchWeatherData = async (): Promise<ApiResponse> => {
  try {
    const response = await axios.get<ApiResponse>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

