import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TripHighlights from './components/TripHighlights';
import TrainSection from './components/TrainSection';
import ItineraryTimeline from './components/ItineraryTimeline';
import BudgetCalculator from './components/BudgetCalculator';
import StayGuide from './components/StayGuide';
import FoodAndShopping from './components/FoodAndShopping';
import InquirySection from './components/InquirySection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import FloatingContactBar from './components/FloatingContactBar';
import RegistrationModal from './components/RegistrationModal';
import InquiryModal from './components/InquiryModal';

export default function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 relative selection:bg-amber-500 selection:text-slate-950 font-sans">
      {/* Sticky Navigation Header */}
      <Navbar
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenInquiry={() => setIsInquiryOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="space-y-4">
        <Hero
          onOpenRegister={() => setIsRegisterOpen(true)}
          onOpenInquiry={() => setIsInquiryOpen(true)}
        />

        <TripHighlights
          onOpenRegister={() => setIsRegisterOpen(true)}
          onOpenInquiry={() => setIsInquiryOpen(true)}
        />

        <TrainSection
          onOpenRegister={() => setIsRegisterOpen(true)}
        />

        <ItineraryTimeline
          onOpenRegister={() => setIsRegisterOpen(true)}
        />

        <BudgetCalculator
          onOpenRegister={() => setIsRegisterOpen(true)}
        />

        <StayGuide />

        <FoodAndShopping />

        <InquirySection
          onOpenRegister={() => setIsRegisterOpen(true)}
        />

        <FAQSection
          onOpenInquiry={() => setIsInquiryOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenInquiry={() => setIsInquiryOpen(true)}
      />

      {/* Floating Action Bars (WhatsApp & Quick Booking) */}
      <FloatingContactBar
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenInquiry={() => setIsInquiryOpen(true)}
      />

      {/* Registration & ₹100 UPI Payment Modal */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />

      {/* Inquiry & "I'm Interested" Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        onSwitchToRegister={() => setIsRegisterOpen(true)}
      />
    </div>
  );
}
