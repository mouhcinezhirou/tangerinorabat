'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  name: string;
  description: string;
  price: number;
  detailedDescription?: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const EggsAndFriedFoodMenuItem: React.FC<MenuItem & { onExpand: () => void, isExpanded: boolean }> = ({
  name,
  description,
  price,
  detailedDescription,
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
          <span className="text-amber-200 font-light">{price}</span>
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
        
        {detailedDescription && (
          <div className="mt-4 text-xs text-amber-200 opacity-70 flex items-center">
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
      </div>
      
      {/* Highlight effect */}
      <div className="absolute -inset-2 bg-gradient-to-tr from-amber-500/5 to-amber-300/10 opacity-0 group-hover:opacity-100 transform translate-y-full group-hover:translate-y-0 transition-all duration-700 rounded-lg"></div>
    </motion.div>
  );
};

const EggsAndFriedFoodMenuSection: React.FC<MenuSection> = ({ title, items }) => {
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
      <h3 className="font-SweetSansProBold text-center font-serif text-3xl tracking-wider text-amber-100 mb-10">
        {title}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {items.map((item, index) => (
          <EggsAndFriedFoodMenuItem
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

export default function EggsAndFriedFoodMenu() {
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
      title: 'TORTILLAS AND EGGS',
      items: [
        {
          name: 'SPANISH TORTILLA WITH CHORIZO',
          description: 'Traditional Spanish omelette enriched with flavorful, mildly spicy chorizo',
          price: 90,
          detailedDescription: 'Our tortilla is prepared according to the traditional recipe with potatoes confit in olive oil and caramelized onions, to which we add artisanal chorizo with a mild kick. Slowly cooked to achieve a soft and melting center, it is served warm to enjoy all its flavors.'
        },
        {
          name: 'CLASSIC SPANISH TORTILLA',
          description: 'Authentic Spanish omelette with potatoes and confit onions',
          price: 70,
          detailedDescription: 'Our traditional tortilla is prepared with carefully selected potatoes, confit at low temperature in our extra virgin olive oil, and gently caramelized onions. It is perfectly cooked to offer a contrast between the slightly golden exterior and a tender, creamy center.'
        },
        {
          name: 'SPANISH TORTILLA WITH SPINACH AND MANCHEGO',
          description: 'Delicate variation of the classic tortilla with fresh spinach and aged manchego cheese',
          price: 90,
          detailedDescription: 'This elegant version of our tortilla combines the sweetness of lightly wilted fresh spinach and the richness of manchego cheese aged for 6 months. The combination of melting potatoes, spinach, and cheese creates a perfect balance between creaminess and character.'
        },
        {
          name: 'HUEVOS ROTOS CON CHORIZO (HALAL)',
          description: 'Eggs cooked on a bed of crispy potatoes with grilled chorizo',
          price: 95,
          detailedDescription: 'Our farm-fresh eggs with orange yolks are delicately cooked on a bed of crispy matchstick potatoes and accompanied by lightly grilled halal chorizo. The runny yolk mixes with the potatoes and chorizo to create a harmony of rustic and comforting flavors.'
        }
      ]
    },
    {
      title: 'FRIED DELIGHTS',
      items: [
        {
          name: 'ANCHOVIES AL LIMON',
          description: 'Fresh anchovies marinated in lemon, coated in a fine breading, fried to perfection.',
          price: 80,
          detailedDescription: 'Our fresh anchovies are delicately filleted then coated in a light tempura batter before being fried to order. Crispy on the outside and melting on the inside, they are served with fresh lemon wedges and a touch of fleur de sel to enhance their marine flavor.'
        },
        {
          name: 'POPCORN SHRIMP',
          description: 'Crispy popcorn-style shrimp with homemade cocktail sauce',
          price: 80,
          detailedDescription: 'Our shrimp are coated in a crispy breadcrumb mixture with herbs and spices, then fried to perfection to achieve a golden, crunchy exterior while preserving the tenderness of the meat. Served with our slightly spicy homemade cocktail sauce, it\'s an irresistible delight.'
        },
        {
          name: 'CALAMARI FRITOS',
          description: 'Tender calamari rings in light batter, served with saffron aioli',
          price: 140,
          detailedDescription: 'Inspired by Andalusian tradition, our calamari are dipped in a light batter then quickly fried at high temperature to preserve their tenderness. Served with a homemade aioli delicately flavored with saffron and a touch of freshly chopped parsley, they offer a perfect balance between crispy and tender.'
        },
        {
          name: 'CHICKEN CROQUETTES',
          description: 'Creamy croquettes with chicken, wild mushrooms, and melted cheese',
          price: 80,
          detailedDescription: 'Our croquettes are prepared with a creamy béchamel enriched with shredded chicken, sautéed wild mushrooms, and a blend of aged cheeses. The mixture is coated in golden breadcrumbs and fried until a crispy shell reveals a melting and flavorful heart.'
        },
        {
          name: 'SHRIMP CROQUETTES',
          description: 'Creamy shrimp croquettes with homemade bisque, flavored with Espelette pepper',
          price: 80,
          detailedDescription: 'These delicate croquettes are made from a reduced and concentrated shrimp bisque, incorporated into a silky béchamel with pieces of shrimp. A light touch of Espelette pepper brings a subtle warmth that enhances the marine flavors, all wrapped in a fine golden and crispy crust.'
        },
        {
          name: 'FISH & CHIPS',
          description: 'Cod fillet in crispy tempura with spiral potatoes',
          price: 160,
          detailedDescription: 'Our interpretation of the British classic combines an ultra-fresh cod fillet coated in a crispy and airy beer batter, served with our Hurricane spiral potatoes with an incomparable texture. The dish is accompanied by a homemade tartar sauce with crunchy capers and finely chopped pickles.'
        },
        {
          name: 'MIXED FRIED SEAFOOD',
          description: 'Generous selection of fish and seafood fried to perfection',
          price: 220,
          detailedDescription: 'This royal fry offers a varied selection of Mediterranean fish, calamari, shrimp, and cod fritters, each coated in a specific breading that enhances its natural flavor. The assortment is served with different homemade sauces: aioli, tartar sauce, and spicy sauce to satisfy all cravings.'
        },
        {
          name: 'CHANQUETES WITH FRIED EGGS',
          description: 'Delicate crispy silver fish served on a bed of soft fried eggs',
          price: 140,
          detailedDescription: 'A quintessential Mediterranean specialty, our chanquetes (small silver fish) are lightly floured then fried until perfectly crispy. They are placed on a bed of gently cooked broken eggs, whose creamy yolk deliciously blends with the marine flavors. The dish is sprinkled with fresh herbs and accompanied by a drizzle of extra virgin olive oil infused with garlic, creating a symphony of textures and flavors that instantly evokes the sunny Mediterranean coastline.'
        },
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
            <EggsAndFriedFoodMenuSection title={section.title} items={section.items} />
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