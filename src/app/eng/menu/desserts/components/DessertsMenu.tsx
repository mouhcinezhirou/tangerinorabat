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

const DessertMenuItem: React.FC<MenuItem & { onExpand: () => void, isExpanded: boolean }> = ({
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

const DessertMenuSection: React.FC<MenuSection> = ({ title, items }) => {
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
          <DessertMenuItem
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

export default function DessertsMenu() {
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
      title: '',
      items: [
        {
          name: 'PRALINE CREAM PUFF',
          description: 'Delicate choux pastry with praline and crispy croustillant, served with Madagascar vanilla ice cream',
          price: 80,
          detailedDescription: 'Our crispy choux pastry shell contains a smooth praline cream made with caramelized hazelnuts and roasted almonds. This little masterpiece is crowned with a golden craquelin and served with a scoop of Madagascar vanilla ice cream with intense notes that melts delicately against the warmth of the pastry.'
        },
        {
          name: 'PINEAPPLE CARPACCIO',
          description: 'Thin slices of fresh pineapple with crème anglaise and vanilla ice cream',
          price: 95,
          detailedDescription: 'A fresh and exotic dessert where thin slices of pineapple complement the sweetness of a creamy crème anglaise and velvety vanilla ice cream. A light and fragrant finale to beautifully conclude your meal.'
        },
        {
          name: 'TANGIER LEMON TART',
          description: 'Tangier-style lemon tart with condensed milk',
          price: 80,
          detailedDescription: 'A thin, crispy shortbread crust supports a perfectly balanced Menton lemon curd with just the right balance of acidity and sweetness.'
        },
        {
          name: 'TIRAMISU',
          description: 'Classic tiramisu with coffee-soaked biscuits, airy mascarpone, and bitter cocoa',
          price: 80,
          detailedDescription: 'Our tiramisu follows the traditional Italian recipe: savoiardi biscuits delicately soaked in strong espresso, covered with incomparably light mascarpone cream. A fine layer of bitter cocoa powder sprinkled at the last minute adds the final touch to this timeless dessert.'
        },
{
  name: 'CHEESECAKE',
  description: 'Spanish-style cheesecake',
  price: 80,
  detailedDescription: 'Our Spanish-style cheesecake is prepared with a velvety blend of fresh cheese and cream. Its silky and creamy texture offers a rich and delicate tasting experience, perfectly balanced.'
},
{
  name: 'FROZEN NOUGAT',
  description: 'Frozen parfait with dried fruits and honey.',
  price: 80,
  detailedDescription: 'This refined Provençal dessert features a frozen parfait incorporating almonds, pistachios, and candied fruits, delicately scented with honey.'
},
        {
          name: 'CHOCOLATE FONDANT',
          description: 'Soft 70% dark chocolate cake with molten center, served with a scoop of vanilla ice cream',
          price: 80,
          detailedDescription: 'Our fondant is prepared with exceptional 70% dark chocolate, revealing a melting ganache center that flows at the first spoonful. Its airy texture perfectly contrasts with its intensity in the mouth, softened by vanilla ice cream served as an accompaniment.'
        },
        {
          name: 'TANGIER COOKIE',
          description: 'Homemade cookie with chocolate chunks, vanilla ice cream and salted caramel',
          price: 80,
          detailedDescription: 'Our signature cookie combines the perfect texture - crispy on the edges and soft in the center. Served warm with a scoop of vanilla and salted butter caramel ice cream that pairs perfectly with its sweet notes.'
        },
        {
          name: 'FRUIT PLATE',
          description: 'Selection of delicately prepared fresh seasonal fruits',
          price: 80,
          detailedDescription: 'A colorful and refreshing composition of carefully selected seasonal fruits at their perfect ripeness.'
        },
        {
          name: 'GOURMET COFFEE',
          description: 'Espresso accompanied by a trio of mini desserts: chocolate fondant, crème brûlée, and vanilla ice cream',
          price: 80,
          detailedDescription: 'An ideal end to the meal for the indecisive: our Ethiopian espresso is accompanied by a tasting of three iconic mini desserts from our menu. A bite-sized chocolate fondant, a crème brûlée served in a spoon, and a quenelle of vanilla ice cream on a bed of almond crumble.'
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
            <DessertMenuSection title={section.title} items={section.items} />
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