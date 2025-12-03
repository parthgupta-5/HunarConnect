// src/components/Trust.js
import { motion } from 'framer-motion';

// Icon for "Liveness Test"
const IconVideo = () => (
  <svg
    className="h-8 w-8 text-indigo-600"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 8h11a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1z"
    />
  </svg>
);

// Icon for "Community Verification"
const IconUsers = () => (
  <svg
    className="h-8 w-8 text-indigo-600"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-1.657-1.343-3-3-3s-3 1.343-3 3v2m6 0H9m12-9a3 3 0 10-6 0 3 3 0 006 0zM7 11a3 3 0 10-6 0 3 3 0 006 0z"
    />
  </svg>
);

// Icon for "Digital Wallet"
const IconWallet = () => (
  <svg
    className="h-8 w-8 text-indigo-600"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H4a3 3 0 00-3 3v8a3 3 0 003 3z"
    />
  </svg>
);

// Icon for "Checkmark"
const IconCheck = () => (
  <svg
    className="h-4 w-4 text-green-600"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

// New "softer" card design from the screenshot
const TrustCard = ({ icon, title, layer, children }) => (
  <div className="rounded-2xl bg-white p-8 shadow-sm transition-shadow hover:shadow-lg">
    <span className="mb-4 inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold uppercase text-indigo-700">
      {layer}
    </span>
    <div className="flex items-center">
      {icon}
      <h3 className="ml-4 text-xl font-bold text-gray-900">{title}</h3>
    </div>
    <p className="mt-4 text-base text-gray-600">{children}</p>
    <div className="mt-5 flex items-center">
      <IconCheck />
      <span className="ml-2 text-sm font-medium text-green-700">
        Active Protection
      </span>
    </div>
  </div>
);

export default function Trust() {
  // Animation for fading in on scroll
  const fadeInOnScroll = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.7 },
  };

  return (
    // Changed to white background
    <div className="w-full bg-white py-24 sm:py-32">
      <motion.div
        {...fadeInOnScroll}
        className="container mx-auto max-w-6xl px-4"
      >
        {/* Section Header */}
        <div className="text-center">
          <span className="mb-2 inline-block rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">
            Our Revolutionary System
          </span>
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Verified Pros.{' '}
            <span className="text-indigo-600">Guaranteed Trust.</span>
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-gray-600 mx-auto">
            We don't just "list" workers. We verify them.
          </p>
        </div>

        {/* Trust Cards */}
        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          <TrustCard
            icon={<IconVideo />}
            title="The Liveness Test"
            layer="Layer 1"
          >
            Every new worker proves their identity with a simple video test,
            linking their face to their work. This stops fakes and scammers.
          </TrustCard> 
          {/* ^^^ THIS IS THE FIX ^^^ */}
          <TrustCard
            icon={<IconUsers />}
            title="Community Verification"
            layer="Layer 2"
          >
            Our 'Trust Score' algorithm sorts pros based on real customer
            ratings. Good work gets rewarded and recommended first.
          </TrustCard> 
          {/* ^^^ THIS IS THE FIX ^^^ */}
          <TrustCard
            icon={<IconWallet />}
            title="The Digital Wallet"
            layer="Layer 3"
          >
            We partner with NGOs and trainers to issue official
            'Micro-Credentials,' so you can see a worker's formal training.
          </TrustCard> 
          {/* ^^^ THIS IS THE FIX ^^^ */}
        </div>

        {/* The "Result" Box - Gradient from the screenshot */}
        <div className="mt-16 rounded-2xl bg-gradient-to-t from-indigo-700 to-purple-600 p-12 text-center shadow-2xl">
          <h3 className="text-3xl font-extrabold text-white sm:text-4xl">
            The Result? Unmatched Trust.
          </h3>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-indigo-100">
            This means you're always connecting with verified, credible
            professionals who take their reputation seriously.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-white">
              <span className="block text-5xl font-bold">100%</span>
              <span className="mt-1 block text-lg text-indigo-200">
                Verified Workers
              </span>
            </div>
            <div className="text-white">
              <span className="block text-5xl font-bold">99.8%</span>
              <span className="mt-1 block text-lg text-indigo-200">
                Trust Score
              </span>
            </div>
            <div className="text-white">
              <span className="block text-5xl font-bold">Zero</span>
              <span className="mt-1 block text-lg text-indigo-200">
                Fake Profiles
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}