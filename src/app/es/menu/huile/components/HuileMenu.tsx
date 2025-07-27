'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  name: string;
  description: string;
  price: number | string;
  detailedDescription?: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const HuileMenuItem: React.FC<MenuItem & { onExpand: () => void, isExpanded: boolean, featured?: boolean }> = ({
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
            <span className="mr-1">{isExpanded ? 'Menos' : 'Detalles'}</span>
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

const HuileMenuSection: React.FC<MenuSection & { gridCols?: string }> = ({ title, items, gridCols = "grid-cols-1 md:grid-cols-2" }) => {
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
          <HuileMenuItem
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

// Elegant divider component
const ElegantDivider = () => (
  <div className="flex items-center justify-center my-16">
    <div className="h-px w-16 bg-amber-200/30"></div>
    <div className="mx-3 text-amber-200/50">✦</div>
    <div className="h-px w-16 bg-amber-200/30"></div>
  </div>
);

export default function HuileMenuPage() {
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

  // Menu data
  const menuSections: (MenuSection & { gridCols?: string })[] = [
    {
      title: 'ACEITE DE OLIVA PREMIUM',
      gridCols: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      items: [
        {
          name: "DEGUSTACIÓN ORO VERDE",
          description: "Una porción de nuestro aceite de oliva virgen extra galardonado, servido con pan artesanal",
          price: 38,
          detailedDescription: "Descubre los sabores excepcionales de nuestro aceite de oliva 'Los Guardianes del Crisal' en una degustación guiada. Este aceite de cosecha temprana revela un sabor afrutado intenso con delicadas notas de tomate fresco. Ganador del premio Mezquita y clasificado entre los 10 mejores aceites del mundo."
        },
        {
          name: "BOTELLA ORO VERDE",
          description: "Llévate a casa nuestro aceite de oliva exclusivo en botella de 500ml",
          price: 380,
          detailedDescription: "Este aceite de oliva virgen extra de primera prensada en frío es exclusivo de Marruecos para los restaurantes Tangerino. Elaborado con aceitunas cosechadas en madurez temprana, conserva todos sus aromas y beneficios nutricionales. Un tesoro culinario para descubrir y compartir."
        }
      ]
    }
  ];

  return (
    <section ref={menuRef} className="py-20 bg-[#3e4c52] text-amber-50 relative">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-[url('/texture.png')] bg-repeat opacity-10"></div>
      </div>
      
      {/* Menu content */}
      <div className="container mx-auto px-4">
        {menuSections.map((section, index) => (
          <div key={index}>
            <HuileMenuSection
              title={section.title}
              items={section.items}
              gridCols={section.gridCols}
            />
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