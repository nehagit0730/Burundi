import React from 'react';

const Privacy = () => {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <h1 className="text-4xl font-black text-gray-900 mb-8 tracking-tighter">PRIVACY POLICY</h1>
      <div className="prose prose-sm max-w-none text-gray-600 space-y-6">
        <p className="font-bold">Effective Date: May 9, 2026</p>
        <p>IMMO BURUNDI respects the privacy of all users, clients, agents, and visitors using our platform.</p>
        
        <h2 className="text-xl font-bold text-gray-900">1. Information We Collect</h2>
        <p>We may collect Personal Information (Name, Phone, Email, Address, ID), Property Information (Ownership docs, GPS, Photos), Payment Information, and Technical Information.</p>
        
        <h2 className="text-xl font-bold text-gray-900">2. How We Use Information</h2>
        <p>We use collected information to provide platform services, publish property listings, process verification requests, improve security, and communicate with users.</p>
        
        <h2 className="text-xl font-bold text-gray-900">3. Data Sharing</h2>
        <p>IMMO BURUNDI does not sell personal information. Information may be shared only with authorized staff, when required by law, or to prevent fraud.</p>
        
        <h2 className="text-xl font-bold text-gray-900">4. Data Security</h2>
        <p>We implement security measures including password encryption, access control systems, and audit logging. However, no digital system can guarantee 100% security.</p>
      </div>
    </div>
  );
};

export default Privacy;
