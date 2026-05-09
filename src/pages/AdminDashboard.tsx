import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { collection, query, getDocs, doc, updateDoc, deleteDoc, orderBy, getDoc, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { PropertyListing, WebPage } from '../types';
import { 
  BarChart3, 
  FileText, 
  CheckCircle, 
  XSquare, 
  Layout, 
  Mail, 
  Settings, 
  Users, 
  Eye, 
  Check, 
  X,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden lg:block">
        <div className="p-6">
          <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Admin Control</span>
        </div>
        <nav className="mt-2 space-y-1 px-4">
          <AdminNavLink to="/admin" icon={BarChart3} label="Analytics" end />
          <AdminNavLink to="/admin/submissions" icon={FileText} label="Submissions" />
          <AdminNavLink to="/admin/properties" icon={Layout} label="All Properties" />
          <AdminNavLink to="/admin/pages" icon={Settings} label="Manage Pages" />
          <AdminNavLink to="/admin/users" icon={Users} label="Users" />
        </nav>
      </aside>

      {/* Main Admin Area */}
      <main className="flex-grow p-8">
        <Routes>
          <Route index element={<AdminAnalytics />} />
          <Route path="submissions" element={<AdminSubmissions />} />
          <Route path="properties" element={<AdminProperties />} />
          <Route path="pages" element={<AdminPages />} />
          <Route path="users" element={<AdminUsers />} />
        </Routes>
      </main>
    </div>
  );
};

const AdminNavLink = ({ to, icon: Icon, label, end = false }: any) => {
  const location = useLocation();
  const active = end ? location.pathname === to : location.pathname.startsWith(to);

  return (
    <Link 
      to={to} 
      className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </Link>
  );
};

// --- Admin Section Components ---

