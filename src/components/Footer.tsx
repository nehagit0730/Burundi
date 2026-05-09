import React from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME } from '../constants';
import { Instagram, Twitter, Facebook, ShieldCheck } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-background-dark text-white pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex flex-col mb-8">
              <span className="text-3xl font-serif italic font-bold tracking-tight text-brand">{APP_NAME}</span>
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 -mt-1">Collection Excellence</span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-8 font-sans">
              The premier marketplace for verified real estate in Burundi. We bring professional standards and transparency to every transaction.
            </p>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-10 text-white flex items-center">
              <span className="w-8 h-px bg-brand mr-4"></span>
              Catalogue
            </h4>
            <ul className="space-y-4">
              <li><Link to="/properties" className="text-white/40 hover:text-brand transition-colors text-sm uppercase tracking-widest font-bold">Residential</Link></li>
              <li><Link to="/properties" className="text-white/40 hover:text-brand transition-colors text-sm uppercase tracking-widest font-bold">Commercial</Link></li>
              <li><Link to="/properties" className="text-white/40 hover:text-brand transition-colors text-sm uppercase tracking-widest font-bold">New Builds</Link></li>
              <li><Link to="/properties" className="text-white/40 hover:text-brand transition-colors text-sm uppercase tracking-widest font-bold">Estates</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-10 text-white flex items-center">
              <span className="w-8 h-px bg-brand mr-4"></span>
              The Group
            </h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-white/40 hover:text-brand transition-colors text-sm uppercase tracking-widest font-bold">Our Story</Link></li>
              <li><Link to="/contact" className="text-white/40 hover:text-brand transition-colors text-sm uppercase tracking-widest font-bold">Consultancy</Link></li>
              <li><Link to="/privacy" className="text-white/40 hover:text-brand transition-colors text-sm uppercase tracking-widest font-bold">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-white/40 hover:text-brand transition-colors text-sm uppercase tracking-widest font-bold">Terms of Use</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-10 text-white flex items-center">
              <span className="w-8 h-px bg-brand mr-4"></span>
              Connect
            </h4>
            <p className="text-white/40 text-sm mb-6 uppercase tracking-widest font-bold">Bujumbura, Burundi</p>
            <p className="text-white/40 text-sm mb-10 uppercase tracking-widest font-bold">+257 XX XX XX XX</p>
            <div className="flex space-x-6">
              <a href="#" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-brand hover:border-brand transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-brand hover:border-brand transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-brand hover:border-brand transition-all">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center bg-background-dark">
          <p className="text-white/20 text-[10px] font-black uppercase tracking-widest mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} {APP_NAME} Group. All Rights Reserved.
          </p>
          <div className="flex items-center space-x-2 text-white/20">
            <span className="text-[9px] font-black uppercase tracking-[0.3em]">Verified Excellence</span>
            <ShieldCheck className="w-3 h-3 text-brand" />
          </div>
        </div>
      </div>
    </footer>
  );
};
