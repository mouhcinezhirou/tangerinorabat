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

const CassoletteMenuItem: React.FC<MenuItem & { onExpand: () => void, isExpanded: boolean }> = ({
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
      {/* Elementos decorativos */}
      <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-amber-200/30"></div>
      <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-amber-200/30"></div>
      
      {/* Contenido */}
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
      
      {/* Efecto de resaltado */}
      <div className="absolute -inset-2 bg-gradient-to-tr from-amber-500/5 to-amber-300/10 opacity-0 group-hover:opacity-100 transform translate-y-full group-hover:translate-y-0 transition-all duration-700 rounded-lg"></div>
    </motion.div>
  );
};

const CassoletteMenuSection: React.FC<MenuSection> = ({ title, items }) => {
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
          <CassoletteMenuItem
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

export default function CassolettesMenu() {
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

  // Todos los datos del menú en un solo lugar
  const menuSections: MenuSection[] = [
    {
      title: 'CAZUELITAS DEL MAR',
      items: [
{
        name: 'ANGULAS DE ESPAÑA (100GR)',
        description: 'Delicadas angulas españolas cocidas en aceite de oliva con ajo y guindilla',
        price: 650,
        detailedDescription: 'Este manjar excepcional nos llega directamente de las costas cántabras de España. Las angulas se preparan según la tradición vasca en cazuelitas de barro calentadas a alta temperatura. Cocidas con aceite de oliva virgen extra infusionado con ajo y realzadas con guindilla, revelan su textura única y su delicado sabor marino. Se sirven humeantes para saborear cada gota.'
      },
      {
        name: 'GAMBAS SALVAJES AL AJILLO Y GUINDILLA',
        description: 'Gambas salvajes flameadas en aceite aromatizado con ajo y guindilla roja',
        price: 180,
        detailedDescription: 'Nuestras gambas salvajes pescadas en el Mediterráneo se saltean en una cazuelita ardiente con aceite de oliva infusionado con ajo fresco y guindilla roja. El jugo de cocción picante y aromático es ideal para ser saboreado con nuestro pan casero crujiente. Un plato emblemático que despierta las papilas y evoca instantáneamente las tabernas mediterráneas.'
      },
{
  name: 'ALMEJAS A LA MARINERA',
  description: 'Almejas frescas abiertas en un sabroso caldo de pescado ligado con harina',
  price: 120,
  detailedDescription: 'Nuestras almejas vivas son cuidadosamente seleccionadas cada mañana y cocidas al momento en nuestras cazuelitas. Se abren delicadamente en un sabroso caldo de pescado ligeramente ligado con harina. Un clásico mediterráneo revisitado, donde la calidad excepcional del producto se pone de relieve con sabores auténticos y reconfortantes.'
},
      {
        name: 'PEZ ESPADA Y GAMBAS AL AJILLO',
        description: 'Medallones de pez espada fresco y gambas salteados con ajo',
        price: 160,
        detailedDescription: 'Elegantes medallones de pez espada fresco se saltean rápidamente con gambas en aceite infusionado con ajo y tomillo fresco. Este dúo marino se sirve en una cazuelita burbujeante que preserva todos sus sabores. Una pizca de pimiento de Espelette perfecciona este plato a la vez refinado y generoso. La alianza perfecta de dos tesoros del Mediterráneo, que el servicio en cazuelita hace aún más sabroso.'
      },
      {
        name: 'PEZ ESPADA Y ALMEJAS AL AJILLO',
        description: 'Combinación armoniosa de pez espada tierno y almejas jugosas con ajo',
        price: 160,
        detailedDescription: 'Esta cazuelita combina con elegancia la carne fundente del pez espada y el sabor yodado de las almejas. Los dos productos se cocinan por separado para respetar su textura, luego se reúnen en una cazuelita ardiente con aceite de oliva aromatizado con ajo, guindilla y perejil. El jugo de las almejas impregna delicadamente el pez espada, creando una sinfonía de sabores marinos realzada por el calor de la cazuelita que continúa la cocción en la mesa.'
      }
    ]
  },
  {
    title: 'CAZUELITAS DE LA TIERRA',
    items: [
      {
        name: 'CAZUELITA DE CHAMPIÑONES',
        description: 'Champiñones salteados con ajo, perejil y guindilla',
        price: 80,
        detailedDescription: 'Nuestra cazuelita pone de relieve los champiñones. Se saltean a fuego fuerte con ajo fresco y una pizca de guindilla, luego se aromatizan con perejil fresco. Esta preparación auténtica y depurada revela todo el sabor natural de los champiñones. Servido burbujeante, libera aromas intensos y sabrosos.'
      }
      ]
    }
  ];

  // Componente de divisor elegante para reducir la repetición
  const ElegantDivider = () => (
    <div className="flex items-center justify-center my-16">
      <div className="h-px w-16 bg-amber-200/30"></div>
      <div className="mx-3 text-amber-200/50">✦</div>
      <div className="h-px w-16 bg-amber-200/30"></div>
    </div>
  );

  return (
    <section ref={menuRef} className="py-20 bg-[#3e4c52] text-amber-50 relative">
      {/* Elementos de fondo */}
      <div className="absolute inset-0 opacity-10"></div>
      
      {/* Contenido del menú */}
      <div className="container mx-auto px-4">
        {menuSections.map((section, index) => (
          <div key={index}>
            <CassoletteMenuSection title={section.title} items={section.items} />
            {index < menuSections.length - 1 && <ElegantDivider />}
          </div>
        ))}
      </div>
      
      {/* Divisor elegante inferior */}
      <div className="flex items-center justify-center mt-20">
        <div className="h-px w-24 bg-amber-200/40"></div>
        <div className="mx-4 text-amber-200/60">✦</div>
        <div className="h-px w-24 bg-amber-200/40"></div>
      </div>
    </section>
  );
}