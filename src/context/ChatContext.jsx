import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { initialChats } from '../data/initialData';

const ChatContext = createContext(undefined);

export function ChatProvider({ children }) {
  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem('chats_v10');
    return saved ? JSON.parse(saved) : initialChats;
  });

  useEffect(() => {
    localStorage.setItem('chats_v10', JSON.stringify(chats));
  }, [chats]);

  const markAsRead = useCallback((chatId) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId ? { ...chat, unread: 0 } : chat
      )
    );
  }, []);

  const sendMessage = useCallback((chatId, text, image) => {
    setChats((prevChats) =>
      prevChats.map((chat) => {
        if (chat.id === chatId) {
          const newMessage = {
            id: Date.now().toString(),
            sender: 'Me',
            text,
            timestamp: new Date().toISOString(),
            isMe: true,
            status: 'sent',
            image,
          };
          return {
            ...chat,
            messages: [...chat.messages, newMessage],
            lastMessage: image ? '📷 Foto' : text,
            timestamp: newMessage.timestamp,
          };
        }
        return chat;
      })
    );
  }, []);

  const addChat = (name) => {
    const newChat = {
      id: Date.now().toString(),
      name,
      avatar: `https://ui-avatars.com/api/?name=${name}&background=random`,
      lastMessage: '',
      timestamp: new Date().toISOString(),
      unread: 0,
      messages: [],
    };
    setChats((prev) => [newChat, ...prev]);
  };

  const deleteMessage = useCallback((chatId, messageId, type) => {
    setChats((prevChats) =>
      prevChats.map((chat) => {
        if (chat.id === chatId) {
          let newMessages;
          if (type === 'everyone') {
            newMessages = chat.messages.map((m) =>
              m.id === messageId ? { ...m, text: '', image: null, isDeleted: true } : m
            );
          } else {
            newMessages = chat.messages.filter((m) => m.id !== messageId);
          }
          
          const lastMsg = newMessages.length > 0 ? newMessages[newMessages.length - 1] : null;
          return {
            ...chat,
            messages: newMessages,
            lastMessage: lastMsg 
              ? (lastMsg.isDeleted ? '🚫 Mensaje eliminado' : (lastMsg.image ? '📷 Foto' : lastMsg.text)) 
              : '',
            timestamp: lastMsg ? lastMsg.timestamp : chat.timestamp,
          };
        }
        return chat;
      })
    );
  }, []);

  return (
    <ChatContext.Provider value={{ chats, sendMessage, markAsRead, addChat, deleteMessage }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChats() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChats must be used within a ChatProvider');
  }
  return context;
}
