import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Tag, ShieldCheck, ShieldAlert } from 'lucide-react';
import { PropertyListing } from '../types';

interface PropertyCardProps {
  property: PropertyListing;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const isVerified = property.verifiedStatus !== 'Not Verified';

  return (
    <div className="bg-surface rounded-sm overflow-hidden shadow-2xl transition-all hover:-translate-y-1 border border-white/5 flex flex-col group">
      <Link to={`/properties/${property.id}`} className="relative h-64 overflow-hidden">
        <img 
          src={property.images[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
          alt={property.title}
          className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 space-y-2 flex flex-col">
          <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-[9px] font-black rounded-sm text-brand border border-brand/30 shadow-sm uppercase tracking-widest self-start">
            {property.type}
          </span>
          {isVerified && (
            <span className="px-3 py-1 bg-brand text-black text-[9px] font-black rounded-sm shadow-sm flex items-center uppercase tracking-widest self-start">
              <ShieldCheck className="w-3 h-3 mr-1" />
              {property.verifiedStatus}
            </span>
          )}
        </div>
      </Link>
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-serif text-white line-clamp-1 group-hover:text-brand transition-colors decoration-brand/30">
            <Link to={`/properties/${property.id}`}>{property.title}</Link>
          </h3>
        </div>
        <div className="flex items-center text-white/40 text-xs mb-6 uppercase tracking-widest font-bold">
          <MapPin className="w-3.5 h-3.5 mr-1.5 text-brand" />
          <span className="line-clamp-1">{property.location}</span>
        </div>
        <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-[9px] text-white/30 font-black uppercase tracking-widest mb-1">Valuation</span>
            <span className="text-lg font-bold text-white">
              {property.currency === 'USD' ? '$' : ''}
              {property.price.toLocaleString()}
              {property.currency === 'BIF' ? ' BIF' : ''}
            </span>
          </div>
          <Link 
            to={`/properties/${property.id}`}
            className="px-5 py-2.5 bg-white/5 text-white/60 font-black text-[9px] uppercase tracking-widest rounded-sm hover:bg-brand hover:text-black transition-all border border-white/10"
          >
            Inquiry
          </Link>
        </div>
      </div>
    </div>
  );
};
