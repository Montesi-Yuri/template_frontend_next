// Header.jsx
import React from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';

const Header = () => {
  return (
    <header className="fixed w-full backdrop-blur-sm bg-ivory/75 dark:bg-prussian-darker/75 border-b border-ash/20 dark:border-prussian-light z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <img src="/logo.png" alt="Logo" className="h-4" />
            </Link>
          </div>

          <nav className="flex items-center space-x-4">
            <ul className="flex space-x-8">
              <li>
                <Link 
                  href="/auth/login" 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-prussian dark:text-ivory hover:text-indigo dark:hover:text-ash transition-all duration-200"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link 
                  href="/auth/register" 
                  className="btn-primary"
                >
                  Register
                </Link>
              </li>
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;