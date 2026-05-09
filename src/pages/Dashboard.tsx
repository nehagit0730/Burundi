import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../hooks/useAuth';
import { PropertyListing } from '../types';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { user } = useAuth();
  const [properties, setProperties] = useState<PropertyListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyProperties = async () => {
      if (!user) return;
      try {
        const q = query(
          collection(db, 'properties'),
          where('ownerId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        setProperties(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PropertyListing)));
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
      setLoading(false);
    };

    fetchMyProperties();
  }, [user]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
        await deleteDoc(doc(db, 'properties', id));
        setProperties(properties.filter(p => p.id !== id));
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved': return <span className="flex items-center text-green-600 font-bold text-xs uppercase"><CheckCircle className="w-3 h-3 mr-1" /> Approved</span>;
      case 'rejected': return <span className="flex items-center text-red-600 font-bold text-xs uppercase"><XCircle className="w-3 h-3 mr-1" /> Rejected</span>;
      default: return <span className="flex items-center text-amber-500 font-bold text-xs uppercase"><Clock className="w-3 h-3 mr-1" /> Pending Approval</span>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">My Dashboard</h1>
          <p className="text-gray-500">Manage your property listings and track submission status.</p>
        </div>
        <Link 
          to="/submit-property"
          className="flex items-center px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100"
        >
          <Plus className="w-5 h-5 mr-2" />
          List a Property
        </Link>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Property</th>
                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Type</th>
                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Price</th>
                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-8 py-10 text-center text-gray-400">Loading your properties...</td>
                </tr>
              ) : properties.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <div className="max-w-xs mx-auto">
                      <div className="bg-gray-50 p-4 rounded-full inline-block mb-4">
                        <AlertCircle className="w-8 h-8 text-gray-300" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">No listings yet</h3>
                      <p className="text-gray-500 text-sm mb-6">Start by submitting your first property for verification.</p>
                      <Link to="/submit-property" className="text-blue-600 font-bold hover:underline">List now &rarr;</Link>
                    </div>
                  </td>
                </tr>
              ) : properties.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center">
                      <div className="h-14 w-14 rounded-xl overflow-hidden bg-gray-100 mr-4 border border-gray-100 flex-shrink-0">
                        <img src={p.images[0]} alt="" className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <Link to={`/properties/${p.id}`} className="font-bold text-gray-900 hover:text-blue-600 transition-colors line-clamp-1">{p.title}</Link>
                        <div className="text-xs text-gray-400 font-medium line-clamp-1">{p.location}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs font-black uppercase text-gray-500 tracking-wider px-2 py-1 bg-gray-100 rounded-md">{p.type}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="font-bold text-gray-900">{p.price.toLocaleString()} {p.currency}</span>
                  </td>
                  <td className="px-8 py-6">
                    {getStatusBadge(p.status)}
                    {p.status === 'rejected' && (
                      <div className="mt-1 text-[10px] text-red-500 max-w-[150px] italic">
                        REASON: {p.rejectionReason}
                      </div>
                    )}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Link to={`/edit-property/${p.id}`} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Edit">
                        <Edit className="w-5 h-5" />
                      </Link>
                      <button 
                        onClick={() => handleDelete(p.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" 
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
