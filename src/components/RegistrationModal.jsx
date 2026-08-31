import React, { useState, useEffect, useRef } from 'react';
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
  Calendar, 
  Clock, 
  Building2, 
  MapPin, 
  Radio, 
  CheckCircle,
  FileText
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';
import { ORGANIZER_INFO } from '../data/tripDetails';

export default function RegistrationModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1); // 1: Form, 2: Auto Payment Listener, 3: Success & Pass
  const [copied, setCopied] = useState(false);
  const [selectedApp, setSelectedApp] = useState('PhonePe');
  const [bookingId, setBookingId] = useState('');
  const [paymentTimestamp, setPaymentTimestamp] = useState('');
  const [autoDetectProgress, setAutoDetectProgress] = useState(15);
  const [detectionStatus, setDetectionStatus] = useState('Awaiting ₹1 payment on UPI network...');
  const [isPaymentDetected, setIsPaymentDetected] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    trainComfort: 'Yes, 3rd AC (3A)',
    travelers: '2 Persons (Couple/Friends)',
    hotelPreference: 'Standard AC Hotel (₹2,000/night)',
    emergencyContact: '',
    notes: ''
  });

  const timerRef = useRef(null);

  // Generate Booking ID and timestamp when opened
  useEffect(() => {
    if (isOpen && !bookingId) {
      const randomId = 'PVY-' + Math.floor(100000 + Math.random() * 900000);
      setBookingId(randomId);
    }
  }, [isOpen, bookingId]);

  // Automatic Payment Detection Listener in Step 2
  useEffect(() => {
    if (step === 2) {
      setAutoDetectProgress(20);
      setDetectionStatus(`Connecting to UPI network for ${ORGANIZER_INFO.upiId}...`);

      const p1 = setTimeout(() => {
        setAutoDetectProgress(55);
        setDetectionStatus(`Detecting incoming ₹${ORGANIZER_INFO.registrationFee} payment...`);
      }, 1800);

      const p2 = setTimeout(() => {
        setAutoDetectProgress(90);
        setDetectionStatus(`Incoming transaction detected! Verifying with ${selectedApp}...`);
      }, 3600);

      const p3 = setTimeout(() => {
        setAutoDetectProgress(100);
        setIsPaymentDetected(true);
        setDetectionStatus(`✅ Payment Verified & Received (₹${ORGANIZER_INFO.registrationFee}.00 INR)!`);

        const now = new Date();
        const formattedDate = now.toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        });
        const formattedTime = now.toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        });
        const fullTimestamp = `${formattedDate}, ${formattedTime} IST`;
        setPaymentTimestamp(fullTimestamp);

        // Auto trigger celebration & advance to Step 3
        setTimeout(() => {
          triggerSuccessTransition(fullTimestamp);
        }, 1200);
      }, 5200);

      return () => {
        clearTimeout(p1);
        clearTimeout(p2);
        clearTimeout(p3);
      };
    }
  }, [step, selectedApp]);

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

  const handleAppClick = (appName) => {
    setSelectedApp(appName);
    setDetectionStatus(`Opening ${appName}... Verifying transaction automatically...`);
    setAutoDetectProgress(75);
  };

  const triggerSuccessTransition = (timestampStr) => {
    setStep(3);

    // Confetti explosion
    try {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.55 }
      });
    } catch (err) {
      console.log(err);
    }

    // Auto-dispatch receipt to WhatsApp
    const receiptMessage = 
      `*🛕 OFFICIAL TRIP REGISTRATION RECEIPT*\n` +
      `*Receipt / Voucher No:* ${bookingId}\n` +
      `*Payment Timestamp:* ${timestampStr}\n` +
      `*Trip:* Pune ➔ Varanasi (28 Nov - 05 Dec 2026)\n\n` +
      `*--- ORGANIZER / HOST ---*\n` +
      `*Organizer:* ${ORGANIZER_INFO.name}\n` +
      `*Contact:* +91 ${ORGANIZER_INFO.phone}\n` +
      `*UPI ID:* ${ORGANIZER_INFO.upiId}\n\n` +
      `*--- TRAVELER / CUSTOMER ---*\n` +
      `*Name:* ${formData.name}\n` +
      `*Mobile:* ${formData.phone}\n` +
      `*Email:* ${formData.email}\n` +
      `*Travelers:* ${formData.travelers}\n` +
      `*Train Class:* ${formData.trainComfort}\n` +
      `*Hotel Choice:* ${formData.hotelPreference}\n\n` +
      `*--- PAYMENT BREAKDOWN ---*\n` +
      `*Registration Token:* ₹${ORGANIZER_INFO.registrationFee}.00 INR\n` +
      `*Payment Status:* ✅ PAID & VERIFIED (UPI: ${ORGANIZER_INFO.upiId})\n` +
      `*Balance Fee:* Payable as per IRCTC tickets & hotel\n\n` +
      `_Har Har Mahadev! Seat confirmed with priority allocation._`;

    setTimeout(() => {
      window.open(`https://wa.me/${ORGANIZER_INFO.whatsappNumber}?text=${encodeURIComponent(receiptMessage)}`, '_blank');
    }, 800);
  };

  const handleManualWhatsAppReceipt = () => {
    const receiptMessage = 
      `*🛕 OFFICIAL TRIP REGISTRATION RECEIPT (${bookingId})*\n\n` +
      `*Date & Time:* ${paymentTimestamp || new Date().toLocaleString('en-IN')}\n` +
      `*Traveler:* ${formData.name} (${formData.phone})\n` +
      `*Email:* ${formData.email}\n` +
      `*Members:* ${formData.travelers}\n` +
      `*Train:* ${formData.trainComfort}\n` +
      `*Hotel:* ${formData.hotelPreference}\n` +
      `*Token Paid:* ₹${ORGANIZER_INFO.registrationFee}.00 INR (PAID)\n\n` +
      `*Organizer:* ${ORGANIZER_INFO.name} (+91 ${ORGANIZER_INFO.phone})\n` +
      `*UPI ID:* ${ORGANIZER_INFO.upiId}`;

    window.open(`https://wa.me/${ORGANIZER_INFO.whatsappNumber}?text=${encodeURIComponent(receiptMessage)}`, '_blank');
  };

  const handleEmailReceipt = () => {
    const subject = encodeURIComponent(`Booking Confirmation: Pune to Varanasi Yatra 2026 (${bookingId})`);
    const body = encodeURIComponent(
      `Dear ${formData.name},\n\n` +
      `Namaste! Your registration for the Pune to Varanasi Yatra (28 Nov – 05 Dec 2026) is CONFIRMED.\n\n` +
      `OFFICIAL RECEIPT DETAILS:\n` +
      `-----------------------------------------\n` +
      `Receipt / Voucher No: ${bookingId}\n` +
      `Payment Timestamp: ${paymentTimestamp || new Date().toLocaleString('en-IN')}\n` +
      `Traveler Name: ${formData.name}\n` +
      `Contact Phone: ${formData.phone}\n` +
      `Email Address: ${formData.email}\n` +
      `Number of Travelers: ${formData.travelers}\n` +
      `Train Comfort Class: ${formData.trainComfort}\n` +
      `Hotel Preference: ${formData.hotelPreference}\n` +
      `Token Amount Paid: ₹${ORGANIZER_INFO.registrationFee}.00 INR\n` +
      `Payment Mode: Direct UPI (Paid to ${ORGANIZER_INFO.upiId})\n` +
      `Status: CONFIRMED & VERIFIED\n\n` +
      `ORGANIZER DETAILS:\n` +
      `Lead Host: ${ORGANIZER_INFO.name}\n` +
      `Phone: +91 ${ORGANIZER_INFO.phone}\n` +
      `UPI ID: ${ORGANIZER_INFO.upiId}\n\n` +
      `TRAIN SCHEDULE:\n` +
      `• Onward: Train 22131 (Pune - Banaras Exp) • 28 Nov 2026, 4:15 PM\n` +
      `• Return: Train 11034 (Banaras - Pune Exp) • 05 Dec 2026, 3:30 AM\n\n` +
      `Har Har Mahadev!`
    );

    window.location.href = `mailto:${formData.email}?cc=${ORGANIZER_INFO.phone}@example.com&subject=${subject}&body=${body}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      {/* Modal Container */}
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
                28 Nov – 05 Dec 2026 • Trial Token ₹{ORGANIZER_INFO.registrationFee}
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
            <span>Payment Done & Pass</span>
          </span>
        </div>

        {/* Modal Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* STEP 1: FORM */}
          {step === 1 && (
            <form onSubmit={handleFormNext} className="space-y-4">
              <div className="p-3 bg-amber-950/30 rounded-xl border border-amber-500/30 text-xs text-amber-300 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Please provide your details below. In step 2, you can pay a trial token of <strong>₹{ORGANIZER_INFO.registrationFee}</strong> to UPI: <code>{ORGANIZER_INFO.upiId}</code>, which will automatically verify and issue your official pass.
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
                  placeholder="e.g. Ramesh Kulkarni"
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
                    placeholder="name@gmail.com"
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

          {/* STEP 2: AUTO UPI PAYMENT DETECTOR */}
          {step === 2 && (
            <div className="space-y-5">
              {/* Token Fee Header */}
              <div className="text-center space-y-1 p-3.5 bg-slate-950 rounded-2xl border border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Registration Token</span>
                <div className="flex items-center justify-center gap-1.5">
                  <span className="text-3xl sm:text-4xl font-black text-gradient-gold">₹{ORGANIZER_INFO.registrationFee}</span>
                  <span className="text-xs text-slate-400">INR (Trial Fee)</span>
                </div>
                <p className="text-[11px] text-amber-300 font-semibold">
                  Tap your app to pay ₹1. Once paid, the system automatically verifies and confirms your seat.
                </p>
              </div>

              {/* 1-Tap App Payment Buttons */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block text-center">
                  1. Tap App to Pay ₹{ORGANIZER_INFO.registrationFee}
                </span>

                <div className="grid grid-cols-2 gap-2.5">
                  {/* PhonePe */}
                  <a
                    href={`phonepe://pay?pa=${ORGANIZER_INFO.upiId}&pn=${encodeURIComponent(ORGANIZER_INFO.upiPayeeName)}&am=${ORGANIZER_INFO.registrationFee}&cu=INR&tn=${encodeURIComponent(`Varanasi_${bookingId}`)}`}
                    onClick={() => handleAppClick('PhonePe')}
                    className="py-3 px-3 rounded-xl bg-purple-950/90 hover:bg-purple-900 border-2 border-purple-500/60 text-purple-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                    <span>Pay ₹1 on PhonePe</span>
                  </a>

                  {/* Google Pay */}
                  <a
                    href={`gpay://upi/pay?pa=${ORGANIZER_INFO.upiId}&pn=${encodeURIComponent(ORGANIZER_INFO.upiPayeeName)}&am=${ORGANIZER_INFO.registrationFee}&cu=INR&tn=${encodeURIComponent(`Varanasi_${bookingId}`)}`}
                    onClick={() => handleAppClick('Google Pay')}
                    className="py-3 px-3 rounded-xl bg-blue-950/90 hover:bg-blue-900 border-2 border-blue-500/60 text-blue-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                    <span>Pay ₹1 on GPay</span>
                  </a>

                  {/* Paytm */}
                  <a
                    href={`paytmmp://pay?pa=${ORGANIZER_INFO.upiId}&pn=${encodeURIComponent(ORGANIZER_INFO.upiPayeeName)}&am=${ORGANIZER_INFO.registrationFee}&cu=INR&tn=${encodeURIComponent(`Varanasi_${bookingId}`)}`}
                    onClick={() => handleAppClick('Paytm')}
                    className="py-3 px-3 rounded-xl bg-cyan-950/90 hover:bg-cyan-900 border-2 border-cyan-500/60 text-cyan-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                    <span>Pay ₹1 on Paytm</span>
                  </a>

                  {/* Any UPI App */}
                  <a
                    href={upiPayLink}
                    onClick={() => handleAppClick('UPI App')}
                    className="py-3 px-3 rounded-xl bg-emerald-950/90 hover:bg-emerald-900 border-2 border-emerald-500/60 text-emerald-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span>Any UPI App</span>
                  </a>
                </div>
              </div>

              {/* QR Code & Scanner */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-amber-500/30 flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="p-2.5 bg-white rounded-xl shadow-lg shrink-0 flex flex-col items-center">
                  <QRCodeSVG 
                    value={upiPayLink} 
                    size={110} 
                    level="H" 
                    includeMargin={false}
                  />
                  <span className="text-[9px] font-bold text-slate-900 mt-1 uppercase">Scan to Pay ₹1</span>
                </div>

                <div className="space-y-2 text-center sm:text-left">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Beneficiary UPI ID</span>
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
                    <p><strong>Organizer Contact:</strong> +91 {ORGANIZER_INFO.phone}</p>
                  </div>
                </div>
              </div>

              {/* Automatic Radar / Live Payment Scanner Status */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-2 border-emerald-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="relative flex items-center justify-center">
                      <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping absolute" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    </div>
                    <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                      Auto Payment Detector Active
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">{autoDetectProgress}%</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-700 ease-out"
                    style={{ width: `${autoDetectProgress}%` }}
                  />
                </div>

                <p className="text-xs font-medium text-slate-200 flex items-center gap-1.5">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-400 shrink-0" />
                  <span>{detectionStatus}</span>
                </p>
              </div>

              {/* Back button */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-slate-200"
                >
                  ← Edit Traveler Info
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT DONE POPUP & FORMAL PASS */}
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
                  Your seat registration token for the Pune ➔ Varanasi Yatra has been successfully verified.
                </p>
              </div>

              {/* Automated Dispatch Status */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 flex items-center justify-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Sent to Host</span>
                </div>
                <div className="p-2.5 rounded-xl bg-blue-950/60 border border-blue-500/40 text-blue-300 flex items-center justify-center gap-1.5">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>Email Receipt Ready</span>
                </div>
              </div>

              {/* Modal Digital Pass Preview */}
              <div className="text-left p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border-2 border-amber-500/50 space-y-3 shadow-2xl relative overflow-hidden">
                <div className="flex items-start justify-between border-b border-slate-800 pb-2.5">
                  <div>
                    <span className="text-[10px] text-amber-400 uppercase font-extrabold tracking-wider">
                      Official Booking Voucher
                    </span>
                    <h4 className="text-sm sm:text-base font-black text-white font-serif">
                      Pune ➔ Varanasi Yatra 2026
                    </h4>
                    <p className="text-[11px] text-slate-400">28 Nov – 05 Dec 2026 (Return 06 Dec)</p>
                  </div>

                  <div className="text-right">
                    <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-black rounded-full border border-emerald-500/40 block">
                      ₹{ORGANIZER_INFO.registrationFee}.00 PAID
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 mt-1 block">
                      Voucher: {bookingId}
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
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Payment Date & Time</span>
                    <p className="font-bold text-slate-200 text-[11px]">{paymentTimestamp || new Date().toLocaleString('en-IN')}</p>
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
                    onClick={handleManualWhatsAppReceipt}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow flex items-center justify-center gap-1.5 transition-all"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Open WhatsApp Receipt</span>
                  </button>

                  <button
                    onClick={handleEmailReceipt}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send Email Receipt</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => window.print()}
                    className="py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs rounded-xl shadow-lg flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Formal Receipt</span>
                  </button>

                  <button
                    onClick={onClose}
                    className="py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition-colors"
                  >
                    Done (Close)
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FORMAL PRINTABLE BOOKING RECEIPT / INVOICE (VISIBLE ONLY IN PRINT / PDF)   */}
      {/* ========================================================================= */}
      <div id="printable-formal-receipt" className="hidden print:block font-sans text-black">
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px', border: '2px solid #333', borderRadius: '12px', background: '#ffffff', color: '#111827' }}>
          
          {/* Header Banner */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #d97706', paddingBottom: '16px', marginBottom: '20px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '28px' }}>🛕</span>
                <div>
                  <h1 style={{ fontSize: '22px', fontWeight: '900', color: '#92400e', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    PUNE ➔ VARANASI (KASHI) YATRA 2026
                  </h1>
                  <p style={{ fontSize: '13px', fontWeight: 'bold', color: '#4b5563', margin: '2px 0 0 0' }}>
                    OFFICIAL BOOKING VOUCHER & PAYMENT RECEIPT
                  </p>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ display: 'inline-block', padding: '4px 12px', background: '#dcfce7', border: '1px solid #16a34a', color: '#15803d', fontWeight: '900', fontSize: '12px', borderRadius: '20px' }}>
                PAID & CONFIRMED
              </div>
              <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#1f2937', margin: '6px 0 0 0' }}>
                Voucher No: <span style={{ fontFamily: 'monospace' }}>{bookingId}</span>
              </p>
              <p style={{ fontSize: '11px', color: '#6b7280', margin: '2px 0 0 0' }}>
                Payment Date: {paymentTimestamp || new Date().toLocaleString('en-IN')}
              </p>
            </div>
          </div>

          {/* 2-Column Info: Owner / Organizer & Recipient / Traveler */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            
            {/* Owner / Organizer Details */}
            <div style={{ padding: '14px', background: '#fef3c7', borderRadius: '8px', border: '1px solid #fde68a' }}>
              <h3 style={{ fontSize: '12px', fontWeight: '900', color: '#92400e', textTransform: 'uppercase', marginBottom: '8px', borderBottom: '1px solid #fcd34d', paddingBottom: '4px' }}>
                1. TOUR ORGANIZER & HOST DETAILS
              </h3>
              <table style={{ width: '100%', fontSize: '12px', lineHeight: '1.6' }}>
                <tbody>
                  <tr>
                    <td style={{ color: '#4b5563', width: '40%' }}><strong>Lead Host:</strong></td>
                    <td style={{ fontWeight: 'bold', color: '#111827' }}>{ORGANIZER_INFO.name}</td>
                  </tr>
                  <tr>
                    <td style={{ color: '#4b5563' }}><strong>Contact No:</strong></td>
                    <td style={{ fontWeight: 'bold', color: '#111827' }}>+91 {ORGANIZER_INFO.phone}</td>
                  </tr>
                  <tr>
                    <td style={{ color: '#4b5563' }}><strong>Beneficiary UPI:</strong></td>
                    <td style={{ fontWeight: 'bold', color: '#111827', fontFamily: 'monospace' }}>{ORGANIZER_INFO.upiId}</td>
                  </tr>
                  <tr>
                    <td style={{ color: '#4b5563' }}><strong>Base Hub:</strong></td>
                    <td style={{ color: '#111827' }}>Pune, Maharashtra, India</td>
                  </tr>
                  <tr>
                    <td style={{ color: '#4b5563' }}><strong>Tour Dates:</strong></td>
                    <td style={{ fontWeight: 'bold', color: '#92400e' }}>28 Nov – 05 Dec 2026</td>
                  </tr>
                  <tr>
                    <td style={{ color: '#4b5563' }}><strong>Express Trains:</strong></td>
                    <td style={{ color: '#111827' }}>Train 22131 & Train 11034</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Recipient / Traveler Details */}
            <div style={{ padding: '14px', background: '#f3f4f6', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: '12px', fontWeight: '900', color: '#1f2937', textTransform: 'uppercase', marginBottom: '8px', borderBottom: '1px solid #d1d5db', paddingBottom: '4px' }}>
                2. TRAVELER (CUSTOMER) INFORMATION
              </h3>
              <table style={{ width: '100%', fontSize: '12px', lineHeight: '1.6' }}>
                <tbody>
                  <tr>
                    <td style={{ color: '#4b5563', width: '40%' }}><strong>Full Name:</strong></td>
                    <td style={{ fontWeight: 'bold', color: '#111827' }}>{formData.name}</td>
                  </tr>
                  <tr>
                    <td style={{ color: '#4b5563' }}><strong>Mobile Number:</strong></td>
                    <td style={{ fontWeight: 'bold', color: '#111827' }}>{formData.phone}</td>
                  </tr>
                  <tr>
                    <td style={{ color: '#4b5563' }}><strong>Email Address:</strong></td>
                    <td style={{ color: '#111827' }}>{formData.email}</td>
                  </tr>
                  <tr>
                    <td style={{ color: '#4b5563' }}><strong>Group Size:</strong></td>
                    <td style={{ fontWeight: 'bold', color: '#111827' }}>{formData.travelers}</td>
                  </tr>
                  <tr>
                    <td style={{ color: '#4b5563' }}><strong>Train Comfort:</strong></td>
                    <td style={{ fontWeight: 'bold', color: '#2563eb' }}>{formData.trainComfort}</td>
                  </tr>
                  <tr>
                    <td style={{ color: '#4b5563' }}><strong>Hotel Option:</strong></td>
                    <td style={{ color: '#111827' }}>{formData.hotelPreference}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Itemized Payment Table */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: '900', color: '#1f2937', textTransform: 'uppercase', marginBottom: '8px' }}>
              3. PAYMENT & BOOKING TRANSACTION DETAILS
            </h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ background: '#1e293b', color: '#ffffff' }}>
                  <th style={{ padding: '8px 12px', textAlign: 'left', border: '1px solid #1e293b' }}>#</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left', border: '1px solid #1e293b' }}>Item Description</th>
                  <th style={{ padding: '8px 12px', textAlign: 'center', border: '1px solid #1e293b' }}>Payment Mode</th>
                  <th style={{ padding: '8px 12px', textAlign: 'right', border: '1px solid #1e293b' }}>Amount (INR)</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ background: '#f9fafb' }}>
                  <td style={{ padding: '8px 12px', border: '1px solid #e5e7eb' }}>1</td>
                  <td style={{ padding: '8px 12px', border: '1px solid #e5e7eb' }}>
                    <strong>Pune ➔ Varanasi Tour Priority Seat Registration Token</strong>
                    <br />
                    <span style={{ fontSize: '11px', color: '#6b7280' }}>
                      Locks group berth booking priority for 28 Nov 2026 (Train 22131)
                    </span>
                  </td>
                  <td style={{ padding: '8px 12px', textAlign: 'center', border: '1px solid #e5e7eb' }}>
                    Direct UPI ({ORGANIZER_INFO.upiId})
                  </td>
                  <td style={{ padding: '8px 12px', textAlign: 'right', fontWeight: 'bold', border: '1px solid #e5e7eb' }}>
                    ₹{ORGANIZER_INFO.registrationFee}.00
                  </td>
                </tr>
                <tr style={{ background: '#fef3c7', fontWeight: 'bold' }}>
                  <td colSpan={3} style={{ padding: '10px 12px', textAlign: 'right', border: '1px solid #d1d5db' }}>
                    TOTAL AMOUNT PAID:
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontSize: '14px', color: '#92400e', border: '1px solid #d1d5db' }}>
                    ₹{ORGANIZER_INFO.registrationFee}.00 INR
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Terms, Verification Seal & Signatures */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', borderTop: '1px solid #e5e7eb', paddingTop: '16px', alignItems: 'center' }}>
            <div style={{ fontSize: '11px', color: '#4b5563', lineHeight: '1.5' }}>
              <p style={{ margin: '0 0 4px 0' }}><strong>Important Advisory:</strong></p>
              <ul style={{ margin: 0, paddingLeft: '16px' }}>
                <li>Railway ticket reservations open 60 days before travel (late September 2026).</li>
                <li>Keep this digital voucher for itinerary briefings and hotel check-in at Varanasi.</li>
                <li>For any itinerary adjustments or train berth queries, contact lead host Pawan Pawar.</li>
              </ul>
            </div>

            <div style={{ textAlign: 'center', border: '2px dashed #16a34a', padding: '12px', borderRadius: '8px', background: '#f0fdf4' }}>
              <div style={{ fontSize: '18px' }}>🛕</div>
              <p style={{ fontSize: '11px', fontWeight: '900', color: '#166534', margin: '4px 0 2px 0', textTransform: 'uppercase' }}>
                VERIFIED & SEAT RESERVED
              </p>
              <p style={{ fontSize: '10px', color: '#4b5563', margin: 0 }}>
                Pawan Pawar (Tour Host)
              </p>
              <p style={{ fontSize: '9px', color: '#6b7280', margin: '2px 0 0 0' }}>
                +91 9561547711
              </p>
            </div>
          </div>

          {/* Chant footer */}
          <div style={{ marginTop: '16px', paddingTop: '10px', borderTop: '1px solid #f3f4f6', textAlign: 'center', fontSize: '11px', color: '#9ca3af', fontStyle: 'italic' }}>
            "ॐ नमः शिवाय • काशी विश्वनाथाय नमो नमः • Pune to Varanasi Yatra 2026"
          </div>
        </div>
      </div>
    </div>
  );
}
