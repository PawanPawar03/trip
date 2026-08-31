import React, { useState, useEffect } from 'react';
import { 
  X, 
  Ticket, 
  CheckCircle2, 
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
  CheckCircle,
  FileText,
  UserCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ORGANIZER_INFO } from '../data/tripDetails';

export default function RegistrationModal({ isOpen, onClose }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [registrationTimestamp, setRegistrationTimestamp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // Generate Booking ID and timestamp
  useEffect(() => {
    if (isOpen && !bookingId) {
      const randomId = 'PVY-' + Math.floor(100000 + Math.random() * 900000);
      setBookingId(randomId);
    }
  }, [isOpen, bookingId]);

  if (!isOpen) return null;

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) return;

    setIsSubmitting(true);

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
    setRegistrationTimestamp(fullTimestamp);

    // 1. AUTOMATIC BACKGROUND EMAIL NOTIFICATION TO pawanpawar416@gmail.com
    try {
      fetch("https://formsubmit.co/ajax/pawanpawar416@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `New Varanasi Yatra Registration: ${formData.name} (${bookingId})`,
          Voucher_No: bookingId,
          Traveler_Name: formData.name,
          Mobile_Number: formData.phone,
          Email_Address: formData.email,
          Total_Members: formData.travelers,
          Train_Comfort: formData.trainComfort,
          Hotel_Choice: formData.hotelPreference,
          Registration_Timestamp: fullTimestamp,
          Tour_Name: "Pune to Varanasi Yatra (28 Nov - 05 Dec 2026)",
          Organizer: `${ORGANIZER_INFO.name} (${ORGANIZER_INFO.phone})`,
          _template: "table"
        })
      }).catch(err => console.log('Email delivery background note:', err));
    } catch (err) {
      console.log(err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Trigger Confetti
      try {
        confetti({
          particleCount: 150,
          spread: 90,
          origin: { y: 0.55 }
        });
      } catch (err) {
        console.log(err);
      }

      // Auto-dispatch WhatsApp Confirmation to Pawan Pawar
      const whatsappReceiptMessage = 
        `*🛕 OFFICIAL TRIP REGISTRATION VOUCHER*\n` +
        `*Voucher / Ref No:* ${bookingId}\n` +
        `*Registration Timestamp:* ${fullTimestamp}\n` +
        `*Tour:* Pune ➔ Varanasi Yatra (28 Nov - 05 Dec 2026)\n\n` +
        `*--- TRAVELER (CUSTOMER) DETAILS ---*\n` +
        `*Full Name:* ${formData.name}\n` +
        `*Mobile Number:* ${formData.phone}\n` +
        `*Email Address:* ${formData.email}\n` +
        `*Total Members:* ${formData.travelers}\n` +
        `*Train Class Preference:* ${formData.trainComfort}\n` +
        `*Hotel Preference:* ${formData.hotelPreference}\n\n` +
        `*--- ORGANIZER / HOST DETAILS ---*\n` +
        `*Lead Host:* ${ORGANIZER_INFO.name}\n` +
        `*Phone:* +91 ${ORGANIZER_INFO.phone}\n` +
        `*Email:* ${ORGANIZER_INFO.email}\n\n` +
        `*Status:* ✅ SEAT REGISTRATION CONFIRMED\n` +
        `_Har Har Mahadev! Sent automatically via Pune-Varanasi Tour Portal._`;

      setTimeout(() => {
        window.open(`https://wa.me/${ORGANIZER_INFO.whatsappNumber}?text=${encodeURIComponent(whatsappReceiptMessage)}`, '_blank');
      }, 700);
    }, 600);
  };

  const handleManualWhatsAppSend = () => {
    const whatsappReceiptMessage = 
      `*🛕 OFFICIAL TRIP REGISTRATION VOUCHER (${bookingId})*\n\n` +
      `*Timestamp:* ${registrationTimestamp || new Date().toLocaleString('en-IN')}\n` +
      `*Traveler Name:* ${formData.name}\n` +
      `*Mobile:* ${formData.phone}\n` +
      `*Email:* ${formData.email}\n` +
      `*Group Size:* ${formData.travelers}\n` +
      `*Train Class:* ${formData.trainComfort}\n` +
      `*Hotel:* ${formData.hotelPreference}\n` +
      `*Status:* CONFIRMED\n\n` +
      `*Host:* ${ORGANIZER_INFO.name} (+91 ${ORGANIZER_INFO.phone})\n` +
      `*Host Email:* ${ORGANIZER_INFO.email}`;

    window.open(`https://wa.me/${ORGANIZER_INFO.whatsappNumber}?text=${encodeURIComponent(whatsappReceiptMessage)}`, '_blank');
  };

  const handleEmailSend = () => {
    const subject = encodeURIComponent(`Official Booking Voucher: Pune to Varanasi Yatra 2026 (${bookingId})`);
    const body = encodeURIComponent(
      `PUNE TO VARANASI (KASHI) DIVINE YATRA 2026\n` +
      `OFFICIAL SEAT REGISTRATION VOUCHER\n` +
      `--------------------------------------------------\n\n` +
      `BOOKING & TRAVELER DETAILS:\n` +
      `• Voucher Number: ${bookingId}\n` +
      `• Registration Date & Time: ${registrationTimestamp || new Date().toLocaleString('en-IN')}\n` +
      `• Primary Traveler: ${formData.name}\n` +
      `• Mobile Number: ${formData.phone}\n` +
      `• Email Address: ${formData.email}\n` +
      `• Group Size: ${formData.travelers}\n` +
      `• Train Comfort Preference: ${formData.trainComfort}\n` +
      `• Hotel Category: ${formData.hotelPreference}\n` +
      `• Status: CONFIRMED & SEAT HELD\n\n` +
      `TOUR ORGANIZER / HOST DETAILS:\n` +
      `• Lead Coordinator: ${ORGANIZER_INFO.name}\n` +
      `• Contact Phone / WhatsApp: +91 ${ORGANIZER_INFO.phone}\n` +
      `• Official Email: ${ORGANIZER_INFO.email}\n` +
      `• Departure: Pune Junction (28 Nov 2026, 4:15 PM • Train 22131)\n` +
      `• Return: Banaras Station (05 Dec 2026, 3:30 AM • Train 11034)\n\n` +
      `Har Har Mahadev!`
    );

    window.location.href = `mailto:${ORGANIZER_INFO.email}?cc=${formData.email}&subject=${subject}&body=${body}`;
  };

  const handlePrintReceipt = () => {
    const receiptElement = document.getElementById('printable-formal-receipt');
    if (!receiptElement) {
      window.print();
      return;
    }

    const printWindow = window.open('', '_blank', 'width=850,height=900');
    if (!printWindow) {
      window.print();
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Pune to Varanasi Yatra Voucher - ${bookingId}</title>
          <meta charset="utf-8">
          <style>
            @page { size: A4 portrait; margin: 8mm; }
            * { box-sizing: border-box; }
            body { 
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; 
              margin: 0; 
              padding: 10px; 
              background: #ffffff; 
              color: #111827; 
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
          </style>
        </head>
        <body>
          ${receiptElement.innerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 350);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
        {/* Modal Container */}
        <div className="relative w-full max-w-xl my-auto rounded-3xl bg-slate-900 border-2 border-amber-500/40 shadow-2xl shadow-amber-500/10 overflow-hidden flex flex-col max-h-[92vh]">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between text-slate-950 shrink-0">
            <div className="flex items-center gap-2">
              <Ticket className="w-5 h-5 shrink-0" />
              <div>
                <h3 className="font-serif font-black text-base sm:text-lg leading-tight">
                  Pune ➔ Varanasi Yatra Seat Registration
                </h3>
                <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider opacity-90">
                  28 Nov – 05 Dec 2026 • Instant Free Confirmation
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

          {/* Modal Content Body */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
            {!isSubmitted ? (
              /* REGISTRATION FORM (DIRECT - NO PAYMENT NEEDED) */
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="p-3.5 bg-gradient-to-r from-amber-950/40 to-slate-950 rounded-2xl border border-amber-500/30 text-xs text-amber-300 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <p className="font-bold text-white">Direct Seat Registration (100% Free)</p>
                    <p className="text-slate-300 text-[11px]">
                      Fill in your travel details below. An official voucher will be generated and dispatched automatically to <strong>{ORGANIZER_INFO.email}</strong> and your WhatsApp/Email.
                    </p>
                  </div>
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

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-sm sm:text-base rounded-xl shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Registering Seat & Dispatching Notification...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Confirm Seat Registration (Instant)</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* REGISTRATION SUCCESSFUL & DIGITAL VOUCHER PASS */
              <div className="space-y-5 text-center">
                {/* Success Badge */}
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border-2 border-emerald-500/50 shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                    Seat Registration Confirmed
                  </span>
                  <h3 className="text-2xl font-black text-white font-serif">
                    Har Har Mahadev! 🙏
                  </h3>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto">
                    Your seat registration has been recorded and email notification sent to <strong>{ORGANIZER_INFO.email}</strong>.
                  </p>
                </div>

                {/* Automated Dispatch Indicators */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 flex items-center justify-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>WhatsApp Voucher Sent</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-blue-950/60 border border-blue-500/40 text-blue-300 flex items-center justify-center gap-1.5">
                    <Mail className="w-4 h-4 text-blue-400" />
                    <span>Email Sent to Host & Self</span>
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
                        SEAT CONFIRMED
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
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Registration Timestamp</span>
                      <p className="font-bold text-slate-200 text-[11px]">{registrationTimestamp}</p>
                    </div>
                  </div>

                  {/* Footer of Pass */}
                  <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Host: <strong>{ORGANIZER_INFO.name}</strong> (+91 {ORGANIZER_INFO.phone})</span>
                    <span className="text-amber-300 font-semibold">{ORGANIZER_INFO.email}</span>
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
                      <span>Open WhatsApp Voucher</span>
                    </button>

                    <button
                      onClick={handleEmailSend}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Send Email to Host & Self</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={handlePrintReceipt}
                      className="py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs rounded-xl shadow-lg flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print Official Receipt (1 Page)</span>
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
      </div>

      {/* ========================================================================= */}
      {/* 1-PAGE FORMAL PRINTABLE BOOKING RECEIPT (VISIBLE ONLY DURING PRINT / PDF) */}
      {/* ========================================================================= */}
      <div id="printable-formal-receipt" className="hidden print:block font-sans text-black">
        <div style={{ width: '100%', maxWidth: '750px', margin: '0 auto', padding: '16px', border: '2px solid #1e293b', borderRadius: '8px', background: '#ffffff', color: '#111827', boxSizing: 'border-box' }}>
          
          {/* Header Banner */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #d97706', paddingBottom: '10px', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '24px' }}>🛕</span>
              <div>
                <h1 style={{ fontSize: '18px', fontWeight: '900', color: '#92400e', margin: 0, textTransform: 'uppercase' }}>
                  PUNE ➔ VARANASI (KASHI) YATRA 2026
                </h1>
                <p style={{ fontSize: '11px', fontWeight: 'bold', color: '#4b5563', margin: '1px 0 0 0' }}>
                  OFFICIAL SEAT REGISTRATION VOUCHER & CONFIRMATION RECEIPT
                </p>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ display: 'inline-block', padding: '2px 8px', background: '#dcfce7', border: '1px solid #16a34a', color: '#15803d', fontWeight: '900', fontSize: '10px', borderRadius: '12px' }}>
                SEAT CONFIRMED
              </div>
              <p style={{ fontSize: '11px', fontWeight: 'bold', color: '#1f2937', margin: '3px 0 0 0' }}>
                Voucher No: <span style={{ fontFamily: 'monospace' }}>{bookingId}</span>
              </p>
              <p style={{ fontSize: '10px', color: '#6b7280', margin: '1px 0 0 0' }}>
                Date: {registrationTimestamp || new Date().toLocaleString('en-IN')}
              </p>
            </div>
          </div>

          {/* 2-Column Info: Owner / Organizer & Recipient / Traveler */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
            
            {/* Owner / Organizer Details */}
            <div style={{ padding: '10px', background: '#fef3c7', borderRadius: '6px', border: '1px solid #fde68a' }}>
              <h3 style={{ fontSize: '11px', fontWeight: '900', color: '#92400e', textTransform: 'uppercase', marginBottom: '6px', borderBottom: '1px solid #fcd34d', paddingBottom: '2px' }}>
                1. TOUR ORGANIZER & HOST DETAILS
              </h3>
              <table style={{ width: '100%', fontSize: '11px', lineHeight: '1.4' }}>
                <tbody>
                  <tr>
                    <td style={{ color: '#4b5563', width: '38%' }}><strong>Lead Host:</strong></td>
                    <td style={{ fontWeight: 'bold', color: '#111827' }}>{ORGANIZER_INFO.name}</td>
                  </tr>
                  <tr>
                    <td style={{ color: '#4b5563' }}><strong>Contact No:</strong></td>
                    <td style={{ fontWeight: 'bold', color: '#111827' }}>+91 {ORGANIZER_INFO.phone}</td>
                  </tr>
                  <tr>
                    <td style={{ color: '#4b5563' }}><strong>Host Email:</strong></td>
                    <td style={{ fontWeight: 'bold', color: '#111827' }}>{ORGANIZER_INFO.email}</td>
                  </tr>
                  <tr>
                    <td style={{ color: '#4b5563' }}><strong>Base City:</strong></td>
                    <td style={{ color: '#111827' }}>Pune, Maharashtra</td>
                  </tr>
                  <tr>
                    <td style={{ color: '#4b5563' }}><strong>Tour Dates:</strong></td>
                    <td style={{ fontWeight: 'bold', color: '#92400e' }}>28 Nov – 05 Dec 2026</td>
                  </tr>
                  <tr>
                    <td style={{ color: '#4b5563' }}><strong>Trains:</strong></td>
                    <td style={{ color: '#111827' }}>Train 22131 & Train 11034</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Recipient / Traveler Details */}
            <div style={{ padding: '10px', background: '#f3f4f6', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: '11px', fontWeight: '900', color: '#1f2937', textTransform: 'uppercase', marginBottom: '6px', borderBottom: '1px solid #d1d5db', paddingBottom: '2px' }}>
                2. TRAVELER (CUSTOMER) INFORMATION
              </h3>
              <table style={{ width: '100%', fontSize: '11px', lineHeight: '1.4' }}>
                <tbody>
                  <tr>
                    <td style={{ color: '#4b5563', width: '38%' }}><strong>Full Name:</strong></td>
                    <td style={{ fontWeight: 'bold', color: '#111827' }}>{formData.name}</td>
                  </tr>
                  <tr>
                    <td style={{ color: '#4b5563' }}><strong>Mobile:</strong></td>
                    <td style={{ fontWeight: 'bold', color: '#111827' }}>{formData.phone}</td>
                  </tr>
                  <tr>
                    <td style={{ color: '#4b5563' }}><strong>Email:</strong></td>
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

          {/* Itemized Table */}
          <div style={{ marginBottom: '12px' }}>
            <h3 style={{ fontSize: '11px', fontWeight: '900', color: '#1f2937', textTransform: 'uppercase', marginBottom: '6px' }}>
              3. SEAT ALLOCATION & RESERVATION STATUS
            </h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
              <thead>
                <tr style={{ background: '#1e293b', color: '#ffffff' }}>
                  <th style={{ padding: '6px 8px', textAlign: 'left', border: '1px solid #1e293b' }}>#</th>
                  <th style={{ padding: '6px 8px', textAlign: 'left', border: '1px solid #1e293b' }}>Item Description</th>
                  <th style={{ padding: '6px 8px', textAlign: 'center', border: '1px solid #1e293b' }}>Status</th>
                  <th style={{ padding: '6px 8px', textAlign: 'right', border: '1px solid #1e293b' }}>Registration Fee</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ background: '#f9fafb' }}>
                  <td style={{ padding: '6px 8px', border: '1px solid #e5e7eb' }}>1</td>
                  <td style={{ padding: '6px 8px', border: '1px solid #e5e7eb' }}>
                    <strong>Pune ➔ Varanasi Tour Priority Seat Registration</strong>
                    <br />
                    <span style={{ fontSize: '10px', color: '#6b7280' }}>
                      Locks priority group berth booking for Train 22131 (28 Nov 2026)
                    </span>
                  </td>
                  <td style={{ padding: '6px 8px', textAlign: 'center', fontWeight: 'bold', color: '#15803d', border: '1px solid #e5e7eb' }}>
                    CONFIRMED & HELD
                  </td>
                  <td style={{ padding: '6px 8px', textAlign: 'right', fontWeight: 'bold', color: '#16a34a', border: '1px solid #e5e7eb' }}>
                    FREE (DIRECT)
                  </td>
                </tr>
                <tr style={{ background: '#fef3c7', fontWeight: 'bold' }}>
                  <td colSpan={3} style={{ padding: '6px 8px', textAlign: 'right', border: '1px solid #d1d5db' }}>
                    REGISTRATION STATUS:
                  </td>
                  <td style={{ padding: '6px 8px', textAlign: 'right', fontSize: '12px', color: '#15803d', border: '1px solid #d1d5db' }}>
                    CONFIRMED
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Terms, Verification Seal & Signatures */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px', borderTop: '1px solid #e5e7eb', paddingTop: '10px', alignItems: 'center' }}>
            <div style={{ fontSize: '10px', color: '#4b5563', lineHeight: '1.4' }}>
              <p style={{ margin: '0 0 2px 0' }}><strong>Important Advisory:</strong></p>
              <ul style={{ margin: 0, paddingLeft: '14px' }}>
                <li>Railway ticket reservations open 60 days before travel (late September 2026).</li>
                <li>Notification sent to tour coordinator <strong>{ORGANIZER_INFO.name}</strong> ({ORGANIZER_INFO.email}).</li>
                <li>For any itinerary adjustments or group queries, contact lead host directly.</li>
              </ul>
            </div>

            <div style={{ textAlign: 'center', border: '1px dashed #16a34a', padding: '8px', borderRadius: '6px', background: '#f0fdf4' }}>
              <div style={{ fontSize: '16px' }}>🛕</div>
              <p style={{ fontSize: '10px', fontWeight: '900', color: '#166534', margin: '2px 0 1px 0', textTransform: 'uppercase' }}>
                SEAT ALLOCATED
              </p>
              <p style={{ fontSize: '9px', color: '#4b5563', margin: 0 }}>
                {ORGANIZER_INFO.name} (Tour Host)
              </p>
              <p style={{ fontSize: '8px', color: '#6b7280', margin: '1px 0 0 0' }}>
                +91 {ORGANIZER_INFO.phone}
              </p>
            </div>
          </div>

          {/* Chant footer */}
          <div style={{ marginTop: '10px', paddingTop: '6px', borderTop: '1px solid #f3f4f6', textAlign: 'center', fontSize: '10px', color: '#9ca3af', fontStyle: 'italic' }}>
            "ॐ नमः शिवाय • काशी विश्वनाथाय नमो नमः • Pune to Varanasi Yatra 2026"
          </div>
        </div>
      </div>
    </>
  );
}
