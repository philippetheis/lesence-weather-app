export interface WeatherData {
  v: number;
  ts: number;
  station: string;
  type: 'weather';
  data: {
    temperature_c: number;
    humidity_pct: number;
    wind_speed_ms: number;
    wind_gust_ms: number;
    wind_direction_deg: number;
    wind_direction_cardinal: string;
    rain_total_mm: number;
    rain_day_mm: number;
    battery_low: boolean;
  };
}

export interface PowerData {
  v: number;
  ts: number;
  station: string;
  type: 'power';
  data: {
    voltage_v: number;
    current_a: number;
    power_w: number;
  };
}

export interface LightData {
  v: number;
  ts: number;
  station: string;
  type: 'light';
  data: {
    ambient_lux: number;
    uvi: number;
    uva: number;
    uvb: number;
  };
}

export interface ApiResponse {
  ok: boolean;
  ts: number;
  data: {
    weather: WeatherData;
    power: PowerData;
    light: LightData;
  };
}

