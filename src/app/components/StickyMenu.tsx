'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const menuItems = [
  { id: 'cocktails', label: 'Cocktails & Soft', link: '/menu/cocktails' },
  { id: 'champagne', label: 'Champagne et Vins', link: '/menu/champagne' },
  { id: 'bieres', label: 'Bières & Spiritueux', link: '/menu/bieres' },
  { id: 'huitres', label: 'Huîtres & Fruits de mer', link: '/menu/seafood' },
  { id: 'tapas', label: 'Tapas & Entrées', link: '/menu/tapas' },
  { id: 'tortillas', label: 'Tortillas et Fritures', link: '/menu/tortillas' },
  { id: 'cassolettes', label: 'Cassolettes', link: '/menu/cassolettes' },
  { id: 'paellas', label: 'Paellas, Riz et Pates', link: '/menu/paellas' },
  { id: 'poissons', label: 'Poissons & Viandes', link: '/menu/poissons' },
  { id: 'desserts', label: 'Desserts', link: '/menu/desserts' }
];

export default function StickyNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        type: 'tween',
        duration: 0.5,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'tween',
        duration: 0.4,
        staggerChildren: 0.07,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: { x: 20, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  return (
    <>
      {/* Sticky Navbar */}
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#2a363c]/95 shadow-lg backdrop-blur-sm' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="relative h-19 w-27 md:h-16 md:w-16">
                <Image 
                  src="/logo.png" 
                  alt="Restaurant Logo" 
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
            </Link>

            {/* Burger Menu Button */}
            <button 
              className="relative z-50 block text-amber-100 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="flex items-center justify-center h-10 w-10 relative">
                <span
                  className={`block absolute h-0.5 w-6 bg-amber-200 transform transition duration-300 ease-in-out ${
                    isMenuOpen ? 'rotate-45' : '-translate-y-1.5'
                  }`}
                ></span>
                <span
                  className={`block absolute h-0.5 bg-amber-200 transform transition duration-300 ease-in-out ${
                    isMenuOpen ? 'w-0 opacity-0' : 'w-6 opacity-100'
                  }`}
                ></span>
                <span
                  className={`block absolute h-0.5 w-6 bg-amber-200 transform transition duration-300 ease-in-out ${
                    isMenuOpen ? '-rotate-45' : 'translate-y-1.5'
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-[#1f2a30]/98 backdrop-blur-md z-40 overflow-y-auto pt-20"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="container mx-auto px-4 py-8">
              <div className="max-w-md mx-auto">
                <nav className="flex flex-col space-y-1 items-center">
                  {menuItems.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      whileHover={{ x: 5 }}
                      className="w-full"
                    >
                      <Link 
                        href={item.link}
                        className="block py-3 px-3 text-amber-100 hover:bg-amber-200/10 rounded-md font-light text-center transition-all duration-200 group flex items-center justify-center"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="text-amber-300/70 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          ›
                        </span>
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}