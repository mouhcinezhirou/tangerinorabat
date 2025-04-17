'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Define seafood types
type SeafoodItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  featured?: boolean;
};

type OysterOption = {
  id: string;
  name: string;
  description: string;
  price: number;
  featured?: boolean;
};

export default function SeafoodMenuPage() {
  const menuRef = useRef<HTMLDivElement>(null);
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

    if (menuRef.current) {
      observer.observe(menuRef.current);
    }

    return () => {
      if (menuRef.current) {
        observer.unobserve(menuRef.current);
      }
    };
  }, []);

  // Oysters data with added descriptions
  const oysters: OysterOption[] = [
    {
      id: 'oysters-6',
      name: 'OYSTERS (6 PIECES)',
      description: 'Fresh Mediterranean oysters served on ice with lemon and mignonette sauce',
      price: 100
    },
    {
      id: 'oysters-12',
      name: 'OYSTERS (12 PIECES)',
      description: 'A generous selection of our premium oysters with traditional accompaniments',
      price: 180
    },
    {
      id: 'grilled-oysters',
      name: 'MIBRASA GRILLED OYSTERS (6 PIECES)',
      description: 'Char-grilled oysters with herb butter and a touch of garlic, cooked in our Mibrasa oven',
      price: 120
    }
  ];

  // Seafood items data with added descriptions
  const seafoodItems: SeafoodItem[] = [
    {
      id: 'seafood-gratin',
      name: 'SEAFOOD GRATIN',
      description: 'A luxurious blend of fresh seafood baked with cream, white wine, and topped with golden breadcrumbs',
      price: 130
    },
    {
      id: 'mixed-ceviche',
      name: 'OYSTER, SHRIMP, AND OCTOPUS CEVICHE',
      description: 'Fresh seafood marinated in citrus juice with Mediterranean herbs, red onion, and avocado',
      price: 180,
      featured: true
    },
    {
      id: 'red-shrimp',
      name: 'WILD RED SHRIMP',
      description: 'Succulent wild-caught red shrimp grilled on the Mibrasa barbecue, served with a rich homemade bisque',
      price: 190,
      featured: true
    },
    {
      id: 'lobster',
      name: 'SLICED LOBSTER',
      description: 'Premium lobster tail delicately sliced and arranged, accompanied by an aromatic bisque served in a shot glass',
      price: 420,
      featured: true
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  return (
    <section ref={menuRef} className="py-20 bg-[#3e4c52] text-amber-50 relative">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-[url('/texture.png')] bg-repeat opacity-10"></div>
      </div>
      
      {/* Section Title */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-SweetSansProBold text-4xl md:text-5xl font-serif tracking-wider text-amber-50 mb-4">SEAFOOD & OYSTERS</h2>
        <div className="flex items-center justify-center mb-6">
          <div className="h-px w-12 bg-amber-200/40"></div>
          <div className="mx-4 text-amber-200/60">✦</div>
          <div className="h-px w-12 bg-amber-200/40"></div>
        </div>
        <p className="text-amber-100/70 font-light max-w-2xl mx-auto">
          Indulge in our selection of fresh seafood and premium oysters from the Mediterranean sea
        </p>
      </motion.div>
      
      {/* Menu content */}
      <div className="container mx-auto px-4">
        {/* OYSTERS SECTION */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="mb-20"
        >
          <h3 className="text-center font-SweetSansProBold text-3xl font-serif tracking-wider text-amber-100 mb-10">
            OYSTERS
          </h3>
          
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {oysters.map((oyster) => (
              <motion.div
                key={oyster.id}
                variants={itemVariants}
                className="bg-amber-900/20 backdrop-blur-sm rounded-lg p-6 border border-amber-200/20 relative overflow-hidden group"
              >
                {/* Decorative elements */}
                <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-amber-200/30"></div>
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-amber-200/30"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-SweetSansProBold text-xl font-serif tracking-wider text-amber-100">
                      {oyster.name}
                    </h3>
                    <span className="text-amber-200 font-light">{oyster.price} </span>
                  </div>
                  
                  <div className="w-10 h-px bg-amber-200/40 mb-4"></div>
                  
                  <p className="text-amber-100/70 italic text-sm">
                    {oyster.description}
                  </p>
                </div>
                
                {/* Highlight effect */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-amber-500/5 to-amber-300/10 opacity-0 group-hover:opacity-100 transform translate-y-full group-hover:translate-y-0 transition-all duration-700 rounded-lg"></div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Elegant divider */}
        <div className="flex items-center justify-center my-16">
          <div className="h-px w-16 bg-amber-200/30"></div>
          <div className="mx-3 text-amber-200/50">✦</div>
          <div className="h-px w-16 bg-amber-200/30"></div>
        </div>
        
        {/* SEAFOOD SECTION */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="mb-20"
        >
          <h3 className="text-center font-SweetSansProBold text-3xl font-serif tracking-wider text-amber-100 mb-10">
            SIGNATURE SEAFOOD
          </h3>
          
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {seafoodItems.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className={`bg-amber-900/20 backdrop-blur-sm rounded-lg p-6 border border-amber-200/20 relative overflow-hidden group ${
                  item.featured ? 'md:col-span-2' : ''
                }`}
              >
                {/* Decorative elements */}
                <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-amber-200/30"></div>
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-amber-200/30"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-SweetSansProBold text-xl font-serif tracking-wider text-amber-100">
                      {item.name}
                    </h3>
                    <span className="text-amber-200 font-light">{item.price} </span>
                  </div>
                  
                  <div className="w-10 h-px bg-amber-200/40 mb-4"></div>
                  
                  <p className="text-amber-100/70 italic text-sm">
                    {item.description}
                  </p>
                </div>
                
                {/* Highlight effect */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-amber-500/5 to-amber-300/10 opacity-0 group-hover:opacity-100 transform translate-y-full group-hover:translate-y-0 transition-all duration-700 rounded-lg"></div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
      
      {/* Elegant divider bottom */}
      <div className="flex items-center justify-center mt-20">
        <div className="h-px w-24 bg-amber-200/40"></div>
        <div className="mx-4 text-amber-200/60">✦</div>
        <div className="h-px w-24 bg-amber-200/40"></div>
      </div>
    </section>
  );
}