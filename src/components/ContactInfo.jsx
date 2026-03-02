import { X, Star, Slash, Trash2, ChevronRight, Bell, Clock, MinusCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ContactInfoView({ contact, onBack }) {
  const { t } = useLanguage();

  if (!contact) return null;

  return (
    <div className="flex-1 h-full bg-[var(--bg-main)] flex flex-col animate-slide-right border-l border-[var(--border-default)]">
      {/* Header */}
      <div className="bg-[var(--bg-header)] h-[60px] flex items-center px-4 space-x-6 text-[var(--text-primary)] border-b border-[var(--border-default)] shrink-0">
        <button onClick={onBack} className="text-[#8696a0] hover:text-[#54656f]">
          <X size={24} />
        </button>
        <h2 className="text-[19px] font-medium leading-[28px] overflow-hidden text-ellipsis whitespace-nowrap">{t('contactInfo')}</h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-[var(--bg-main)] custom-scrollbar">
        {/* Profile Card */}
        <div className="bg-[var(--bg-app)] py-7 flex flex-col items-center shadow-sm mb-2">
          <img 
            src={contact.avatar} 
            alt={contact.name} 
            className="w-48 h-48 rounded-full object-cover mb-4 shadow-md"
          />
          <h2 className="text-[20px] text-[var(--text-primary)] font-normal">{contact.name}</h2>
          <p className="text-[14px] text-[var(--text-secondary)] mt-1">{contact.isGroup ? t('group') : t('online')}</p>
        </div>

        {/* Info / Status */}
        {!contact.isGroup && (
          <div className="bg-[var(--bg-app)] px-8 py-4 shadow-sm mb-2">
            <label className="text-xs text-[var(--text-secondary)] mb-2 block font-normal">{t('info')}</label>
            <p className="text-[17px] text-[var(--text-primary)]">¡Hola! Estoy usando WhatsApp.</p>
            <p className="text-[12px] text-[var(--text-secondary)] mt-1">20 de febrero</p>
          </div>
        )}

        {/* Media & Links */}
        <div className="bg-[var(--bg-app)] px-8 py-4 shadow-sm mb-2">
          <div className="flex items-center justify-between cursor-pointer hover:bg-[var(--bg-header)] -mx-8 px-8 py-1 transition-colors">
            <span className="text-[14px] text-[var(--text-secondary)]">{t('mediaLinksDocs')}</span>
            <div className="flex items-center text-[var(--text-secondary)]">
              <span className="text-[14px] mr-2">0</span>
              <ChevronRight size={18} />
            </div>
          </div>
        </div>

        {/* Actions List */}
        <div className="bg-[var(--bg-app)] shadow-sm mb-2">
          <div className="flex items-center px-8 py-4 cursor-pointer hover:bg-[var(--bg-header)] transition-colors">
             <Star size={20} className="mr-6 text-[#8696a0]" />
             <span className="text-[16px] text-[var(--text-primary)] flex-1">{t('featuredMessages')}</span>
             <ChevronRight size={18} className="text-[#8696a0]" />
          </div>
          <div className="flex items-center px-8 py-4 cursor-pointer hover:bg-[var(--bg-header)] transition-colors">
             <Bell size={20} className="mr-6 text-[#8696a0]" />
             <span className="text-[16px] text-[var(--text-primary)] flex-1">{t('muteNotifications')}</span>
             <ChevronRight size={18} className="text-[#8696a0]" />
          </div>
          <div className="flex items-center px-8 py-4 cursor-pointer hover:bg-[var(--bg-header)] transition-colors">
             <Clock size={20} className="mr-6 text-[#8696a0]" />
             <div className="flex-1">
               <p className="text-[16px] text-[var(--text-primary)]">{t('tempMessages')}</p>
               <p className="text-[13px] text-[var(--text-secondary)]">{t('off')}</p>
             </div>
             <ChevronRight size={18} className="text-[#8696a0]" />
          </div>
        </div>

        {/* Critical Actions */}
        <div className="bg-[var(--bg-app)] shadow-sm mb-8">
           <div className="flex items-center px-8 py-4 cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors text-[#ea0038]">
             <MinusCircle size={20} className="mr-6" />
             <span className="text-[16px]">{t('blockContact')} {contact.name}</span>
           </div>
           <div className="flex items-center px-8 py-4 cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors text-[#ea0038]">
             <Slash size={20} className="mr-6" />
             <span className="text-[16px]">{t('reportContact')} {contact.name}</span>
           </div>
           <div className="flex items-center px-8 py-4 cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors text-[#ea0038]">
             <Trash2 size={20} className="mr-6" />
             <span className="text-[16px]">{t('deleteChat')}</span>
           </div>
        </div>
      </div>
    </div>
  );
}
