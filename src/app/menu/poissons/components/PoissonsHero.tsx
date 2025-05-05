'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function PoissonsViandesHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  const scrollToNextSection = () => {
    const nextSection = heroRef.current?.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef} 
      className="relative h-screen min-h-[600px] overflow-hidden bg-[#2c1e18] text-amber-50"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src="/mains.jpg" // Replace with your actual image path
          alt="Sélection de poissons et viandes méditerranéennes"
          layout="fill"
          objectFit="cover"
          className="opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80"></div>
        <div className="absolute inset-0 bg-[url('/texture.png')] bg-repeat opacity-20"></div>
      </div>

      {/* Content container */}
      <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center relative z-10">
        {/* Decorative elements */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center justify-center">
            <div className="h-px w-16 bg-amber-200/40"></div>
            <div className="mx-4 text-amber-200/60 text-xl">✦</div>
            <div className="h-px w-16 bg-amber-200/40"></div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="font-SweetSansProBold text-5xl md:text-7xl font-serif tracking-wider text-amber-50 mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          POISSONS<br></br>
          & VIANDES
        </motion.h1>

        {/* Decorative line */}
        <motion.div
          className="w-24 h-1 bg-amber-500/80 mb-8 mx-auto"
          initial={{ opacity: 0, width: 0 }}
          animate={isVisible ? { opacity: 1, width: 96 } : { opacity: 0, width: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        ></motion.div>

        {/* Description in French */}
        <motion.p
          className="text-amber-100/90 max-w-xl text-lg font-light mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Des poissons frais pêchés en Méditerranée aux viandes savoureuses préparées avec soin,
          découvrez une sélection de produits de qualité où chaque pièce est sublimée par notre savoir-faire.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2 cursor-pointer"
          initial={{ opacity: 0, y: -10 }}
          animate={isVisible ? { 
            opacity: [0.4, 0.8, 0.4], 
            y: [0, 10, 0] 
          } : { opacity: 0, y: -10 }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            delay: 1
          }}
          onClick={scrollToNextSection}
          role="button"
          aria-label="Défiler vers la section suivante"
        >
          <div className="flex flex-col items-center">
            <span className="text-amber-200/60 text-sm tracking-widest mb-2 hover:text-amber-200 transition-colors">DÉCOUVRIR</span>
            <div className="w-px h-16 bg-gradient-to-b from-amber-200/60 to-transparent"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}