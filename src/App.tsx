import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages (to be implemented)
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Disclaimer from './pages/Disclaimer';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import SubmitProperty from './pages/SubmitProperty';

const ProtectedRoute: React.FC<{ children: React.ReactNode, adminOnly?: boolean }> = ({ children, adminOnly }) => {
  const { user, loading, profile } = useAuth();

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && profile?.role !== 'admin') return <Navigate to="/dashboard" />;

  return <>{children}</>;
};

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/properties/:id" element={<PropertyDetail />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
              <Route path="/login" element={<Login />} />
              
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/submit-property" 
                element={
                  <ProtectedRoute>
                    <SubmitProperty />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/edit-property/:id" 
                element={
                  <ProtectedRoute>
                    <SubmitProperty />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/*" 
                element={
                  <ProtectedRoute adminOnly>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}
