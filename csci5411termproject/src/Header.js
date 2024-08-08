import React from 'react';
import { Link } from 'react-router-dom';
import appLogo from './appLogo.png';

function Header() {
  return (
    <header className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl flex items-center">
          <img src={appLogo} alt="Purrfect Health Logo" className="w-24 h-24 mr-4" />
          <span className="text-3xl font-bold">Purrfect Health</span>
        </Link>
      </div>
      <div className="flex-none">
        <Link to="/about" className="btn btn-primary mx-4 my-2">
          About
        </Link>
      </div>
    </header>
  );
}

export default Header;