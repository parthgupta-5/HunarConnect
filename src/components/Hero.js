// src/components/Hero.js
import Link from 'next/link';
import { motion } from 'framer-motion';

// Logo (matches video)
const Logo = () => (
  <h1 className="text-xl font-bold text-indigo-600">HunarConnect</h1>
);

export default function Hero() {
  return (
    <div className="w-full bg-white">
      {/* Navbar */}
      <nav className="container mx-auto flex h-20 max-w-6xl items-center justify-between px-4">
        <Logo />
        <div className="flex items-center space-x-2">
          <Link
            href="/login"
            className="rounded-full px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="container mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 py-24 md:grid-cols-2 md:py-32">
        {/* Left Side: Text & CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center"
        >
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 md:text-6xl">
            The Digital Identity
            <br />
            {/* THIS IS THE "SEXY" GRADIENT TEXT */}
            <span className="bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
              for India's Skilled
            </span>
            <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
              {' '}
              Workforce
            </span>
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Find verified painters, carpenters, and local pros. See their work,
            check their credentials, and hire with confidence.
          </p>
          <div className="mt-10 flex items-center gap-4">
            <Link
              href="/signup"
              className="rounded-full bg-indigo-600 px-8 py-3.5 text-base font-medium text-white shadow-lg hover:bg-indigo-700"
            >
              Get Started Today
            </Link>
            <Link
              href="/signup"
              className="rounded-full border border-gray-900 px-8 py-3.5 text-base font-medium text-gray-900 shadow-sm hover:bg-gray-50"
            >
              Create Profile
            </Link>
          </div>
          <div className="mt-8 flex items-center space-x-6">
            <div className="flex items-center">
              <span className="mr-2 text-green-500">✔</span>
              <span className="text-sm text-gray-600">100% Verified Workers</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2 text-green-500">✔</span>
              <span className="text-sm text-gray-600">Trusted by Thousands</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: NEW Phone Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center"
        >
          {/* This is the new, cleaner phone mockup from the video */}
          <div className="relative w-full max-w-sm">
            {/* Active Now Tag */}
            <div className="absolute -top-4 right-4 z-10 flex items-center space-x-2 rounded-lg bg-white p-3 shadow-lg">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm font-semibold text-gray-900">
                Active Now
              </span>
              <span className="text-sm font-bold text-gray-900">
                2,500+
              </span>
            </div>

            {/* Phone Body */}
            <div className="relative h-[600px] w-full rounded-[40px] border-[8px] border-gray-200 bg-gray-100 shadow-2xl">
              <div className="absolute left-1/2 top-3 h-2 w-20 -translate-x-1/2 rounded-full bg-gray-300"></div>
              <div className="w-full p-4 pt-10">
                <div className="mt-4 rounded-lg bg-white p-4 shadow-sm">
                  <span className="text-xs font-bold uppercase text-indigo-500">
                    Featured Pro
                  </span>
                  <div className="mt-4 flex items-center space-x-3">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400"></div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Parth Gupta
                      </h3>
                      <p className="text-sm text-gray-500">Guitarist</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center space-x-2">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                      ✔ Verified
                    </span>
                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                      ⭐ 4.9
                    </span>
                  </div>

                  {/* Fake portfolio images */}
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <div className="h-16 rounded-md bg-blue-200"></div>
                    <div className="h-16 rounded-md bg-yellow-200"></div>
                    <div className="h-16 rounded-md bg-purple-200"></div>
                  </div>

                  <button className="mt-5 w-full rounded-full bg-indigo-600 py-2.5 text-sm font-medium text-white hover:bg-indigo-700">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}