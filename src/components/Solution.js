// src/components/Solution.js
import { motion } from 'framer-motion';

// Icon for "Visual Portfolio"
const IconCamera = () => (
  <svg
    className="h-8 w-8 text-purple-600"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

// Icon for "Service Menu"
const IconRupee = () => (
  <svg
    className="h-8 w-8 text-yellow-600"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 8h6m-5 4h4m-6 4h6m2-12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

// Icon for "Build Reputation"
const IconSparkles = () => (
  <svg
    className="h-8 w-8 text-green-600"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
    />
  </svg>
);

// New "softer" card design
const SolutionCard = ({ icon, title, children }) => (
  <div className="flex flex-col items-center rounded-2xl bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-lg">
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-50">
      {icon}
    </div>
    <h3 className="mt-4 text-xl font-bold text-gray-900">{title}</h3>
    <p className="mt-2 text-base text-gray-600">{children}</p>
  </div>
);

export default function Solution() {
  // Animation for fading in on scroll
  const fadeInOnScroll = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.7 },
  };

  return (
    // This light lavender background matches the video
    <div className="w-full bg-indigo-50 py-24 sm:py-32">
      <motion.div
        {...fadeInOnScroll}
        className="container mx-auto max-w-6xl px-4"
      >
        {/* Section Header */}
        <div className="text-center">
          <span className="mb-2 inline-block rounded-full bg-indigo-200 px-3 py-1 text-sm font-semibold text-indigo-700">
            The Solution
          </span>
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Welcome to HunarConnect.
            <br />
            <span className="text-purple-600">Your Skill, </span>
            <span className="text-pink-600">Your Profile, </span>
            <span className="text-orange-600">Your Price.</span>
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-gray-600 mx-auto">
            HunarConnect gives every worker a powerful digital profile. They
            can showcase their best work with photos and videos, list their
            services like a menu, and—for the first time—build a verifiable
            record of their skills.
          </p>
        </div>

        {/* Solution Cards */}
        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          <SolutionCard
            icon={<IconCamera />}
            title="Visual Portfolio"
          >
            Showcase your best work with stunning photos and videos that
            speak louder than words.
          </SolutionCard>
          <SolutionCard
            icon={<IconRupee />}
            title="Service Menu"
          >
            List your services with clear, upfront pricing. No haggling, no
            confusion—just transparency.
          </SolutionCard>
          <SolutionCard
            icon={<IconSparkles />}
            title="Build Reputation"
          >
            Earn verified credentials and customer reviews that open doors
            to better opportunities.
          </SolutionCard> 
          {/* ^^^ THIS IS THE FIX ^^^ */}
        </div>
      </motion.div>
    </div>
  );
}