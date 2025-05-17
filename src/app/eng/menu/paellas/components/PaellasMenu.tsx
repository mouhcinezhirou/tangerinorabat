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
          description: 'Saffron rice garnished with delicate pieces of white fish simmered in fragrant seafood broth',
          price: 120,
          forMinPersons: 2,
          detailedDescription: 'This traditional paella from the Valencian coast is prepared with bomba rice infused with saffron and cooked in a rich fish broth. Served with an emulsified garlic sauce on the side to enhance the delicate marine flavors according to your taste.'
        },
        {
          name: 'SQUID AND SHRIMP PAELLA',
          description: 'Golden saffron rice garnished with tender squid and juicy shrimp cooked to perfection',
          price: 150,
          forMinPersons: 2,
          detailedDescription: 'Our seafood paella combines subtly flavored bomba rice with fresh squid cut into rings and wild shrimp. Everything is slowly simmered in a skillfully spiced marine broth until the delicious socarrat forms, the caramelized crust that gives an authentic paella all its charm.'
        },
        {
          name: 'BLACK PAELLA',
          description: 'Intense black rice infused with squid ink and garnished with pink shrimp with a mild iodine scent',
          price: 160,
          forMinPersons: 2,
          detailedDescription: 'This spectacular paella gets its ebony black color from squid ink, which also provides a deep marine flavor. The creamy rice perfectly contrasts with the tender shrimp meat, all enhanced with a drizzle of lemon-infused olive oil and a hint of garlic.'
        },
        {
          name: 'HERGMA STYLE PAELLA',
          description: 'Beef feet and chickpea paella, hergma style. Mediterranean fusion combining Spanish tradition with North African hergma flavors.',
          price: 150,
          forMinPersons: 2,
          detailedDescription: 'This original creation marries the art of Spanish paella with the flavors of traditional Moroccan Hergma. The beef feet, simmered for hours until meltingly tender, mix with creamy chickpeas and rice flavored with sweet spices for a unique culinary experience between two shores of the Mediterranean.'
        },
        {
          name: 'SEÑORITOS PAELLA',
          description: 'Generous marine feast of shrimp, mussels, squid and clams on a bed of saffron rice',
          price: 220,
          forMinPersons: 2,
          detailedDescription: 'Our royal seafood paella combines a varied selection of marine treasures completely shelled for your comfort: tiger prawns, Galician mussels, squid rings, and fresh clams. The rice, flavored with saffron and smoked paprika, captures all the flavors of the seafood for an incomparable iodized taste experience.'
        },
        {
          name: 'LOBSTER PAELLA',
          description: 'Luxurious paella adorned with whole lobster, revealing the quintessence of marine flavors',
          price: 380,
          forMinPersons: 2,
          detailedDescription: 'This exceptional paella showcases lobster in all its splendor, placed at the center of a bed of golden rice flavored with its broth. The delicate and sweet flesh of this noble crustacean pairs perfectly with rice impregnated with marine flavors and saffron. A Mediterranean gastronomic experience par excellence.'
        },
        {
          name: 'VEGETABLE PAELLA',
          description: 'Colorful mosaic of seasonal vegetables on saffron rice, celebrating garden flavors',
          price: 140,
          forMinPersons: 2,
          detailedDescription: 'Our vegetarian paella showcases a generous selection of seasonal Mediterranean vegetables: artichokes, bell peppers, eggplants, zucchini, and green beans. Cooked in a broth with aromatic herbs and saffron, these vegetables transmit all their freshness to the rice for a dish as flavorful as it is colorful.'
        },
        {
          name: 'VALENCIAN PAELLA',
          description: 'The authentic paella from Valencia marrying tender pieces of free-range chicken and fresh vegetables',
          price: 150,
          forMinPersons: 2,
          detailedDescription: 'True to the authentic Valencian recipe, this paella combines golden chicken pieces with a selection of seasonal vegetables. The bomba rice, slowly cooked in a broth flavored with saffron and paprika, absorbs all the flavors to create this emblematic Spanish dish in its most traditional version.'
        },
      ]
    },
    {
      title: 'RICE AND PASTA',
      items: [
        {
          name: 'CREAMY SEAFOOD RICE WITH RED PRAWNS',
          description: 'Creamy risotto-style rice with sea notes, crowned with sweet-fleshed red prawns',
          price: 280,
          detailedDescription: 'This creamy rice inspired by Spanish "arroz meloso" is prepared with an intense shellfish broth and garnished with Mediterranean red prawns. Its texture, between paella and risotto, offers a creaminess that envelops the taste buds while the prawns bring their delicate flavor and characteristic firm texture.'
        },
        {
          name: 'SEÑORITOS FIDEUA',
          description: 'Golden vermicelli prepared like a paella, richly garnished with shelled seafood',
          price: 220,
          detailedDescription: 'This specialty from the Valencian coast substitutes thin vermicelli for the traditional rice in paella. Browned then simmered in a saffron-infused fish broth, these noodles are enriched with the flavors of shrimp, squid, mussels, and clams carefully shelled for optimal dining comfort.'
        },
        {
          name: 'SPAGHETTI ALLE VONGOLE',
          description: 'Al dente spaghetti with fresh clams, flavored with garlic, parsley, and white wine',
          price: 160,
          detailedDescription: 'This Italian classic is prepared with respect for tradition: fresh clams opened at the last minute in a broth of garlic, fresh parsley, and quality white wine. The spaghetti, cooked al dente, pairs perfectly with this cooking juice with marine scents, enhanced with a drizzle of extra virgin olive oil.'
        },
        {
          name: 'SPAGHETTI AL NERO',
          description: 'Black spaghetti with squid ink, adorned with tender pieces of squid and fresh basil',
          price: 120,
          detailedDescription: 'These black spaghetti tinted with squid ink are served with pieces of squid just seared to preserve their tenderness. Fresh basil brings an aromatic note that deliciously contrasts with the marine flavors, all bound with a touch of olive oil and a hint of garlic.'
        },
        {
          name: 'SEAFOOD LINGUINE',
          description: 'Linguine with sea delights mixing fine fish and seafood in a fragrant sauce',
          price: 180,
          detailedDescription: 'Our linguine are generously garnished with a selection of white fish, shrimp, mussels, and squid, all bound by a delicate tomato sauce flavored with basil and wild fennel. Each bite reveals the freshness of seafood products carefully selected by our chef.'
        },
        {
          name: 'TAGLIATELLE WITH CHARCOAL GRILLED CHICKEN AND MUSHROOMS',
          description: 'Ribbon pasta with slices of grilled chicken and sautéed mushrooms in creamy sauce',
          price: 140,
          detailedDescription: 'Our tagliatelle are accompanied by pieces of free-range chicken grilled over charcoal and forest mushrooms sautéed with garlic. A creamy sauce with parmesan and fresh herbs delicately coats the pasta for a comforting dish with authentic flavors.'
        },
        {
          name: 'SEAFOOD COUSCOUS WITH MOROCCAN FLAVORS',
          description: 'Steamed semolina with Moroccan spices topped with a rich selection of fish and seafood',
          price: 240,
          specialDay: "FRIDAY",
          detailedDescription: 'Available only on Fridays, our seafood couscous offers a generous selection of fish and seafood simmered in a broth with traditional Moroccan spices. The steamed semolina, perfectly hydrated and flavored, is accompanied by homemade harissa which you can dose according to your taste.'
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