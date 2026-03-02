import { X, Moon, Sun, Languages } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function SettingsModal({ isOpen, onClose }) {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-[var(--bg-app)] rounded-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 bg-[var(--bg-header)] border-b border-[var(--border-default)]">
          <h2 className="text-lg font-medium text-[var(--text-primary)]">{t('settings')}</h2>
          <button onClick={onClose} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Theme Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-[var(--text-secondary)]">
              {theme === 'light' ? <Sun size={20} /> : <Moon size={20} />}
              <span className="font-medium">{t('theme')}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-[var(--bg-header)] rounded-lg">
              <span className="text-[var(--text-primary)]">{t('darkMode')}</span>
              <button
                onClick={toggleTheme}
                className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                  theme === 'dark' ? 'bg-[#00a884]' : 'bg-gray-400'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                    theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Language Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-[var(--text-secondary)]">
              <Languages size={20} />
              <span className="font-medium">{t('language')}</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setLanguage('es')}
                className={`p-3 rounded-lg border transition-all ${
                  language === 'es'
                    ? 'border-[#00a884] bg-[#00a884]/10 text-[#00a884]'
                    : 'border-[var(--border-default)] text-[var(--text-primary)] hover:bg-[var(--bg-header)]'
                }`}
              >
                Español
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`p-3 rounded-lg border transition-all ${
                  language === 'en'
                    ? 'border-[#00a884] bg-[#00a884]/10 text-[#00a884]'
                    : 'border-[var(--border-default)] text-[var(--text-primary)] hover:bg-[var(--bg-header)]'
                }`}
              >
                English
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 bg-[var(--bg-header)] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#00a884] hover:opacity-90 text-white rounded-full font-medium transition-all"
          >
            {t('close')}
          </button>
        </div>
      </div>
    </div>
  );
}
