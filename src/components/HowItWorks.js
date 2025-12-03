// src/components/HowItWorks.js
import { motion } from 'framer-motion';

// --- HeroIcons (for the "sexy" icons) ---
const IconSearch = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const IconUserCheck = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const IconBadgeCheck = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
    />
  </svg>
);

const IconCamera = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const IconList = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 6h16M4 10h16M4 14h16M4 18h16"
    />
  </svg>
);

const IconStar = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    />
  </svg>
);
// --- End HeroIcons ---

const Step = ({ number, title, children, icon, color }) => {
  const colors = {
    indigo: 'bg-indigo-600',
    purple: 'bg-purple-600',
    green: 'bg-green-600',
    orange: 'bg-orange-500',
    yellow: 'bg-yellow-500',
  };
  return (
    <div className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-lg">
      <div
        className={`relative flex h-24 w-24 items-center justify-center rounded-2xl ${colors[color]}`}
      >
        {icon}
        <span className="absolute -top-3 -left-3 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-gray-900 text-base font-bold text-white">
          {number}
        </span>
      </div>
      <h3 className="mt-5 text-xl font-bold text-gray-900">{title}</h3>
      <p className="mt-2 text-base text-gray-600">{children}</p>
    </div>
  );
};

export default function HowItWorks() {
  // Animation for fading in on scroll
  const fadeInOnScroll = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.7 },
  };

  return (
    <div className="w-full bg-white py-24 sm:py-32">
      {/* WRAPPED THE CONTENT IN THE MOTION.DIV */}
      <motion.div
        {...fadeInOnScroll}
        className="container mx-auto max-w-6xl px-4"
      >
        {/* Part 1: For Customers */}
        <div className="text-center">
          <span className="mb-2 inline-block rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">
            For Customers
          </span>
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Hire Your Next Pro in{' '}
            <span className="text-indigo-600">3 Simple Steps</span>
          </h2>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          <Step
            number="1"
            title="Find Local Talent"
            icon={<IconSearch />}
            color="indigo"
          >
            Search for any skill (e.g., 'Electrician in Mumbai') and
            instantly see a list of local professionals.
          </Step>
          <Step
            number="2"
            title="Review Their Profile"
            icon={<IconUserCheck />}
            color="purple"
          >
            See their photo portfolio, read customer reviews, check their
            Service Menu for prices, and see verification badges.
          </Step>
          <Step
            number="3"
            title="Hire with Confidence"
            icon={<IconBadgeCheck />}
            color="green"
          >
            Chat directly, get a quote, and hire the right person for the
            job, knowing they are verified.
          </Step>
        </div>

        {/* Part 2: For Workers & Freelancers */}
        {/* THIS IS THE FIX. No more dot after "className" */}
        <div className="mt-32 text-center">
          <span className="mb-2 inline-block rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700">
            For Workers & Freelancers
          </span>
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Build Your Business,{' '}
            <span className="text-purple-600">Get Paid For Your Skill</span>
          </h2>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          <Step
            number="1"
            title="Create Your Profile"
            icon={<IconCamera />}
            color="purple"
          >
            Use our simple 'Liveness & Ownership' video test to prove
            you're real and show off your tools or workshop.
          </Step>
          <Step
            number="2"
            title="List Your Services"
            icon={<IconList />}
            color="orange"
          >
            Post photos of your work and create a Service Catalog with your
            prices (e.g., 'Install Fan: $50').
          </Step>
          <Step
            number="3"
            title="Build Your Reputation"
            icon={<IconStar />}
            color="yellow"
          >
            Get customer ratings and earn 'Trusted Pro' badges. Connect
            with NGOs to add Micro-Credentials.
          </Step>
        </div>
      </motion.div>
    </div>
  );
}