import React from 'react';
import { 
  Calendar, 
  MapPin, 
  Train, 
  Sparkles, 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Flame,
  Sun
} from 'lucide-react';
import { ORGANIZER_INFO, TRAIN_DETAILS } from '../data/tripDetails';

export default function Hero({ onOpenRegister, onOpenInquiry }) {
  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello ${ORGANIZER_INFO.name}, I want to join the Pune to Varanasi (28 Nov - 5 Dec 2026) tour. Please provide complete trip and seat booking details.`
    );
    window.open(`https://wa.me/${ORGANIZER_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Decorative Gradient & Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[500px] bg-gradient-to-br from-amber-600/20 via-orange-600/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-700/15 rounded-full blur-3xl" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-700/10 rounded-full blur-2xl" />
        
        {/* Subtle patterned overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:28px_28px] opacity-10" />
      </div>

      <div className="relative max-w-6xl mx-auto text-center space-y-8 z-10">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-950/80 to-orange-950/80 border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-semibold shadow-inner">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Sacred Kashi & Spiritual Heritage Tour</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700 text-slate-300 text-xs sm:text-sm font-medium">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold text-white">28 Nov – 05 Dec 2026</span>
            <span className="text-slate-400 text-xs">(Return: 06 Dec)</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-semibold">
            <Train className="w-3.5 h-3.5 text-emerald-400" />
            <span>Pune ➔ Banaras (Train 22131 & 11034)</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-serif tracking-tight leading-[1.15]">
            <span className="text-white">Experience Divine</span>{' '}
            <span className="text-gradient-gold">Varanasi</span>
            <br />
            <span className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-gradient-saffron">
              From Pune to The City of Mahadev
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            A soulful 8-day journey with 6 full days of guided spiritual sightseeing: 
            <strong className="text-amber-300 font-semibold"> Kashi Vishwanath Jyotirlinga</strong>, 
            mesmerizing <strong className="text-amber-300 font-semibold">Ganga Aarti</strong>, 
            sunrise wooden boat rides at <strong className="text-amber-300 font-semibold">Assi Ghat</strong>, 
            historic <strong className="text-amber-300 font-semibold">Sarnath</strong>, 
            <strong className="text-amber-300 font-semibold"> BHU</strong>, and authentic Banarasi Silk shopping.
          </p>
        </div>

        {/* Organizer Notice Banner */}
        <div className="max-w-2xl mx-auto p-3.5 rounded-2xl bg-slate-900/90 border border-amber-500/30 flex flex-wrap items-center justify-between gap-3 shadow-lg shadow-black/40">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-300 font-bold">
              PP
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Tour Organizer</p>
              <p className="text-sm font-bold text-white flex items-center gap-1.5">
                <span>{ORGANIZER_INFO.name}</span>
                <span className="text-xs text-amber-400 font-normal">({ORGANIZER_INFO.phone})</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleWhatsApp}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow transition-all hover:scale-105"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>
            <a
              href={`tel:${ORGANIZER_INFO.phone}`}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 border border-slate-700 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Call</span>
            </a>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          {/* Main Registration Button */}
          <button
            onClick={onOpenRegister}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-base sm:text-lg rounded-xl shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2.5 animate-soft-pulse"
          >
            <CreditCard className="w-5 h-5" />
            <span>Register Seat (₹{ORGANIZER_INFO.registrationFee} Token)</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Interested / Inquiry Button */}
          <button
            onClick={onOpenInquiry}
            className="w-full sm:w-auto px-7 py-4 bg-slate-900/90 hover:bg-slate-800 text-amber-300 hover:text-white font-bold text-base rounded-xl border border-amber-500/40 hover:border-amber-400 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>I'm Interested / Inquiry</span>
          </button>
        </div>

        {/* Registration Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-400 pt-1">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-4 h-4" /> 100% Genuine Direct Coordination
          </span>
          <span className="flex items-center gap-1.5 text-amber-300">
            <CheckCircle2 className="w-4 h-4 text-amber-400" /> Pay via PhonePe / Google Pay / UPI ({ORGANIZER_INFO.upiId})
          </span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <Train className="w-4 h-4 text-blue-400" /> 60-Day Advance Train Berth Priority
          </span>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-6 text-left">
          {[
            { title: "27h Express Train", desc: "Train 22131 Direct Pune to Banaras", icon: Train, color: "text-blue-400" },
            { title: "Kashi Darshan", desc: "Shri Kashi Vishwanath & Corridor", icon: Flame, color: "text-red-400" },
            { title: "Sunrise Boating", desc: "Assi to Manikarnika Ghat cruise", icon: Sun, color: "text-amber-400" },
            { title: "Ganga Aarti", desc: "Dashashwamedh divine spectacle", icon: Sparkles, color: "text-orange-400" },
            { title: "Sarnath & BHU", desc: "Buddha sermon & Birla temple", icon: MapPin, color: "text-emerald-400" },
            { title: "Silk & Chaat", desc: "Authentic sarees & street food", icon: CheckCircle2, color: "text-pink-400" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/40 transition-all hover:-translate-y-1 group backdrop-blur-sm"
            >
              <item.icon className={`w-5 h-5 mb-2 ${item.color} group-hover:scale-110 transition-transform`} />
              <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                {item.title}
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2 leading-tight">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
