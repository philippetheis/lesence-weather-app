export type Language = 'de' | 'en' | 'hu';

export interface Translations {
  [key: string]: {
    de: string;
    en: string;
    hu: string;
  };
}

export const translations: Translations = {
  // App Title
  appTitle: {
    de: 'Lesence Wetter',
    en: 'Lesence Weather',
    hu: 'Lesence Időjárás',
  },
  
  // Header
  lastUpdate: {
    de: 'Letzte Aktualisierung',
    en: 'Last Update',
    hu: 'Utolsó frissítés',
  },
  refresh: {
    de: 'Aktualisieren',
    en: 'Refresh',
    hu: 'Frissítés',
  },
  loading: {
    de: 'Lädt...',
    en: 'Loading...',
    hu: 'Betöltés...',
  },
  
  // Weather Card
  weatherData: {
    de: 'Wetterdaten',
    en: 'Weather Data',
    hu: 'Időjárási adatok',
  },
  temperature: {
    de: 'Temperatur',
    en: 'Temperature',
    hu: 'Hőmérséklet',
  },
  humidity: {
    de: 'Luftfeuchtigkeit',
    en: 'Humidity',
    hu: 'Páratartalom',
  },
  wind: {
    de: 'Wind',
    en: 'Wind',
    hu: 'Szél',
  },
  gusts: {
    de: 'Böen',
    en: 'Gusts',
    hu: 'Széllökések',
  },
  direction: {
    de: 'Richtung',
    en: 'Direction',
    hu: 'Irány',
  },
  rain: {
    de: 'Regen',
    en: 'Rain',
    hu: 'Eső',
  },
  today: {
    de: 'heute',
    en: 'today',
    hu: 'ma',
  },
  total: {
    de: 'Gesamt',
    en: 'Total',
    hu: 'Összesen',
  },
  
  // Weather Radar
  weatherRadar: {
    de: 'Wetter-Radar',
    en: 'Weather Radar',
    hu: 'Időjárási radar',
  },
  location: {
    de: 'Standort',
    en: 'Location',
    hu: 'Helyszín',
  },
  poweredBy: {
    de: 'Powered by',
    en: 'Powered by',
    hu: 'Szolgáltató',
  },
  
  // Forecast
  weatherForecast: {
    de: 'Wettervorhersage',
    en: 'Weather Forecast',
    hu: 'Időjárás előrejelzés',
  },
  lesencetomaj: {
    de: 'Lesencetomaj, Ungarn',
    en: 'Lesencetomaj, Hungary',
    hu: 'Lesencetomaj, Magyarország',
  },
  
  // Power Card
  remoteStation: {
    de: 'Remote Station (Power)',
    en: 'Remote Station (Power)',
    hu: 'Távoli állomás (Energia)',
  },
  voltage: {
    de: 'Spannung',
    en: 'Voltage',
    hu: 'Feszültség',
  },
  current: {
    de: 'Strom',
    en: 'Current',
    hu: 'Áramerősség',
  },
  power: {
    de: 'Leistung',
    en: 'Power',
    hu: 'Teljesítmény',
  },
  
  // Light Card
  lightSensor: {
    de: 'Light Sensor',
    en: 'Light Sensor',
    hu: 'Fényérzékelő',
  },
  ambientLight: {
    de: 'Umgebungslicht',
    en: 'Ambient Light',
    hu: 'Környezeti fény',
  },
  uvIndex: {
    de: 'UV-Index',
    en: 'UV Index',
    hu: 'UV index',
  },
  
  // Error Messages
  errorLoadingData: {
    de: 'Fehler beim Laden der Wetterdaten',
    en: 'Error loading weather data',
    hu: 'Hiba az időjárási adatok betöltésekor',
  },
  retry: {
    de: 'Erneut versuchen',
    en: 'Retry',
    hu: 'Újrapróbálás',
  },
  forecastError: {
    de: 'Forecast konnte nicht geladen werden',
    en: 'Forecast could not be loaded',
    hu: 'Az előrejelzés nem tölthető be',
  },
  
  // Wind Directions
  north: {
    de: 'N',
    en: 'N',
    hu: 'É',
  },
  northeast: {
    de: 'NO',
    en: 'NE',
    hu: 'ÉK',
  },
  east: {
    de: 'O',
    en: 'E',
    hu: 'K',
  },
  southeast: {
    de: 'SO',
    en: 'SE',
    hu: 'DK',
  },
  south: {
    de: 'S',
    en: 'S',
    hu: 'D',
  },
  southwest: {
    de: 'SW',
    en: 'SW',
    hu: 'DNy',
  },
  west: {
    de: 'W',
    en: 'W',
    hu: 'Ny',
  },
  northwest: {
    de: 'NW',
    en: 'NW',
    hu: 'ÉNy',
  },
  
  // Weather descriptions
  clear: {
    de: 'Klar',
    en: 'Clear',
    hu: 'Tiszta',
  },
  mainlyClear: {
    de: 'Überwiegend klar',
    en: 'Mainly clear',
    hu: 'Többnyire tiszta',
  },
  partlyCloudy: {
    de: 'Teilweise bewölkt',
    en: 'Partly cloudy',
    hu: 'Részben felhős',
  },
  overcast: {
    de: 'Bedeckt',
    en: 'Overcast',
    hu: 'Felhős',
  },
  fog: {
    de: 'Nebel',
    en: 'Fog',
    hu: 'Köd',
  },
  freezingFog: {
    de: 'Gefrierender Nebel',
    en: 'Freezing fog',
    hu: 'Fagyos köd',
  },
  lightDrizzle: {
    de: 'Leichter Nieselregen',
    en: 'Light drizzle',
    hu: 'Enyhe szitálás',
  },
  moderateDrizzle: {
    de: 'Mäßiger Nieselregen',
    en: 'Moderate drizzle',
    hu: 'Mérsékelt szitálás',
  },
  heavyDrizzle: {
    de: 'Starker Nieselregen',
    en: 'Heavy drizzle',
    hu: 'Erős szitálás',
  },
  lightRain: {
    de: 'Leichter Regen',
    en: 'Light rain',
    hu: 'Enyhe eső',
  },
  moderateRain: {
    de: 'Mäßiger Regen',
    en: 'Moderate rain',
    hu: 'Mérsékelt eső',
  },
  heavyRain: {
    de: 'Starker Regen',
    en: 'Heavy rain',
    hu: 'Erős eső',
  },
  lightSnow: {
    de: 'Leichter Schneefall',
    en: 'Light snow',
    hu: 'Enyhe hó',
  },
  moderateSnow: {
    de: 'Mäßiger Schneefall',
    en: 'Moderate snow',
    hu: 'Mérsékelt hó',
  },
  heavySnow: {
    de: 'Starker Schneefall',
    en: 'Heavy snow',
    hu: 'Erős hó',
  },
  lightShowers: {
    de: 'Leichte Regenschauer',
    en: 'Light showers',
    hu: 'Enyhe zápor',
  },
  moderateShowers: {
    de: 'Mäßige Regenschauer',
    en: 'Moderate showers',
    hu: 'Mérsékelt zápor',
  },
  heavyShowers: {
    de: 'Starke Regenschauer',
    en: 'Heavy showers',
    hu: 'Erős zápor',
  },
  thunderstorm: {
    de: 'Gewitter',
    en: 'Thunderstorm',
    hu: 'Zivatar',
  },
  unknown: {
    de: 'Unbekannt',
    en: 'Unknown',
    hu: 'Ismeretlen',
  },
};

export const getTranslation = (key: string, lang: Language): string => {
  return translations[key]?.[lang] || translations[key]?.['en'] || key;
};

export const detectLanguage = (): Language => {
  if (typeof window === 'undefined') return 'de';
  
  const browserLang = navigator.language || (navigator as any).userLanguage;
  const lang = browserLang.split('-')[0].toLowerCase();
  
  if (lang === 'hu') return 'hu';
  if (lang === 'en') return 'en';
  return 'de'; // Default to German
};

