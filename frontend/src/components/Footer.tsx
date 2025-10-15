import React from 'react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

function Footer() {
  return (
    // 1. Footer Background: Dark gray/black to match the screenshot
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Main Content: Organized into 5 columns matching the screenshot */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5 md:gap-4">
          
          {/* Column 1: x-share (Mission & Socials) */}
          <div>
            <span className="text-xl font-bold text-white mb-2 block">x-share</span>
            <p className="text-gray-400 text-sm mb-4">Interview experience sharing for real growth.</p>
            <div className="flex space-x-4">
              {/* Social Icons matching the screenshot (FB, IG, LI) */}
              <a href="#" className="text-gray-400 hover:text-[#4CAED8] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#4CAED8] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#4CAED8] transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Column 2: Product (Matching screenshot links) */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Product</h3>
            <ul className="space-y-2">
              <li><a href="/get-started" className="text-sm text-gray-400 hover:text-[#4CAED8] transition-colors">Get started</a></li>
              <li><a href="/rewards" className="text-sm text-gray-400 hover:text-[#4CAED8] transition-colors">Rewards</a></li>
            </ul>
          </div>

          {/* Column 3: Community (Matching screenshot links) */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Community</h3>
            <ul className="space-y-2">
              <li><a href="/users" className="text-sm text-gray-400 hover:text-[#4CAED8] transition-colors">Users</a></li>
              <li><a href="/guidelines" className="text-sm text-gray-400 hover:text-[#4CAED8] transition-colors">Guidelines</a></li>
              <li><a href="/leaderboard" className="text-sm text-gray-400 hover:text-[#4CAED8] transition-colors">Leaderboard</a></li>
            </ul>
          </div>

          {/* Column 4: Company (Matching screenshot links) */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Company</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-sm text-gray-400 hover:text-[#4CAED8] transition-colors">About us</a></li>
              <li><a href="/terms" className="text-sm text-gray-400 hover:text-[#4CAED8] transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>
          
          {/* Column 5: Contact (Matching screenshot info) */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Contact</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-400">hello@xshare.app</li>
              <li><a href="/support" className="text-sm text-gray-400 hover:text-[#4CAED8] transition-colors">Support</a></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Footer Bottom Strip: Copyright */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-xs text-gray-500">
            © 2025 x-share. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;