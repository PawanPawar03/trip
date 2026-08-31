import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  MessageCircle, 
  Phone, 
  User, 
  Mail, 
  CheckCircle2, 
  ArrowRight,
  Train,
  HeartHandshake
} from 'lucide-react';
import { ORGANIZER_INFO } from '../data/tripDetails';

export default function InquiryModal({ isOpen, onClose, onSwitchToRegister }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    travelers: '2',
    trainComfort: 'Yes, 3rd AC (3A)',
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    const text = encodeURIComponent(
      `*🛕 Pune to Varanasi Trip Inquiry 2026*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Email:* ${formData.email || 'N/A'}\n` +
      `*Travelers:* ${formData.travelers}\n` +
      `*Train Class Preference:* ${formData.trainComfort}\n` +
      `*Query/Note:* ${formData.message || 'I am interested in this trip and would like more details.'}\n\n` +
      `_Organizer: ${ORGANIZER_INFO.name} (${ORGANIZER_INFO.phone})_`
    );

    window.open(`https://wa.me/${ORGANIZER_INFO.whatsappNumber}?text=${text}`, '_blank');
    onClose();
  };

  const handleDirectWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello ${ORGANIZER_INFO.name}, I am interested in joining the Pune to Varanasi (28 Nov - 5 Dec 2026) tour. Please share more details.`
    );
    window.open(`https://wa.me/${ORGANIZER_INFO.whatsappNumber}?text=${text}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg my-8 rounded-3xl bg-slate-900 border-2 border-amber-500/40 shadow-2xl shadow-amber-500/10 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 px-6 py-4 flex items-center justify-between text-slate-950">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            <div>
              <h3 className="font-serif font-black text-lg leading-tight">
                Trip Inquiry & Interest
              </h3>
              <p className="text-[11px] font-bold uppercase tracking-wider opacity-90">
                Connect with {ORGANIZER_INFO.name} ({ORGANIZER_INFO.phone})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-slate-950 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Quick 1-Tap WhatsApp Banner */}
          <div className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4" />
                <span>Instant WhatsApp Connection</span>
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-snug">
              Want immediate answers? Chat directly with organizer <strong>{ORGANIZER_INFO.name}</strong> on WhatsApp.
            </p>
            <button
              onClick={handleDirectWhatsApp}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Open 1-Tap WhatsApp Chat</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-800" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Or Send Customized Inquiry</span>
            <div className="flex-1 h-px bg-slate-800" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200">Your Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Shrikant Shinde"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-200">Mobile / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9561547711"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-200">Email (Optional)</label>
                <input
                  type="email"
                  placeholder="name@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200">Train Comfort Preference</label>
              <select
                value={formData.trainComfort}
                onChange={(e) => setFormData({ ...formData, trainComfort: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400"
              >
                <option value="Yes, 3rd AC (3A)">Yes, 3rd AC (3A) - Recommended</option>
                <option value="Yes, Sleeper (SL)">Yes, Sleeper (SL) - Budget</option>
                <option value="Yes, 2nd AC (2A)">Yes, 2nd AC (2A) - Premium</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200">Questions / Notes</label>
              <textarea
                rows={2}
                placeholder="Ask any question about dates, food, family discounts, hotel..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-sm rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Submit Inquiry on WhatsApp</span>
            </button>
          </form>

          {/* Switch to Registration */}
          <div className="pt-3 border-t border-slate-800 text-center">
            <p className="text-xs text-slate-400">
              Ready to secure your berth immediately?{' '}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSwitchToRegister();
                }}
                className="text-amber-400 hover:underline font-bold"
              >
                Register Seat (₹{ORGANIZER_INFO.registrationFee} Token) →
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
