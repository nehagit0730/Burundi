import React from 'react';

const Terms = () => {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <h1 className="text-4xl font-black text-gray-900 mb-8 tracking-tighter">TERMS & CONDITIONS</h1>
      <div className="prose prose-sm max-w-none text-gray-600 space-y-6">
        <p className="font-bold">Effective Date: May 9, 2026</p>
        <p>By accessing or using the platform, users agree to comply with these terms.</p>
        
        <h2 className="text-xl font-bold text-gray-900">1. Platform Purpose</h2>
        <p>IMMO BURUNDI is a real estate marketplace and brokerage platform. We are not a government land registry authority.</p>
        
        <h2 className="text-xl font-bold text-gray-900">2. User Eligibility</h2>
        <p>Users must be legally capable of entering agreements and provide accurate information.</p>
        
        <h2 className="text-xl font-bold text-gray-900">3. Property Listings</h2>
        <p>Owners and agents are fully responsible for the accuracy of their listings and legality of transactions.</p>
        
        <h2 className="text-xl font-bold text-gray-900">4. Prohibited Activities</h2>
        <p>Users may not upload false documents, commit fraud, or interfere with platform security.</p>
        
        <h2 className="text-xl font-bold text-gray-900">5. Limitation of Liability</h2>
        <p>IMMO BURUNDI shall not be held liable for property disputes, fraud by third parties, or financial losses.</p>
      </div>
    </div>
  );
};

export default Terms;
