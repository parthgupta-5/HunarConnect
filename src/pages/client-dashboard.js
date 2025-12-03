// src/pages/client-dashboard.js
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { auth } from '@/lib/firebase'; 
import { useRouter } from 'next/router'; 

const Logo = () => (
  <h1 className="text-xl font-bold text-indigo-600">HunarConnect</h1>
);

// A placeholder card for a worker - NOW USING LOREM IPSUM PLACEHOLDERS
const WorkerCard = ({ name, skill, rating }) => {
  // Use the name to generate a unique but consistent image from Picsum
  const imageSeed = name.toLowerCase().replace(/\s/g, '');
  const imageUrl = `https://picsum.photos/seed/${imageSeed}/300/200`; // Changed to picsum.photos

  return (
    <div className="rounded-lg bg-white shadow-lg overflow-hidden">
      <div className="h-40 w-full bg-gray-300">
         {/* Dynamic Image */}
         <img src={imageUrl} alt={`${name} profile`} className="h-full w-full object-cover" />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900">{name}</h3>
        <p className="text-base font-medium text-indigo-600">{skill}</p>
        <div className="mt-3 flex items-center">
          <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
            ⭐ {rating}
          </span>
          <span className="ml-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            ✔ Verified
          </span>
        </div>
        <Link
          href="/profile/my-profile" // For now, this can link to our demo profile
          className="mt-5 block w-full rounded-full bg-indigo-600 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-700"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default function ClientDashboard() {
  const router = useRouter();

  return (
    <>
      <Head><title>Dashboard - HunarConnect</title></Head>
      <div className="flex min-h-screen flex-col bg-gray-100">
        {/* Navbar */}
        <nav className="flex h-20 w-full items-center justify-between bg-white px-4 shadow-sm sm:px-6 lg:px-8">
          <Link href="/"><Logo /></Link>
          <div className="flex items-center space-x-4">
            <Link href="#" className="text-sm font-medium text-gray-700 hover:text-indigo-600">My Jobs</Link>
            <div className="h-10 w-10 rounded-full bg-gray-300"></div>
            <button
                onClick={() => {
                    auth.signOut(); 
                    router.push('/login');
                }}
                className="text-sm font-medium text-gray-700 hover:text-indigo-600"
            >
                Log Out
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto max-w-6xl py-12 px-4"
        >
          {/* Header and Search Bar */}
          <div className="rounded-lg bg-white p-8 shadow-md">
            <h1 className="text-3xl font-bold text-gray-900">Find the perfect pro for your job</h1>
            <p className="mt-2 text-lg text-gray-600">Search for painters, plumbers, electricians, and more.</p>
            <div className="mt-6 flex">
              <input
                type="text"
                placeholder="Search by skill (e.g., 'Painter')"
                className="w-full rounded-l-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500"
              />
              <button className="rounded-r-md border border-l-0 border-indigo-600 bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700">
                Search
              </button>
            </div>
          </div>

          {/* Featured Pros Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900">Featured Pros Near You</h2>
            <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <WorkerCard name="Rajesh Kumar" skill="Master Painter" rating="4.9" />
              <WorkerCard name="Priya Singh" skill="Electrician" rating="4.8" />
              <WorkerCard name="Amit Sharma" skill="Plumber & Carpenter" rating="4.9" />
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}