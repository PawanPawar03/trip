import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, MessageCircle } from 'lucide-react';
import { FAQS } from '../data/foodAndPlaces';
import { ORGANIZER_INFO } from '../data/tripDetails';

export default function FAQSection({ onOpenInquiry }) {
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (i) => {
    setOpenIdx(openIdx === i ? -1 : i);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello ${ORGANIZER_INFO.name}, I have a question regarding the Pune to Varanasi tour.`
    );
    window.open(`https://wa.me/${ORGANIZER_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="faqs" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-400 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-white">
            Frequently Asked <span className="text-gradient-gold">Questions</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Everything you need to know about train bookings, registration tokens, payments, and Varanasi local rules.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/30 transition-all overflow-hidden"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-amber-400 font-serif text-lg">Q.</span>
                    <span>{faq.q}</span>
                  </span>
                  <span className="p-1 rounded-lg bg-slate-800 text-slate-400 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60">
                    <p className="pl-6 border-l-2 border-amber-500/50">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-3">
          <h4 className="text-base font-bold text-white">Still have more questions or custom requests?</h4>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Contact tour coordinator <strong>{ORGANIZER_INFO.name}</strong> directly via phone or WhatsApp.
          </p>
          <div className="flex items-center justify-center gap-3 pt-1">
            <button
              onClick={handleWhatsApp}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ask on WhatsApp</span>
            </button>
            <button
              onClick={onOpenInquiry}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs rounded-xl border border-slate-700"
            >
              Open Inquiry Form
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
