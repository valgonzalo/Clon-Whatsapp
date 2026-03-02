import ChatList from '../components/ChatList';
import ProfileView from '../components/ProfileDrawer';
import SideNav from '../components/SideNav';
import WelcomeScreen from '../components/WelcomeScreen';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function HomePage() {
  const { t } = useLanguage();
  const { activeView } = useAuth();

  return (
    <div className="contenedor-principal">
      <div className="banda-superior-verde"></div>
      <div className="contenedor-app">
        <div className="hidden md:flex">
          <SideNav />
        </div>
        <div className="panel-lateral">
          <ChatList />
        </div>
        
        {activeView === 'profile' ? (
          <ProfileView />
        ) : (
          <WelcomeScreen />
        )}
      </div>
    </div>
  );
}
