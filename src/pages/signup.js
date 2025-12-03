// src/pages/signup.js
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

// --- FIREBASE IMPORTS ---
import { auth, db } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

// Our logo component from the Hero
const Logo = () => (
  <h1 className="text-xl font-bold text-indigo-600">HunarConnect</h1>
);

export default function SignUp() {
  const router = useRouter();
  const [userType, setUserType] = useState('worker');

  // Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Loading and error state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignUp = async () => {
    setIsLoading(true);
    setError(null);

    if (fullName.trim() === '' || email.trim() === '' || password.trim() === '') {
      setError('Please fill out all fields.');
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        fullName: fullName,
        email: email,
        userType: userType,
      });

      setIsLoading(false);
      if (userType === 'worker') {
        router.push('/onboarding/step1');
      } else {
        router.push('/client-dashboard');
      }
    } catch (err) {
      setIsLoading(false);
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already in use.');
      } else {
        setError('Failed to create account. Please try again.');
        console.error(err);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Sign Up - HunarConnect</title>
      </Head>
      <div className="flex min-h-screen flex-col bg-gray-50">
        {/* Simple Navbar (Text color fixed here) */}
        <nav className="flex h-20 w-full items-center justify-between bg-white px-4 shadow-sm sm:px-6 lg:px-8">
          <Link href="/">
            <Logo />
          </Link>
          <div className="text-sm text-gray-700"> {/* FIX: text-gray-700 added */}
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Log In
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
                Join as a Worker or a Client
              </h2>
            </div>

            {/* Client/Worker Toggle */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setUserType('worker')}
                disabled={isLoading}
                className={`rounded-lg border-2 py-6 px-4 text-center text-lg font-semibold shadow-sm transition-all
                  ${
                    userType === 'worker'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                I'm a Worker
                <span className="mt-1 block text-sm font-normal">
                  I want to offer my services
                </span>
              </button>
              <button
                onClick={() => setUserType('client')}
                disabled={isLoading}
                className={`rounded-lg border-2 py-6 px-4 text-center text-lg font-semibold shadow-sm transition-all
                  ${
                    userType === 'client'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                I'm a Client
                <span className="mt-1 block text-sm font-normal">
                  I want to hire a pro
                </span>
              </button>
            </div>

            {/* The Sign-up Form (Wrapper fixed to run logic on submit) */}
            <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault(); handleSignUp(); }}>
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <input
                    id="full-name"
                    name="name"
                    type="text"
                    required
                    disabled={isLoading}
                    className="relative block w-full appearance-none rounded-t-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    disabled={isLoading}
                    className="relative block w-full appearance-none border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
                    placeholder="Password (min. 6 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* --- Error Message Display --- */}
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
                  {isLoading ? 'Creating account...' : 'Create Account'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
}