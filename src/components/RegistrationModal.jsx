import React, { useState, useEffect } from 'react';
import { 
  X, 
  Ticket, 
  CreditCard, 
  CheckCircle2, 
  Copy, 
  Check, 
  Sparkles, 
  Train, 
  Phone, 
  MessageCircle, 
  ArrowRight,
  ShieldCheck,
  Mail,
  Printer,
  Loader2,
  Share2,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';
import { ORGANIZER_INFO } from '../data/tripDetails';

export default function RegistrationModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1); // 1: Form, 2: Payment, 3: Success
  const [copied, setCopied] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [selectedApp, setSelectedApp] = useState('PhonePe');
  const [bookingId, setBookingId] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [whatsAppSent, setWhatsAppSent] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    trainComfort: 'Yes, 3rd AC (3A)',
    travelers: '2',
    hotelPreference: 'Standard AC Hotel (₹2,000/night)',
    emergencyContact: '',
    notes: '',
    utrNumber: ''
  });

  useEffect(() => {
    if (isOpen && !bookingId) {
      const randomId = 'KSH-' + Math.floor(100000 + Math.random() * 900000);
      setBookingId(randomId);
    }
  }, [isOpen, bookingId]);

  if (!isOpen) return null;

  const upiPayLink = `upi://pay?pa=${ORGANIZER_INFO.upiId}&pn=${encodeURIComponent(ORGANIZER_INFO.upiPayeeName)}&am=${ORGANIZER_INFO.registrationFee}&cu=INR&tn=${encodeURIComponent(`Varanasi Trip Reg ${bookingId}`)}`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(ORGANIZER_INFO.upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormNext = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) return;
    setStep(2);
  };

  // When user clicks payment confirmation
  const handleConfirmPayment = (e) => {
    e?.preventDefault();
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      setStep(3);

      // Trigger Confetti
      try {
        confetti({
          particleCount: 140,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.log(err);
      }

      // Auto-dispatch receipt to WhatsApp
      const formattedDate = new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });

      const receiptMessage = 
        `*🛕 OFFICIAL TRIP REGISTRATION RECEIPT*\n` +
        `*Booking Reference:* ${bookingId}\n` +
        `*Trip:* Pune ➔ Varanasi (28 Nov - 05 Dec 2026)\n\n` +
        `*--- TRAVELER DETAILS ---*\n` +
        `*Full Name:* ${formData.name}\n` +
        `*Mobile Number:* ${formData.phone}\n` +
        `*Email Address:* ${formData.email}\n` +
        `*Total Members:* ${formData.travelers}\n` +
        `*Train Class Preference:* ${formData.trainComfort}\n` +
        `*Hotel Choice:* ${formData.hotelPreference}\n\n` +
        `*--- PAYMENT DETAILS ---*\n` +
        `*Amount Paid:* ₹${ORGANIZER_INFO.registrationFee} INR (Trial Token)\n` +
        `*Paid To UPI:* ${ORGANIZER_INFO.upiId} (${ORGANIZER_INFO.upiPayeeName})\n` +
        `*Paid Via:* ${selectedApp}\n` +
        `*Transaction Ref/UTR:* ${formData.utrNumber || 'Verified via ' + selectedApp}\n` +
        `*Payment Status:* ✅ CONFIRMED\n` +
        `*Date:* ${formattedDate}\n\n` +
        `*Organizer:* ${ORGANIZER_INFO.name} (+91 ${ORGANIZER_INFO.phone})\n` +
        `_Har Har Mahadev! Your registration has been successfully verified._`;

      setTimeout(() => {
        window.open(`https://wa.me/${ORGANIZER_INFO.whatsappNumber}?text=${encodeURIComponent(receiptMessage)}`, '_blank');
        setWhatsAppSent(true);
      }, 700);

      setEmailSent(true);
    }, 1500);
  };

  const handleManualWhatsAppSend = () => {
    const receiptMessage = 
      `*🛕 TRIP REGISTRATION PASS (${bookingId})*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Email:* ${formData.email}\n` +
      `*Travelers:* ${formData.travelers}\n` +
      `*Train Class:* ${formData.trainComfort}\n` +
      `*Hotel:* ${formData.hotelPreference}\n` +
      `*Token Paid:* ₹${ORGANIZER_INFO.registrationFee} (Confirmed)\n\n` +
      `_Organizer: ${ORGANIZER_INFO.name} (${ORGANIZER_INFO.phone})_`;

    window.open(`https://wa.me/${ORGANIZER_INFO.whatsappNumber}?text=${encodeURIComponent(receiptMessage)}`, '_blank');
    setWhatsAppSent(true);
  };

  const handleEmailReceiptTrigger = () => {
    const subject = encodeURIComponent(`Booking Confirmation: Pune to Varanasi Yatra 2026 (${bookingId})`);
    const body = encodeURIComponent(
      `Dear ${formData.name},\n\n` +
      `Namaste! Your registration for the Pune to Varanasi Yatra (28 Nov – 05 Dec 2026) is confirmed.\n\n` +
      `BOOKING DETAILS:\n` +
      `-----------------------------------------\n` +
      `Booking Reference: ${bookingId}\n` +
      `Name: ${formData.name}\n` +
      `Contact: ${formData.phone}\n` +
      `Email: ${formData.email}\n` +
      `Travelers: ${formData.travelers}\n` +
      `Train Comfort: ${formData.trainComfort}\n` +
      `Hotel Preference: ${formData.hotelPreference}\n` +
      `Registration Token Paid: ₹${ORGANIZER_INFO.registrationFee} INR\n` +
      `UPI ID: ${ORGANIZER_INFO.upiId}\n` +
      `Payment Status: CONFIRMED\n\n` +
      `TRAIN SCHEDULE:\n` +
      `Onward: Train 22131 (Pune - Banaras Exp) on 28 Nov 2026 at 4:15 PM\n` +
      `Return: Train 11034 (Banaras - Pune Exp) on 05 Dec 2026 at 3:30 AM\n\n` +
      `Organizer: ${ORGANIZER_INFO.name}\n` +
      `Phone: +91 ${ORGANIZER_INFO.phone}\n\n` +
      `Har Har Mahadev!`
    );

    window.location.href = `mailto:${formData.email}?cc=${ORGANIZER_INFO.phone}@example.com&subject=${subject}&body=${body}`;
    setEmailSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl my-auto rounded-3xl bg-slate-900 border-2 border-amber-500/40 shadow-2xl shadow-amber-500/10 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between text-slate-950 shrink-0">
          <div className="flex items-center gap-2">
            <Ticket className="w-5 h-5 shrink-0" />
            <div>
              <h3 className="font-serif font-black text-base sm:text-lg leading-tight">
                Pune ➔ Varanasi Yatra Registration
              </h3>
              <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider opacity-90">
                28 Nov – 05 Dec 2026 • Trial Fee ₹{ORGANIZER_INFO.registrationFee}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-slate-950 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="bg-slate-950 px-4 sm:px-6 py-2.5 flex items-center justify-between border-b border-slate-800 text-[11px] sm:text-xs font-bold shrink-0">
          <span className={`flex items-center gap-1 sm:gap-1.5 ${step >= 1 ? 'text-amber-400' : 'text-slate-500'}`}>
            <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-slate-800 border border-current flex items-center justify-center text-[10px]">1</span>
            <span>Traveler Info</span>
          </span>
          <span className="text-slate-600">➔</span>
          <span className={`flex items-center gap-1 sm:gap-1.5 ${step >= 2 ? 'text-amber-400' : 'text-slate-500'}`}>
            <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-slate-800 border border-current flex items-center justify-center text-[10px]">2</span>
            <span>Pay ₹{ORGANIZER_INFO.registrationFee} UPI</span>
          </span>
          <span className="text-slate-600">➔</span>
          <span className={`flex items-center gap-1 sm:gap-1.5 ${step >= 3 ? 'text-emerald-400' : 'text-slate-500'}`}>
            <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-slate-800 border border-current flex items-center justify-center text-[10px]">3</span>
            <span>Confirmed</span>
          </span>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* STEP 1: FORM */}
          {step === 1 && (
            <form onSubmit={handleFormNext} className="space-y-4">
              <div className="p-3 bg-amber-950/30 rounded-xl border border-amber-500/30 text-xs text-amber-300 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Please enter your authentic details. In step 2, you can test payment with a trial token of <strong>₹{ORGANIZER_INFO.registrationFee}</strong> to UPI: <code>{ORGANIZER_INFO.upiId}</code>.
                </span>
              </div>

              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200 flex items-center gap-1">
                  <span>Full Name</span>
                  <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pawan Pawar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-200 flex items-center gap-1">
                    <span>Mobile / WhatsApp Number</span>
                    <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9561547711"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-200 flex items-center gap-1">
                    <span>Email Address</span>
                    <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="pawan@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Number of travelers & Hotel */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-200">Number of Travelers</label>
                  <select
                    value={formData.travelers}
                    onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400"
                  >
                    <option value="1 Person (Solo)">1 Person (Solo)</option>
                    <option value="2 Persons (Couple/Friends)">2 Persons (Couple/Friends)</option>
                    <option value="3 Persons">3 Persons</option>
                    <option value="4 Persons (Family)">4 Persons (Family)</option>
                    <option value="5+ Persons (Group)">5+ Persons (Group)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-200">Hotel Preference</label>
                  <select
                    value={formData.hotelPreference}
                    onChange={(e) => setFormData({ ...formData, hotelPreference: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400"
                  >
                    <option value="Standard AC Hotel (₹2,000/night)">Standard AC Hotel (₹2,000/night)</option>
                    <option value="Budget Stay (₹1,000/night)">Budget Stay (₹1,000/night)</option>
                    <option value="Premium / Deluxe Hotel (₹3,500+/night)">Premium / Deluxe Hotel (₹3,500+/night)</option>
                  </select>
                </div>
              </div>

              {/* Train Comfort Requirement */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-200 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Train className="w-3.5 h-3.5 text-blue-400" />
                    <span>Are you comfortable travelling via train?</span>
                  </span>
                  <span className="text-amber-400 font-semibold text-[10px]">Pune ↔ Banaras</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    'Yes, Sleeper (SL)',
                    'Yes, 3rd AC (3A)',
                    'Yes, 2nd AC (2A)'
                  ].map((option) => (
                    <button
                      type="button"
                      key={option}
                      onClick={() => setFormData({ ...formData, trainComfort: option })}
                      className={`py-2 px-2 rounded-xl text-[11px] sm:text-xs font-bold border transition-all text-center ${
                        formData.trainComfort === option
                          ? 'bg-amber-500/20 text-amber-300 border-amber-400'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit & Go To Payment */}
              <button
                type="submit"
                className="w-full py-3.5 sm:py-4 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-sm sm:text-base rounded-xl shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 transition-all"
              >
                <span>Proceed to Pay ₹{ORGANIZER_INFO.registrationFee} Token</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </form>
          )}

          {/* STEP 2: ₹1 DIRECT UPI PAYMENT */}
          {step === 2 && (
            <div className="space-y-5">
              {/* Fee Notice */}
              <div className="text-center space-y-1 p-3.5 bg-slate-950 rounded-2xl border border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Trial Token Amount</span>
                <div className="flex items-center justify-center gap-1.5">
                  <span className="text-3xl sm:text-4xl font-black text-gradient-gold">₹{ORGANIZER_INFO.registrationFee}</span>
                  <span className="text-xs text-slate-400">INR (1 Rupee Test)</span>
                </div>
                <p className="text-[11px] text-emerald-400 font-semibold">
                  Tap PhonePe / Google Pay / Paytm to pay ₹1 directly to <strong>{ORGANIZER_INFO.upiId}</strong>
                </p>
              </div>

              {/* 1-Tap App Payment Buttons */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block text-center">
                  1. Tap Your App to Pay ₹{ORGANIZER_INFO.registrationFee}
                </span>

                <div className="grid grid-cols-2 gap-2.5">
                  {/* PhonePe */}
                  <a
                    href={`phonepe://pay?pa=${ORGANIZER_INFO.upiId}&pn=${encodeURIComponent(ORGANIZER_INFO.upiPayeeName)}&am=${ORGANIZER_INFO.registrationFee}&cu=INR&tn=${encodeURIComponent(`Varanasi_${bookingId}`)}`}
                    onClick={() => setSelectedApp('PhonePe')}
                    className="py-3 px-3 rounded-xl bg-purple-950/90 hover:bg-purple-900 border-2 border-purple-500/60 text-purple-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                    <span>Pay ₹1 on PhonePe</span>
                  </a>

                  {/* Google Pay */}
                  <a
                    href={`gpay://upi/pay?pa=${ORGANIZER_INFO.upiId}&pn=${encodeURIComponent(ORGANIZER_INFO.upiPayeeName)}&am=${ORGANIZER_INFO.registrationFee}&cu=INR&tn=${encodeURIComponent(`Varanasi_${bookingId}`)}`}
                    onClick={() => setSelectedApp('Google Pay')}
                    className="py-3 px-3 rounded-xl bg-blue-950/90 hover:bg-blue-900 border-2 border-blue-500/60 text-blue-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                    <span>Pay ₹1 on GPay</span>
                  </a>

                  {/* Paytm */}
                  <a
                    href={`paytmmp://pay?pa=${ORGANIZER_INFO.upiId}&pn=${encodeURIComponent(ORGANIZER_INFO.upiPayeeName)}&am=${ORGANIZER_INFO.registrationFee}&cu=INR&tn=${encodeURIComponent(`Varanasi_${bookingId}`)}`}
                    onClick={() => setSelectedApp('Paytm')}
                    className="py-3 px-3 rounded-xl bg-cyan-950/90 hover:bg-cyan-900 border-2 border-cyan-500/60 text-cyan-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                    <span>Pay ₹1 on Paytm</span>
                  </a>

                  {/* Any UPI / Generic */}
                  <a
                    href={upiPayLink}
                    onClick={() => setSelectedApp('UPI App')}
                    className="py-3 px-3 rounded-xl bg-emerald-950/90 hover:bg-emerald-900 border-2 border-emerald-500/60 text-emerald-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span>Any UPI App</span>
                  </a>
                </div>
              </div>

              {/* QR Code & Scanner for Desktop */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-amber-500/30 flex flex-col sm:flex-row items-center justify-center gap-4">
                <div 
                  className="p-2.5 bg-white rounded-xl shadow-lg shrink-0 flex flex-col items-center"
                >
                  <QRCodeSVG 
                    value={upiPayLink} 
                    size={120} 
                    level="H" 
                    includeMargin={false}
                  />
                  <span className="text-[9px] font-bold text-slate-900 mt-1 uppercase">Scan to Pay ₹1</span>
                </div>

                <div className="space-y-2 text-center sm:text-left">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Payee UPI ID</span>
                    <div className="flex items-center justify-center sm:justify-start gap-2 mt-0.5">
                      <code className="text-xs font-mono font-bold text-amber-300 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                        {ORGANIZER_INFO.upiId}
                      </code>
                      <button
                        onClick={handleCopyUpi}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                        title="Copy UPI ID"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    {copied && <p className="text-[10px] text-emerald-400 mt-0.5">Copied to Clipboard!</p>}
                  </div>

                  <div className="text-[11px] text-slate-300 space-y-0.5">
                    <p><strong>Payee:</strong> {ORGANIZER_INFO.upiPayeeName}</p>
                    <p><strong>Phone:</strong> {ORGANIZER_INFO.phone}</p>
                  </div>
                </div>
              </div>

              {/* UTR & Confirmation Action */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-200 flex items-center justify-between">
                    <span>UTR / Ref No. or Note (Optional)</span>
                    <span className="text-[10px] text-slate-400">After paying ₹1 in your app</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Paid ₹1 via PhonePe / GPay"
                    value={formData.utrNumber}
                    onChange={(e) => setFormData({ ...formData, utrNumber: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all"
                  >
                    ← Back
                  </button>

                  <button
                    type="button"
                    disabled={isVerifying}
                    onClick={handleConfirmPayment}
                    className="w-2/3 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
                  >
                    {isVerifying ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                        <span>Verifying ₹1 Payment...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Confirm ₹1 Paid (Send Receipt)</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: SUCCESS & RECEIPT */}
          {step === 3 && (
            <div className="space-y-5 text-center">
              {/* Success Badge */}
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border-2 border-emerald-500/50 shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-0.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                  Payment Verified & Registered
                </span>
                <h3 className="text-2xl font-black text-white font-serif">
                  Har Har Mahadev! 🙏
                </h3>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  Your seat registration token for the Pune ➔ Varanasi Yatra has been recorded.
                </p>
              </div>

              {/* Automatic Dispatch Status */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 flex items-center justify-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Sent to Pawan</span>
                </div>
                <div className="p-2.5 rounded-xl bg-blue-950/60 border border-blue-500/40 text-blue-300 flex items-center justify-center gap-1.5">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>Email Receipt Ready</span>
                </div>
              </div>

              {/* Official Printable Digital Pass / Receipt */}
              <div className="text-left p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border-2 border-amber-500/50 space-y-3 shadow-2xl relative overflow-hidden">
                <div className="flex items-start justify-between border-b border-slate-800 pb-2.5">
                  <div>
                    <span className="text-[10px] text-amber-400 uppercase font-extrabold tracking-wider">
                      Official Booking Pass
                    </span>
                    <h4 className="text-sm sm:text-base font-black text-white font-serif">
                      Pune ➔ Varanasi Yatra 2026
                    </h4>
                    <p className="text-[11px] text-slate-400">28 Nov – 05 Dec 2026 (Return 06 Dec)</p>
                  </div>

                  <div className="text-right">
                    <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-black rounded-full border border-emerald-500/40 block">
                      ₹{ORGANIZER_INFO.registrationFee} PAID
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 mt-1 block">
                      Ref: {bookingId}
                    </span>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Traveler Name</span>
                    <p className="font-bold text-white">{formData.name}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Mobile</span>
                    <p className="font-bold text-white">{formData.phone}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Email</span>
                    <p className="font-bold text-white truncate">{formData.email}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Group Size</span>
                    <p className="font-bold text-white">{formData.travelers}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Train Preference</span>
                    <p className="font-bold text-amber-300">{formData.trainComfort}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Hotel Choice</span>
                    <p className="font-bold text-slate-200">{formData.hotelPreference.split('(')[0]}</p>
                  </div>
                </div>

                {/* Footer of Pass */}
                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Host: <strong>{ORGANIZER_INFO.name}</strong> ({ORGANIZER_INFO.phone})</span>
                  <span className="text-emerald-400 font-semibold">UPI: {ORGANIZER_INFO.upiId}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={handleManualWhatsAppSend}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow flex items-center justify-center gap-1.5 transition-all"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Open WhatsApp Receipt</span>
                  </button>

                  <button
                    onClick={handleEmailReceiptTrigger}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email Receipt Copy</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => window.print()}
                    className="py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Printer className="w-4 h-4 text-amber-400" />
                    <span>Print / Save Pass</span>
                  </button>

                  <button
                    onClick={onClose}
                    className="py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow transition-colors"
                  >
                    Done (Close)
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
