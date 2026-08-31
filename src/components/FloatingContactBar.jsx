import React from 'react';
import { MessageCircle, Phone, Ticket, Sparkles } from 'lucide-react';
import { ORGANIZER_INFO } from '../data/tripDetails';

export default function FloatingContactBar({ onOpenRegister, onOpenInquiry }) {
  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello ${ORGANIZER_INFO.name}, I am interested in joining the Pune to Varanasi (28 Nov - 5 Dec 2026) tour.`
    );
    window.open(`https://wa.me/${ORGANIZER_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <>
      {/* Mobile Bottom Fixed Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-amber-500/30 p-2.5 flex items-center justify-between gap-2 shadow-2xl">
        <button
          onClick={handleWhatsApp}
          className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 active:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>WhatsApp</span>
        </button>

        <button
          onClick={onOpenInquiry}
          className="py-2.5 px-3 rounded-xl bg-slate-800 text-amber-300 font-bold text-xs border border-amber-500/30 flex items-center justify-center gap-1"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Inquiry</span>
        </button>

        <button
          onClick={onOpenRegister}
          className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/30"
        >
          <Ticket className="w-4 h-4" />
          <span>₹{ORGANIZER_INFO.registrationFee} Register</span>
        </button>
      </div>

      {/* Desktop Floating WhatsApp Button in Corner */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-3">
        <div className="relative group">
          <button
            onClick={handleWhatsApp}
            className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-2xl shadow-emerald-500/50 hover:scale-110 transition-all duration-300"
            title="Chat with Pawan Pawar on WhatsApp"
          >
            <MessageCircle className="w-7 h-7 fill-white" />
          </button>
          
          <span className="absolute right-16 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-900 text-emerald-300 text-xs font-bold rounded-lg border border-emerald-500/40 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Chat with Pawan Pawar
          </span>
        </div>
      </div>
    </>
  );
}
