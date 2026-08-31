import React from 'react';
import { 
  Flame, 
  Sun, 
  Train, 
  MapPin, 
  ShoppingBag, 
  ShieldCheck, 
  HeartHandshake, 
  Clock, 
  Sparkles,
  Camera,
  Users,
  Award
} from 'lucide-react';
import { ORGANIZER_INFO } from '../data/tripDetails';

export default function TripHighlights({ onOpenRegister, onOpenInquiry }) {
  const highlights = [
    {
      title: "Direct Express Train (No Transfers)",
      desc: "Travel stress-free aboard Train 22131 Pune–Banaras Express directly to Banaras station without changing trains or stations.",
      icon: Train,
      color: "from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-400",
      badge: "Train 22131 & 11034"
    },
    {
      title: "Shri Kashi Vishwanath Jyotirlinga",
      desc: "Special morning Darshan at one of the 12 sacred Jyotirlingas, exploring the sprawling grand Corridor and Kal Bhairav Temple.",
      icon: Flame,
      color: "from-red-500/20 to-red-600/10 border-red-500/30 text-red-400",
      badge: "Divine Darshan"
    },
    {
      title: "Subah-e-Banaras & Sunrise Boat Ride",
      desc: "Experience morning Vedic chanting at Assi Ghat followed by a scenic wooden boat cruise passing all 84 historic ghats.",
      icon: Sun,
      color: "from-amber-500/20 to-orange-600/10 border-amber-500/30 text-amber-400",
      badge: "Unmatched Photography"
    },
    {
      title: "Spellbinding Dashashwamedh Aarti",
      desc: "Reserved vantage points for the world-famous evening Ganga Aarti with giant brass oil lamps, conch shells, and floating diyas.",
      icon: Sparkles,
      color: "from-orange-500/20 to-amber-600/10 border-orange-500/30 text-orange-400",
      badge: "Spiritual Ecstasy"
    },
    {
      title: "Sarnath Heritage & Lord Buddha",
      desc: "Visit the site of Buddha's first sermon, ancient Dhamek Stupa, and the museum containing India's national emblem (Ashoka Lion Capital).",
      icon: MapPin,
      color: "from-emerald-500/20 to-teal-600/10 border-emerald-500/30 text-emerald-400",
      badge: "UNESCO Heritage"
    },
    {
      title: "BHU, Ramnagar Fort & Silk Crafts",
      desc: "Explore Banaras Hindu University, New Birla Temple, 18th-century Ramnagar Fort, and weaver-direct Banarasi silk saree shopping.",
      icon: ShoppingBag,
      color: "from-purple-500/20 to-pink-600/10 border-purple-500/30 text-purple-400",
      badge: "Culture & Craft"
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative bg-slate-950/40">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Heading */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-400 text-xs font-semibold">
            <Award className="w-3.5 h-3.5" />
            <span>Why Join This Tour</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-white">
            6 Unforgettable Days in <span className="text-gradient-gold">Kashi</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Meticulously planned to give you the ideal balance of spiritual Darshan, peaceful boat rides, education, photography, and leisure.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-6 sm:p-7 bg-gradient-to-b ${item.color} border space-y-4 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-slate-950/70 border border-current/30 flex items-center justify-center">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-950/80 text-[11px] font-bold border border-slate-700 text-slate-200">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-amber-300">
                <span>Included in itinerary</span>
                <span>Day {idx + 2 > 8 ? 8 : idx + 2}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xl font-bold text-white flex items-center gap-2 justify-center sm:justify-start">
              <span>Ready for the sacred journey to Banaras?</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Lock your preferred train berth (SL / 3A / 2A) today with instant free seat registration.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenInquiry}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs border border-slate-700 transition-all"
            >
              Ask Questions
            </button>
            <button
              onClick={onOpenRegister}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/30 transition-all hover:scale-105"
            >
              Register Seat (Free)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
