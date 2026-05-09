import React from 'react';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { loginWithGoogle } from '../lib/firebase';
import { useNavigate, useLocation } from 'react-router-dom';
import { APP_NAME } from '../constants';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/dashboard";

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-background-dark px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-surface rounded-sm shadow-2xl p-12 border border-white/5 relative z-10"
      >
        <div className="text-center mb-12">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand mb-6 block">Access Protocol</span>
          <h1 className="text-4xl font-serif font-bold text-white tracking-tight mb-4 italic">{APP_NAME}</h1>
          <p className="text-white/30 text-sm font-sans underline decoration-brand/20 underline-offset-4">Sign in to access your private collection</p>
        </div>

        <button
          onClick={handleLogin}
          className="w-full flex items-center justify-center space-x-4 px-8 py-5 bg-white text-black rounded-sm font-black text-[10px] uppercase tracking-[0.2em] hover:bg-brand transition-all shadow-2xl shadow-brand/20 group"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span>Authorize via Google</span>
        </button>

        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="text-[9px] text-white/20 uppercase tracking-[0.3em] font-black mb-6">Encrypted Connection</p>
          <div className="flex justify-center text-white/5">
            <LogIn className="w-12 h-12" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
