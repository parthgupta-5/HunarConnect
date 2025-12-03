// src/components/Footer.js
import Link from 'next/link';
import { motion } from 'framer-motion';

const Logo = () => (
  <div>
    <h1 className="text-2xl font-bold text-white">HunarConnect</h1>
    <p className="text-sm text-gray-300">
      Building trust, one profile at a time.
    </p>
  </div>
);

export default function Footer() {
  // Animation for fading in on scroll
  const fadeInOnScroll = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.7 },
  };

  return (
    <div className="w-full bg-gradient-to-b from-indigo-900 to-gray-900 text-gray-300">
      <motion.div
        {...fadeInOnScroll}
        className="container mx-auto max-w-6xl px-4 py-24"
      >
        {/* Top CTA section */}
        <div className="text-center">
          <span className="mb-2 inline-block rounded-full bg-orange-400 px-3 py-1 text-sm font-semibold text-orange-900">
            Join the Movement
          </span>
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
            Empowering the Next Million Entrepreneurs
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-indigo-100 mx-auto">
            Join the platform that's building a trusted, digital economy for
            everyone. Whether you're looking for skilled talent or ready to
            showcase yours, HunarConnect is your launchpad.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/signup"
              className="rounded-full bg-orange-500 px-8 py-3.5 text-base font-medium text-white shadow-lg hover:bg-orange-600"
            >
              Get Started Today
            </Link>
            <Link
              href="/signup"
              className="rounded-full border border-white px-8 py-3.5 text-base font-medium text-white shadow-sm hover:bg-white hover:text-gray-900"
            >
              Create Profile
            </Link>
          </div>
        </div>

        {/* Stats (from the video) */}
        <div className="mt-20 grid grid-cols-1 gap-8 border-t border-indigo-700 pt-16 md:grid-cols-3">
          <div className="text-center text-white">
            <span className="block text-4xl font-bold">10,000+</span>
            <span className="mt-1 block text-lg text-indigo-200">
              Verified Professionals
            </span>
          </div>
          <div className="text-center text-white">
            <span className="block text-4xl font-bold">50,000+</span>
            <span className="mt-1 block text-lg text-indigo-200">
              Jobs Completed
            </span>
          </div>
          <div className="text-center text-white">
            <span className="block text-4xl font-bold">4.9/5</span>
            <span className="mt-1 block text-lg text-indigo-200">
              Average Rating
            </span>
          </div>
        </div>
      </motion.div>

      {/* Bottom Bar - THIS IS THE FIX */}
      <div className="border-t border-indigo-700 py-8">
        <div className="container mx-auto flex max-w-6xl flex-col items-center justify-between px-4 md:flex-row">
          <Logo />
          {/* Copyright text */}
          <p className="mt-4 text-sm text-gray-400 md:mt-0">
            © 2025 HunarConnect. All rights reserved.
          </p>
          {/* Links */}
          <div className="mt-4 flex space-x-6 md:mt-0">
            <Link href="#" className="text-sm hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm hover:text-white">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm hover:text-white">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}