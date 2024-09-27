import React from 'react';
import LandingPage from '@/components/landingpage';
import AboutUs from '@/components/aboutUs';

function Footer() {
  return (
    <footer className="bg-black-800 text-white">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div>
          <h3 className="font-bold mb-2">Contact Us</h3>
          <p>info@crisisconnect.com</p>
          <p>support@crisisconnect.com</p>
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

const Page: React.FC = () => {
  return (
    <div>
      <LandingPage />
      <AboutUs />
      <Footer />
    </div>
  );
};

export default Page;