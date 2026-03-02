import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useChats } from '../context/ChatContext';
import { ArrowLeft, Send, MoreVertical, Phone, Video, Search, Paperclip, Smile, Mic, CheckCheck, ChevronDown, Copy, Trash2, Ban, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import ContactInfoView from './ContactInfo';
import EmojiPicker from 'emoji-picker-react';

// Helper para obtener un color consistente por remitente
const getSenderColor = (name) => {
  const colors = [
    '#3498db', '#e74c3c', '#9b59b6', '#f1c40f', '#1abc9c', 
    '#e67e22', '#2ecc71', '#ff7f50', '#ff6b81', '#7bed9f'
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

// Helper para formatear fechas estilo WhatsApp
const isValidIso = (str) => str && !isNaN(Date.parse(str)) && /\d{4}-\d{2}-\d{2}/.test(str);

const formatMessageDate = (dateIso, language, t) => {
  if (!isValidIso(dateIso)) return dateIso || ''; // Fallback para timestamps legacy
  const date = new Date(dateIso);
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfMsg = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffDays = Math.round((startOfToday - startOfMsg) / (1000 * 60 * 60 * 24));

  const locale = language === 'es' ? 'es-AR' : 'en-US';

  if (diffDays === 0) return t('today');
  if (diffDays === 1) return t('yesterday');
  if (diffDays < 7) {
    return new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date);
  }
  return date.toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' });
};

const formatTime = (dateIso) => {
  if (!isValidIso(dateIso)) return ''; // Silenciar timestamps legacy inválidos
  try {
    return new Date(dateIso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch (e) {
    return '';
  }
};

function DeleteConfirmationModal({ isOpen, onClose, onDeleteEveryone, onDeleteMe, isMe }) {
  const { t } = useLanguage();
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-[2px]">
      <div className="bg-[#3b4a54] w-[90%] max-w-[500px] rounded-lg p-6 shadow-2xl animate-in zoom-in-95 duration-200">
        <h3 className="text-[var(--text-primary)] text-xl font-normal mb-8">{t('deleteModalTitle')}</h3>
        <div className="flex flex-col items-end space-y-3">
          {isMe && (
            <button onClick={onDeleteEveryone} className="px-6 py-2 rounded-full text-[#1fa855] hover:bg-[#202c33] transition-colors font-medium">
              {t('deleteEveryone')}
            </button>
          )}
          <button onClick={onDeleteMe} className="px-6 py-2 rounded-full text-[#1fa855] hover:bg-[#202c33] transition-colors font-medium">
            {t('deleteMe')}
          </button>
          <button onClick={onClose} className="px-6 py-2 rounded-full text-[#1fa855] hover:bg-[#202c33] transition-colors font-medium border border-[#2f3b43]">
            {t('cancel')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ChatWindow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { chats, sendMessage, markAsRead, deleteMessage } = useChats();
  const { t, language } = useLanguage();
  const [newMessage, setNewMessage] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [deleteModalConfig, setDeleteModalConfig] = useState({ isOpen: false, messageId: null, isMe: false });
  const [isContactInfoOpen, setIsContactInfoOpen] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const chat = chats.find((c) => String(c.id) === String(id));

  useEffect(() => {
    if (id) {
      markAsRead(id);
    }
  }, [id, markAsRead]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat?.messages, isSearching]);

  // Cerrar chat con Esc y cerrar menú al hacer click afuera
  useEffect(() => {
    const handleClickOutside = () => setActiveMenuId(null);
    const handleEsc = (e) => {
      if (e.key === 'Escape') navigate('/');
    };
    
    window.addEventListener('click', handleClickOutside);
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('click', handleClickOutside);
      window.removeEventListener('keydown', handleEsc);
    };
  }, [navigate]);

  const handleSend = (e) => {
    e?.preventDefault();
    if (newMessage.trim()) {
      sendMessage(id, newMessage);
      setNewMessage('');
    }
  };

  const handleCopy = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setActiveMenuId(null);
  };

  const handleDeleteClick = (messageId, isMe) => {
    setDeleteModalConfig({ isOpen: true, messageId, isMe });
    setActiveMenuId(null);
  };

  const confirmDelete = (type) => {
    if (id && deleteModalConfig.messageId) {
      deleteMessage(id, deleteModalConfig.messageId, type);
      setDeleteModalConfig({ isOpen: false, messageId: null });
    }
  };

  const handleEmojiClick = (emojiData) => {
    setNewMessage((prev) => prev + emojiData.emoji);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file && id) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        sendMessage(id, '', base64String);
      };
      reader.readAsDataURL(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const highlightText = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={i} className="bg-yellow-500/40 text-[var(--text-primary)]">{part}</span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  if (!chat) {
    return (
      <div className="flex items-center justify-center h-full bg-[var(--bg-app)]">
        <p className="text-[var(--text-secondary)]">{t('noChats')}</p>
      </div>
    );
  }

  const filteredMessages = chat.messages.filter(m => 
    m.text && m.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedMessages = filteredMessages.reduce((groups, message) => {
    const date = formatMessageDate(message.timestamp, language, t);
    if (!groups[date]) groups[date] = [];
    groups[date].push(message);
    return groups;
  }, {});

  const lastSeen = chat.isGroup 
    ? `${chat.participants?.length} ${t('participants')}` 
    : chat.messages?.length > 0 
      ? `${t('lastSeenToday')} ${formatTime(chat.messages[chat.messages.length - 1].timestamp)}` 
      : chat.timestamp;

  if (isContactInfoOpen) {
    return (
      <ContactInfoView 
        contact={chat} 
        onBack={() => setIsContactInfoOpen(false)} 
      />
    );
  }

  return (
    <div className="area-chat">
      <div className="fondo-chat"></div>
      <div className="encabezado-chat backdrop-blur-md bg-[var(--bg-header)] !border-b border-white/5 shadow-2xl">
        <div className="info-contacto" onClick={() => setIsContactInfoOpen(true)}>
          <button className="boton-volver md:hidden mr-2 text-[var(--text-header)]" onClick={(e) => { e.stopPropagation(); navigate('/'); }}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <img
            src={chat.avatar}
            alt={chat.name}
            className="w-10 h-10 rounded-full object-cover mr-3 shrink-0"
          />
          <div className="flex flex-col min-w-0">
            <span className="text-[16px] text-[var(--text-primary)] font-medium leading-tight">
              {chat.name}
            </span>
            <span className="text-[13px] text-[var(--text-secondary)] leading-tight truncate">
              {lastSeen}
            </span>
          </div>
        </div>
        <div className="menu-iconos">
          <button className="p-2 text-[#8696a0] hover:text-[#54656f]">
            <Video className="w-5 h-5" />
          </button>
          <button className="p-2 text-[#8696a0] hover:text-[#54656f]">
            <Phone className="w-5 h-5" />
          </button>

          <button
            title={t('search')}
            onClick={() => setIsSearching(!isSearching)}
            className={`p-2 rounded-full transition-colors ${
              isSearching ? 'bg-[#f0f2f5] text-[#00a884]' : 'text-[#8696a0] hover:bg-black/5'
            }`}
          >
            <Search className="w-5 h-5" />
          </button>
          <button title={t('menu')} className="p-2 text-[#8696a0] hover:bg-black/5 rounded-full transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {isSearching && (
        <div className="barra-busqueda-mensajes bg-[var(--bg-app)] border-b border-[var(--border-default)] p-2 animate-in slide-in-from-top duration-200">
          <div className="bg-[var(--bg-header)] flex items-center px-4 py-1.5 rounded-lg">
            <Search className="w-4 h-4 text-[#8696a0] mr-4" />
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-sm text-[var(--text-primary)] w-full py-1"
              autoFocus
            />
          </div>
        </div>
      )}

      <div className="contenedor-mensajes custom-scrollbar smooth-scroll">
        {Object.entries(groupedMessages).map(([date, messages]) => (
          <div key={date} className="flex flex-col space-y-4">
            <div className="flex justify-center my-4 sticky top-2 z-20">
              <span className="bg-[var(--bg-header)] text-[var(--text-secondary)] text-[12.5px] px-3 py-1.5 rounded-lg shadow-sm backdrop-blur-md border border-white/5 uppercase tracking-wider font-medium">
                {date}
              </span>
            </div>
            {messages.map((msg, index) => {
              const prevMsg = index > 0 ? messages[index - 1] : null;
              const showAvatarAndName = chat.isGroup && !msg.isMe && (!prevMsg || prevMsg.sender !== msg.sender);
              const senderColor = showAvatarAndName ? getSenderColor(msg.sender) : null;

              return (
                <div 
                  key={msg.id} 
                  className={`fila-mensaje ${msg.isMe ? 'justify-end' : 'justify-start'} animate-message group/row`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {!msg.isMe && chat.isGroup && (
                    <div className="w-8 h-8 mr-2 flex-shrink-0 flex items-end">
                      {showAvatarAndName && (
                        <img 
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(msg.sender)}&background=${senderColor.substring(1)}&color=fff&size=32`} 
                          alt={msg.sender}
                          className="w-8 h-8 rounded-full object-cover border border-white/10 shadow-sm"
                        />
                      )}
                    </div>
                  )}

                  <div 
                    className={`burbuja-mensaje group/bubble relative ${msg.isMe ? 'burbuja-mia ml-auto' : 'burbuja-otro'} !shadow-lg border border-white/5 transition-all duration-300 hover:ring-1 hover:ring-[var(--accent-green)]/30 pr-8 pb-1`}
                    onMouseEnter={() => setActiveMenuId(null)}
                  >
                    <div className="flex flex-col relative">
                      {msg.isDeleted ? (
                        <span className="italic text-[var(--text-secondary)] text-[14px] flex items-center gap-2">
                          <Ban size={15} className="opacity-60 shrink-0" />
                          {msg.isMe ? 'Eliminaste este mensaje.' : 'Este mensaje fue eliminado.'}
                        </span>
                      ) : (
                        <>
                          {showAvatarAndName && (
                            <span 
                              className="text-[13px] font-semibold mb-0.5" 
                              style={{ color: senderColor }}
                            >
                              ~ {msg.sender}
                            </span>
                          )}
                          <p className="text-[14.2px] leading-relaxed break-words whitespace-pre-wrap pr-4">{msg.text}</p>
                          <div className="flex items-center justify-end space-x-1 mt-1 -mr-6">
                            <span className="hora-envio text-[11px] text-[var(--text-secondary)] opacity-70">
                              {formatTime(msg.timestamp)}
                            </span>
                            {msg.isMe && (
                              <span className={`icono-leido ${msg.status === 'read' ? 'text-[var(--accent-neon)]' : 'text-[var(--text-secondary)] opacity-50'}`}>
                                <CheckCheck className="w-[16px] h-[16px]" />
                              </span>
                            )}
                          </div>

                          {!msg.isDeleted && (
                            <div className={`absolute -top-1 -right-7 transition-all z-10 ${activeMenuId === msg.id ? 'opacity-100' : 'opacity-0 group-hover/bubble:opacity-100'}`}>
                              <div className="relative">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveMenuId(activeMenuId === msg.id ? null : msg.id);
                                  }}
                                  className="p-1 rounded-full text-[#8696a0] hover:bg-black/10 transition-colors"
                                >
                                  <ChevronDown size={22} />
                                </button>

                                {activeMenuId === msg.id && (
                                  <div className="absolute right-0 top-full mt-1 w-[180px] bg-[var(--bg-header)] backdrop-blur-md shadow-2xl rounded-lg py-2 z-50 animate-in zoom-in-95 duration-100 border border-white/5">
                                    <button 
                                      onClick={() => handleCopy(msg.text)}
                                      className="w-full text-left px-4 py-2 hover:bg-white/5 text-[var(--text-primary)] transition-colors flex items-center text-sm"
                                    >
                                      <Copy size={16} className="mr-3 text-[#8696a0]" />
                                      {t('copy')}
                                    </button>
                                    <button 
                                      onClick={() => handleDeleteClick(msg.id, msg.isMe)}
                                      className="w-full text-left px-4 py-2 hover:bg-red-500/10 text-red-500 transition-colors flex items-center text-sm"
                                    >
                                      <Trash2 size={16} className="mr-3" />
                                      {t('delete')}
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="pie-chat relative">
        {showEmojiPicker && (
          <div className="absolute bottom-full left-0 z-[100] mb-4 shadow-2xl rounded-xl overflow-hidden border border-[var(--border-default)] animate-in slide-in-from-bottom-2 duration-200">
            <EmojiPicker 
              onEmojiClick={handleEmojiClick}
              theme="dark"
              width={350}
              height={400}
            />
          </div>
        )}
        <button 
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className={`p-2 rounded-full transition-all active:scale-95 ${showEmojiPicker ? 'text-[var(--accent-green)] bg-[var(--accent-green)]/10' : 'text-[#8696a0] hover:bg-black/5'}`}
        >
          <Smile className="w-6 h-6" />
        </button>
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="p-2 text-[#8696a0] hover:bg-black/5 rounded-full transition-all active:scale-95"
        >
          <Paperclip className="w-6 h-6" />
          <input type="file" ref={fileInputRef} className="hidden" />
        </button>
        <form onSubmit={handleSend} className="flex-1 px-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={t('chatInput')}
            className="w-full py-2.5 px-4 bg-[var(--bg-input)] border-none rounded-lg outline-none text-[var(--text-primary)] text-sm shadow-sm focus:ring-1 focus:ring-[var(--accent-green)] transition-all"
          />
        </form>
        <button
          onClick={handleSend}
          className="p-2.5 bg-transparent text-[#8696a0] hover:text-[#00a884] transition-all hover:scale-110 active:scale-90"
        >
          {newMessage.trim() ? <Send className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </button>
      </div>

      <DeleteConfirmationModal
        isOpen={deleteModalConfig.isOpen}
        isMe={deleteModalConfig.isMe}
        onClose={() => setDeleteModalConfig({ isOpen: false, messageId: null, isMe: false })}
        onDeleteEveryone={() => confirmDelete('everyone')}
        onDeleteMe={() => confirmDelete('me')}
      />
    </div>
  );
}
