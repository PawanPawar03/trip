import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Sparkles, Menu, X, Calendar, Ticket } from 'lucide-react';
import { ORGANIZER_INFO } from '../data/tripDetails';

export default function Navbar({ onOpenRegister, onOpenInquiry }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Itinerary', href: '#itinerary' },
    { name: 'Train Info', href: '#trains' },
    { name: 'Budget Calculator', href: '#budget' },
    { name: 'Where to Stay', href: '#stay' },
    { name: 'Food & Silk', href: '#food-shopping' },
    { name: 'FAQs', href: '#faqs' },
    { name: 'Contact', href: '#inquiry' },
  ];

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello ${ORGANIZER_INFO.name}, I am interested in joining the Pune to Varanasi Trip (28 Nov - 5 Dec 2026). Please share more details.`
    );
    window.open(`https://wa.me/${ORGANIZER_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-amber-500/20 py-3 shadow-xl'
          : 'bg-gradient-to-b from-slate-950/90 via-slate-950/60 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo / Brand */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-600 flex items-center justify-center text-xl shadow-lg shadow-amber-500/30 group-hover:scale-105 transition-transform">
            🛕
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-black text-lg tracking-wider text-gradient-gold">
                PUNE ➔ KASHI
              </span>
              <span className="text-xs bg-amber-500/20 text-amber-300 font-semibold px-2 py-0.5 rounded-full border border-amber-500/30">
                2026
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium tracking-tight">
              28 Nov – 05 Dec • Banaras Yatra
            </p>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {/* Quick WhatsApp */}
          <button
            onClick={handleWhatsApp}
            title="Chat on WhatsApp"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/40 rounded-lg transition-all hover:scale-105"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp</span>
          </button>

          {/* Quick Call */}
          <a
            href={`tel:${ORGANIZER_INFO.phone}`}
            title="Call Pawan Pawar"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-all"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>{ORGANIZER_INFO.phone}</span>
          </a>

          {/* Interested / Inquiry */}
          <button
            onClick={onOpenInquiry}
            className="px-3.5 py-2 text-xs font-semibold text-amber-300 bg-amber-950/60 hover:bg-amber-900/80 border border-amber-500/40 rounded-lg transition-all hover:scale-105"
          >
            Inquiry
          </button>

          {/* Register Button */}
          <button
            onClick={onOpenRegister}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-300 hover:to-orange-400 rounded-lg shadow-md shadow-amber-500/30 hover:shadow-amber-500/50 transition-all hover:scale-105"
          >
            <Ticket className="w-4 h-4" />
            <span>Register Seat</span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenRegister}
            className="px-3 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 rounded-lg shadow-sm"
          >
            Register
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/80 border border-slate-700"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900/95 border-b border-amber-500/30 px-5 py-4 space-y-3 backdrop-blur-lg">
          <nav className="flex flex-col space-y-2.5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-200 hover:text-amber-400 py-1 transition-colors border-b border-slate-800/60"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegister();
              }}
              className="w-full py-2.5 text-center font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-orange-400 rounded-lg shadow-md flex items-center justify-center gap-2"
            >
              <Ticket className="w-4 h-4" />
              <span>Register Seat (Instant)</span>
            </button>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleWhatsApp();
                }}
                className="py-2 px-3 text-xs font-semibold text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 rounded-lg flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiry();
                }}
                className="py-2 px-3 text-xs font-semibold text-amber-300 bg-amber-950/80 border border-amber-500/40 rounded-lg flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Inquiry</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
