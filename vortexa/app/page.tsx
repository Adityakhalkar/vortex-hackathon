'use client';

import Link from 'next/link'
import { SearchBar } from '../components/SearchBar'
import Dashboard from '../components/Dashboard'

function Header() {
  return (
    <header className="bg-black-800 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold mb-2">Project Name</div>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/" className="font mb-2 hover:text-gray-800">Home</Link></li>
            <li><Link href="/login" className="font mb-2 hover:text-gray-800">Login</Link></li>
          </ul>
        </nav>
      </div>
        <Dashboard />
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-black-800 text-white">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div>
          <h3 className="font-bold mb-2">Contact Us</h3>
          <p>info@projectname.com</p>
          <p>support@projectname.com</p>
        </div>
        <div>
          <h3 className="font-bold mb-2">In case of Emergency</h3>
          <ul>
            <li>Emergency: 911</li>
            <li>Helpline: 1-800-123-4567</li>
            <li>Customer Support: 1-888-987-6543</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-gray-100">
        <SearchBar />
      </main>
      <Footer />
    </div>
  )
}