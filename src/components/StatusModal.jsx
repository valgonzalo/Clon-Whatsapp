import { X, UserPlus, CircleDashed } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function StatusModal({ isOpen, onClose }) {
  const { t } = useLanguage();

  if (!isOpen) return null;

  const statuses = [
    { id: 1, name: t('statusTitle1'), time: `${t('today')}, 10:30 AM`, image: 'https://ui-avatars.com/api/?name=Yo&background=dfe5e7&color=fff', viewed: false },
    { id: 2, name: 'Matias Gimenez', time: `${t('today')}, 09:15 AM`, image: 'https://ui-avatars.com/api/?name=Matias+Gimenez&background=0D8ABC&color=fff', viewed: true },
    { id: 3, name: 'Jacobo Winograd', time: `${t('yesterday')}, 11:45 PM`, image: 'https://ui-avatars.com/api/?name=Jacobo+Winograd&background=random', viewed: true },
    { id: 4, name: 'La Mosca', time: `${t('yesterday')}, 08:20 PM`, image: 'https://ui-avatars.com/api/?name=La+Mosca&background=random', viewed: false },
  ];

  return (
    <div className="modal-overlay fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="modal-contenido bg-white rounded-lg w-full max-w-md shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="modal-header bg-[#00a884] p-4 flex justify-between items-center text-white">
          <h3 className="titulo-modal text-lg font-medium flex items-center gap-2">
            <CircleDashed size={20} />
            {t('status')}
          </h3>
          <button onClick={onClose} className="boton-cerrar hover:bg-white/10 p-1 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="lista-estados p-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
          <div className="estado-propio flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer mb-4 border-b pb-4">
             <div className="relative">
               <img src={statuses[0].image} alt="Mi estado" className="w-12 h-12 rounded-full border-2 border-[#00a884] p-0.5" />
               <div className="absolute bottom-0 right-0 bg-[#00a884] rounded-full p-0.5 border-2 border-white">
                 <UserPlus size={10} className="text-white" />
               </div>
             </div>
              <div>
                <h4 className="font-medium text-[var(--text-primary)]">{t('statusTitle1')}</h4>
                <p className="text-sm text-[var(--text-secondary)]">{t('statusTitle2')}</p>
              </div>
          </div>

          <h4 className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider mb-3 px-2">{t('statusTitle3')}</h4>
          
          {statuses.slice(1).map((status) => (
            <div key={status.id} className="estado-item flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
              <div className={`relative rounded-full p-[2px] ${status.viewed ? 'bg-gray-300' : 'bg-[#00a884]'}`}>
                <img src={status.image} alt={status.name} className="w-10 h-10 rounded-full border-2 border-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 truncate">{status.name}</h4>
                <p className="text-sm text-gray-500">{status.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
