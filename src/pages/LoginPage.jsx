import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { MessageCircle, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=000&color=fff`,
        email: `${username.toLowerCase()}@example.com`
      });
    }
  };

  return (
    <div className="premium-dark min-h-screen flex items-center justify-center p-6 bg-black selection:bg-white selection:text-black">
      {/* Aurora Background */}
      <div className="aurora-container">
        <div className="aurora-beam aurora-beam-1"></div>
        <div className="aurora-beam aurora-beam-2"></div>
        <div className="aurora-beam aurora-beam-3"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-[950px] z-10"
      >
        <div className="premium-glass rounded-[32px] overflow-hidden flex flex-col md:flex-row min-h-[550px]">
          {/* Left Side: Login Form */}
          <div className="flex-1 p-6 sm:p-10 md:p-16 flex flex-col">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex items-center space-x-3 mb-8 sm:mb-12"
            >
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-white/10 shrink-0">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-black fill-current">
                   <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <span className="text-white font-semibold tracking-tighter text-lg sm:text-xl">CLON WHATSAPP UTN</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex-1"
            >
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">Bienvenido.</h1>
              <p className="text-white/40 mb-8 sm:mb-10 text-base sm:text-lg">inicia sesion con tu cuenta</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-widest text-white/30 font-bold ml-1">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Tu nombre de usuario" 
                    disabled={isLoading}
                    className="input-premium w-full text-lg"
                    autoFocus
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-widest text-white/30 font-bold ml-1">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" 
                    disabled={isLoading}
                    className="input-premium w-full text-lg"
                  />
                </div>
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit" 
                  disabled={isLoading || !username.trim() || !password.trim()}
                  className="w-full bg-white hover:bg-white/90 text-black py-4 rounded-xl font-bold transition-all shadow-xl shadow-white/5 flex items-center justify-center space-x-3 mt-8 disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <>
                      <span>ACCEDER AL CHAT</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12 flex items-center space-x-2 text-white/30 text-xs uppercase tracking-widest font-bold"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Conexión cifrada de extremo a extremo</span>
            </motion.div>
          </div>

          {/* Right Side: QR/Decorative */}
          <div className="hidden md:flex flex-1 bg-white/[0.02] border-l border-white/5 p-16 flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[100px] -mr-32 -mt-32 rounded-full"></div>
            
            <motion.div
              animate={{ 
                rotate: [0, 90, 180, 270, 360],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            />

            <div className="relative z-10 space-y-8">
              <div className="w-56 h-56 p-6 bg-white/5 border border-white/10 rounded-[40px] flex items-center justify-center relative backdrop-blur-sm">
                <div className="absolute inset-0 border-2 border-dashed border-white/10 rounded-[40px] animate-[spin_10s_linear_infinite]"></div>
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=WA-Clone-Auth&color=ffffff&bgcolor=00000000" 
                  alt="QR" 
                  className="w-40 h-40 filter brightness-100 invert"
                />
              </div>
              
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white">Acceso rápido via QR</h3>
                <p className="text-white/40 text-sm max-w-[240px] mx-auto leading-relaxed">
                  Escanea el código para vincular tu dispositivo de forma segura y privada.
                </p>
              </div>

              <div className="pt-4">
                <span className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] text-white/60 font-black uppercase tracking-[0.2em]">
                  Encrypted System v2.0
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
