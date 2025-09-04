import React from 'react';

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-50 via-orange-50 to-green-50 text-gray-700 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">X</span>
              </div>
              <span className="text-2xl font-bold">XShare</span>
            </div>
            <p className="text-gray-500 mb-4">Connecting students through authentic career experiences</p>
            <p className="text-gray-500">Building the future of peer-to-peer learning</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">About</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-500 hover:text-orange-500 transition-colors">About</a></li>
              <li><a href="/faq" className="text-gray-500 hover:text-orange-500 transition-colors">FAQ</a></li>
              <li><a href="/resources" className="text-gray-500 hover:text-orange-500 transition-colors">Resources</a></li>
              <li><a href="/privacy" className="text-gray-500 hover:text-orange-500 transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="text-gray-500 hover:text-orange-500 transition-colors">Terms</a></li>
              </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <div className="space-y-2 text-gray-500">
              <p>📧 hello@xshare.com</p>
              <p>📞 +91 98765 43210</p>
              <p>📍 Bangalore, India</p>
            </div>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors">LinkedIn</a>
              <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors">Twitter</a>
              <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;