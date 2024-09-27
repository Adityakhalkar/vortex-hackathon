"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AlertCircle, LayoutDashboard, Info, LogIn, Menu, X, Settings } from 'lucide-react'; // Import icons
import { auth } from '@/lib/firebase'; // Ensure this path is correct for your Firebase setup

interface NavItemProps {
  name: string;
  href: string;
  icon: React.ElementType; // Use React.ElementType for icon
}
const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Alerts', href: '/alerts', icon: AlertCircle },
  { name: 'About', href: '/about', icon: Info },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const user = auth.currentUser; // Get the current user

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition-colors duration-300">
              Crisis Connect
            </Link>
          </div>
          <div className="hidden md:flex items-center">
            {navItems.map((item) => (
              <NavItem key={item.name} {...item} />
            ))}
            {user ? (
              <Link href="/user-settings">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="ml-8 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
                >
                  <Settings className="h-5 w-5 mr-2" />
                  User Settings
                </motion.button>
              </Link>
            ) : (
              <Link href="/sign-in">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="ml-8 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300"
                >
                  <LogIn className="h-5 w-5 mr-2" />
                  Sign In
                </motion.button>
              </Link>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-600 hover:text-blue-800 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <motion.div 
        className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, height: "auto" },
          closed: { opacity: 0, height: 0 }
        }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <MobileNavItem key={item.name} {...item} />
          ))}
          {user ? (
            <Link href="/user-settings" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300">
              User Settings
            </Link>
          ) : (
            <Link href="/sign-in" className="block px-3 py-2 rounded-md text-base font-medium text-green-600 hover:text-green-700 transition-colors duration-300">
              Sign In
            </Link>
          )}
        </div>
      </motion.div>
    </nav>
  );
}

function NavItem({ name, href, icon: Icon }: NavItemProps) {
  return (
    <Link href={href} className="ml-8 inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors duration-300">
      <motion.div
        className="relative"
        whileHover={{ y: -2 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <Icon className="h-5 w-5 mr-1" />
        {name}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        />
      </motion.div>
    </Link>
  );
}

function MobileNavItem({ name, href, icon: Icon }: NavItemProps) {
  return (
    <Link href={href} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-300">
      <div className="flex items-center">
        <Icon className="h-5 w-5 mr-2" />
        {name}
      </div>
    </Link>
  );
}
