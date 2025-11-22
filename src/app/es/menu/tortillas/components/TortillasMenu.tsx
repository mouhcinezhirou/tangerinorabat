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

const NuevoBadge: React.FC = () => (
  <motion.span
    className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-amber-950 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold tracking-wide ml-0 sm:ml-2 shrink-0"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.2 }}
  >
    <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
    </svg>
    NUEVO
  </motion.span>
);

const HuevosFriturasMenuItem: React.FC<MenuItem & { onExpand: () => void, isExpanded: boolean }> = ({
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
              <NuevoBadge />
            </div>
          )}
          <div className="flex justify-between items-start gap-2">
            <div className="flex items-center flex-wrap gap-y-1 min-w-0">
              <h3 className="font-SweetSansProBold text-lg sm:text-xl font-serif tracking-wider text-amber-100 break-words">
                {name}
              </h3>
              {isNew && <span className="hidden sm:inline-flex"><NuevoBadge /></span>}
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

const HuevosFriturasMenuSection: React.FC<MenuSection> = ({ title, items }) => {
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
          <HuevosFriturasMenuItem
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

export default function HuevosFriturasMenu() {
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
      title: 'TORTILLAS Y HUEVOS',
      items: [
        {
          name: 'TORTILLA ESPAÑOLA CON CHORIZO',
          description: 'La tortilla tradicional española enriquecida con sabroso chorizo ligeramente picante',
          price: 90,
          detailedDescription: 'Nuestra tortilla está preparada según la receta tradicional con patatas confitadas en aceite de oliva, a las que añadimos un chorizo artesanal ligeramente picante. Cocida lentamente para obtener un corazón suave y cremoso, se sirve tibia para apreciar todos los sabores.'
        },
        {
          name: 'TORTILLA ESPAÑOLA CLÁSICA',
          description: 'La auténtica tortilla española de patatas',
          price: 70,
          detailedDescription: 'Nuestra tortilla tradicional está preparada con patatas cuidadosamente seleccionadas, confitadas a baja temperatura en nuestro aceite de oliva virgen extra. Se cocina a la perfección para ofrecer un contraste entre el exterior ligeramente dorado y un corazón tierno y cremoso.'
        },
        {
          name: 'TORTILLA ESPAÑOLA CON ESPINACAS Y MANCHEGO',
          description: 'Variante delicada de la tortilla clásica con espinacas frescas y manchego curado',
          price: 90,
          detailedDescription: 'Esta elegante versión de nuestra tortilla combina la suavidad de las espinacas frescas ligeramente pochadas y la riqueza del queso manchego curado durante 6 meses. La combinación de patatas cremosas, espinacas y queso crea un equilibrio perfecto entre suavidad y carácter.'
        },
        {
          name: 'HUEVOS ROTOS CON CHORIZO (HALAL)',
          description: 'Huevos cocidos sobre un lecho de patatas con chorizo a la plancha',
          price: 95,
          detailedDescription: 'Nuestros huevos de yemas naranjas están delicadamente cocidos sobre un lecho de patatas tiernas y acompañados de chorizo halal ligeramente a la plancha. La yema líquida se mezcla con las patatas y el chorizo para crear una armonía de sabores rústicos y reconfortantes.'
        }
      ]
    },
    {
      title: 'FRITURAS',
      items: [
        {
          name: 'BOQUERONES AL LIMÓN',
          description: 'Boquerones frescos marinados en limón, rebozados en fina harina, fritos a la perfección',
          price: 80,
          detailedDescription: 'Nuestros boquerones frescos están delicadamente fileteados y luego rebozados en una ligera masa tempura antes de ser fritos al momento. Crujientes por fuera y tiernos por dentro, se sirven con gajos de limón fresco y una pizca de flor de sal para realzar su sabor marino.'
        },
        {
          name: 'GAMBAS POPCORN',
          description: 'Gambas crujientes estilo popcorn con salsa cóctel casera',
          price: 80,
          detailedDescription: 'Nuestras gambas están rebozadas en pan rallado crujiente, luego fritas a la perfección para obtener un exterior dorado y crujiente mientras preservan la ternura de la carne. Servidas con nuestra salsa cóctel casera ligeramente picante, es una delicia irresistible.'
        },
        {
          name: 'CALAMARES FRITOS',
          description: 'Anillas de calamar tierno en fritura ligera, servidos con salsa tártara',
          price: 140,
          detailedDescription: 'Inspirados en la tradición andaluza, nuestros calamares se sumergen en una masa de freír aireada y luego se fríen rápidamente a alta temperatura para preservar su ternura. Servidos con salsa tártara casera y un toque de perejil fresco picado, ofrecen un equilibrio perfecto entre crujiente y tierno.'
        },
        {
          name: 'CROQUETAS DE POLLO',
          description: 'Croquetas cremosas de pollo con setas silvestres y queso fundido',
          price: 80,
          detailedDescription: 'Nuestras croquetas están preparadas con una bechamel suave enriquecida con pollo deshilachado, setas silvestres salteadas y una mezcla de quesos curados. El conjunto está rebozado en pan rallado dorado y frito hasta obtener una cáscara crujiente que revela un corazón fundente y sabroso.'
        },
        {
          name: 'CROQUETAS DE GAMBAS',
          description: 'Croquetas cremosas de gambas con bisque casero, aromatizadas con pimiento de Espelette',
          price: 80,
          detailedDescription: 'Estas delicadas croquetas están elaboradas a partir de un bisque de gambas reducido y concentrado, incorporado a una bechamel sedosa con trozos de gambas. Un ligero toque de pimiento de Espelette aporta un calor sutil que realza los sabores marinos, todo envuelto en una fina corteza dorada y crujiente.'
        },
        {
          name: 'FISH & CHIPS',
          description: 'Filete de bacalao en tempura crujiente con patatas en espiral',
          price: 160,
          detailedDescription: 'Nuestra interpretación del clásico británico combina un filete de bacalao ultra-fresco rebozado en masa tempura crujiente y aireada, servido con nuestras patatas Hurricane en espiral de textura incomparable. Todo acompañado de salsa tártara casera con alcaparras crujientes y pepinillos finamente picados.'
        },
        {
          name: 'FRITURA DE TEMPORADA',
          description: 'Salmonetes pequeños y eperlano crujiente',
          price: 160,
          detailedDescription: 'Una fritura de temporada compuesta de salmonetes pequeños y eperlano crujiente.',
          isNew: true
        },
        {
          name: 'FRITURA DE PESCADO',
          description: 'Generosa selección de pescados y mariscos fritos a la perfección',
          price: 220,
          detailedDescription: 'Esta fritura real propone una selección variada de pescados mediterráneos, calamares, gambas y buñuelos de bacalao, cada uno rebozado en un empanado específico que realza su sabor natural. El surtido se sirve con nuestra salsa tártara casera para satisfacer todos los gustos.'
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
            <HuevosFriturasMenuSection title={section.title} items={section.items} />
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