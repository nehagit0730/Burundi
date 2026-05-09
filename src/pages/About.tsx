import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-5xl font-black text-gray-900 mb-8 tracking-tighter uppercase italic">About IMMO BURUNDI</h1>
        
        <div className="prose prose-blue max-w-none">
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            IMMO BURUNDI is a modern real estate marketplace and brokerage platform designed to 
            improve transparency, accessibility, and trust in the real estate sector of Burundi.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Our Mission</h2>
          <p className="text-gray-600">
            Our mission is to connect property owners, buyers, tenants, investors, and agents through a 
            secure and professional digital platform.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">What We Provide</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-8">
            <li>Property listings</li>
            <li>Property verification services</li>
            <li>Rental support</li>
            <li>Property promotion</li>
            <li>Real estate brokerage assistance</li>
            <li>Digital property management solutions</li>
          </ul>

          <p className="text-gray-600 mb-8">
            Our platform combines technology, verification processes, and professional oversight to help 
            reduce fraud and improve confidence in property transactions.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Multilingual Support</h2>
          <p className="text-gray-600 mb-8">
            Our platform supports: English, French, Swahili.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-xl">
            <h3 className="text-blue-900 font-bold mb-2">Important Notice</h3>
            <p className="text-blue-800 text-sm italic">
              Property verification statuses are based on documents and information presented to IMMO BURUNDI at the time of verification and do not constitute a government ownership guarantee.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
