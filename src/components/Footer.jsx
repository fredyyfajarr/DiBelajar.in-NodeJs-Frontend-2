// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-border mt-auto">
      <div className="container mx-auto px-4 sm:px-6 py-6 text-center text-text-muted">
        <p>&copy; {new Date().getFullYear()} Frevan. All Rights Reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="hover:text-primary">
            Facebook
          </a>
          <a href="#" className="hover:text-primary">
            Twitter
          </a>
          <a href="#" className="hover:text-primary">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
