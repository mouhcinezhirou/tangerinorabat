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

const SeafoodMenuItem: React.FC<MenuItem & { onExpand: () => void, isExpanded: boolean, featured?: boolean }> = ({
  name,
  description,
  price,
  detailedDescription,
  onExpand,
  isExpanded,
  featured
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
      className={`bg-amber-900/20 backdrop-blur-sm rounded-lg p-6 border border-amber-200/20 relative overflow-hidden group ${
        featured ? 'md:col-span-2' : ''
      }`}
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

const SeafoodMenuSection: React.FC<MenuSection & { gridCols?: string }> = ({ title, items, gridCols = "grid-cols-1 md:grid-cols-2" }) => {
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
      
      <div className={`grid ${gridCols} gap-8`}>
        {items.map((item, index) => (
          <SeafoodMenuItem
            key={index}
            {...item}
            onExpand={() => handleExpand(index)}
            isExpanded={expandedItem === index}
            featured={(item as any).featured}
          />
        ))}
      </div>
    </motion.div>
  );
};

// Elegant divider component to reduce repetition
const ElegantDivider = () => (
  <div className="flex items-center justify-center my-16">
    <div className="h-px w-16 bg-amber-200/30"></div>
    <div className="mx-3 text-amber-200/50">✦</div>
    <div className="h-px w-16 bg-amber-200/30"></div>
  </div>
);

export default function SeafoodMenuPage() {
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
  const menuSections: (MenuSection & { gridCols?: string })[] = [
    {
      title: 'OYSTERS',
      gridCols: "grid-cols-1 md:grid-cols-3",
      items: [
        {
          name: "OYSTERS (6 PIECES)",
          description: "Fresh Atlantic oysters, sourced from Dakhla, served on ice with lemon and mignonette sauce",
          price: 100,
          detailedDescription: "Hand-selected from the crystal-clear waters of the Atlantic, off the coast of Dakhla, these briny delicacies are shucked to order. Each plump oyster carries the essence of the sea, accompanied by a delicate shallot and vinegar mignonette."
        },        
        {
          name: 'OYSTERS (12 PIECES)',
          description: 'A generous selection of our premium oysters with traditional accompaniments',
          price: 180,
          detailedDescription: 'A luxurious dozen featuring the best daily catches from different Atlantic regions, particularly Dakhla. Served on a bed of crushed ice with house-made mignonette, fresh horseradish, and artisanal hot sauce.'
        },
        {
          name: 'MIBRASA GRILLED OYSTERS (6 PIECES)',
          description: 'Oysters grilled with herb and garlic butter, cooked in our Mibrasa',
          price: 120,
          detailedDescription: 'These oysters undergo a smoky transformation in our Mibrasa oven, each one brushed with garlic and herb butter. The gentle heat intensifies their natural brininess while adding a complex charred note.'
        }
      ]
    },
    {
      title: 'SIGNATURE SEAFOOD',
      items: [
        {
          name: 'SEAFOOD GRATIN',
          description: 'A luxurious blend of fresh seafood baked with cream and golden breadcrumbs',
          price: 130,
          detailedDescription: 'A decadent assortment of shellfish and fish enveloped in a velvety cream sauce. Baked until topped with a golden crust of parmesan and herbed breadcrumbs that adds a delicious crunch.'
        },
        {
          name: 'OYSTER, SHRIMP AND OCTOPUS CEVICHE',
          description: 'Fresh seafood marinated in leche de tigre with Mediterranean herbs, red onion and avocado',
          price: 180,
          detailedDescription: 'A vibrant trilogy of marine treasures "cooked" in zesty leche de tigre, infused with cilantro and red onion. Garnished with creamy avocado for a perfect balance of flavors and textures.'
        },
        {
          name: 'WILD RED SHRIMP',
          description: 'Succulent wild red shrimp grilled on the Mibrasa barbecue, served with a rich house-made bisque',
          price: 190,
          detailedDescription: 'Precious Mediterranean red prawns, grilled to perfection with their shells on for intense flavor. Accompanied by a silky bisque crafted from the roasted heads, infused with saffron and fennel.'
        },
        {
          name: 'LOBSTER MEDALLIONS',
          description: "Premium lobster tail delicately sliced and arranged, accompanied by an aromatic lobster bisque served in a shot glass",
          price: 420,
          detailedDescription: "Cold-water lobster tail, precisely sliced and arranged in a fan to showcase its tender, pearlescent flesh. Served with an intense reduction of lobster bisque, enhanced with cognac and fresh herbs for an unforgettable tasting experience."
        }
      ]
    }
  ];

  return (
    <section ref={menuRef} className="py-20 bg-[#3e4c52] text-amber-50 relative">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10"></div>
      
      
      {/* Menu content */}
      <div className="container mx-auto px-4">
        {menuSections.map((section, index) => (
          <div key={index}>
            <SeafoodMenuSection
              title={section.title}
              items={section.items}
              gridCols={section.gridCols}
            />
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