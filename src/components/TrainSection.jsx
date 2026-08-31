import React from 'react';
import { 
  Train, 
  Clock, 
  Calendar, 
  MapPin, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Info
} from 'lucide-react';
import { TRAIN_DETAILS, ORGANIZER_INFO } from '../data/tripDetails';

export default function TrainSection({ onOpenRegister }) {
  const { outbound, inbound, reservationNotice } = TRAIN_DETAILS;

  return (
    <section id="trains" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Heading */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-950/80 border border-blue-500/40 text-blue-400 text-xs font-semibold">
            <Train className="w-3.5 h-3.5" />
            <span>Official Rail Route Plan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-white">
            Recommended <span className="text-gradient-gold">Train Itinerary</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Direct express train connections between Pune Junction and Banaras (BNRS) ensuring zero hassle of switching trains.
          </p>
        </div>

        {/* Train Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Outbound Train Card */}
          <div className="relative rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-blue-500/30 p-6 sm:p-8 space-y-6 shadow-xl shadow-blue-950/20 hover:border-blue-500/60 transition-all">
            {/* Train Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-5">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>ONWARD JOURNEY</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  <span>{outbound.trainNumber}</span>
                  <span className="text-slate-400 font-normal">|</span>
                  <span className="text-amber-400">{outbound.trainName}</span>
                </h3>
                <p className="text-xs text-slate-400">{outbound.status}</p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                <Train className="w-6 h-6" />
              </div>
            </div>

            {/* Journey Timeline */}
            <div className="space-y-4">
              {/* Departure */}
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
                  <div className="w-0.5 h-14 bg-slate-700 my-1" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Departure: Pune Jn</p>
                  <p className="text-lg font-extrabold text-white">{outbound.departureTime}</p>
                  <p className="text-xs text-slate-300 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{outbound.departureDate}</span>
                  </p>
                  <p className="text-xs text-slate-400">Station Code: PUNE</p>
                </div>
              </div>

              {/* Transit Tag */}
              <div className="pl-8 -my-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700">
                  <Clock className="w-3 h-3 text-blue-400" />
                  <span>Journey: ~{outbound.duration} (Direct)</span>
                </span>
              </div>

              {/* Arrival */}
              <div className="flex items-start gap-4 pt-1">
                <div className="flex flex-col items-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-amber-500 ring-4 ring-amber-500/20" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">Arrival: Banaras Station</p>
                  <p className="text-lg font-extrabold text-white">{outbound.arrivalTime}</p>
                  <p className="text-xs text-slate-300 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{outbound.arrivalDate}</span>
                  </p>
                  <p className="text-xs text-slate-400">Station Code: BNRS (Direct to city)</p>
                </div>
              </div>
            </div>

            {/* Classes & Perks */}
            <div className="pt-4 border-t border-slate-800/80 space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-400 font-medium">Available Classes:</span>
                {outbound.classes.map((cls) => (
                  <span key={cls} className="px-2 py-0.5 bg-slate-800 text-amber-300 rounded border border-slate-700 font-semibold">
                    {cls}
                  </span>
                ))}
              </div>
              <p className="text-xs text-emerald-300/90 bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-500/30 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{outbound.tips}</span>
              </p>
            </div>
          </div>

          {/* Inbound Return Train Card */}
          <div className="relative rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-purple-500/30 p-6 sm:p-8 space-y-6 shadow-xl shadow-purple-950/20 hover:border-purple-500/60 transition-all">
            {/* Train Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-5">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/40">
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                  <span>RETURN JOURNEY</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  <span>{inbound.trainNumber}</span>
                  <span className="text-slate-400 font-normal">|</span>
                  <span className="text-amber-400">{inbound.trainName}</span>
                </h3>
                <p className="text-xs text-slate-400">{inbound.status}</p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                <Train className="w-6 h-6" />
              </div>
            </div>

            {/* Journey Timeline */}
            <div className="space-y-4">
              {/* Departure */}
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-purple-500 ring-4 ring-purple-500/20" />
                  <div className="w-0.5 h-14 bg-slate-700 my-1" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-purple-400 uppercase tracking-wider">Departure: Banaras Station</p>
                  <p className="text-lg font-extrabold text-white">{inbound.departureTime}</p>
                  <p className="text-xs text-slate-300 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{inbound.departureDate}</span>
                  </p>
                  <p className="text-xs text-slate-400">Station Code: BNRS</p>
                </div>
              </div>

              {/* Transit Tag */}
              <div className="pl-8 -my-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700">
                  <Clock className="w-3 h-3 text-purple-400" />
                  <span>Journey: ~{inbound.duration}</span>
                </span>
              </div>

              {/* Arrival */}
              <div className="flex items-start gap-4 pt-1">
                <div className="flex flex-col items-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Arrival: Pune Jn</p>
                  <p className="text-lg font-extrabold text-white">{inbound.arrivalTime}</p>
                  <p className="text-xs text-slate-300 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{inbound.arrivalDate}</span>
                  </p>
                  <p className="text-xs text-slate-400">Station Code: PUNE</p>
                </div>
              </div>
            </div>

            {/* Classes & Perks */}
            <div className="pt-4 border-t border-slate-800/80 space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-400 font-medium">Available Classes:</span>
                {inbound.classes.map((cls) => (
                  <span key={cls} className="px-2 py-0.5 bg-slate-800 text-amber-300 rounded border border-slate-700 font-semibold">
                    {cls}
                  </span>
                ))}
              </div>
              <p className="text-xs text-purple-300/90 bg-purple-950/40 p-2.5 rounded-lg border border-purple-500/30 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span>{inbound.tips}</span>
              </p>
            </div>
          </div>
        </div>

        {/* 60-Day Reservation Important Notice Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/70 via-slate-900 to-amber-950/70 border border-amber-500/40 shadow-lg space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 shrink-0 border border-amber-500/40">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base sm:text-lg font-bold text-amber-300">
                  Critical IRCTC 60-Day Advance Booking Rule
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Railway reservations open exactly <strong className="text-white">60 days in advance</strong> (around late September 2026).
                  Because Varanasi is a high-demand route, berths sell out within minutes of opening.
                </p>
              </div>
            </div>

            <button
              onClick={onOpenRegister}
              className="shrink-0 px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <span>Hold Priority Slot (₹{ORGANIZER_INFO.registrationFee})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-300">
            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 flex items-center gap-2">
              <span className="text-amber-400 font-bold">1.</span> Register with ₹{ORGANIZER_INFO.registrationFee} token now
            </div>
            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 flex items-center gap-2">
              <span className="text-amber-400 font-bold">2.</span> Berth booking on Day 1 of window
            </div>
            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 flex items-center gap-2">
              <span className="text-amber-400 font-bold">3.</span> Guaranteed group seat allocation
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
