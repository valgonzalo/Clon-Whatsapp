import { useState } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { useChats } from '../context/ChatContext';
import { Search, MessageSquarePlus, MoreVertical, Users, CircleDashed } from 'lucide-react';
import NewChatModal from './NewChatModal';
import StatusModal from './StatusModal';
import SettingsModal from './SettingsModal';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

// Helper para formatear fechas estilo WhatsApp en la lista
const isValidIso = (str) => str && !isNaN(Date.parse(str)) && /\d{4}-\d{2}-\d{2}/.test(str);

const formatChatDate = (dateIso, language, t) => {
  if (!isValidIso(dateIso)) return dateIso || ''; // Fallback para timestamps legacy
  const date = new Date(dateIso);
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfMsg = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffDays = Math.round((startOfToday - startOfMsg) / (1000 * 60 * 60 * 24));
  
  const locale = language === 'es' ? 'es-AR' : 'en-US';

  if (diffDays === 0) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  if (diffDays === 1) return t('yesterday');
  if (diffDays < 7) {
    return new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date);
  }
  return date.toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' });
};

export default function ChatList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { chats, addChat } = useChats();
  const { user, setActiveView } = useAuth();
  const { t, language } = useLanguage();
  const location = useLocation();
  const filter = searchParams.get('filter') || '';
  const activeType = searchParams.get('type') || 'all';
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const filteredChats = chats.filter((chat) => {
    const matchesSearch = chat.name.toLowerCase().includes(filter.toLowerCase());
    if (!matchesSearch) return false;
    if (activeType === 'unread') return chat.unread > 0;
    if (activeType === 'groups') return chat.isGroup;
    if (activeType === 'favorites') return chat.isFavorite;
    return true; 
  });

  const handleSearch = (e) => {
    const value = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set('filter', value);
    } else {
      newParams.delete('filter');
    }
    setSearchParams(newParams);
  };

  const handleFilterClick = (type) => {
    const newParams = new URLSearchParams(searchParams);
    if (type === 'all') {
      newParams.delete('type');
    } else {
      newParams.set('type', type);
    }
    setSearchParams(newParams);
  };

  return (
    <div className="panel-lateral flex flex-col h-full bg-[var(--bg-side)] border-r border-[var(--border-default)] relative">
      {/* Encabezado */}
      <div className="encabezado-usuario !bg-transparent !border-b-0 py-6 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">Mensajes</h1>
        <div className="flex space-x-2">
          <button 
            title={t('newChat')} 
            className="p-2 text-[var(--text-secondary)] hover:bg-[var(--glass-bg)] rounded-full transition-colors" 
            onClick={() => setIsNewChatModalOpen(true)}
          >
            <MessageSquarePlus size={20} />
          </button>
          <button 
            title={t('settings')} 
            className="p-2 text-[var(--text-secondary)] hover:bg-[var(--glass-bg)] rounded-full transition-colors" 
            onClick={() => setIsSettingsModalOpen(true)}
          >
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Modales */}
      <NewChatModal
        isOpen={isNewChatModalOpen}
        onClose={() => setIsNewChatModalOpen(false)}
        onAdd={addChat}
      />
      <StatusModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
      />
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />

      {/* Filtros */}
      <div className="filtros-lista px-4 py-2 flex gap-2 overflow-x-auto custom-scrollbar bg-transparent">
        {['all', 'unread', 'favorites', 'groups'].map((f) => (
          <button
            key={f}
            onClick={() => handleFilterClick(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors capitalize ${
              activeType === f
                ? 'bg-[var(--accent-green)] text-[var(--bg-main)]'
                : 'bg-[var(--bg-search)]/50 text-[var(--text-secondary)] hover:bg-[var(--bg-search)] border border-[var(--border-default)]'
            }`}
          >
            {t(f)}
          </button>
        ))}
      </div>

      {/* Buscador */}
      <div className="contenedor-buscador !bg-transparent px-4 py-3">
        <div className="caja-busqueda !bg-[var(--bg-search)]/50 backdrop-blur-sm border border-[var(--border-default)] !rounded-xl px-4 flex items-center h-10">
          <Search className="w-4 h-4 text-[var(--text-secondary)] mr-3" />
          <input
            type="text"
            className="bg-transparent border-none outline-none text-sm text-[var(--text-primary)] w-full h-full"
            placeholder={t('searchPlaceholder')}
            value={filter}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Lista de chats */}
      <div className="lista-chats custom-scrollbar">
        {filteredChats.map((chat) => {
          const isActive = location.pathname === `/chat/${chat.id}`;
          return (
            <Link
              key={chat.id}
              to={`/chat/${chat.id}`}
              className={`item-chat mx-2 my-1 rounded-xl px-4 py-3 border border-transparent transition-all duration-300 ${
                isActive 
                  ? 'bg-[var(--bg-search)] border-[var(--border-default)] shadow-lg' 
                  : 'hover:bg-[var(--glass-bg)]'
              }`}
            >
              <img
                src={chat.avatar}
                alt={chat.name}
                className="avatar-contacto w-12 h-12 rounded-full object-cover mr-4 flex-shrink-0 grayscale-[0.2] hover:grayscale-0 transition-all"
              />
              <div className="info-chat flex-1 min-w-0">
                <div className="top-row flex justify-between items-baseline mb-1 gap-2">
                  <h3 className="nombre-contacto text-[16px] text-[var(--text-primary)] truncate font-medium flex-1 min-w-0">
                    {chat.name}
                  </h3>
                  <span className={`hora-mensaje text-[11px] shrink-0 ${chat.unread > 0 ? 'text-[var(--accent-green)] font-bold' : 'text-[var(--text-secondary)]'}`}>
                    {formatChatDate(chat.timestamp, language, t)}
                  </span>
                </div>
                <div className="bottom-row flex justify-between items-center">
                  <p className="ultimo-mensaje text-[13px] text-[var(--text-secondary)] truncate flex-1 mr-2 leading-tight">
                    {chat.lastMessage}
                  </p>
                  {chat.unread > 0 && (
                    <div className="badge-unread bg-[var(--accent-green)] text-[var(--bg-main)] text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                      {chat.unread}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
        {filteredChats.length === 0 && (
          <div className="mensaje-vacio p-8 text-center text-[#8696a0] text-sm italic">
            {t('noChats')}
          </div>
        )}
      </div>
    </div>
  );
}
