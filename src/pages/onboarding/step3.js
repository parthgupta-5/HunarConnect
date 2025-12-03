// src/pages/onboarding/step3.js
import Head from 'next/head';
import { useState, useEffect } from 'react'; // Added useEffect
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Link from 'next/link'; // Keep Link for Navbar Logo

// Import Firebase auth & db
import { auth, db } from '@/lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, updateDoc, setDoc, getDoc } from 'firebase/firestore'; // Import Firestore functions

const Logo = () => <h1 className="text-xl font-bold text-indigo-600">HunarConnect</h1>;

const StepTracker = () => ( /* ... Step Tracker code remains the same ... */
  <ol className="flex items-center space-x-2">
    <li><div className="flex items-center"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-200 text-sm font-bold text-indigo-600">1</span><span className="ml-2 text-sm font-medium text-gray-500">Your Profile</span></div></li>
    <li><div className="flex items-center"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-200 text-sm font-bold text-indigo-600">2</span><span className="ml-2 text-sm font-medium text-gray-500">Your Work</span></div></li>
    <li><div className="flex items-center"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">3</span><span className="ml-2 text-sm font-medium text-indigo-600">Your Services</span></div></li>
  </ol>
);


export default function OnboardingStep3() {
  const router = useRouter();
  const [user, loadingAuth] = useAuthState(auth);
  const [servicesList, setServicesList] = useState([]);
  const [serviceName, setServiceName] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [priceType, setPriceType] = useState('Fixed');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddService = () => { /* ... handleAddService remains the same ... */
    if (serviceName.trim() === '' || servicePrice.trim() === '') {
      alert('Please enter a service name and a price.'); return;
    }
    setServicesList([...servicesList, { name: serviceName, price: servicePrice, type: priceType },]);
    setServiceName(''); setServicePrice('');
  };

  // --- NEW: Save data to Firestore ---
  const handleFinish = async () => {
    setIsLoading(true);
    setError(null);
    if (!user) {
      setError('You must be logged in.'); setIsLoading(false); return;
    }
    if (servicesList.length === 0) {
      setError('Please add at least one service to your menu.'); setIsLoading(false); return;
    }

    // Get the skill saved temporarily in step 1
    const skill = localStorage.getItem('hunar-temp-skill') || 'Pro Worker';

    try {
      // Get reference to the user's document in Firestore
      const userDocRef = doc(db, 'users', user.uid);

      // Update the document with skill and services
      // Using setDoc with merge: true handles both creation and update
       await setDoc(userDocRef, {
         skill: skill,
         services: servicesList,
         // Add placeholder data needed for profile page
         rating: 4.9,
         isVerified: true, // Assuming verification happens elsewhere
         wallet: [{ name: 'Certified Pro - Level 1', issuer: 'HunarConnect Institute' }],
         portfolioImages: ['placeholder1.jpg', 'placeholder2.jpg', 'placeholder3.jpg'],
       }, { merge: true }); // merge:true prevents overwriting existing fields like name/email

      // Remove temporary skill from local storage
      localStorage.removeItem('hunar-temp-skill');

      setIsLoading(false);
      router.push('/profile/my-profile'); // Go to the profile page

    } catch (err) {
      setIsLoading(false);
      setError('Failed to save profile data. Please try again.');
      console.error(err);
    }
  };

  if (loadingAuth) return <div>Loading...</div>;
  if (!user && !loadingAuth) { router.push('/login'); return <div>Redirecting...</div>;}

  return (
    <>
      <Head><title>Onboarding Step 3 - HunarConnect</title></Head>
      <div className="flex min-h-screen flex-col bg-gray-50">
        <nav className="flex h-20 w-full items-center justify-between bg-white px-4 shadow-sm sm:px-6 lg:px-8"><Logo /><StepTracker /><div className="w-24"></div></nav>
        <div className="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-lg space-y-8">
            <div><h2 className="text-center text-3xl font-extrabold text-gray-900">Create your 'Service Menu'</h2><p className="mt-2 text-center text-sm text-gray-600">List your services with clear, upfront pricing.</p></div>
            <div className="mt-8 space-y-6 rounded-lg bg-white p-8 shadow-md">
               {/* Form to add a service */}
               <div className="space-y-4 rounded-md border border-gray-200 p-4">
                 <h3 className="text-lg font-medium text-gray-900">Add a New Service</h3>
                 <div>
                   <label htmlFor="service-name" className="text-sm font-medium text-gray-700">Service Name</label>
                   <input type="text" id="service-name" value={serviceName} onChange={(e) => setServiceName(e.target.value)} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="e.g., Install Ceiling Fan" disabled={isLoading}/>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label htmlFor="price-type" className="text-sm font-medium text-gray-700">Price Type</label>
                     <select id="price-type" value={priceType} onChange={(e) => setPriceType(e.target.value)} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" disabled={isLoading}><option>Fixed</option><option>Per Hour</option><option>Starting From</option></select>
                   </div>
                   <div>
                     <label htmlFor="service-price" className="text-sm font-medium text-gray-700">Price ($)</label>
                     <input type="text" id="service-price" value={servicePrice} onChange={(e) => setServicePrice(e.target.value)} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="e.g., 50" disabled={isLoading}/>
                   </div>
                 </div>
                 <button type="button" onClick={handleAddService} disabled={isLoading} className="w-full rounded-md border-2 border-dashed border-indigo-500 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 disabled:opacity-50">+ Add This Service</button>
               </div>
               {/* Display added services */}
               <div className="space-y-3">
                 <h3 className="text-lg font-medium text-gray-900">Your Current Menu</h3>
                 {servicesList.length === 0 ? (<p className="text-sm text-gray-500">Your added services will appear here.</p>) : (servicesList.map((service, index) => (<div key={index} className="flex items-center justify-between rounded-md border border-gray-200 p-4"><div><h4 className="font-medium text-gray-900">{service.name}</h4><p className="text-sm text-gray-500">{service.type} Price</p></div><span className="text-base font-bold text-green-600">${service.price}</span></div>)))}
               </div>
               {/* Error Message */}
              {error && (<div className="rounded-md bg-red-50 p-4"><p className="text-sm font-medium text-red-700">{error}</p></div>)}
              {/* Finish Button */}
              <div className="flex pt-4"><button type="button" onClick={handleFinish} disabled={isLoading} className="group relative flex w-full justify-center rounded-md border border-transparent bg-green-600 py-3 px-4 text-base font-medium text-white shadow-lg hover:bg-green-700 disabled:opacity-50">{isLoading ? 'Saving...' : 'Finish & Go to My Profile'}</button></div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}