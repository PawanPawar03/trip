import React, { useState } from 'react';
import { 
  Calculator, 
  Users, 
  Train, 
  Building2, 
  Utensils, 
  Sparkles, 
  ArrowRight, 
  Check, 
  ShieldCheck,
  Compass,
  Info
} from 'lucide-react';
import { BUDGET_BREAKDOWN_DATA, ORGANIZER_INFO } from '../data/tripDetails';

export default function BudgetCalculator({ onOpenRegister }) {
  const [numTravelers, setNumTravelers] = useState(2);
  const [trainClass, setTrainClass] = useState('3A'); // 'SL', '3A', '2A'
  const [hotelBudgetPerNight, setHotelBudgetPerNight] = useState(2000); // 1000, 2000, 3500

  // Calculation constants
  const trainPrices = {
    SL: { oneWay: 750, roundTrip: 1500, label: "Sleeper Class (SL)" },
    '3A': { oneWay: 1800, roundTrip: 3600, label: "3rd AC (3A) - Recommended" },
    '2A': { oneWay: 2600, roundTrip: 5200, label: "2nd AC (2A) - Premium" }
  };

  const selectedTrain = trainPrices[trainClass];
  
  // 6 nights in Varanasi. If 2 travelers share 1 room, hotel cost per person = (hotelBudgetPerNight * 6) / 2
  const totalRooms = Math.ceil(numTravelers / 2);
  const totalHotelCost = hotelBudgetPerNight * 6 * totalRooms;
  const hotelPerPerson = Math.round(totalHotelCost / numTravelers);

  const trainPerPerson = selectedTrain.roundTrip;
  const foodPerPerson = 3800; // 6 days rich food & sweets
  const localTransportPerPerson = 2000; // e-rickshaws & autos
  const boatRidePerPerson = 600; // sunrise boat
  const sarnathPerPerson = 700; // entry & transport
  const sightseeingBufferPerPerson = 800; // sevas, lockers, prasad

  const totalPerPerson = 
    trainPerPerson + 
    hotelPerPerson + 
    foodPerPerson + 
    localTransportPerPerson + 
    boatRidePerPerson + 
    sarnathPerPerson + 
    sightseeingBufferPerPerson;

  const totalGroupCost = totalPerPerson * numTravelers;

  return (
    <section id="budget" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-semibold">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Cost Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-white">
            Customizable <span className="text-gradient-gold">Trip Budget</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Calculate your realistic Pune to Varanasi trip expense according to your preferred train class and hotel style.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Form (7 Cols) */}
          <div className="lg:col-span-7 glass-card rounded-3xl p-6 sm:p-8 space-y-7 border border-amber-500/20">
            {/* 1. Number of People */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-400" />
                  <span>1. How many people are travelling?</span>
                </span>
                <span className="text-amber-400 font-bold text-sm">{numTravelers} {numTravelers === 1 ? 'Person' : 'People'}</span>
              </label>

              <div className="grid grid-cols-4 gap-2.5">
                {[1, 2, 3, 4].map((num) => (
                  <button
                    key={num}
                    onClick={() => setNumTravelers(num)}
                    className={`py-3 px-3 rounded-xl font-bold text-sm border transition-all ${
                      numTravelers === num
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                        : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {num} {num === 1 ? 'Solo' : num === 2 ? 'Couple' : 'Persons'}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Train Class */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Train className="w-4 h-4 text-blue-400" />
                  <span>2. Preferred Train Class (Pune ↔ Banaras)</span>
                </span>
                <span className="text-blue-400 font-semibold text-xs">Roundtrip Fare</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { key: 'SL', label: 'Sleeper (SL)', fare: '₹1,500' },
                  { key: '3A', label: '3rd AC (3A)', fare: '₹3,600', popular: true },
                  { key: '2A', label: '2nd AC (2A)', fare: '₹5,200' },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setTrainClass(item.key)}
                    className={`relative p-3.5 rounded-xl text-left border transition-all ${
                      trainClass === item.key
                        ? 'bg-blue-950/60 border-blue-400 text-white shadow-md'
                        : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {item.popular && (
                      <span className="absolute -top-2.5 right-2 px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                        Most Popular
                      </span>
                    )}
                    <p className="font-bold text-sm">{item.label}</p>
                    <p className="text-xs text-amber-300 font-semibold mt-1">{item.fare} <span className="text-[10px] text-slate-400 font-normal">rt / person</span></p>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Hotel Budget Per Night */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  <span>3. Hotel Category / Budget Per Night</span>
                </span>
                <span className="text-emerald-400 font-semibold text-xs">6 Nights Stay</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { budget: 1000, label: 'Budget Stay', cost: '₹1,000 / night', desc: 'Clean guest house / Dharamshala' },
                  { budget: 2000, label: 'Standard AC Hotel', cost: '₹2,000 / night', desc: 'Comfortable near Ghats', popular: true },
                  { budget: 3500, label: 'Premium / Deluxe', cost: '₹3,500+ / night', desc: 'Top amenities & Cantt hotels' },
                ].map((item) => (
                  <button
                    key={item.budget}
                    onClick={() => setHotelBudgetPerNight(item.budget)}
                    className={`relative p-3.5 rounded-xl text-left border transition-all ${
                      hotelBudgetPerNight === item.budget
                        ? 'bg-emerald-950/60 border-emerald-400 text-white shadow-md'
                        : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {item.popular && (
                      <span className="absolute -top-2.5 right-2 px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                        Recommended
                      </span>
                    )}
                    <p className="font-bold text-sm">{item.label}</p>
                    <p className="text-xs text-emerald-300 font-semibold mt-0.5">{item.cost}</p>
                    <p className="text-[11px] text-slate-400 mt-1 leading-tight">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Room Allocation Info */}
            <div className="p-3 bg-slate-900/70 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Info className="w-4 h-4 text-amber-400" />
                <span>Room allocation: <strong>{totalRooms} Room(s)</strong> for {numTravelers} traveler(s)</span>
              </span>
              <span className="text-slate-400">Twin-sharing calculated</span>
            </div>
          </div>

          {/* Result Card (5 Cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border-2 border-amber-500/40 p-6 sm:p-8 space-y-6 shadow-2xl shadow-amber-500/10">
            <div className="space-y-1 pb-4 border-b border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Estimated Total Investment
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-white">
                  ₹{totalPerPerson.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-slate-400">/ per person</span>
              </div>
              {numTravelers > 1 && (
                <p className="text-xs text-emerald-400 font-semibold">
                  Total for {numTravelers} people: ₹{totalGroupCost.toLocaleString('en-IN')}
                </p>
              )}
            </div>

            {/* Itemized Cost Breakdown */}
            <div className="space-y-2.5 text-xs">
              <p className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">
                Expense Breakdown (Per Person)
              </p>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Train className="w-3.5 h-3.5 text-blue-400" /> Roundtrip Train ({trainClass}):
                  </span>
                  <span className="font-bold text-slate-200">₹{trainPerPerson.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-emerald-400" /> Hotel (6 Nights Stay):
                  </span>
                  <span className="font-bold text-slate-200">₹{hotelPerPerson.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Utensils className="w-3.5 h-3.5 text-amber-400" /> Banarasi Food & Meals:
                  </span>
                  <span className="font-bold text-slate-200">₹{foodPerPerson.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-cyan-400" /> Local Autos & E-rickshaws:
                  </span>
                  <span className="font-bold text-slate-200">₹{localTransportPerPerson.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-orange-400" /> Sunrise Boat + Sarnath + Sevas:
                  </span>
                  <span className="font-bold text-slate-200">₹{(boatRidePerPerson + sarnathPerPerson + sightseeingBufferPerPerson).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Note */}
            <p className="text-[11px] text-slate-400 italic leading-snug">
              *Excludes personal shopping (Banarasi Silk Sarees, souvenirs). Register with ₹{ORGANIZER_INFO.registrationFee} token to lock your seat and group discounts.
            </p>

            {/* Register CTA with token */}
            <button
              onClick={onOpenRegister}
              className="w-full py-4 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-sm rounded-xl shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
            >
              <span>Confirm Seat with ₹{ORGANIZER_INFO.registrationFee} Token</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
