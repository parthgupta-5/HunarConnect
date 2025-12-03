// src/pages/login.js
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

// --- FIREBASE IMPORTS ---
import { auth, db } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore'; 

const Logo = () => (
  <h1 className="text-xl font-bold text-indigo-600">HunarConnect</h1>
);

export default function LogIn() {
  const router = useRouter();

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Loading and error state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);

    if (email.trim() === '' || password.trim() === '') {
      setError('Please enter your email and password.');
      setIsLoading(false);
      return;
    }

    try {
      // 1. Sign in the user with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Get the user's profile from Firestore to check their type
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        // 3. Redirect based on userType saved during sign-up
        setIsLoading(false);
        if (userData.userType === 'worker') {
          router.push('/profile/my-profile'); // Go to worker profile
        } else {
          router.push('/client-dashboard'); // Go to client dashboard
        }
      } else {
        setError('User profile not found.');
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Invalid email or password.');
      } else {
        setError('Failed to log in. Please try again.');
        console.error(err);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Log In - HunarConnect</title>
      </Head>
      <div className="flex min-h-screen flex-col bg-gray-50">
        {/* Simple Navbar (Text color fixed here) */}
        <nav className="flex h-20 w-full items-center justify-between bg-white px-4 shadow-sm sm:px-6 lg:px-8">
          <Link href="/">
            <Logo />
          </Link>
          <div className="text-sm text-gray-700"> {/* FIX: text-gray-700 added */}
            Don't have an account?{' '}
            <Link
              href="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign Up
            </Link>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md space-y-8"
          >
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Log in to your account
              </h2>
            </div>

            {/* Login Form (Wrapper fixed to run logic on submit) */}
            <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    disabled={isLoading}
                    className="relative block w-full appearance-none rounded-t-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    disabled={isLoading}
                    className="relative block w-full appearance-none rounded-b-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* Error Message Display */}
              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <p className="text-sm font-medium text-red-700">{error}</p>
                </div>
              )}

              <div>
                <button
                  type="submit" // FIX: Changed to "submit"
                  disabled={isLoading}
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  {isLoading ? 'Logging in...' : 'Log In'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
}