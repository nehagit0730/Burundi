import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Info, Phone, User as UserIcon, LogOut, LayoutDashboard, PlusCircle, ShieldCheck } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { auth } from '../lib/firebase';
import { APP_NAME } from '../constants';

export const Navbar = () => {
  const { user, profile, isAdmin } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-[#0a0a0a] border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex flex-col">
              <span className="text-2xl font-serif italic font-bold tracking-tight text-brand">{APP_NAME}</span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-white/40 -mt-1">Premium Real Estate</span>
            </Link>
            <div className="hidden sm:ml-12 sm:flex sm:space-x-8">
              <Link to="/" className={`inline-flex items-center px-1 pt-1 text-xs font-bold uppercase tracking-widest transition-colors ${isActive('/') ? 'text-brand' : 'text-white/60 hover:text-white'}`}>
                Home
              </Link>
              <Link to="/properties" className={`inline-flex items-center px-1 pt-1 text-xs font-bold uppercase tracking-widest transition-colors ${isActive('/properties') ? 'text-brand' : 'text-white/60 hover:text-white'}`}>
                Browse
              </Link>
              <Link to="/about" className={`inline-flex items-center px-1 pt-1 text-xs font-bold uppercase tracking-widest transition-colors ${isActive('/about') ? 'text-brand' : 'text-white/60 hover:text-white'}`}>
                About
              </Link>
              <Link to="/contact" className={`inline-flex items-center px-1 pt-1 text-xs font-bold uppercase tracking-widest transition-colors ${isActive('/contact') ? 'text-brand' : 'text-white/60 hover:text-white'}`}>
                Contact
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            {user ? (
              <div className="flex items-center space-x-6">
                {isAdmin ? (
                  <Link to="/admin" className="p-2 text-white/60 hover:text-brand transition-colors" title="Admin Dashboard">
                    <ShieldCheck className="w-5 h-5" />
                  </Link>
                ) : (
                  <Link to="/dashboard" className="p-2 text-white/60 hover:text-brand transition-colors" title="My Dashboard">
                    <LayoutDashboard className="w-5 h-5" />
                  </Link>
                )}
                <button 
                  onClick={() => auth.signOut()}
                  className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-red-500 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
                <div className="h-10 w-10 rounded-full bg-surface flex items-center justify-center overflow-hidden border border-white/10">
                  {profile?.photoURL ? (
                    <img src={profile.photoURL} alt={profile.displayName || 'Profile'} className="h-full w-full object-cover" />
                  ) : (
                    <UserIcon className="w-5 h-5 text-white/40" />
                  )}
                </div>
              </div>
            ) : (
              <Link 
                to="/login"
                className="inline-flex items-center px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-sm text-black bg-white hover:bg-brand transition-all shadow-lg"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
