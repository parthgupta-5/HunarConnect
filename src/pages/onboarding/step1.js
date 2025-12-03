// src/pages/onboarding/step1.js
import Head from 'next/head';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Link from 'next/link'; // Keep Link for Navbar Logo

// Import Firebase auth to get the current user
import { auth } from '@/lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Logo = () => <h1 className="text-xl font-bold text-indigo-600">HunarConnect</h1>;

const StepTracker = () => (
  <ol className="flex items-center space-x-2">
    <li>
      <div className="flex items-center"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">1</span><span className="ml-2 text-sm font-medium text-indigo-600">Your Profile</span></div></li>
    <li>
      <div className="flex items-center"><span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white text-sm font-bold text-gray-500">2</span><span className="ml-2 text-sm font-medium text-gray-500">Your Work</span></div></li>
    <li>
      <div className="flex items-center"><span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white text-sm font-bold text-gray-500">3</span><span className="ml-2 text-sm font-medium text-gray-500">Your Services</span></div></li>
  </ol>
);

export default function OnboardingStep1() {
  const router = useRouter();
  const [user, loadingAuth] = useAuthState(auth); // Get current logged-in user
  const [skill, setSkill] = useState('');
  const [fileName, setFileName] = useState('No file selected.');
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  const handleNext = () => {
    setIsLoading(true); // Start loading
    if (!user) {
      alert('You must be logged in.');
      setIsLoading(false);
      return;
    }
    if (skill.trim() === '') {
      alert('Please enter your primary skill.');
      setIsLoading(false);
      return;
    }
    // Save skill to local storage temporarily (will be saved properly in step 3)
    localStorage.setItem('hunar-temp-skill', skill);
    setIsLoading(false); // Stop loading
    router.push(`/onboarding/step2`); // Go to step 2 (no need to pass skill in URL now)
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result;
        setImagePreview(imageDataUrl);
        // Save image data URL to local storage
        localStorage.setItem('hunar-image-preview', imageDataUrl);
      };
      reader.readAsDataURL(file);
    } else {
      setFileName('No file selected.');
      setImagePreview(null);
      localStorage.removeItem('hunar-image-preview');
    }
  };

  // Handle loading state from Firebase Auth
  if (loadingAuth) {
    return <div>Loading...</div>;
  }
  // Redirect if not logged in
  if (!user && !loadingAuth) {
    router.push('/login');
    return <div>Redirecting...</div>;
  }

  return (
    <>
      <Head><title>Onboarding Step 1 - HunarConnect</title></Head>
      <div className="flex min-h-screen flex-col bg-gray-50">
        <nav className="flex h-20 w-full items-center justify-between bg-white px-4 shadow-sm sm:px-6 lg:px-8"><Logo /><StepTracker /><div className="w-24"></div></nav>
        <div className="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-lg space-y-8">
            <div><h2 className="text-center text-3xl font-extrabold text-gray-900">Welcome! Let's build your profile.</h2><p className="mt-2 text-center text-sm text-gray-600">This is your digital storefront. Make it count.</p></div>
            <div className="mt-8 space-y-6 rounded-lg bg-white p-8 shadow-md">
              <div className="flex items-center space-x-4">
                <div className="h-20 w-20 flex-shrink-0 rounded-full bg-gray-200 overflow-hidden">{imagePreview && (<img src={imagePreview} alt="Profile Preview" className="h-full w-full object-cover"/>)}</div>
                <div>
                  <label htmlFor="profile-pic" className="cursor-pointer rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50">Upload a profile picture</label>
                  <input id="profile-pic" name="profile-pic" type="file" accept="image/*" className="sr-only" onChange={handleFileChange} disabled={isLoading}/>
                  <p className="mt-2 text-sm text-gray-500">{fileName}</p>
                </div>
              </div>
              <div>
                <label htmlFor="skill" className="block text-sm font-medium text-gray-700">What is your primary skill?</label>
                <input id="skill" name="skill" type="text" required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="e.g., Painter, Carpenter" value={skill} onChange={(e) => setSkill(e.target.value)} disabled={isLoading}/>
              </div>
              <div className="rounded-md bg-indigo-50 p-4"><h4 className="text-sm font-bold text-indigo-700">Liveness & Ownership Test</h4><p className="mt-1 text-sm text-indigo-600">This is our #1 trust feature. Prove you're a real person.</p><button type="button" className="mt-3 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700" disabled={isLoading}>Start 5-Second Verification</button><p className="mt-2 text-xs text-indigo-500">(Demo)</p></div>
              <div><button type="button" onClick={handleNext} disabled={isLoading} className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-lg hover:bg-indigo-700 disabled:opacity-50">{isLoading ? 'Saving...' : 'Next: Showcase Your Work'}</button></div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}