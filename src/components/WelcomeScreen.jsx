import { Lock, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function WelcomeScreen() {
  const { t } = useLanguage();

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[var(--bg-chat)] border-b-[6px] border-[var(--accent-green)]/20 min-w-0 relative overflow-hidden text-[var(--text-primary)]">
      {/* Premium Hub Animation */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-10 pointer-events-none">
        <div className="w-[600px] h-[600px] bg-gradient-to-r from-[#00a884] to-blue-500 rounded-full blur-[120px] animate-pulse"></div>
      </div>

      <div className="welcome-content max-w-[560px] text-center flex flex-col items-center z-10">
        <div className="relative mb-12 animate-hub">
          <div className="absolute inset-0 bg-[var(--accent-green)] rounded-full blur-[40px] opacity-20"></div>
          <div className="w-[180px] h-[180px] bg-[var(--bg-header)] border border-[var(--border-default)] rounded-full flex items-center justify-center text-[var(--accent-green)] shadow-2xl relative z-10">
            <MessageCircle size={100} strokeWidth={1} />
          </div>
        </div>

        <h1 className="text-[36px] font-light text-[var(--text-primary)] mb-4">
          {t('welcomeTitle')}
        </h1>
        <p className="text-[var(--text-secondary)] text-[15px] leading-relaxed max-w-[420px] mb-8">
          Envía y recibe mensajes sin necesidad de mantener tu teléfono conectado.
          <br />
          <span className="opacity-80">WhatsApp funciona en todos tus dispositivos sincronizados.</span>
        </p>

        <div className="flex items-center text-[var(--accent-green)] px-6 py-2 bg-[var(--accent-green)]/10 rounded-full text-sm font-medium border border-[var(--accent-green)]/20">
          <Lock className="w-4 h-4 mr-2" />
          {t('encryptedText')}
        </div>
      </div>

      <div className="absolute bottom-10 text-[13px] text-[var(--text-secondary)]">
        hecho por val.developer
      </div>
    </div>
  );
}
