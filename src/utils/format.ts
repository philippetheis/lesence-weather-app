export const formatDate = (date: Date, locale: string = 'de-DE'): string => {
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date);
};

export const formatTime = (date: Date, locale: string = 'de-DE'): string => {
  return new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date);
};

export const getWindDirectionIcon = (direction: string): string => {
  const directions: Record<string, string> = {
    'n': '↑',
    'ne': '↗',
    'e': '→',
    'se': '↘',
    's': '↓',
    'sw': '↙',
    'w': '←',
    'nw': '↖',
  };
  return directions[direction.toLowerCase()] || '→';
};

