import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  User, 
  Calendar,
  Clock,
  HeartHandshake
} from 'lucide-react';
import { ORGANIZER_INFO } from '../data/tripDetails';

export default function InquirySection({ onOpenRegister }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    travelers: '2',
    trainComfort: 'Comfortable with Train Journey',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    // Send inquiry via WhatsApp to Pawan Pawar
    const whatsappMessage = encodeURIComponent(
      `*New Varanasi Trip Inquiry 🛕*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Contact:* ${formData.phone}\n` +
      `*Email:* ${formData.email || 'N/A'}\n` +
      `*Travelers:* ${formData.travelers}\n` +
      `*Train Preference:* ${formData.trainComfort}\n` +
      `*Message:* ${formData.message || 'Interested in joining Pune to Varanasi 28 Nov - 5 Dec trip.'}\n\n` +
      `_Sent via Pune-Varanasi Tour Portal_`
    );

    window.open(`https://wa.me/${ORGANIZER_INFO.whatsappNumber}?text=${whatsappMessage}`, '_blank');
    setSubmitted(true);
  };

  const handleDirectWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello ${ORGANIZER_INFO.name}, I want to make an inquiry about the Pune to Varanasi (28 Nov - 5 Dec 2026) tour.`
    );
    window.open(`https://wa.me/${ORGANIZER_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="inquiry" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-slate-950/80">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-400 text-xs font-semibold">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Direct Coordinator Access</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-white">
            Trip Inquiry & <span className="text-gradient-gold">Contact</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Have questions about trains, hotel bookings, or customized family arrangements? Get in touch directly with our organizer.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Organizer Details Card (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border-2 border-amber-500/40 p-6 sm:p-8 space-y-7 shadow-2xl flex flex-col justify-between">
            <div className="space-y-6">
              {/* Profile Header */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-slate-950 text-2xl font-black shadow-lg shadow-amber-500/30">
                  PP
                </div>
                <div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-bold border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Verified Trip Host</span>
                  </div>
                  <h3 className="text-2xl font-black text-white mt-1">
                    {ORGANIZER_INFO.name}
                  </h3>
                  <p className="text-xs text-amber-300 font-semibold">
                    Tour Coordinator & Lead
                  </p>
                </div>
              </div>

              {/* Direct Contact Buttons */}
              <div className="space-y-3 pt-2">
                {/* WhatsApp */}
                <button
                  onClick={handleDirectWhatsApp}
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-950/40 transition-all hover:scale-[1.02]"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Chat on WhatsApp (+91 {ORGANIZER_INFO.phone})</span>
                </button>

                {/* Call */}
                <a
                  href={`tel:${ORGANIZER_INFO.phone}`}
                  className="w-full py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-sm flex items-center justify-center gap-2.5 border border-slate-700 transition-all"
                >
                  <Phone className="w-5 h-5 text-amber-400" />
                  <span>Call Directly: {ORGANIZER_INFO.phone}</span>
                </a>
              </div>

              {/* Key Trust Points */}
              <div className="space-y-2.5 pt-4 border-t border-slate-800 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Instant response on WhatsApp for group queries & itinerary details</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Assistance with 60-day IRCTC train tickets (SL / 3A / 2A)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Personal coordination throughout the Pune ➔ Varanasi ➔ Pune journey</span>
                </div>
              </div>
            </div>

            {/* Quick Register Banner */}
            <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-amber-300">Ready to lock your berth?</p>
                <p className="text-[11px] text-slate-400">Token registration only ₹{ORGANIZER_INFO.registrationFee}</p>
              </div>
              <button
                onClick={onOpenRegister}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow transition-all shrink-0"
              >
                Register Seat
              </button>
            </div>
          </div>

          {/* Quick Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 glass-card rounded-3xl p-6 sm:p-8 space-y-6 border border-amber-500/20">
            <div className="space-y-1 pb-4 border-b border-slate-800">
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Send Quick Inquiry</span>
              </h3>
              <p className="text-xs text-slate-400">
                Fill the details below to connect directly with Pawan Pawar via WhatsApp with your customized queries.
              </p>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white">Inquiry Forwarded via WhatsApp!</h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Your inquiry message has been generated. Pawan Pawar will respond to you shortly on WhatsApp / Phone.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 text-xs font-bold text-amber-300 bg-slate-800 rounded-lg hover:bg-slate-700"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                      <span>Full Name</span>
                      <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kulkarni"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                      <span>Mobile / WhatsApp Number</span>
                      <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Email Address (Optional)</label>
                    <input
                      type="email"
                      placeholder="name@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  {/* Number of Travelers */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Number of Travelers</label>
                    <select
                      value={formData.travelers}
                      onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                    >
                      <option value="1">1 Person (Solo)</option>
                      <option value="2">2 Persons (Couple/Friends)</option>
                      <option value="3">3 Persons</option>
                      <option value="4">4 Persons (Family)</option>
                      <option value="5+">5+ Persons (Group)</option>
                    </select>
                  </div>
                </div>

                {/* Train Comfort Question */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300">
                    Are you comfortable travelling via train (Pune ↔ Banaras)?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      'Yes, Sleeper (SL)',
                      'Yes, 3rd AC (3A)',
                      'Yes, 2nd AC (2A)'
                    ].map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setFormData({ ...formData, trainComfort: opt })}
                        className={`p-2 rounded-lg text-xs font-semibold border transition-all text-left ${
                          formData.trainComfort === opt
                            ? 'bg-amber-500/20 text-amber-300 border-amber-400'
                            : 'bg-slate-900/60 text-slate-400 border-slate-800'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Questions or Special Requests</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your preferred hotel tier, elderly assistance, or custom dates..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm sm:text-base rounded-xl shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Send Inquiry to Pawan Pawar on WhatsApp</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
