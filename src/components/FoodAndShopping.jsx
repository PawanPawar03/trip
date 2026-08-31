import React, { useState } from 'react';
import { 
  Utensils, 
  ShoppingBag, 
  Compass, 
  MapPin, 
  Sparkles, 
  Check, 
  Coffee, 
  Flame, 
  Tag 
} from 'lucide-react';
import { FOOD_HIGHLIGHTS, SHOPPING_GUIDE, GHATS_GUIDE } from '../data/foodAndPlaces';

export default function FoodAndShopping() {
  const [activeTab, setActiveTab] = useState('food'); // 'food', 'shopping', 'ghats'

  return (
    <section id="food-shopping" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-950/80 border border-pink-500/40 text-pink-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Banaras Flavors & Heritage Crafts</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-white">
            Food, Silk & <span className="text-gradient-gold">Sacred Ghats</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Taste the legendary winter Malaiyyo and Tamatar Chaat, explore world-famous Banarasi silk weavers, and navigate the holy riverfront.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center justify-center gap-3">
          {[
            { key: 'food', label: 'Banarasi Food Trail', icon: Utensils, count: '6 Legends' },
            { key: 'shopping', label: 'Silk & Handicraft Shopping', icon: ShoppingBag, count: 'GI Crafts' },
            { key: 'ghats', label: 'Sacred Ghats Guide', icon: Compass, count: '84 Ghats' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm border transition-all ${
                activeTab === tab.key
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20 scale-105'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab 1: Food Highlights */}
        {activeTab === 'food' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FOOD_HIGHLIGHTS.map((food, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 border border-slate-800 hover:border-amber-500/40 transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-bold border border-amber-500/30">
                      {food.badge}
                    </span>
                    <span className="text-xs font-semibold text-emerald-400">{food.price}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span>{food.name}</span>
                  </h3>

                  <p className="text-xs text-amber-400 font-semibold flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{food.location}</span>
                  </p>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {food.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 bg-slate-950/40 p-2.5 rounded-xl text-xs">
                  <span className="text-slate-400 font-medium">Must Try: </span>
                  <span className="text-slate-100 font-bold">{food.mustTry}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Shopping Guide */}
        {activeTab === 'shopping' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SHOPPING_GUIDE.map((shop, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 space-y-4 hover:border-pink-500/40 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[11px] text-pink-400 font-bold uppercase tracking-wider">
                      Authentic Craft #{idx + 1}
                    </span>
                    <h3 className="text-xl font-bold text-white">{shop.item}</h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 shrink-0">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 bg-slate-950/60 rounded-xl border border-slate-800 flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400">Best Shopping Areas: </span>
                      <span className="text-white font-semibold">{shop.spots}</span>
                    </div>
                  </div>

                  <div className="p-2.5 bg-slate-950/60 rounded-xl border border-slate-800 flex items-start gap-2">
                    <Tag className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400">Varieties: </span>
                      <span className="text-slate-200">{shop.types}</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-amber-950/30 rounded-xl border border-amber-500/30 text-xs text-amber-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <span><strong>Pro Tip:</strong> {shop.tip}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Ghats Guide */}
        {activeTab === 'ghats' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GHATS_GUIDE.map((ghat, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider">
                    {ghat.type}
                  </span>
                  <h3 className="text-lg font-bold text-white">{ghat.name}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {ghat.significance}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{ghat.activity}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
