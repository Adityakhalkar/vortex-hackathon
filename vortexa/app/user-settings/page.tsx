"use client"

import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase'; // Ensure this path is correct for your Firebase setup
import { motion } from 'framer-motion';
import { signOut, updateProfile } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { getAuth, updateEmail } from 'firebase/auth';

export default function UserSettings() {
  const user = auth.currentUser;
  const [fullName, setFullName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/'); // Redirect to homepage after logout
    } catch (err) {
      console.error('Logout Error:', err);
      setError('Failed to log out. Please try again.');
    }
  };

  const handleUpdateDetails = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const auth = getAuth(); // Get the authentication instance
    const user = auth.currentUser;

    try {
      // Update user display name
      if (user) {
        if (user) {
          await updateProfile(user, { displayName: fullName });
        }
      }
      // Update user email if it has changed
      if (email !== user?.email) {
        if (user !== null) {
        await updateEmail(user, email);
        }
      }
      setSuccess('User details updated successfully!');
    } catch (err) {
      console.error('Update Error:', err);
      setError('Failed to update details. Please try again.');
    }
  };

  useEffect(() => {
    if (user) {
      setFullName(user.displayName || '');
      setEmail(user.email || '');
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">User Settings</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleUpdateDetails}>
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  className="appearance-none block w-full px-3 text-black py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="appearance-none block w-full text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-md bg-red-50 p-4"
              >
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Error</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{error}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-md bg-green-50 p-4"
              >
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">Success</h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>{success}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Update Details
              </motion.button>
            </div>

            <div>
              <motion.button
                onClick={handleLogout}
                type="button"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Logout
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
