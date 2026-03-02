import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Check, Camera, Pencil } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ProfileView() {
  const { user, updateProfile, setActiveView } = useAuth();
  const { t } = useLanguage();
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(user?.name || '');
  const fileInputRef = useRef(null);

  const handleSaveName = () => {
    if (newName.trim()) {
      updateProfile({ name: newName });
      setIsEditingName(false);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfile({ avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex-1 h-full bg-[#f0f2f5] dark:bg-[#0c1317] flex flex-col animate-slide-right">
      {/* Header */}
      <div className="bg-[#008069] dark:bg-[#202c33] h-[108px] flex items-end p-5 text-white shrink-0">
        <div className="flex items-center space-x-6">
          <button onClick={() => setActiveView('welcome')} className="hover:bg-black/10 p-1 rounded-full transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-[19px] font-medium leading-[28px] overflow-hidden text-ellipsis whitespace-nowrap">{t('profile')}</h2>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[800px] mx-auto w-full">
          {/* Avatar Section */}
          <div className="flex flex-col items-center py-7">
            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <img 
                src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=dfe5e7&color=fff`} 
                alt="Profile" 
                className="w-48 h-48 rounded-full object-cover shadow-lg"
              />
              <div className="absolute inset-0 bg-black/30 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs text-center p-4">
                <Camera size={24} className="mb-2" />
                <span>{t('changeProfilePhoto')}</span>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleAvatarChange}
              />
            </div>
          </div>

          {/* Name Section */}
          <div className="bg-[var(--bg-app)] px-8 py-4 shadow-sm">
            <label className="text-xs text-[#008069] dark:text-[#00a884] mb-4 block">{t('yourName')}</label>
            <div className="flex items-center justify-between">
              {isEditingName ? (
                <div className="flex-1 flex items-center border-b-2 border-[#00a884] pb-1">
                  <input 
                    type="text" 
                    value={newName} 
                    onChange={(e) => setNewName(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-[var(--text-primary)]"
                    autoFocus
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                  />
                  <button onClick={handleSaveName} className="text-[#8696a0]">
                    <Check size={20} />
                  </button>
                </div>
              ) : (
                <>
                  <span className="text-[var(--text-primary)] text-[17px]">{user?.name}</span>
                  <button onClick={() => setIsEditingName(true)} className="text-[#8696a0]">
                    <Pencil size={20} />
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="px-8 py-5 text-sm text-[var(--text-secondary)] leading-tight">
            {t('nameInstruction')}
          </div>

          {/* Info / Status */}
          <div className="bg-[var(--bg-app)] px-8 py-4 shadow-sm mb-2">
            <label className="text-xs text-[var(--text-secondary)] mb-2 block font-normal">{t('info')}</label>
            <div className="flex items-center justify-between">
              <span className="text-[var(--text-primary)] text-[17px]">{t('available')}</span>
              <button className="text-[#8696a0]">
                <Pencil size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
