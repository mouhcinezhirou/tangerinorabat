'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  name: string;
  description: string;
  price: number;
  detailedDescription?: string;
  isNew?: boolean;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const NewBadge: React.FC = () => (
  <motion.span
    className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-amber-950 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold tracking-wide ml-0 sm:ml-2 shrink-0"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.2 }}
  >
    <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
    </svg>
    NEW
  </motion.span>
);

const EggsAndFriedFoodMenuItem: React.FC<MenuItem & { onExpand: () => void, isExpanded: boolean }> = ({
  name,
  description,
  price,
  detailedDescription,
  isNew,
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
      className="bg-amber-900/20 backdrop-blur-sm rounded-lg p-6 border border-amber-200/20 relative overflow-hidden group cursor-pointer"
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
        <div className="mb-3">
          {isNew && (
            <div className="mb-2 sm:hidden">
              <NewBadge />
            </div>
          )}
          <div className="flex justify-between items-start gap-2">
            <div className="flex items-center flex-wrap gap-y-1 min-w-0">
              <h3 className="font-SweetSansProBold text-lg sm:text-xl font-serif tracking-wider text-amber-100 break-words">
                {name}
              </h3>
              {isNew && <span className="hidden sm:inline-flex"><NewBadge /></span>}
            </div>
            <span className="text-amber-200 font-light shrink-0">{price}</span>
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

  const menuSections: MenuSection[] = [
    {
      title: 'TORTILLAS AND EGGS',
      items: [
        {
          name: 'SPANISH TORTILLA WITH CHORIZO',
          description: 'Traditional Spanish omelet enriched with flavorful, lightly spiced chorizo',
          price: 90,
          detailedDescription: 'Our tortilla is prepared according to traditional recipe with potatoes confit in olive oil, to which we add artisanal, lightly spicy chorizo. Slowly cooked to achieve a soft and melting center, it is served warm to appreciate all the flavors.'
        },
        {
          name: 'CLASSIC SPANISH TORTILLA',
          description: 'The authentic Spanish potato omelet',
          price: 70,
          detailedDescription: 'Our traditional tortilla is prepared with carefully selected potatoes, confit at low temperature in our extra virgin olive oil. It is cooked to perfection to offer a contrast between the lightly golden exterior and a tender, creamy center.'
        },
        {
          name: 'SPANISH TORTILLA WITH SPINACH AND MANCHEGO',
          description: 'Delicate variation of the classic tortilla with fresh spinach and aged manchego',
          price: 90,
          detailedDescription: 'This elegant version of our tortilla combines the sweetness of fresh lightly wilted spinach and the richness of manchego cheese aged for 6 months. The combination of melting potatoes, spinach and cheese creates a perfect balance between creaminess and character.'
        },
        {
          name: 'HUEVOS ROTOS CON CHORIZO (HALAL)',
          description: 'Eggs cooked on a bed of potatoes with grilled chorizo',
          price: 95,
          detailedDescription: 'Our orange-yolked eggs are delicately cooked on a bed of tender potatoes and accompanied by lightly grilled halal chorizo. The runny yolk mixes with the potatoes and chorizo to create a harmony of rustic and comforting flavors.'
        }
      ]
    },
    {
      title: 'FRIED DISHES',
      items: [
        {
          name: 'ANCHOIS AL LIMON',
          description: 'Fresh anchovies marinated in lemon, coated in fine breadcrumbs, fried to perfection',
          price: 80,
          detailedDescription: 'Our fresh anchovies are delicately filleted then coated in a light tempura batter before being fried instantly. Crispy on the outside and melting on the inside, they are served with fresh lemon wedges and a touch of fleur de sel to enhance their marine flavor.'
        },
        {
          name: 'POPCORN SHRIMP',
          description: 'Crispy popcorn-style shrimp with homemade cocktail sauce',
          price: 80,
          detailedDescription: 'Our shrimp are coated in crispy breadcrumbs, then fried to perfection to achieve a golden and crunchy exterior while preserving the tenderness of the flesh. Served with our lightly spiced homemade cocktail sauce, it\'s an irresistible delight.'
        },
        {
          name: 'CALAMARES FRITOS',
          description: 'Tender squid rings in light batter, served with tartare sauce',
          price: 140,
          detailedDescription: 'Inspired by Andalusian tradition, our squid are dipped in an airy frying batter then quickly fried at high temperature to preserve their tenderness. Served with homemade tartare sauce and a touch of fresh chopped parsley, they offer a perfect balance between crispy and tender.'
        },
        {
          name: 'CHICKEN CROQUETTES',
          description: 'Creamy chicken croquettes with wild mushrooms and melted cheese',
          price: 80,
          detailedDescription: 'Our croquettes are prepared with a smooth béchamel enriched with shredded chicken, sautéed wild mushrooms and a blend of aged cheeses. The whole is coated in golden breadcrumbs and fried until obtaining a crispy shell that reveals a melting and flavorful heart.'
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
          detailedDescription: 'Our interpretation of the British classic combines an ultra-fresh cod fillet coated in crispy and airy tempura batter, served with our Hurricane spiral potatoes with incomparable texture. The whole is accompanied by homemade tartare sauce with crunchy capers and finely chopped pickles.'
        },
        {
          name: 'SEASONAL CRISPY FRY',
          description: 'Baby red mullet & smelt',
          price: 160,
          detailedDescription: 'A seasonal crispy fry of baby red mullet and smelt.',
          isNew: true
        },
        {
          name: 'MIXED FISH FRY',
          description: 'Generous selection of fish and seafood fried to perfection',
          price: 220,
          detailedDescription: 'This royal fry offers a varied selection of Mediterranean fish, squid, shrimp and cod fritters, each coated in a specific breading that enhances its natural flavor. The assortment is served with our homemade tartare sauce to satisfy all desires.'
        }
      ]
    }
  ];

  const ElegantDivider = () => (
    <div className="flex items-center justify-center my-16">
      <div className="h-px w-16 bg-amber-200/30"></div>
      <div className="mx-3 text-amber-200/50">✦</div>
      <div className="h-px w-16 bg-amber-200/30"></div>
    </div>
  );

  return (
    <section ref={menuRef} className="py-20 bg-[#3e4c52] text-amber-50 relative">
      <div className="absolute inset-0 opacity-10"></div>
      
      <div className="container mx-auto px-4">
        {menuSections.map((section, index) => (
          <div key={index}>
            <EggsAndFriedFoodMenuSection title={section.title} items={section.items} />
            {index < menuSections.length - 1 && <ElegantDivider />}
          </div>
        ))}
      </div>
      
      <div className="flex items-center justify-center mt-20">
        <div className="h-px w-24 bg-amber-200/40"></div>
        <div className="mx-4 text-amber-200/60">✦</div>
        <div className="h-px w-24 bg-amber-200/40"></div>
      </div>
    </section>
  );
}