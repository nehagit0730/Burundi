import React from 'react';
import { motion } from 'framer-motion';
import { Home as HomeIcon, Shield, Search, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden bg-background-dark">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Real estate Burundi" 
            className="w-full h-full object-cover opacity-30 grayscale saturate-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/80 to-transparent"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-white">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-block py-1 px-3 mb-8 rounded-sm bg-brand/20 border border-brand/30 text-[10px] font-black uppercase tracking-[0.3em] text-brand">
              Premium Real Estate Assets
            </span>
            <h1 className="text-6xl md:text-8xl font-serif font-bold mb-8 leading-tight tracking-tight">
              A New Era of <br />
              <span className="text-brand italic">Burundi</span> Living
            </h1>
            <p className="text-xl text-white/60 mb-12 max-w-xl underline decoration-brand/30 decoration-2 underline-offset-8">
              Exceptional properties. Unmatched verification. The definitive standard for high-end real estate in Burundi.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/properties" className="px-10 py-5 bg-white text-black font-black uppercase tracking-widest text-xs rounded-sm hover:bg-brand transition-all flex items-center justify-center group shadow-2xl shadow-brand/20">
                Explore Collection
                <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/about" className="px-10 py-5 bg-transparent border border-white/20 text-white font-black uppercase tracking-widest text-xs rounded-sm hover:bg-white/10 transition-all flex items-center justify-center">
                Our Methodology
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Search Section */}
      <section className="py-32 bg-background-dark border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="flex flex-col items-start space-y-6">
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-brand">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif text-white">Artisanal Discovery</h3>
              <p className="text-white/40 leading-relaxed font-sans text-sm">
                Carefully curated listings that meet our rigorous standards for quality, design, and location excellence.
              </p>
            </div>
            <div className="flex flex-col items-start space-y-6">
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-brand">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif text-white">Verification Protocol</h3>
              <p className="text-white/40 leading-relaxed text-sm">
                Our proprietary multi-step verification helps ensure transparency and reduces risk in every transaction.
              </p>
            </div>
            <div className="flex flex-col items-start space-y-6">
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-brand">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif text-white">Strategic Insights</h3>
              <p className="text-white/40 leading-relaxed text-sm">
                Expert brokerage guidance powered by deep market knowledge and a commitment to professional integrity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured CTA */}
      <section className="bg-surface py-32 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between">
          <div className="max-w-xl mb-12 md:mb-0">
            <h2 className="text-5xl font-serif font-bold mb-8 tracking-tight text-white italic">List Your Property <br /> With The Leaders</h2>
            <p className="text-xl text-white/50 mb-10 leading-relaxed">
              Transform your property into a premium listing and reach our exclusive network of discerning clients.
            </p>
            <Link to="/submit-property" className="inline-block px-12 py-6 bg-brand text-black font-black uppercase tracking-[0.2em] text-xs rounded-sm shadow-2xl shadow-brand/40 hover:scale-105 transition-all">
              Initiate Listing
            </Link>
          </div>
          <div className="relative h-64 w-full md:w-auto md:h-auto md:flex-1 md:ml-24 flex justify-center">
            <div className="w-64 h-64 md:w-96 md:h-96 bg-brand/10 rounded-full blur-[120px] absolute"></div>
            <HomeIcon className="w-48 h-48 md:w-72 md:h-72 text-white/5 relative" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
