import React from 'react';
import { Phone, MessageCircle, Heart, Sparkles, MapPin, Train, Calendar, Ticket } from 'lucide-react';
import { ORGANIZER_INFO } from '../data/tripDetails';

export default function Footer({ onOpenRegister, onOpenInquiry }) {
  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello ${ORGANIZER_INFO.name}, I am interested in joining the Pune to Varanasi (28 Nov - 5 Dec 2026) tour.`
    );
    window.open(`https://wa.me/${ORGANIZER_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-24 md:pb-16 px-4 sm:px-6 lg:px-8 text-slate-400 text-xs">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Mahadev Chant */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-600 flex items-center justify-center text-xl shadow-lg shadow-amber-500/20">
                🛕
              </div>
              <div>
                <span className="font-serif font-black text-lg text-gradient-gold">
                  PUNE ➔ VARANASI YATRA 2026
                </span>
                <p className="text-[11px] text-slate-400">
                  28 November – 05 December 2026 (Return: 06 Dec)
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-md">
              A spiritually uplifting 8-day tour designed from Pune to Banaras via Train 22131 & 11034. Covering Shri Kashi Vishwanath Jyotirlinga, Dashashwamedh Ganga Aarti, Assi Ghat Sunrise Boat Cruise, Sarnath, BHU, and Banarasi Silk weaving heritage.
            </p>

            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-amber-300/90 font-serif italic text-xs">
              "ॐ नमः शिवाय • काशी विश्वनाथाय नमो नमः"
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#itinerary" className="hover:text-amber-400 transition-colors">8-Day Daywise Schedule</a></li>
              <li><a href="#trains" className="hover:text-amber-400 transition-colors">Train 22131 & 11034 Details</a></li>
              <li><a href="#budget" className="hover:text-amber-400 transition-colors">Interactive Cost Calculator</a></li>
              <li><a href="#stay" className="hover:text-amber-400 transition-colors">Where to Stay (Godowlia / Assi)</a></li>
              <li><a href="#food-shopping" className="hover:text-amber-400 transition-colors">Banarasi Food & Silk Guide</a></li>
              <li><a href="#faqs" className="hover:text-amber-400 transition-colors">Trip FAQs & Rules</a></li>
            </ul>
          </div>

          {/* Col 3: Coordinator Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Coordinator & Bookings
            </h4>
            <div className="space-y-2 text-xs">
              <p className="text-white font-bold">{ORGANIZER_INFO.name}</p>
              <p className="flex items-center gap-1.5 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <a href={`tel:${ORGANIZER_INFO.phone}`} className="hover:underline">{ORGANIZER_INFO.displayPhone}</a>
              </p>
              <p className="flex items-center gap-1.5 text-emerald-400">
                <MessageCircle className="w-3.5 h-3.5" />
                <button onClick={handleWhatsApp} className="hover:underline">WhatsApp Direct</button>
              </p>
              <p className="text-slate-400">
                Email: <span className="text-amber-300">{ORGANIZER_INFO.email}</span>
              </p>
              <div className="pt-2">
                <button
                  onClick={onOpenRegister}
                  className="w-full py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg shadow transition-all"
                >
                  Register Seat (Instant Free)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-[11px] text-slate-500">
            © 2026 Pune to Varanasi Yatra. Coordinated by {ORGANIZER_INFO.name}. All rights reserved.
          </p>
          <p className="text-[11px] text-slate-500 flex items-center gap-1 justify-center">
            <span>Crafted with reverence for Kashi Mahadev</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
