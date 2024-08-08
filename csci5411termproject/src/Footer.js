import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer footer-center p-4 bg-base-300 text-base-content mt-8">
      <div>
        <p>Copyright © {currentYear} - All rights reserved by Suyash Jhawer</p>
      </div>
    </footer>
  );
}

export default Footer;