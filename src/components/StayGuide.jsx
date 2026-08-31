import React from 'react';
import { 
  Building2, 
  MapPin, 
  Flame, 
  Sun, 
  ShieldCheck, 
  Check, 
  Star, 
  Sparkles 
} from 'lucide-react';
import { STAY_OPTIONS } from '../data/tripDetails';

export default function StayGuide() {
  return (
    <section id="stay" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-slate-950/80">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Heading */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-400 text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5" />
            <span>Accommodation Strategy</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-white">
            Where to Stay in <span className="text-gradient-gold">Varanasi</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Carefully curated hotel neighborhoods ensuring walkability to holy ghats, temple corridors, and peaceful night rest.
          </p>
        </div>

        {/* 3 Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STAY_OPTIONS.map((opt, idx) => {
            const isTopChoice = opt.id === 'godowlia' || opt.id === 'assi';
            return (
              <div
                key={opt.id}
                className={`rounded-3xl p-6 sm:p-7 space-y-6 flex flex-col justify-between transition-all duration-300 ${
                  isTopChoice
                    ? 'glass-card border-2 border-amber-500/50 bg-gradient-to-b from-slate-900/90 to-slate-950 shadow-xl shadow-amber-500/10 hover:border-amber-400'
                    : 'bg-slate-900/60 border border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-4">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-400">Option {idx + 1}</span>
                    {isTopChoice && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[11px] font-extrabold uppercase tracking-wider">
                        <Star className="w-3 h-3 fill-slate-950" />
                        <span>Recommended Choice</span>
                      </span>
                    )}
                  </div>

                  {/* Title & Badge */}
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <span>{opt.name}</span>
                    </h3>
                    <p className="text-xs font-semibold text-amber-400 mt-0.5">{opt.badge}</p>
                  </div>

                  {/* Best For */}
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs">
                    <span className="text-slate-400 font-medium">Best For: </span>
                    <span className="text-slate-200 font-semibold">{opt.recommendedFor}</span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2 pt-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Key Advantages</p>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {opt.features.map((f, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Ideal For Footer */}
                <div className="pt-4 border-t border-slate-800/80 text-xs">
                  <span className="text-slate-400 font-medium">Ideal For: </span>
                  <span className="text-amber-300 font-semibold">{opt.idealFor}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pro Recommendation Callout */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-amber-950/60 border border-amber-500/30 text-center space-y-2">
          <p className="text-sm sm:text-base font-bold text-amber-300 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Tour Host Recommendation: Assi Ghat or Godowlia</span>
          </p>
          <p className="text-xs text-slate-300 max-w-2xl mx-auto leading-relaxed">
            For our 28 Nov – 05 Dec tour, staying in Assi Ghat or Godowlia allows us to walk to the Ganga Aarti and morning boat points effortlessly without getting caught in peak traffic.
          </p>
        </div>
      </div>
    </section>
  );
}
