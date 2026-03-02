import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { MessageCircle, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    if (user && !isLoading) {
      navigate('/');
    }
  }, [user, isLoading, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() && password.trim() && !isLoading) {
      login({ 
        name: username, 
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=dfe5e7&color=fff`,
        email: `${username.toLowerCase()}@example.com`
      });
    }
  };

  return (
    <div className="pagina-login min-h-screen bg-[#f0f2f5] dark:bg-[#0c1317]">
      <div className="encabezado-login h-[222px] bg-[#00a884] dark:bg-[#00a884]">
        <div className="header-content max-w-[1000px] mx-auto px-4 h-full flex items-center">
           <div className="logo-wrapper flex items-center text-white space-x-3 -mt-20">
             <MessageCircle className="w-8 h-8 fill-current" />
             <span className="texto-logo font-medium text-sm tracking-wide uppercase">WhatsApp Web</span>
           </div>
        </div>
      </div>
      
      <div className="contenedor-login -mt-24 pb-10 flex justify-center">
        <div className="tarjeta-login bg-white dark:bg-[#111b21] w-full max-w-[1000px] min-h-[500px] rounded shadow-lg p-12 md:p-16 flex flex-col md:flex-row items-start space-y-8 md:space-y-0 md:space-x-16">
            <div className="flex-1">
              <h1 className="titulo-bienvenida text-[28px] font-light text-[#41525d] dark:text-[#e9edef] mb-10 text-left">
                {t('loginTitle')}
              </h1>
              
              <div className="space-y-6">
                <p className="text-sm text-[#41525d] dark:text-[#8696a0] leading-6">
                  Inicia sesión con tu cuenta para continuar.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6 max-w-[320px]">
                  <div className="relative">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Nombre de usuario" 
                      disabled={isLoading}
                      className="w-full px-0 py-2 bg-transparent border-b border-[#e9edef] dark:border-[#222d34] focus:border-[#00a884] outline-none text-[var(--text-primary)] transition-all placeholder:text-gray-400"
                      autoFocus
                    />
                  </div>

                  <div className="relative">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Contraseña" 
                      disabled={isLoading}
                      className="w-full px-0 py-2 bg-transparent border-b border-[#e9edef] dark:border-[#222d34] focus:border-[#00a884] outline-none text-[var(--text-primary)] transition-all placeholder:text-gray-400"
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={isLoading || !username.trim() || !password.trim()}
                    className="boton-verde bg-[#00a884] hover:bg-[#06cf9c] text-white px-8 py-2.5 rounded-md font-medium transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Verificando...</span>
                      </>
                    ) : (
                      <span>Iniciar Sesión</span>
                    )}
                  </button>
                </form>
              </div>
            </div>

            <div className="hidden md:block w-[1px] h-[350px] bg-[#e9edef] dark:bg-[#222d34]"></div>

            <div className="flex-1 flex flex-col items-center justify-center space-y-6 text-center pt-8">
              <div className="w-48 h-48 bg-[#f8f9fa] dark:bg-[#202c33] rounded-full flex items-center justify-center relative shadow-inner">
                <img 
                  src="https://whatsapp-web-clone-matias.vercel.app/qr-placeholder.png" 
                  alt="QR Placeholder" 
                  className="w-40 h-40 opacity-10 filter grayscale"
                  onError={(e) => e.target.style.display = 'none'}
                />
                <Loader2 className="w-12 h-12 text-[#00a884] animate-spin absolute" />
              </div>
              <div className="space-y-2">
                <p className="text-[17px] font-medium text-[#41525d] dark:text-[#e9edef]">
                  ¿No tienes una cuenta?
                </p>
                <p className="text-sm text-[#00a884] cursor-pointer hover:underline">
                  Regístrate ahora gratis
                </p>
              </div>
            </div>
        </div>
      </div>
      
      <div className="mt-8 text-center pb-12">
        <p className="link-ayuda text-[#00a884] text-[14px] cursor-pointer hover:underline font-medium uppercase tracking-wider">Aprende más sobre seguridad</p>
      </div>
    </div>
  );
}
