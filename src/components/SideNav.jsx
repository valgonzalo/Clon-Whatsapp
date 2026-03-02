import { MessageCircle, Settings, Users, CircleDashed, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import SettingsModal from './SettingsModal';

export default function SideNav() {
  const { user, logout, setActiveView } = useAuth();
  const { t } = useLanguage();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="w-[64px] h-full flex flex-col items-center py-4 bg-[var(--bg-header)] border-r border-[var(--border-default)] z-30">
      <div className="flex flex-col space-y-6 flex-1">
        <button 
          onClick={() => setActiveView('welcome')}
          className="p-3 text-[var(--text-header)] hover:text-[var(--accent-green)] transition-all hover:bg-[var(--glass-bg)] rounded-xl group relative"
          title={t('chat')}
        >
          <MessageCircle size={24} />
          <div className="absolute left-full ml-2 px-2 py-1 bg-[var(--bg-header)] text-[var(--text-primary)] text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 border border-[var(--border-default)]">
            Chats
          </div>
        </button>

        <button className="p-3 text-[var(--text-header)] hover:text-[var(--accent-green)] transition-all hover:bg-[var(--glass-bg)] rounded-xl group relative">
          <CircleDashed size={24} />
          <div className="absolute left-full ml-2 px-2 py-1 bg-[var(--bg-header)] text-[var(--text-primary)] text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 border border-[var(--border-default)]">
            {t('status')}
          </div>
        </button>

        <button className="p-3 text-[var(--text-header)] hover:text-[var(--accent-green)] transition-all hover:bg-[var(--glass-bg)] rounded-xl group relative">
          <Users size={24} />
          <div className="absolute left-full ml-2 px-2 py-1 bg-[var(--bg-header)] text-[var(--text-primary)] text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 border border-[var(--border-default)]">
            {t('communities')}
          </div>
        </button>
      </div>

      <div className="flex flex-col space-y-4 items-center">
        <button 
          onClick={() => setIsSettingsOpen(true)}
          className="p-3 text-[var(--text-header)] hover:text-[var(--accent-green)] transition-all hover:bg-[var(--glass-bg)] rounded-xl group relative"
        >
          <Settings size={22} />
          <div className="absolute left-full ml-2 px-2 py-1 bg-[var(--bg-header)] text-[var(--text-primary)] text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 border border-[var(--border-default)]">
            {t('settings')}
          </div>
        </button>

        <SettingsModal 
          isOpen={isSettingsOpen} 
          onClose={() => setIsSettingsOpen(false)} 
        />

        <button 
          onClick={logout}
          className="p-3 text-[#aebac1] hover:text-red-400 transition-all hover:bg-red-400/10 rounded-xl group relative"
        >
          <LogOut size={22} />
        </button>

        <div 
          className="w-10 h-10 rounded-full bg-[var(--bg-header)] overflow-hidden cursor-pointer hover:ring-2 hover:ring-[var(--accent-green)] transition-all"
          onClick={() => setActiveView('profile')}
        >
          <img 
            src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=dfe5e7&color=fff`} 
            alt="User" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
