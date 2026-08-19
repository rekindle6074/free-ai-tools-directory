import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import AuthButton from './AuthButton';
import { auth } from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

const AnimatedNavLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => {
  const defaultTextColor = 'text-slate-600';
  const hoverTextColor = 'text-emerald-600';
  const textSizeClass = 'text-sm font-bold';

  return (
    <Link to={to} className={`group relative inline-block overflow-hidden h-6 flex items-center whitespace-nowrap ${textSizeClass}`}>
      <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] transform group-hover:-translate-y-1/2">
        <span className={`${defaultTextColor} flex items-center h-6`}>{children}</span>
        <span className={`${hoverTextColor} flex items-center h-6`}>{children}</span>
      </div>
    </Link>
  );
};

interface NavbarProps {
  openSubmitForm: () => void;
}

export function Navbar({ openSubmitForm }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [headerShapeClass, setHeaderShapeClass] = useState('rounded-full');
  const shapeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (shapeTimeoutRef.current) {
      clearTimeout(shapeTimeoutRef.current);
    }

    if (isOpen) {
      setHeaderShapeClass('rounded-xl');
    } else {
      shapeTimeoutRef.current = setTimeout(() => {
        setHeaderShapeClass('rounded-full');
      }, 300);
    }

    return () => {
      if (shapeTimeoutRef.current) {
        clearTimeout(shapeTimeoutRef.current);
      }
    };
  }, [isOpen]);

  const logoElement = (
    <Link to="/" className="flex items-center">
      <img src="/logo.svg" alt="FreeAI Tools Logo" className="h-7 w-auto object-contain hover:scale-105 transition-transform duration-200" />
    </Link>
  );

  const navLinksData = [
    { label: 'Browse Apps', href: '/browse' },
    { label: 'Categories', href: '/categories' },
    { label: 'Weekly Picks', href: '/weekly-picks' },
    ...(user ? [{ label: 'My Favorites', href: '/favorites' }] : []),
  ];

  const authButtonElement = (
    <div className="navbar-auth-wrapper">
       <AuthButton />
    </div>
  );

  return (
    <header className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-[100]
                       flex flex-col items-center
                       px-8 sm:px-10 py-3 backdrop-blur-xl
                       ${headerShapeClass}
                       border border-white/60 bg-white/40
                       w-[calc(100%-2rem)] sm:w-auto
                       transition-[border-radius] duration-300 ease-in-out
                       shadow-xl shadow-slate-200/50`}>

      <div className="flex items-center justify-between w-full gap-x-8 sm:gap-x-16">
        <div className="flex items-center">
           {logoElement}
        </div>

        <nav className="hidden sm:flex items-center space-x-6 lg:space-x-8 text-sm">
          {navLinksData.map((link) => (
            <AnimatedNavLink key={link.href} to={link.href}>
              {link.label}
            </AnimatedNavLink>
          ))}
        </nav>

        <div className="hidden sm:flex items-center gap-3 lg:gap-4">
          {authButtonElement}
        </div>

        <button className="sm:hidden flex items-center justify-center w-8 h-8 text-slate-600 focus:outline-none" onClick={toggleMenu} aria-label={isOpen ? 'Close Menu' : 'Open Menu'}>
          {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          )}
        </button>
      </div>

      <div className={`sm:hidden flex flex-col items-center w-full transition-all ease-in-out duration-300 overflow-hidden
                       ${isOpen ? 'max-h-[1000px] opacity-100 pt-6 pb-2' : 'max-h-0 opacity-0 pt-0 pointer-events-none'}`}>
        <nav className="flex flex-col items-center space-y-6 text-base w-full group">
          {navLinksData.map((link) => (
            <Link 
              key={link.href} 
              to={link.href} 
              onClick={() => setIsOpen(false)}
              className="text-slate-600 hover:text-emerald-600 transition-colors w-full text-center font-bold tracking-wide"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col items-center space-y-4 mt-8 w-full border-t border-slate-100 pt-6">
          {authButtonElement}
        </div>
      </div>
    </header>
  );
}
