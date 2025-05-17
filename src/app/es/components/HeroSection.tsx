'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

export default function HeroSection() {
  useEffect(() => {
    // Smooth scroll function with proper type for target parameter
    const smoothScroll = (target: string) => {
      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    };

    // Add click event listener to the link
    const menuLinks = document.querySelectorAll('a[href="#menu"]');
    menuLinks.forEach(link => {
      link.addEventListener('click', (e: Event) => {
        e.preventDefault();
        smoothScroll('#menu');
      });
    });

    // Cleanup event listeners
    return () => {
      menuLinks.forEach(link => {
        link.removeEventListener('click', (e: Event) => {
          e.preventDefault();
          smoothScroll('#menu');
        });
      });
    };
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Language Selector Buttons - New addition */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-8 right-8 z-20 flex space-x-2"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group"
        >
          <Link href="/">
            <div className="bg-black/20 backdrop-blur-md border border-amber-100/40 text-amber-50 py-2 px-4 font-medium tracking-wider cursor-pointer transition-all duration-300">
              <span className="relative z-10">FR</span>
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-0 bg-amber-400/30 group-hover:h-full transition-all duration-300 ease-in-out"
                style={{ zIndex: 0 }}
              />
            </div>
          </Link>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group"
        >
          <Link href="/eng">
            <div className="bg-black/20 backdrop-blur-md border border-amber-100/40 text-amber-50 py-2 px-4 font-medium tracking-wider cursor-pointer transition-all duration-300">
              <span className="relative z-10">ENG</span>
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-0 bg-amber-400/30 group-hover:h-full transition-all duration-300 ease-in-out"
                style={{ zIndex: 0 }}
              />
            </div>
          </Link>
        </motion.div>
      </motion.div>

      {/* Background Image with parallax effect */}
      <motion.div 
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0"
      >
        <Image 
          src="/bg.jpg" 
          alt="Tangerino Restaurant Background" 
          layout="fill" 
          objectFit="cover" 
          quality={100}
          className="brightness-55"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/40 via-gray-900/20 to-gray-900/60"></div>
      </motion.div>

      {/* Decorative elements - elegant frames */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="absolute inset-8 border border-amber-100/10 pointer-events-none"
      ></motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.6 }}
        className="absolute inset-12 border border-amber-100/10 pointer-events-none"
      ></motion.div>

      {/* Ambient light effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-amber-500/5 to-transparent opacity-60"></div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-4">
        {/* Restaurant Logo with elegant animation - replaced text with logo image */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <Image 
            src="/logo.png" 
            alt="Tangerino Logo" 
            width={300}
            height={100}
            className="mx-auto"
            priority
          />
        </motion.div>

        {/* Elegant ornamental divider */}
        <motion.div className="flex items-center justify-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="h-px w-16 bg-amber-200/60"></div>
          <div className="mx-4 text-amber-200/80">✦</div>
          <div className="h-px w-16 bg-amber-200/60"></div>
        </motion.div>

        {/* Since Year with elegant styling */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-amber-100/90 font-serif italic text-xl tracking-wide mb-8"
        >
          - Since 2012 -
        </motion.p>

        {/* Subheadline with poetic touch */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-xl md:text-2xl mb-10 max-w-2xl font-light text-amber-50/90"
        >
Es en la cocina donde encontramos el alma del pueblo.
        </motion.p>

        {/* CTA Button - updated color scheme */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <a 
            href="#menu" 
            className="bg-[#3E4C52] hover:bg-[#5A7A8C] text-amber-50 py-3 px-10 transition-all duration-300 ease-in-out tracking-widest uppercase text-sm font-medium shadow-lg border border-[#4A5D65] hover:border-[#6D8FA0]"
          >
            EXPLORA NUESTRO MENÚ
          </a>
        </motion.div>

        {/* Decorative scroll indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center">
            <p className="text-amber-100/70 text-xs mb-2 tracking-widest">SCROLL</p>
            <div className="h-8 w-px bg-amber-100/50"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}