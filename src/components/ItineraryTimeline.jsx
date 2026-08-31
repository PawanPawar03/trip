import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Flame, 
  Sun, 
  Train, 
  Compass, 
  GraduationCap, 
  ShoppingBag, 
  Building, 
  CheckCircle2, 
  Lightbulb,
  Camera,
  Layers
} from 'lucide-react';
import { ITINERARY_DAYS } from '../data/itineraryData';
import { ORGANIZER_INFO } from '../data/tripDetails';

const iconMap = {
  Train: Train,
  Building: Building,
  Flame: Flame,
  Compass: Compass,
  BookOpen: Compass,
  GraduationCap: GraduationCap,
  ShoppingBag: ShoppingBag,
  CheckCircle: CheckCircle2,
};

export default function ItineraryTimeline({ onOpenRegister }) {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [viewMode, setViewMode] = useState('detail'); // 'detail' or 'all'

  const selectedDay = ITINERARY_DAYS[selectedDayIndex];

  return (
    <section id="itinerary" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-slate-950/60">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complete Day-by-Day Experience</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-white">
            8-Day Divine <span className="text-gradient-gold">Varanasi Itinerary</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Perfect balance of spirituality, boat rides, heritage, education, silk crafts, and mouth-watering Banarasi street food.
          </p>
        </div>

        {/* Day Selector Tabs */}
        <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-4 pt-2 no-scrollbar">
          {ITINERARY_DAYS.map((day, idx) => {
            const isSelected = selectedDayIndex === idx;
            return (
              <button
                key={day.dayNumber}
                onClick={() => {
                  setSelectedDayIndex(idx);
                  setViewMode('detail');
                }}
                className={`shrink-0 px-4 py-3 rounded-xl text-left transition-all border ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-400 text-white shadow-lg shadow-amber-500/10'
                    : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold ${isSelected ? 'text-amber-400' : 'text-slate-400'}`}>
                    {day.dayNumber}
                  </span>
                  <span className="text-[11px] text-slate-400">({day.date.split(' ')[0]} {day.date.split(' ')[1]})</span>
                </div>
                <p className="text-xs font-semibold text-slate-200 truncate max-w-[130px] mt-0.5">
                  {day.title.split('&')[0]}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Day Detailed View */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-amber-500/30 relative overflow-hidden shadow-2xl">
          {/* Top Banner of the Card */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 bg-amber-500 text-slate-950 font-black text-xs rounded-full">
                  {selectedDay.dayNumber} • {selectedDay.dayOfWeek}
                </span>
                <span className="text-sm font-semibold text-amber-300">
                  {selectedDay.date}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${selectedDay.tagColor}`}>
                  {selectedDay.tag}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-black text-white">
                {selectedDay.title}
              </h3>
              <p className="text-sm text-slate-400">{selectedDay.theme}</p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={onOpenRegister}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg shadow transition-all"
              >
                Join This Trip (₹{ORGANIZER_INFO.registrationFee})
              </button>
            </div>
          </div>

          {/* Day Summary */}
          <div className="py-5 text-sm sm:text-base text-slate-200 leading-relaxed bg-slate-900/40 px-5 rounded-2xl border border-slate-800/80 my-6">
            <p>{selectedDay.summary}</p>
          </div>

          {/* Time Schedule Cards */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-wider font-bold text-amber-400 flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>Day Schedule Breakdown</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedDay.schedule.map((item, sIdx) => (
                <div
                  key={sIdx}
                  className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-all space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-amber-400 bg-amber-950/60 px-2.5 py-0.5 rounded border border-amber-500/30">
                      {item.time}
                    </span>
                    <span className="text-[11px] text-slate-400 uppercase font-semibold">
                      {item.period}
                    </span>
                  </div>
                  <h5 className="text-sm font-bold text-white">
                    {item.title}
                  </h5>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights & Pro Tip */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-800">
            {/* Highlights */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Day Highlights</span>
              </h5>
              <ul className="space-y-1 text-xs text-slate-300">
                {selectedDay.highlights.map((hl, hIdx) => (
                  <li key={hIdx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pro Tip */}
            <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 space-y-1.5">
              <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>Traveler Tip</span>
              </h5>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedDay.tip}
              </p>
            </div>
          </div>

          {/* Bottom Next/Prev buttons */}
          <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-800 text-xs font-semibold">
            <button
              disabled={selectedDayIndex === 0}
              onClick={() => setSelectedDayIndex((prev) => Math.max(0, prev - 1))}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              ← Previous Day
            </button>
            <span className="text-slate-400">
              Day {selectedDayIndex + 1} of {ITINERARY_DAYS.length}
            </span>
            <button
              disabled={selectedDayIndex === ITINERARY_DAYS.length - 1}
              onClick={() => setSelectedDayIndex((prev) => Math.min(ITINERARY_DAYS.length - 1, prev + 1))}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Next Day →
            </button>
          </div>
        </div>

        {/* Quick Summary Table for Reference */}
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" />
            <span>At A Glance Summary (28 Nov – 06 Dec 2026)</span>
          </h4>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="text-[11px] text-slate-400 uppercase bg-slate-800/80 border-b border-slate-700">
                <tr>
                  <th className="px-3 py-2.5 font-bold">Date & Day</th>
                  <th className="px-3 py-2.5 font-bold">Key Focus</th>
                  <th className="px-3 py-2.5 font-bold">Major Attractions</th>
                  <th className="px-3 py-2.5 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {ITINERARY_DAYS.map((d, i) => (
                  <tr
                    key={i}
                    onClick={() => setSelectedDayIndex(i)}
                    className="hover:bg-slate-800/50 cursor-pointer transition-colors"
                  >
                    <td className="px-3 py-3 font-semibold text-white whitespace-nowrap">
                      {d.date} <span className="text-slate-400">({d.dayOfWeek})</span>
                    </td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${d.tagColor}`}>
                        {d.tag}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-slate-200">
                      {d.theme}
                    </td>
                    <td className="px-3 py-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDayIndex(i);
                        }}
                        className="text-amber-400 hover:text-amber-300 font-semibold"
                      >
                        View Details →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
