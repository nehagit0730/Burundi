import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { PropertyListing } from '../types';
import { MapPin, Tag, ShieldCheck, Mail, Phone, Calendar, ArrowLeft, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<PropertyListing | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'properties', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProperty({ id: docSnap.id, ...docSnap.data() } as PropertyListing);
        }
      } catch (error) {
        console.error("Error fetching property:", error);
      }
      setLoading(false);
    };
    fetchProperty();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!property) return <div className="min-h-screen flex items-center justify-center">Property not found.</div>;

  return (
    <div className="bg-background-dark pt-12 pb-32 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <Link to="/properties" className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-brand mb-12 group transition-colors">
          <ArrowLeft className="w-3.5 h-3.5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Gallery */}
            <div className="space-y-6">
              <div className="aspect-[16/10] w-full rounded-sm overflow-hidden bg-black/40 border border-white/5 shadow-2xl">
                <img 
                  src={property.images[activeImage] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'} 
                  alt={property.title}
                  className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {property.images.map((img, i) => (
                  <button 
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`flex-shrink-0 w-28 h-28 rounded-sm overflow-hidden border transition-all ${activeImage === i ? 'border-brand scale-105 shadow-lg shadow-brand/20' : 'border-white/5 opacity-40 hover:opacity-100 grayscale'}`}
                  >
                    <img src={img} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            </div>

            {/* General Info */}
            <div className="bg-surface rounded-sm p-12 border border-white/5 shadow-2xl">
              <div className="flex items-center gap-3 mb-8">
                <span className="px-4 py-1.5 bg-brand/10 text-brand text-[10px] font-black rounded-sm border border-brand/20 uppercase tracking-[0.2em]">{property.type}</span>
                {property.verifiedStatus !== 'Not Verified' && (
                  <span className="px-4 py-1.5 bg-white/5 text-white/60 text-[10px] font-black rounded-sm border border-white/10 flex items-center uppercase tracking-[0.2em]">
                    <ShieldCheck className="w-3.5 h-3.5 mr-2 text-brand" />
                    {property.verifiedStatus}
                  </span>
                )}
              </div>
              <h1 className="text-5xl font-serif font-bold text-white tracking-tight mb-8 italic">{property.title}</h1>
              <div className="flex flex-wrap items-center gap-10 text-white/40 mb-12 pb-12 border-b border-white/5">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-3 text-brand" />
                  <span className="text-xs uppercase tracking-[0.2em] font-bold">{property.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-3 text-brand" />
                  <span className="text-xs uppercase tracking-[0.2em] font-bold">Catalogue Entry: {new Date(property.createdAt?.toDate()).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-8 flex items-center">
                  <span className="w-8 h-px bg-brand mr-4"></span>
                  The Estate Insight
                </h3>
                <p className="text-lg text-white/50 leading-relaxed font-sans whitespace-pre-wrap decoration-white/5 underline underline-offset-[12px] decoration-1">{property.description}</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Price & Contact Card */}
            <div className="bg-surface rounded-sm p-10 border border-white/5 shadow-2xl sticky top-24">
              <div className="mb-12">
                <span className="text-[10px] text-white/30 font-black uppercase tracking-[0.3em] block mb-4">Official Valuation</span>
                <div className="text-5xl font-bold text-white tracking-tight">
                  {property.currency === 'USD' ? '$' : ''}
                  {property.price.toLocaleString()}
                  {property.currency === 'BIF' ? ' BIF' : ''}
                </div>
              </div>

              <div className="space-y-4">
                <button className="w-full py-6 bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] rounded-sm hover:bg-brand transition-all shadow-2xl shadow-brand/20 flex items-center justify-center group">
                  <Mail className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform" />
                  Acquisition Inquiry
                </button>
                <button className="w-full py-6 bg-transparent text-white/40 border border-white/10 font-black uppercase tracking-[0.3em] text-[10px] rounded-sm hover:bg-white/5 hover:text-white transition-all flex items-center justify-center">
                  <Phone className="w-4 h-4 mr-3" />
                  Private Consultation
                </button>
              </div>

              <div className="mt-12 pt-12 border-t border-white/5">
                <div className="flex items-center mb-8">
                  <div className="h-14 w-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand font-black mr-4 text-xl overflow-hidden">
                    {property.ownerName?.charAt(0) || <Tag className="w-6 h-6" />}
                  </div>
                  <div>
                    <div className="text-[9px] text-white/30 font-black uppercase tracking-[0.2em] mb-1">Estate Specialist</div>
                    <div className="font-bold text-base text-white tracking-tight">{property.ownerName}</div>
                  </div>
                </div>
                <button className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-brand transition-colors flex items-center group">
                  <Share2 className="w-3.5 h-3.5 mr-2 group-hover:scale-125 transition-transform" />
                  Portfolio Link
                </button>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="bg-brand/5 rounded-sm p-8 border border-brand/10">
              <h4 className="flex items-center text-brand font-black text-[10px] uppercase tracking-[0.3em] mb-6">
                <ShieldCheck className="w-4 h-4 mr-3" />
                Verified Asset
              </h4>
              <p className="text-xs text-white/40 leading-relaxed italic font-sans">
                Our verification protocol guarantees that the original title deeds and associated permits for this asset have been strictly inspected by our compliance board.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
