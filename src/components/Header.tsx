import { HiSun, HiMoon } from 'react-icons/hi';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import { formatDate } from '../utils/format';

interface HeaderProps {
  lastUpdate: Date | null;
  onRefresh: () => void;
  loading: boolean;
}

export const Header = ({ lastUpdate, onRefresh, loading }: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();
  const { t, language } = useLanguage();

  const getLocale = (): string => {
    if (language === 'hu') return 'hu-HU';
    if (language === 'en') return 'en-US';
    return 'de-DE';
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              {t('appTitle')}
            </h1>
            {lastUpdate && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {t('lastUpdate')}: {formatDate(lastUpdate, getLocale())}
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={onRefresh}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg transition-colors font-medium"
            >
              {loading ? t('loading') : t('refresh')}
            </button>
            
            <button
              onClick={toggleTheme}
              className="p-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
              aria-label="Theme umschalten"
            >
              {theme === 'dark' ? (
                <HiSun className="text-2xl text-yellow-500" />
              ) : (
                <HiMoon className="text-2xl text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

