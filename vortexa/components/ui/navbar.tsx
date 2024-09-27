"use client";
import Link from 'next/link'
import { AlertCircle, LifeBuoy, Info, Settings } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="bg-blue-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Crisis Connect
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/alerts" className="flex items-center hover:text-blue-300 transition-colors">
              <AlertCircle className="w-5 h-5 mr-1" />
              Alerts
            </Link>
          </li>
          <li>
            <Link href="/resources" className="flex items-center hover:text-blue-300 transition-colors">
              <LifeBuoy className="w-5 h-5 mr-1" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/about" className="flex items-center hover:text-blue-300 transition-colors">
              <Info className="w-5 h-5 mr-1" />
              About
            </Link>
          </li>
          <li>
            <Link href="/settings" className="flex items-center hover:text-blue-300 transition-colors">
            <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
            Sign Up
            </button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}