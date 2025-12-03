// src/components/Problem.js
import { motion } from 'framer-motion';

// Icon for "No Discovery"
const IconSearch = () => (
  <svg
    className="h-8 w-8 text-gray-400" // Lighter icon color
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

// Icon for "Zero Trust"
const IconShield = () => (
  <svg
    className="h-8 w-8 text-red-400" // Lighter icon color
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

// Icon for "Lost Income"
const IconTrendingDown = () => (
  <svg
    className="h-8 w-8 text-orange-400" // Lighter icon color
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
    />
  </svg>
);

// New "softer" card design
const ProblemCard = ({ icon, title, children }) => (
  <div className="flex flex-col items-center rounded-2xl bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-lg">
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-50">
      {icon}
    </div>
    <h3 className="mt-4 text-xl font-bold text-gray-900">{title}</h3>
    <p className="mt-2 text-base text-gray-600">{children}</p>
  </div>
);

export default function Problem() {
  // Animation for fading in on scroll
  const fadeInOnScroll = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 }, // Triggers when 30% is visible
    transition: { duration: 0.7 },
  };

  return (
    // New light gray background
    <div className="w-full bg-gray-50 py-24 sm:py-32">
      <motion.div
        {...fadeInOnScroll}
        className="container mx-auto max-w-6xl px-4"
      >
        {/* Section Header */}
        <div className="text-center">
          <span className="mb-2 inline-block rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">
            The Problem
          </span>
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Millions of Skilled Workers Are{' '}
            <span className="text-orange-500">Invisible</span>
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-gray-600 mx-auto">
            Finding a trusted local professional is based on guesswork. At the
            same time, millions of skilled artisans, plumbers, and vendors
            have no way to prove their skills, showcase their work, or build a
            digital reputation. This means{' '}
            <span className="font-bold text-gray-900">
              unstable income
            </span>{' '}
            and{' '}
            <span className="font-bold text-gray-900">
              risk for you.
            </span>
          </p>
        </div>

        {/* Problem Cards */}
        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          <ProblemCard icon={<IconSearch />} title="No Discovery">
            Workers can't be found beyond word-of-mouth.
          </ProblemCard>
          <ProblemCard icon={<IconShield />} title="Zero Trust">
            No way to verify skills or check credentials.
          </ProblemCard>
          <ProblemCard icon={<IconTrendingDown />} title="Lost Income">
            Skilled workers struggle to find consistent work.
          </ProblemCard>
        </div>
      </motion.div>
    </div>
  );
}