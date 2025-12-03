// src/pages/onboarding/step2.js
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/router';

// A simple logo component
const Logo = () => (
  <h1 className="text-xl font-bold text-indigo-600">HunarConnect</h1>
);

// A simple step tracker - NOTE THE CHANGE: Step 2 is active
const StepTracker = () => (
  <ol className="flex items-center space-x-2">
    <li>
      <div className="flex items-center">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-200 text-sm font-bold text-indigo-600">
          1
        </span>
        <span className="ml-2 text-sm font-medium text-gray-500">
          Your Profile
        </span>
      </div>
    </li>
    <li>
      <div className="flex items-center">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
          2
        </span>
        <span className="ml-2 text-sm font-medium text-indigo-600">
          Your Work
        </span>
      </div>
    </li>
    <li>
      <div className="flex items-center">
        <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white text-sm font-bold text-gray-500">
          3
        </span>
        <span className="ml-2 text-sm font-medium text-gray-500">
          Your Services
        </span>
      </div>
    </li>
  </ol>
);

export default function OnboardingStep2() {
    const router = useRouter(); // This will let us change pages
  // We'll use this to track our fake file uploads.
  const [fileCount, setFileCount] = useState(0);
  // ADD THE NEW FUNCTION HERE
  const handleNext = () => {
    if (fileCount === 0) {
      alert('Please upload at least one photo of your work.');
    } else {
      router.push(`/onboarding/step3${window.location.search}`);
    }
  };
  return (
    <>
      <Head>
        <title>Onboarding Step 2 - HunarConnect</title>
      </Head>
      <div className="flex min-h-screen flex-col bg-gray-50">
        {/* Navbar */}
        <nav className="flex h-20 w-full items-center justify-between bg-white px-4 shadow-sm sm:px-6 lg:px-8">
          <Logo />
          <StepTracker />
          <div className="w-24"></div> {/* Placeholder for balance */}
        </nav>

        {/* Main Content */}
        <div className="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-lg space-y-8"
          >
            <div>
              <h2 className="text-center text-3xl font-extrabold text-gray-900">
                Show off your best work
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                A picture is worth a thousand words. Upload photos or videos.
              </p>
            </div>

            <form className="mt-8 space-y-6 rounded-lg bg-white p-8 shadow-md">
              {/* This is the drag-and-drop upload box */}
              <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload files</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        multiple
                        onChange={() => setFileCount(fileCount + 1)}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>

              {/* Simple gallery placeholder */}
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700">
                  Uploaded files (demo):
                </p>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  <div className="h-24 rounded-md bg-gray-200"></div>
                  <div className="h-24 rounded-md bg-gray-200"></div>
                  <div className="h-24 rounded-md bg-gray-200"></div>
                </div>
              </div>

              {/* Next Button */}
              <div className="flex pt-4">
                <button
  type="button" // Important: "button", not "submit"
  onClick={handleNext} // <-- Calls our new logic
  className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-lg hover:bg-indigo-700"
>
  Next: List Your Services
</button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
}