const AdminAnalytics = () => {
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, users: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const propSnap = await getDocs(collection(db, 'properties'));
      const userSnap = await getDocs(collection(db, 'users'));
      const props = propSnap.docs.map(d => d.data());
      setStats({
        total: props.length,
        pending: props.filter(p => p.status === 'pending').length,
        approved: props.filter(p => p.status === 'approved').length,
        users: userSnap.size
      });
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-black text-gray-900 mb-8 tracking-tight">Platform Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Listings" value={stats.total} icon={Layout} color="blue" />
        <StatCard label="Pending Approval" value={stats.pending} icon={FileText} color="amber" />
        <StatCard label="Approved Listings" value={stats.approved} icon={CheckCircle} color="green" />
        <StatCard label="Registered Users" value={stats.users} icon={Users} color="purple" />
      </div>

      <div className="mt-12 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm h-64 flex items-center justify-center text-gray-300 font-bold uppercase tracking-widest border-dashed">
        Detailed Growth Charts Coming Soon
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon: Icon, color }: any) => {
  const colors: any = {
    blue: 'bg-blue-50 text-blue-600',
    amber: 'bg-amber-50 text-amber-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600'
  };
  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
      <div className={`p-3 w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${colors[color]}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="text-gray-400 text-xs font-black uppercase tracking-widest mb-1">{label}</div>
      <div className="text-3xl font-black text-gray-900">{value}</div>
    </div>
  );
};

const AdminSubmissions = () => {
  const [submissions, setSubmissions] = useState<PropertyListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const fetchSubmissions = async () => {
    setLoading(true);
    const q = query(collection(db, 'properties'), where('status', '==', 'pending'), orderBy('createdAt', 'asc'));
    const snap = await getDocs(q);
    setSubmissions(snap.docs.map(d => ({ id: d.id, ...d.data() } as PropertyListing)));
    setLoading(false);
  };

  useEffect(() => { fetchSubmissions(); }, []);

  const handleAction = async (id: string, action: 'approve' | 'reject', ownerEmail: string) => {
    try {
      const update: any = { status: action === 'approve' ? 'approved' : 'rejected' };
      if (action === 'reject') {
        update.rejectionReason = rejectionReason;
      }

      await updateDoc(doc(db, 'properties', id), update);

      // Trigger Email (Mock API Call)
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: ownerEmail,
          subject: action === 'approve' ? 'Property Approved! 🎉' : 'Property Listing Rejected',
          body: action === 'approve' 
            ? 'Congratulations! Your property listing on IMMO BURUNDI has been approved and is now public.'
            : `Your property listing has been rejected for the following reason: ${rejectionReason}`
        })
      });

      setSubmissions(submissions.filter(s => s.id !== id));
      setRejectingId(null);
      setRejectionReason('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black text-gray-900 mb-8 tracking-tight">Pending Submissions</h2>
      <div className="space-y-6">
        {loading ? (
          <div className="text-gray-400">Loading...</div>
        ) : submissions.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl text-center border-2 border-dashed border-gray-100 flex flex-col items-center">
            <CheckCircle className="w-12 h-12 text-gray-200 mb-4" />
            <p className="text-gray-400 font-bold uppercase tracking-widest">Inbox is empty</p>
          </div>
        ) : submissions.map(s => (
          <div key={s.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center">
              <img src={s.images[0]} className="w-20 h-20 rounded-2xl object-cover mr-4" alt="" />
              <div>
                <h4 className="font-bold text-gray-900 text-lg">{s.title}</h4>
                <p className="text-sm text-gray-500">{s.location} | {s.ownerName}</p>
                <div className="mt-1 font-bold text-blue-600 text-sm">{s.price.toLocaleString()} {s.currency}</div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Link to={`/properties/${s.id}`} className="px-6 py-3 bg-gray-50 text-gray-600 font-bold rounded-xl hover:bg-gray-100 transition flex items-center">
                <Eye className="w-4 h-4 mr-2" /> View Details
              </Link>
              <button 
                onClick={() => {
                  const email = prompt("Enter owner's email manually if not found (internal demo limitation):") || "";
                  handleAction(s.id, 'approve', email);
                }}
                className="px-6 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition flex items-center shadow-lg shadow-green-100"
              >
                <Check className="w-4 h-4 mr-2" /> Approve
              </button>
              <button 
                onClick={() => setRejectingId(s.id)}
                className="px-6 py-3 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition flex items-center"
              >
                <X className="w-4 h-4 mr-2" /> Reject
              </button>
            </div>

            <AnimatePresence>
              {rejectingId === s.id && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="w-full mt-4 pt-4 border-t border-gray-100 flex gap-4"
                >
                  <input 
                    type="text" 
                    placeholder="Reason for rejection..." 
                    className="flex-grow px-4 py-2 bg-gray-50 rounded-lg"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                  />
                  <button 
                    onClick={() => {
                      const email = prompt("Enter owner's email manually:") || "";
                      handleAction(s.id, 'reject', email);
                    }}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg font-bold"
                  >
                    Confirm Reject
                  </button>
                  <button onClick={() => setRejectingId(null)} className="px-6 py-2 text-gray-500">Cancel</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

const AdminProperties = () => {
  const [props, setProps] = useState<PropertyListing[]>([]);
  
  useEffect(() => {
    getDocs(query(collection(db, 'properties'), orderBy('createdAt', 'desc')))
      .then(snap => setProps(snap.docs.map(d => ({ id: d.id, ...d.data() } as PropertyListing))));
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-black text-gray-900 mb-8 tracking-tight">Global Property Inventory</h2>
      <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Property</th>
              <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Owner</th>
              <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Verification</th>
              <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {props.map(p => (
              <tr key={p.id}>
                <td className="px-6 py-4">
                  <div className="font-bold text-gray-900">{p.title}</div>
                  <div className="text-xs text-gray-400">{p.location}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{p.ownerName}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${p.status === 'approved' ? 'bg-green-100 text-green-700' : p.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <select 
                    className="text-xs bg-gray-50 border-none rounded-lg p-1 font-bold"
                    value={p.verifiedStatus}
                    onChange={async (e) => {
                      await updateDoc(doc(db, 'properties', p.id), { verifiedStatus: e.target.value });
                      setProps(props.map(i => i.id === p.id ? { ...i, verifiedStatus: e.target.value as any } : i));
                    }}
                  >
                    <option value="Not Verified">Not Verified</option>
                    <option value="Verified">Verified</option>
                    <option value="Fully Verified">Fully Verified</option>
                  </select>
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => deleteDoc(doc(db, 'properties', p.id)).then(() => setProps(props.filter(i => i.id !== p.id)))} className="text-red-400 hover:text-red-600 transition p-2">
                    <XSquare className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AdminPages = () => {
  const [pages, setPages] = useState<WebPage[]>([]);
  const [editing, setEditing] = useState<WebPage | null>(null);

  useEffect(() => {
    getDocs(collection(db, 'pages')).then(snap => setPages(snap.docs.map(d => ({ id: d.id, ...d.data() } as WebPage))));
  }, []);

  const savePage = async () => {
    if (!editing) return;
    if (editing.id) {
      await updateDoc(doc(db, 'pages', editing.id), { ...editing });
    } else {
      await getDocs(collection(db, 'pages')); // just refresh
    }
    setEditing(null);
    // refresh
    getDocs(collection(db, 'pages')).then(snap => setPages(snap.docs.map(d => ({ id: d.id, ...d.data() } as WebPage))));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">CMS: Page Management</h2>
        <button onClick={() => setEditing({ title: 'New Page', slug: '', content: '', isHome: false } as any)} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center">
          <Plus className="w-5 h-5 mr-2" /> Add Page
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-4">
        {pages.map(p => (
          <div key={p.id} className="flex items-center justify-between p-4 border-b last:border-0 border-gray-50">
            <div>
              <div className="font-bold text-gray-900">{p.title} {p.isHome && <span className="ml-2 text-[10px] bg-blue-100 text-blue-600 px-1 rounded uppercase tracking-widest font-black">Home</span>}</div>
              <div className="text-xs text-gray-400">/{p.slug}</div>
            </div>
            <button onClick={() => setEditing(p)} className="p-2 text-gray-400 hover:text-blue-600"><Settings className="w-5 h-5" /></button>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {editing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6 backdrop-blur-sm">
            <div className="bg-white w-full max-w-2xl rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-black mb-6">Edit Page: {editing.title}</h3>
              <div className="space-y-4">
                <input 
                  type="text" 
                  value={editing.title} 
                  onChange={e => setEditing({ ...editing, title: e.target.value })} 
                  className="w-full p-4 bg-gray-50 rounded-xl" 
                  placeholder="Title" 
                />
                <input 
                  type="text" 
                  value={editing.slug} 
                  onChange={e => setEditing({ ...editing, slug: e.target.value })} 
                  className="w-full p-4 bg-gray-50 rounded-xl" 
                  placeholder="Slug" 
                />
                <textarea 
                  rows={8} 
                  value={editing.content} 
                  onChange={e => setEditing({ ...editing, content: e.target.value })} 
                  className="w-full p-4 bg-gray-50 rounded-xl" 
                  placeholder="HTML/Text Content" 
                />
                <label className="flex items-center space-x-2">
                  <input type="checkbox" checked={editing.isHome} onChange={e => setEditing({ ...editing, isHome: e.target.checked })} />
                  <span className="text-sm font-bold">Set as Homepage</span>
                </label>
              </div>
              <div className="mt-8 flex justify-end space-x-4">
                <button onClick={() => setEditing(null)} className="px-6 py-3 text-gray-500 font-bold">Cancel</button>
                <button onClick={savePage} className="px-10 py-3 bg-blue-600 text-white rounded-xl font-bold">Save Changes</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AdminUsers = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    getDocs(collection(db, 'users')).then(snap => setUsers(snap.docs.map(d => d.data())));
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-black text-gray-900 mb-8 tracking-tight">Platform Users</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map(u => (
          <div key={u.uid} className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center shadow-sm">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-4">
              {u.photoURL ? <img src={u.photoURL} alt="" className="h-full w-full rounded-full object-cover" /> : (u.displayName?.charAt(0) || 'U')}
            </div>
            <div className="flex-grow">
              <div className="font-bold text-gray-900 line-clamp-1">{u.displayName || 'Unknown User'}</div>
              <div className="text-xs text-gray-400 line-clamp-1">{u.email}</div>
              <div className={`text-[10px] uppercase font-black tracking-widest mt-1 ${u.role === 'admin' ? 'text-red-500' : 'text-blue-500'}`}>
                {u.role}
              </div>
            </div>
            {u.role !== 'admin' && (
              <button 
                onClick={async () => {
                  await updateDoc(doc(db, 'users', u.uid), { role: 'admin' });
                  setUsers(users.map(item => item.uid === u.uid ? { ...item, role: 'admin' } : item));
                }}
                className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-blue-600 transition"
              >
                Make Admin
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
