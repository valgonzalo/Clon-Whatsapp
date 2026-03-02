import { useParams } from 'react-router-dom';
import ChatList from '../components/ChatList';
import ChatWindow from '../components/ChatWindow';
import ProfileView from '../components/ProfileDrawer';
import SideNav from '../components/SideNav';
import { useAuth } from '../context/AuthContext';

export default function ChatPage() {
  const { id } = useParams();
  const { activeView } = useAuth();

  return (
    <div className="contenedor-principal">
      <div className="banda-superior-verde"></div>
      <div className="contenedor-app">
        <div className="hidden md:flex">
          <SideNav />
        </div>
        <div className="panel-lateral hidden md:block">
          <ChatList />
        </div>
        <div className="chat-window-wrapper flex-1 h-full relative min-w-0 bg-[var(--bg-chat)]">
          {activeView === 'profile' ? (
            <ProfileView />
          ) : (
            <ChatWindow key={id} />
          )}
        </div>
      </div>
    </div>
  );
}
