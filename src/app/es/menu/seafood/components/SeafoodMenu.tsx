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
      title: 'OSTRAS',
      gridCols: "grid-cols-1 md:grid-cols-3",
      items: [
        {
          name: "OSTRAS (6 PIEZAS)",
          description: "Ostras frescas del Atlántico, provenientes de Dakhla, servidas sobre hielo con limón y salsa mignonette",
          price: 100,
          detailedDescription: "Seleccionadas a mano en las aguas cristalinas del Atlántico, frente a Dakhla, estas delicias yodadas se abren al momento del pedido. Cada ostra carnosa trae la esencia del mar, acompañada de una delicada mignonette de chalota y vinagre."
        },        
        {
          name: 'OSTRAS (12 PIEZAS)',
          description: 'Una generosa selección de nuestras ostras premium con acompañamientos tradicionales',
          price: 180,
          detailedDescription: 'Una docena lujosa que presenta las mejores capturas diarias de diferentes regiones atlánticas, especialmente Dakhla. Servidas sobre un lecho de hielo picado con mignonette casera, rábano picante fresco y salsa picante artesanal.'
        },
        {
          name: 'OSTRAS A LA PARRILLA MIBRASA (6 PIEZAS)',
          description: 'Ostras a la parrilla con mantequilla de hierbas y ajo, cocinadas en nuestra Mibrasa',
          price: 120,
          detailedDescription: 'Estas ostras experimentan una transformación ahumada en nuestro horno Mibrasa, cada una acariciada con mantequilla de ajo y hierbas. El calor suave intensifica su yodo natural mientras añade una compleja nota ahumada.'
        }
      ]
    },
    {
      title: 'MARISCOS EXCLUSIVOS',
      items: [
        {
          name: 'GRATINADO DE MARISCOS',
          description: 'Una mezcla lujosa de mariscos frescos horneados con crema y pan rallado dorado',
          price: 130,
          detailedDescription: 'Un surtido decadente de crustáceos y pescados envueltos en una salsa aterciopelada de crema. Horneado hasta conseguir una costra dorada de parmesano y pan rallado con hierbas que añade un delicioso toque crujiente.'
        },
        {
          name: 'CEVICHE DE OSTRAS, CAMARONES Y PULPO',
          description: 'Mariscos frescos marinados en leche de tigre con hierbas mediterráneas, cebolla roja y aguacate',
          price: 180,
          detailedDescription: 'Una trilogía vibrante de tesoros marinos "cocinados" en leche de tigre, infusionados con cilantro y cebolla roja. Guarnecido con aguacate cremoso para un equilibrio perfecto de sabores y texturas.'
        },
        {
          name: 'CAMARONES ROJOS SALVAJES',
          description: 'Suculentos camarones rojos salvajes a la parrilla Mibrasa, servidos con una rica bisque casera',
          price: 190,
          detailedDescription: 'Los preciados camarones rojos mediterráneos, a la parrilla a la perfección con sus cáscaras que aportan un sabor intenso. Acompañados de una bisque sedosa elaborada con las cabezas tostadas, infusionada con azafrán e hinojo.'
        },
        {
          name: 'LONCHAS DE LANGOSTA',
          description: "Cola de langosta premium delicadamente laminada y dispuesta, acompañada de una aromática bisque de langosta servida en un vaso de chupito",
          price: 420,
          detailedDescription: "Cola de langosta de aguas frías, precisamente cortada y dispuesta en abanico para resaltar su carne tierna y nacarada. Servida con una intensa reducción de bisque de langosta, realzada con coñac y hierbas frescas para una experiencia gustativa inolvidable."
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