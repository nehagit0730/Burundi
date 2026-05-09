import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <h1 className="text-5xl font-black text-gray-900 mb-12 tracking-tighter">CONTACT US</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="flex items-start">
            <div className="bg-blue-100 p-3 rounded-xl text-blue-600 mr-4">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 uppercase tracking-widest text-sm mb-1">Email Us</h3>
              <p className="text-gray-600">support@immoburundi.bi</p>
              <p className="text-gray-600">info@immoburundi.bi</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-blue-100 p-3 rounded-xl text-blue-600 mr-4">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 uppercase tracking-widest text-sm mb-1">Call Us</h3>
              <p className="text-gray-600">+257 22 22 22 22</p>
              <p className="text-gray-600">+257 79 00 00 00</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-blue-100 p-3 rounded-xl text-blue-600 mr-4">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 uppercase tracking-widest text-sm mb-1">Visit Us</h3>
              <p className="text-gray-600">Boulevard de l'Uprona, Bujumbura</p>
              <p className="text-gray-600">Burundi</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-blue-100 p-3 rounded-xl text-blue-600 mr-4">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 uppercase tracking-widest text-sm mb-1">Business Hours</h3>
              <p className="text-gray-600">Mon - Fri: 08:30 - 17:30</p>
              <p className="text-gray-600">Sat: 09:00 - 13:00</p>
              <p className="text-gray-600">Sun: Closed</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
          <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
          <form className="space-y-4">
            <div>
              <input type="text" placeholder="Full Name" className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-100" />
            </div>
            <div>
              <input type="email" placeholder="Email Address" className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-100" />
            </div>
            <div>
              <textarea rows={4} placeholder="Your Message" className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-100"></textarea>
            </div>
            <button className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-100">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
