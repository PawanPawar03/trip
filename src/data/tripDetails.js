export const ORGANIZER_INFO = {
  name: "Pawan Pawar",
  phone: "9561547711",
  displayPhone: "+91 9561547711",
  whatsappNumber: "919561547711",
  email: "pawanpawar416@gmail.com",
  upiId: "pawanpawar4167@ybl",
  registrationFee: 0, // Free Direct Registration (No token payment needed)
  upiPayeeName: "Pawan Pawar",
  tripTitle: "Pune to Varanasi (Banaras) Divine Yatra 2026",
  dates: "28 Nov 2026 – 05 Dec 2026",
  returnArrival: "06 Dec 2026 (7:15 AM)",
  duration: "7 Nights / 8 Days (6 Full Sightseeing Days)",
  groupSize: "Limited Seats for comfortable travel"
};

export const TRAIN_DETAILS = {
  outbound: {
    trainNumber: "22131",
    trainName: "Pune – Banaras Express",
    departureStation: "Pune Junction (PUNE)",
    departureDate: "28 Nov 2026 (Saturday)",
    departureTime: "04:15 PM",
    arrivalStation: "Banaras (BNRS)",
    arrivalDate: "29 Nov 2026 (Sunday)",
    arrivalTime: "08:00 PM",
    duration: "27 hr 45 min",
    classes: ["Sleeper (SL)", "3rd AC (3A)", "2nd AC (2A)"],
    status: "Daily Express • Direct to Banaras Station",
    tips: "Most convenient direct train without station transfers."
  },
  inbound: {
    trainNumber: "11034",
    trainName: "Darbhanga – Pune Express",
    departureStation: "Banaras (BNRS)",
    departureDate: "05 Dec 2026 (Saturday)",
    departureTime: "03:30 AM (Early Morning)",
    arrivalStation: "Pune Junction (PUNE)",
    arrivalDate: "06 Dec 2026 (Sunday)",
    arrivalTime: "07:15 AM",
    duration: "27 hr 45 min",
    classes: ["Sleeper (SL)", "3rd AC (3A)", "2nd AC (2A)"],
    status: "Regular Express",
    tips: "Board directly from Banaras station early morning."
  },
  reservationNotice: {
    rule: "IRCTC Railway reservation opens 60 days in advance (excluding journey date).",
    bookingStartDate: "Late September 2026",
    action: "Register with us early so train berths (SL / 3A / 2A) are confirmed as soon as the booking window opens!"
  }
};

export const STAY_OPTIONS = [
  {
    id: "godowlia",
    name: "Godowlia / Dashashwamedh Ghat",
    badge: "Heart of Old Banaras",
    recommendedFor: "Kashi Vishwanath Darshan, Walking to Ghats & Evening Ganga Aarti",
    icon: "Flame",
    features: [
      "5-10 min walking distance to Shri Kashi Vishwanath Temple",
      "Immediate access to Dashashwamedh Ganga Aarti & Vishwanath Gali",
      "Vibrant street food, silk shops, and morning tea stalls",
      "Atmospheric narrow alleys with traditional Varanasi vibes"
    ],
    idealFor: "Spiritual seekers, first-time visitors, walking enthusiasts"
  },
  {
    id: "assi",
    name: "Assi Ghat & Southern Ghats",
    badge: "Scenic & Peaceful",
    recommendedFor: "Subah-e-Banaras Sunrise, Boating, Riverside Cafés & Calm",
    icon: "Sun",
    features: [
      "Stunning sunrise views and morning yoga/classical music at Assi",
      "Spacious ghats with excellent riverside cafés (Pizzeria Vatika, etc.)",
      "Young, relaxed and creative traveler atmosphere",
      "Easier boat boarding points for Ghat exploration"
    ],
    idealFor: "Photographers, peaceful stays, café lovers, scenic lovers"
  },
  {
    id: "cantonment",
    name: "Cantonment (Varanasi Cantt)",
    badge: "Comfort & Modern Hotels",
    recommendedFor: "Large Premium Hotels, Smooth Cab Access & Station Proximity",
    icon: "Building",
    features: [
      "Wider roads, less traffic congestion, easy four-wheeler parking",
      "Closest to Varanasi Junction (BSB) railway hub",
      "Chain hotels with modern amenities, elevators, and luxury rooms",
      "Peaceful nights away from crowded temple alleys"
    ],
    idealFor: "Families with elderly, premium travelers seeking luxury comfort"
  }
];

export const BUDGET_BREAKDOWN_DATA = {
  baselineExpenses: [
    { category: "Pune ➔ Banaras Train (SL / 3A / 2A)", range: "₹700 – ₹2,600", per: "person / one-way" },
    { category: "Banaras ➔ Pune Train (SL / 3A / 2A)", range: "₹700 – ₹2,600", per: "person / return" },
    { category: "Hotel Stay (6 Nights Varanasi)", range: "₹4,500 – ₹9,000", per: "per room (split if 2)" },
    { category: "Food & Local Banarasi Delicacies", range: "₹3,000 – ₹5,000", per: "person for entire trip" },
    { category: "Local Transport (E-rickshaws, Autos)", range: "₹1,500 – ₹3,000", per: "person" },
    { category: "Sunrise Ganga Boat Ride (Assi ➔ Manikarnika)", range: "₹300 – ₹1,000", per: "person" },
    { category: "Sarnath Excursion (Entry & Transport)", range: "₹500 – ₹1,000", per: "person" },
    { category: "Other Sightseeing & Temple Sevas", range: "₹500 – ₹1,500", per: "person" }
  ],
  summary: {
    budgetRange: "₹11,700 – ₹25,700 per person",
    recommendedTarget: "₹18,000 – ₹22,000 per person (Comfortable 3A Train + Quality Hotel)"
  }
};
