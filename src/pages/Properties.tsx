import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { PropertyListing, PropertyType } from '../types';
import { PropertyCard } from '../components/PropertyCard';
import { Search, Filter, Home as HomeIcon, MapPin, Building, LandPlot } from 'lucide-react';
import { motion } from 'framer-motion';

const Properties = () => {
  const [properties, setProperties] = useState<PropertyListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<PropertyType | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        let q = query(
          collection(db, 'properties'), 
          where('status', '==', 'approved'),
          orderBy('createdAt', 'desc')
        );

        if (filterType !== 'all') {
          q = query(q, where('type', '==', filterType));
        }

        const querySnapshot = await getDocs(q);
        const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PropertyListing));
        
        if (searchTerm) {
          setProperties(docs.filter(p => 
            p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
            p.location.toLowerCase().includes(searchTerm.toLowerCase())
          ));
        } else {
          setProperties(docs);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
      setLoading(false);
    };

    fetchProperties();
  }, [filterType, searchTerm]);

  return (
    <div className="container mx-auto px-6 py-24 bg-background-dark min-h-screen">
      <div className="mb-20 text-center">
        <span className="inline-block py-1 px-3 mb-6 rounded-sm bg-brand/20 border border-brand/30 text-[10px] font-black uppercase tracking-[0.3em] text-brand">
          Curated Inventory
        </span>
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-white tracking-tight mb-8">Asset Marketplace</h1>
        <p className="text-white/40 max-w-2xl mx-auto text-lg font-sans">
          Discover a meticulously vetted collection of Burundi's most prestigious real estate assets.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-surface p-8 rounded-sm shadow-2xl border border-white/5 mb-20">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="relative flex-grow">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-brand w-4 h-4" />
            <input 
              type="text" 
              placeholder="SEARCH BY COLLECTION OR REGION..." 
              className="w-full pl-14 pr-6 py-5 bg-black/40 border-white/10 text-white placeholder:text-white/20 focus:border-brand focus:ring-0 rounded-sm transition-all text-[10px] font-black uppercase tracking-widest outline-none border"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              { id: 'all', label: 'Complete Works', icon: HomeIcon },
              { id: 'house', label: 'Residential', icon: HomeIcon },
              { id: 'land', label: 'Terrains', icon: LandPlot },
              { id: 'commercial', label: 'Industrial', icon: Building },
              { id: 'rental', label: 'Leasehold', icon: Building }
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setFilterType(type.id as any)}
                className={`flex items-center px-8 py-5 rounded-sm font-black text-[10px] uppercase tracking-widest transition-all ${filterType === type.id ? 'bg-brand text-black shadow-lg shadow-brand/20' : 'bg-white/5 text-white/40 hover:bg-white/10 border border-white/5'}`}
              >
                <type.icon className="w-3.5 h-3.5 mr-2.5" />
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {[1, 2, 3, 4, 5, 6].map(n => (
            <div key={n} className="h-[450px] bg-white/5 animate-pulse rounded-sm border border-white/5"></div>
          ))}
        </div>
      ) : properties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <PropertyCard property={property} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-32 border border-dashed border-white/10 rounded-sm">
          <div className="bg-white/5 inline-block p-8 rounded-full mb-8">
            <Search className="w-16 h-16 text-white/10" />
          </div>
          <h2 className="text-3xl font-serif text-white mb-4">No assets found</h2>
          <p className="text-white/30 text-[10px] items-center uppercase tracking-[0.3em] font-black">Refine your search parameters</p>
        </div>
      )}
    </div>
  );
};

export default Properties;
