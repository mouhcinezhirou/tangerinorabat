'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CocktailMenuSection() {
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

  return (
    <section ref={menuRef} className="py-24 bg-[#3e4c52] text-amber-50 relative">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
      </div>
      
      {/* Subtle floating elements */}
      <div className="absolute top-40 left-10 w-40 h-40 rounded-full bg-amber-500/5 blur-3xl"></div>
      <div className="absolute bottom-60 right-20 w-60 h-60 rounded-full bg-amber-500/5 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Menu Header */}
        <div className="text-center mb-20">
          <motion.div 
            className="inline-block mb-4"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center">
              <div className="h-px w-8 bg-amber-200/40"></div>
              <div className="mx-3 text-amber-200/60">✦</div>
              <div className="h-px w-8 bg-amber-200/40"></div>
            </div>
          </motion.div>
          
          <motion.h2 
            className="font-SweetSansProBold text-3xl md:text-4xl font-serif tracking-wider text-amber-50 mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            OUR SELECTION
          </motion.h2>
          
          <motion.div
            className="w-16 h-0.5 bg-amber-500/80 mb-6 mx-auto"
            initial={{ opacity: 0, width: 0 }}
            animate={isVisible ? { opacity: 1, width: 64 } : { opacity: 0, width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          ></motion.div>
          
          <motion.p
            className="text-amber-100/70 max-w-xl mx-auto font-light"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            A symphony of flavors crafted with premium spirits and fresh ingredients
          </motion.p>
        </div>
        
        {/* Menu Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Signature Cocktails */}
          <motion.div
            className="col-span-1 lg:col-span-2"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            <div className="relative mb-10">
              <h3 className="font-SweetSansProBold text-2xl tracking-wider text-amber-50 inline-block">
                COCKTAILS
              </h3>
              <span className="absolute top-0 -right-2 text-amber-500 text-lg font-light">95</span>
              <div className="w-12 h-0.5 bg-amber-500/50 mt-3"></div>
              <p className="text-amber-200/80 text-sm mt-3 font-light">ALL CLASSICS AVAILABLE <span className="text-amber-200/60 italic">Ask your Waiter</span></p>
            </div>
            
            <div className="space-y-10">
              {[
                {
                  name: "ACHAKKAR",
                  ingredients: "Bourbon Woodford Reserve, Purée de Fraise Maison, Citron, Mousse vegan",
                },
                {
                  name: "TANGERINO",
                  ingredients: "Vodka Tito's, Liqueur de Coco, Purée de Mangue Maison, Ginger Soda",
                },
                {
                  name: "CAP SPARTEL",
                  ingredients: "Gin Bombay Saphire, Liqueur de Pêche, Purée de Pêche Maison, Sirop de Lavande",
                },
                {
                  name: "HAFA",
                  ingredients: "Bacardi Blanc, Cachaça, Oleo-saccharum à la Banane Épicée, Sirop de Vin Blanc Infusé à la Pêche et à l'Ananas Grillé, Banane Grillée Écrasée",
                },
                {
                  name: "MALABATA BEACH",
                  ingredients: "Vodka Tito's, Purée de Fruit de la Passion, Jus d'Orange",
                },
                {
                  name: "KASBAH",
                  ingredients: "Whisky Grants, Liqueur de Pommes, Jus de Pommes",
                },
                {
                  name: "RMILAT",
                  ingredients: "Purée de Litchi, Menthe, Gin Bombay, Vermouth Rosé",
                },
                {
                  name: "PERDICARIS",
                  ingredients: "Tequila, Jus d'Orange, Sirop de Grenadine, Liqueur d'Orange",
                }
              ].map((cocktail, index) => (
                <motion.div
                  key={cocktail.name}
                  variants={itemVariants}
                  className="relative"
                >
                  <div className="flex items-start">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-amber-900/30 border border-amber-500/20 mr-4 flex-shrink-0">
                      <span className="text-amber-200/80 text-sm font-light">{(index + 1).toString().padStart(2, '0')}</span>
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-SweetSansProBold text-xl tracking-wide text-amber-50 mb-2">{cocktail.name}</h4>
                      <p className="text-amber-200/70 italic font-light text-sm">{cocktail.ingredients}</p>
                    </div>
                  </div>
                  
                  {/* Decorative left border */}
                  <div className="absolute left-5 top-10 bottom-0 w-px bg-gradient-to-b from-amber-500/20 to-transparent"></div>
                  
                  <div className="w-full h-px bg-amber-700/30 mt-6"></div>
                </motion.div>
              ))}
            </div>
            
            {/* Shots section */}
            <div className="mt-16 pt-12 border-t border-amber-700/30">
              <div className="relative mb-10">
                <h3 className="font-SweetSansProBold text-2xl tracking-wider text-amber-50">SHOTS</h3>
                <div className="w-12 h-0.5 bg-amber-500/50 mt-3"></div>
                <div className="flex flex-wrap gap-6 mt-4">
                  <div className="bg-amber-900/20 border border-amber-500/20 rounded-md px-6 py-3">
                    <p className="text-amber-100 text-sm font-light">5 POUR <span className="text-amber-200 ml-2">180</span></p>
                  </div>
                  <div className="bg-amber-900/20 border border-amber-500/20 rounded-md px-6 py-3">
                    <p className="text-amber-100 text-sm font-light">10 POUR <span className="text-amber-200 ml-2">300</span></p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Side Section: Mocktails and Soft Drinks */}
          <motion.div
            className="col-span-1 space-y-16"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            {/* Decorative corner element */}
            <div className="absolute top-4 right-4 w-16 h-16 border-t border-r border-amber-500/20"></div>
            
            {/* Mocktails Section */}
            <div className="bg-amber-900/10 border border-amber-700/20 rounded-lg p-8">
              <div className="relative mb-8">
                <h3 className="font-SweetSansProBold text-2xl tracking-wider text-amber-50 inline-block">MOCKTAILS</h3>
                <span className="absolute top-0 -right-2 text-amber-500 text-lg font-light">90</span>
                <div className="w-12 h-0.5 bg-amber-500/50 mt-3"></div>
              </div>
              
              <div className="space-y-8">
                {[
                  {
                    name: "SOCCO BREEZE",
                    ingredients: "Hibiscus, Jus d'Orange, Citron, Sirop d'Agave"
                  },
                  {
                    name: "MENDOUBIA SUNSET",
                    ingredients: "Orgeat, Citron, Aquafaba, Purée de Coco Maison"
                  },
                  {
                    name: "CERVANTES COOLER",
                    ingredients: "Purée de Melon Maison, Sirop de Basilic, Citron"
                  }
                ].map((mocktail, index) => (
                  <motion.div key={mocktail.name} variants={itemVariants}>
                    <div className="flex items-center mb-2">
                      <div className="w-2 h-2 rounded-full bg-amber-500/50 mr-2"></div>
                      <h4 className="font-SweetSansProBold text-lg tracking-wide text-amber-50">{mocktail.name}</h4>
                    </div>
                    <p className="text-amber-200/70 italic font-light text-sm ml-4">{mocktail.ingredients}</p>
                    {index < 2 && <div className="w-full h-px bg-amber-700/30 mt-4"></div>}
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Soft Drinks Section */}
            <div>
              <div className="relative mb-8">
                <h3 className="font-SweetSansProBold text-2xl tracking-wider text-amber-50">SOFT</h3>
                <div className="w-12 h-0.5 bg-amber-500/50 mt-3"></div>
              </div>
              
              <div className="space-y-8">
                <motion.div variants={itemVariants} className="bg-amber-900/10 border-l-2 border-amber-500/30 pl-4 py-2">
                  <h4 className="font-SweetSansProBold text-lg tracking-wide text-amber-50 mb-2">AGUA MINERAL</h4>
                  <p className="text-amber-200/70 italic font-light text-sm mb-3">Eau Minérale Mineral Water</p>
                  <div className="text-amber-100/90 text-sm space-y-2 ml-2">
                    <div className="flex justify-between">
                      <span>Sidi Ali</span>
                      <span className="text-amber-200">50 Dhs</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Evian</span>
                      <span className="text-amber-200">90 Dhs</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Evian Petillante</span>
                      <span className="text-amber-200">90 Dhs</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Oulmès</span>
                      <span className="text-amber-200">50 Dhs</span>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex justify-between items-center py-3 border-b border-amber-700/30">
                  <div>
                    <h4 className="font-SweetSansProBold text-lg tracking-wide text-amber-50 mb-1">ZUMO FRESCO</h4>
                    <p className="text-amber-200/70 italic font-light text-sm">Jus frais Freshly squeezed juice</p>
                  </div>
                  <span className="text-amber-200">60 Dhs</span>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex justify-between items-center py-3 border-b border-amber-700/30">
                  <h4 className="font-SweetSansProBold text-lg tracking-wide text-amber-50">SODA</h4>
                  <span className="text-amber-200">50 Dhs</span>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex justify-between items-center py-3 border-b border-amber-700/30">
                  <h4 className="font-SweetSansProBold text-lg tracking-wide text-amber-50">RED BULL</h4>
                  <span className="text-amber-200">100 Dhs</span>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex justify-between items-center py-3 border-b border-amber-700/30">
                  <h4 className="font-SweetSansProBold text-lg tracking-wide text-amber-50">GINGER ALE TRIBUTE</h4>
                  <span className="text-amber-200">100 Dhs</span>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex justify-between items-center py-3 border-b border-amber-700/30">
                  <div>
                    <h4 className="font-SweetSansProBold text-lg tracking-wide text-amber-50 mb-1">CAFÉ</h4>
                  </div>
                  <span className="text-amber-200">50 Dhs</span>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex justify-between items-center py-3 border-b border-amber-700/30">
                  <div>
                    <h4 className="font-SweetSansProBold text-lg tracking-wide text-amber-50 mb-1">TÉ</h4>
                  </div>
                  <span className="text-amber-200">50 Dhs</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Menu Footer */}
        <motion.div 
          className="flex items-center justify-center mt-24"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="h-px w-16 bg-amber-200/40"></div>
          <div className="mx-3 text-amber-200/60">✦</div>
          <div className="h-px w-16 bg-amber-200/40"></div>
        </motion.div>
      </div>
    </section>
  );
}