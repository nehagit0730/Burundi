import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, addDoc, doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../hooks/useAuth';
import { PROPERTY_TYPES, CURRENCIES } from '../constants';
import { motion } from 'framer-motion';
import { Save, Loader2, ArrowLeft, Image as ImageIcon, Plus } from 'lucide-react';

const SubmitProperty = () => {
  const { id } = useParams();
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!id);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    currency: 'BIF',
    location: '',
    type: 'house' as any,
    images: [] as string[],
  });

  const [newImageUrl, setNewImageUrl] = useState('');

  useEffect(() => {
    if (id) {
      const fetchProperty = async () => {
        const docRef = doc(db, 'properties', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.ownerId !== user?.uid && profile?.role !== 'admin') {
            navigate('/dashboard');
            return;
          }
          setFormData({
            title: data.title,
            description: data.description,
            price: data.price,
            currency: data.currency,
            location: data.location,
            type: data.type,
            images: data.images || [],
          });
        }
        setInitialLoading(false);
      };
      fetchProperty();
    }
  }, [id, user, profile, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    const propertyData = {
      ...formData,
      price: Number(formData.price),
      ownerId: user.uid,
      ownerName: user.displayName || 'Anonymous',
      status: 'pending',
      verifiedStatus: 'Not Verified',
      updatedAt: serverTimestamp(),
    };

    try {
      if (id) {
        await updateDoc(doc(db, 'properties', id), propertyData);
      } else {
        await addDoc(collection(db, 'properties'), {
          ...propertyData,
          createdAt: serverTimestamp(),
        });
      }
      navigate('/dashboard');
    } catch (error) {
      console.error("Submission failed:", error);
    }
    setLoading(false);
  };

  const addImage = () => {
    if (newImageUrl && !formData.images.includes(newImageUrl)) {
      setFormData({ ...formData, images: [...formData.images, newImageUrl] });
      setNewImageUrl('');
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({ ...formData, images: newImages });
  };

  if (initialLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="flex items-center text-gray-500 font-bold hover:text-blue-600 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-1" /> Back
        </button>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">
          {id ? 'Edit' : 'List New'} Property
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-black text-gray-900 uppercase tracking-widest">Property Title</label>
            <input 
              required
              type="text" 
              placeholder="e.g., Luxury Villa in Kirundo"
              className="w-full px-6 py-4 bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-100 rounded-xl transition-all"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-black text-gray-900 uppercase tracking-widest">Type</label>
            <select 
              className="w-full px-6 py-4 bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-100 rounded-xl transition-all"
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value as any})}
            >
              {PROPERTY_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-black text-gray-900 uppercase tracking-widest">Location</label>
            <input 
              required
              type="text" 
              placeholder="City, Neighborhood"
              className="w-full px-6 py-4 bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-100 rounded-xl transition-all"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-black text-gray-900 uppercase tracking-widest">Price</label>
            <input 
              required
              type="number" 
              className="w-full px-6 py-4 bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-100 rounded-xl transition-all"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-black text-gray-900 uppercase tracking-widest">Currency</label>
            <select 
              className="w-full px-6 py-4 bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-100 rounded-xl transition-all"
              value={formData.currency}
              onChange={(e) => setFormData({...formData, currency: e.target.value as any})}
            >
              {CURRENCIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-black text-gray-900 uppercase tracking-widest">Description</label>
            <textarea 
              required
              rows={5}
              placeholder="Describe the property details, amenities, etc."
              className="w-full px-6 py-4 bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-100 rounded-xl transition-all"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="space-y-4 md:col-span-2">
            <label className="text-sm font-black text-gray-900 uppercase tracking-widest">Property Images (URLs)</label>
            <div className="flex gap-4">
              <input 
                type="url" 
                placeholder="https://image-url.com/photo.jpg"
                className="flex-grow px-6 py-4 bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-100 rounded-xl transition-all"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
              />
              <button 
                type="button" 
                onClick={addImage}
                className="px-6 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              {formData.images.map((img, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden group border border-gray-100 shadow-sm">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute inset-0 bg-red-600/80 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center font-bold"
                  >
                    Remove
                  </button>
                </div>
              ))}
              {formData.images.length === 0 && (
                <div className="col-span-full border-2 border-dashed border-gray-100 rounded-2xl h-32 flex flex-col items-center justify-center text-gray-300">
                  <ImageIcon className="w-8 h-8 mb-2" />
                  <span className="text-xs font-bold uppercase tracking-widest">No images added</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-50 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center px-10 py-5 bg-blue-600 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Save className="w-5 h-5 mr-2" />}
            {id ? 'Update Listing' : 'Submit for Approval'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitProperty;
