import React from 'react';
import { ShieldAlert } from 'lucide-react';

const Disclaimer = () => {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <div className="bg-amber-50 border-2 border-amber-100 p-12 rounded-3xl">
        <div className="flex items-center text-amber-600 mb-6">
          <ShieldAlert className="w-10 h-10 mr-4" />
          <h1 className="text-3xl font-black tracking-tighter uppercase italic">Property Verification Disclaimer</h1>
        </div>
        
        <div className="prose prose-sm max-w-none text-amber-900 space-y-6 leading-relaxed">
          <p className="font-bold text-lg">Official Verification Disclaimer</p>
          <p>
            IMMO BURUNDI performs document verification based on the documents, records, and 
            information presented by the property owner, representative, agent, or seller at the time of 
            verification.
          </p>
          <p>
            A property marked as “Verified” or “Fully Verified” means that IMMO BURUNDI reviewed and 
            verified the authenticity and consistency of the submitted documents to the best of its 
            operational ability at the time of review.
          </p>
          <p>
            However, IMMO BURUNDI does not guarantee: future legal ownership disputes, hidden claims, 
            government registry errors, or forged documents not reasonably detectable.
          </p>
          <p className="font-bold">Users are strongly encouraged to:</p>
          <ul className="list-disc pl-6">
            <li>Conduct independent legal due diligence</li>
            <li>Consult qualified legal professionals</li>
            <li>Confirm ownership records with relevant government authorities</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
