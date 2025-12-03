// src/pages/profile/my-profile.js
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; 

// Import Firebase auth & db
import { auth, db } from '@/lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc } from 'firebase/firestore'; 

const Logo = () => <h1 className="text-xl font-bold text-indigo-600">HunarConnect</h1>;

// --- NEW HELPER FUNCTION ---
// Generates a unique, consistent image URL based on the name
const generateAvatar = (name) => {
    const seed = name ? name.toLowerCase().replace(/\s/g, '') : 'default';
    return `https://picsum.photos/seed/${seed}/300/300`;
};
// ---------------------------

export default function MyProfile() {
  const router = useRouter();
  const [user, loadingAuth] = useAuthState(auth); 
  const [profileData, setProfileData] = useState(null); 
  const [profileImage, setProfileImage] = useState(null); // Will hold uploaded OR generated image
  const [isLoading, setIsLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false); 

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          // 1. Fetch text data from Firestore
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            setProfileData(data);
            if (data.userType === 'worker') {
              setIsOwner(true);
            }

            // --- FIX: Check for uploaded image FIRST ---
            const savedImage = localStorage.getItem('hunar-image-preview');
            if (savedImage) {
                setProfileImage(savedImage); // Use uploaded image if it exists
            } else {
                // --- FIX: Fallback to generated avatar if no image was uploaded ---
                setProfileImage(generateAvatar(data.fullName || 'Worker')); 
            }

          } else {
            console.log("No profile data found in Firestore.");
          }

        } catch (error) {
          console.error("Error fetching profile data:", error);
        } finally {
          setIsLoading(false);
        }
      } else if (!loadingAuth) {
         router.push('/login');
      }
    };

    fetchData();
  }, [user, loadingAuth, router]); 


  if (isLoading || loadingAuth) {
    return <div>Loading profile...</div>;
  }

  if (!profileData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold">Could Not Load Profile</h2>
        <p className="text-lg text-gray-600">Please try logging in again or complete onboarding.</p>
        <Link href="/login" className="mt-4 rounded-full bg-indigo-600 px-6 py-2 text-white">Log In</Link>
      </div>
    );
  }

  // Render the profile with data
  return (
    <>
      <Head><title>My Profile - {profileData.fullName || 'HunarConnect'}</title></Head> 
      <div className="flex min-h-screen flex-col bg-gray-100">
        {/* Navbar */}
        <nav className="flex h-20 w-full items-center justify-between bg-white px-4 shadow-sm sm:px-6 lg:px-8">
          <Link href="/"><Logo /></Link>
          <div className="flex items-center space-x-4">
            <Link href="/jobs" className="text-sm font-medium text-gray-700 hover:text-indigo-600">Find Work</Link>
            {/* Profile Pic in Navbar */}
            <div className="h-10 w-10 rounded-full bg-gray-300 overflow-hidden">
               {/* Image source now checks both the uploaded preview AND the generated avatar */}
               {profileImage ? (
                   <img src={profileImage} alt="My Avatar" className="h-full w-full object-cover"/>
               ) : (
                   // Fallback for navbar if localStorage somehow cleared but user is logged in
                   <div className="h-full w-full bg-gray-300"></div> 
               )}
            </div>
            {/* Logout Button */}
            <button
                onClick={() => {
                    auth.signOut(); 
                    localStorage.removeItem('hunar-image-preview'); 
                    router.push('/login'); 
                }}
                className="text-sm font-medium text-gray-700 hover:text-indigo-600"
            >
                Log Out
            </button>
          </div>
        </nav>

        {/* Main Profile Content */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="container mx-auto max-w-6xl py-12 px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Left Column */}
            <div className="md:col-span-1">
              <div className="rounded-lg bg-white p-6 text-center shadow-lg">
                {/* Dynamic Profile Picture */}
                <div className="mx-auto h-32 w-32 rounded-full bg-gray-300 shadow-md overflow-hidden">
                   {/* Image source now checks both the uploaded preview AND the generated avatar */}
                   {profileImage ? (
                       <img src={profileImage} alt="Profile Picture" className="h-full w-full object-cover" crossOrigin="anonymous"/>
                   ) : (
                       <div className="h-full w-full bg-gray-300"></div>
                   )}
                </div>
                {/* Dynamic Name & Skill */}
                <h2 className="mt-4 text-3xl font-bold text-gray-900">{profileData.fullName || profileData.name || 'Worker Name'}</h2>
                <p className="text-lg font-medium text-indigo-600">{profileData.skill || 'Worker Skill'}</p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {profileData.isVerified && (<span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">✔ ID Verified</span>)}
                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">⭐ {profileData.rating || 'N/A'}</span>
                </div>

                {/* THE EDIT BUTTON */}
                {isOwner && ( 
                   <Link
                     href="/onboarding/step1"
                     className="mt-6 block w-full rounded-full bg-orange-600 py-3 text-base font-medium text-white shadow-lg hover:bg-orange-700"
                   >
                     Edit Your Profile
                   </Link>
                )}
              </div>
              {/* Digital Wallet */}
              <div className="mt-8 rounded-lg bg-white p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900">Digital Wallet</h3>
                <p className="mb-4 text-sm text-gray-500">Official Micro-Credentials</p>
                <div className="space-y-3">
                   {profileData.wallet && profileData.wallet.length > 0 ? (
                       profileData.wallet.map((badge, index) => (
                           <div key={index} className="flex items-center rounded-md border border-gray-200 p-3"><span className="mr-3 text-2xl">🎓</span><div><p className="font-semibold text-gray-800">{badge.name}</p><p className="text-sm text-gray-500">Issued by: {badge.issuer}</p></div></div>
                       ))
                   ) : <p className="text-sm text-gray-500">No credentials added yet.</p>}
                </div>
              </div>
            </div>
            {/* Right Column */}
            <div className="md:col-span-2">
              {/* Service Menu */}
              <div className="rounded-lg bg-white p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900">Service Menu</h3>
                <div className="mt-4 space-y-4">
                   {/* Dynamic Services List */}
                   {profileData.services && profileData.services.length > 0 ? (
                       profileData.services.map((service, index) => (
                           <div key={index} className="flex items-center justify-between rounded-md border border-gray-200 p-4"><div><h4 className="text-lg font-semibold text-gray-800">{service.name}</h4><p className="text-sm text-gray-500">{service.type} Price</p></div><span className="text-lg font-bold text-green-600">${service.price}</span></div>
                       ))
                   ) : <p className="text-sm text-gray-500">No services added yet.</p>}
                </div>
              </div>
              {/* Portfolio */}
              <div className="mt-8 rounded-lg bg-white p-6 shadow-lg">
                 <h3 className="text-2xl font-bold text-gray-900">My Work Portfolio</h3>
                 <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                   {/* Dynamic Portfolio Placeholders */}
                   {profileData.portfolioImages && profileData.portfolioImages.length > 0 ? (
                       profileData.portfolioImages.map((image, index) => {
                           const seed = `${profileData.skill}-${index}`;
                           const imageUrl = `https://picsum.photos/seed/${seed}/300/300`;
                           return (
                               <div key={index} className="h-40 w-full rounded-lg bg-gray-300 overflow-hidden">
                                   <img src={imageUrl} alt={`${profileData.skill} work ${index}`} className="h-full w-full object-cover"/>
                               </div>
                           )
                       })
                   ) : <p className="text-sm text-gray-500 col-span-full">Upload work samples during onboarding.</p>}
                 </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}