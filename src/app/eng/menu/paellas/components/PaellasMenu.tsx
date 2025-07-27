'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  name: string;
  description: string;
  price: number;
  detailedDescription?: string;
  forMinPersons?: number;
  specialDay?: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const PaellasMenuItem: React.FC<MenuItem & { onExpand: () => void, isExpanded: boolean }> = ({
  name,
  description,
  price,
  detailedDescription,
  forMinPersons,
  specialDay,
  onExpand,
  isExpanded
}) => {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isExpanded && itemRef.current) {
      itemRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isExpanded]);

  return (
    <motion.div
      ref={itemRef}
      className="bg-amber-900/20 backdrop-blur-sm rounded-lg p-6 border border-amber-200/20 relative overflow-hidden group"
      whileHover={{ y: -4 }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={onExpand}
    >
      {/* Decorative elements */}
      <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-amber-200/30"></div>
      <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-amber-200/30"></div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-SweetSansProBold text-xl font-serif tracking-wider text-amber-100">
            {name}
          </h3>
          <div className="text-right">
            <span className="text-amber-200 font-light">{price}</span>
          </div>
        </div>
        
        <div className="w-10 h-px bg-amber-200/40 mb-4"></div>
        
        <p className="text-amber-100/70 text-sm">
          {description}
        </p>

        <AnimatePresence>
          {isExpanded && detailedDescription && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="text-amber-100/80 text-sm pl-4 border-l-2 border-amber-200/50 mt-4">
                {detailedDescription}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="flex flex-wrap justify-between items-end mt-4">
          {detailedDescription && (
            <div className="text-xs text-amber-200 opacity-70 flex items-center">
              <span className="mr-1">{isExpanded ? 'Less' : 'Details'}</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="12" 
                height="12" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          )}
          
          <div className="flex gap-2 ml-auto mt-1">
            {specialDay && (
              <div className="relative group/special">
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-amber-400 rounded-full animate-pulse"></div>
                <div className="inline-flex items-center justify-center bg-gradient-to-r from-amber-700/60 to-amber-600/60 border border-amber-300/40 rounded-lg px-3 py-1 text-xs font-semibold text-amber-100 transform rotate-2 shadow-sm">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="12" 
                    height="12" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="mr-1"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  {specialDay}
                </div>
              </div>
            )}
            
            {forMinPersons && (
              <div className="inline-flex items-center justify-center bg-amber-900/40 border border-amber-200/30 rounded-full px-3 py-1 text-xs text-amber-200/90">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="10" 
                  height="10" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="mr-1"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                min {forMinPersons} people
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Highlight effect */}
      <div className="absolute -inset-2 bg-gradient-to-tr from-amber-500/5 to-amber-300/10 opacity-0 group-hover:opacity-100 transform translate-y-full group-hover:translate-y-0 transition-all duration-700 rounded-lg"></div>
    </motion.div>
  );
};

const PaellasMenuSection: React.FC<MenuSection> = ({ title, items }) => {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  const handleExpand = (index: number) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mb-20"
    >
      <div className="text-center mb-10">
        <h3 className="font-SweetSansProBold font-serif text-3xl tracking-wider text-amber-100">
          {title}
        </h3>
        {title === 'PAELLAS' && (
          <p className="text-amber-100/70 text-sm mt-2">Price per Person</p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {items.map((item, index) => (
          <PaellasMenuItem
            key={index}
            {...item}
            onExpand={() => handleExpand(index)}
            isExpanded={expandedItem === index}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default function PaellasMenu() {
  const menuRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

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

  // All menu data in one place
  const menuSections: MenuSection[] = [
    {
      title: 'PAELLAS',
      items: [
        {
        name: 'PAELLA A BANDA',
        description: 'Round rice with small squid and small shrimp, fish stock and light aioli sauce on the paella',
        price: 120,
        forMinPersons: 2,
        detailedDescription: 'This traditional paella from the Valencian coast is prepared with round rice cooked in a rich fish stock. Served with a light aioli sauce to enhance the delicate marine flavors according to your taste.'
      },
      {
        name: 'SQUID AND SHRIMP PAELLA',
        description: 'Golden rice garnished with tender squid rings and shrimp cooked to perfection',
        price: 150,
        forMinPersons: 2,
        detailedDescription: 'Our seafood paella combines subtly flavored rice with fresh squid cut into rings and shrimp. Everything is slowly simmered in homemade fish stock.'
      },
      {
        name: 'PAELLA NEGRA',
        description: 'Paella rice with squid ink and prawns',
        price: 160,
        forMinPersons: 2,
        detailedDescription: 'This spectacular paella gets its ebony black color from squid ink which also brings a deep marine flavor. The creamy rice pairs perfectly with prawns, all enhanced with a drizzle of lemon-infused olive oil and a touch of garlic.'
      },
      {
        name: 'HERGMA-STYLE PAELLA',
        description: 'Beef feet and chickpea paella, hergma style. Mediterranean fusion uniting Spanish tradition with North African hergma flavors.',
        price: 150,
        forMinPersons: 2,
        detailedDescription: 'This original creation marries the art of Spanish paella with the flavors of traditional Moroccan Hergma. Beef feet, simmered for hours until tender, blend with creamy chickpeas and rice perfumed with mild spices for a unique taste experience between two Mediterranean shores.'
      },
      {
        name: 'PAELLA DEL SEÑORITOS',
        description: 'Generous marine feast of seafood and fish on a bed of round rice',
        price: 220,
        forMinPersons: 2,
        detailedDescription: 'Our royal seafood paella combines a varied selection of marine treasures completely shelled for your comfort: fresh seafood and fish. The round rice captures all the seafood flavors for an incomparable iodized taste experience.'
      },
      {
        name: 'LOBSTER PAELLA',
        description: 'Luxurious paella adorned with whole lobster, revealing the quintessence of marine flavors',
        price: 380,
        forMinPersons: 2,
        detailedDescription: 'This exceptional paella showcases lobster in all its splendor, placed at the center of a bed of golden rice flavored with its stock. The delicate flesh of this noble crustacean pairs perfectly with rice infused with marine flavors. A Mediterranean gastronomic experience par excellence.'
      },
      {
        name: 'VEGETABLE PAELLA',
        description: 'Colorful mosaic of seasonal vegetables on rice, celebration of garden flavors',
        price: 140,
        forMinPersons: 2,
        detailedDescription: 'Our vegetarian paella highlights a generous selection of seasonal vegetables. Cooked in an aromatic herb stock, these vegetables transmit all their freshness to the rice for a dish as flavorful as it is colorful.'
      },
      {
        name: 'VALENCIAN PAELLA',
        description: 'The authentic paella from Valencia combining tender pieces of chicken and seasonal vegetables',
        price: 150,
        forMinPersons: 2,
        detailedDescription: 'True to the authentic Valencian recipe, this paella combines golden chicken pieces with a selection of seasonal vegetables. The round rice, slowly cooked in seasoned stock, absorbs all the flavors to create this emblematic Spanish dish in its most traditional version.'
      },
    ]
  },
  {
    title: 'RICE AND PASTA',
    items: [
      {
        name: 'SOFT RICE MARINIÈRE WITH RED PRAWNS',
        description: 'Creamy risotto-style rice with iodized notes, crowned with red prawns',
        price: 280,
        detailedDescription: 'This soft rice inspired by Spanish "arroz meloso" is prepared with an intense crustacean stock and garnished with red Mediterranean prawns. Its texture, between paella and risotto, offers a creaminess that envelops the palate while the prawns bring their delicate flavor and characteristic firm texture.'
      },
      {
        name: 'FIDEUA DEL SEÑORITOS',
        description: 'Fideua vermicelli richly garnished with seafood',
        price: 220,
        detailedDescription: 'This specialty from the Valencian coast uses thin fideua vermicelli. Golden then simmered in fish stock, these vermicelli are enriched with seafood flavors for optimal tasting comfort.'
      },
      {
        name: 'SPAGHETTI ALLE VONGOLE',
        description: 'Al dente spaghetti with fresh clams, flavored with olive oil, garlic and crushed tomato',
        price: 160,
        detailedDescription: 'This Italian classic is prepared in respect of tradition: fresh clams opened at the minute with olive oil, garlic and crushed tomato. The spaghetti, cooked al dente, pairs perfectly with this preparation with marine aromas, enhanced with extra virgin olive oil.'
      },
      {
        name: 'SPAGHETTI AL NERO',
        description: 'Black spaghetti with squid ink, adorned with tender pieces of squid and fresh basil',
        price: 120,
        detailedDescription: 'These black spaghetti tinted with squid ink are served with pieces of squid just seared to preserve their tenderness. Fresh basil brings an aromatic note that contrasts deliciously with the marine flavors, all bound by a touch of olive oil and a hint of garlic.'
      },
      {
        name: 'LINGUINE WITH FISH AND SEAFOOD',
        description: 'Linguine with sea delicacies with olive oil, garlic and seafood and fresh crushed tomatoes',
        price: 180,
        detailedDescription: 'Our linguine are generously garnished with seafood, all prepared with olive oil, garlic and fresh crushed tomatoes. Each bite reveals the freshness of seafood carefully selected by our chef.'
      },
      {
        name: 'TAGLIATELLE WITH CHARCOAL GRILLED CHICKEN AND MUSHROOM',
        description: 'Pasta ribbons with grilled chicken strips and mushrooms sautéed in creamy sauce',
        price: 140,
        detailedDescription: 'Our tagliatelle are served with pieces chicken grilled over charcoal and forest mushrooms sautéed with garlic. A creamy sauce with parmesan and fresh herbs delicately coats the pasta for a comforting dish with authentic flavors.'
      },
      {
        name: 'COUSCOUS FROM THE SEA WITH MOROCCAN FLAVORS',
        description: 'Steamed semolina with Moroccan spices with fish stock with Moroccan spices',
        price: 240,
        specialDay: "FRIDAY",
        detailedDescription: 'Available only on Friday, our sea couscous offers a fish stock simmered with traditional Moroccan spices. The steamed semolina, perfectly hydrated and flavored, is accompanied by homemade harissa whose intensity you can adjust according to your taste.'
      }
      ]
    }
  ];

  // Elegant divider component to reduce repetition
  const ElegantDivider = () => (
    <div className="flex items-center justify-center my-16">
      <div className="h-px w-16 bg-amber-200/30"></div>
      <div className="mx-3 text-amber-200/50">✦</div>
      <div className="h-px w-16 bg-amber-200/30"></div>
    </div>
  );

  return (
    <section ref={menuRef} className="py-20 bg-[#3e4c52] text-amber-50 relative">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10"></div>
      
      {/* Menu content */}
      <div className="container mx-auto px-4">
        {menuSections.map((section, index) => (
          <div key={index}>
            <PaellasMenuSection title={section.title} items={section.items} />
            {index < menuSections.length - 1 && <ElegantDivider />}
          </div>
        ))}
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