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
          name: 'PROFITEROL DE PRALINÉ',
          description: 'Delicado profiterol con praliné y croustillant crujiente, acompañado de una bola de helado de vainilla de Madagascar',
          price: 80,
          detailedDescription: 'Nuestra crujiente masa choux contiene una untuosa crema de praliné con avellanas caramelizadas y almendras tostadas. Esta pequeña obra maestra está coronada con un craquelin dorado y servida con una bola de helado de vainilla de Madagascar con intensos granos que se derrite delicadamente contra la tibieza del profiterol.'
        },
        {
          name: 'CARPACCIO DE PIÑA',
          description: 'Finas rodajas de piña fresca con crema inglesa y helado de vainilla',
          price: 95,
          detailedDescription: 'Un postre fresco y exótico donde las finas rodajas de piña se combinan con la dulzura de una untuosa crema inglesa y un aterciopelado helado de vainilla. Un final ligero y aromático para concluir su comida con belleza.'
        },
        {
          name: 'TARTA DE LIMÓN TANGERINA',
          description: 'Tarta de limón al estilo tangerino con limón y leche condensada',
          price: 80,
          detailedDescription: 'Sobre una fina masa quebrada crujiente reposa una crema de limón de Mentón perfectamente equilibrada entre acidez y dulzura.'
        },
        {
          name: 'TIRAMISÚ',
          description: 'Tiramisú clásico con bizcochos embebidos en café, mascarpone aéreo y cacao amargo',
          price: 80,
          detailedDescription: 'Nuestro tiramisú respeta la receta tradicional italiana: bizcochos savoiardi delicadamente embebidos en un café expreso intenso, cubiertos con una crema de mascarpone de incomparable ligereza. Una fina capa de cacao amargo espolvoreada al momento aporta la nota final a este postre intemporal.'
        },
{
  name: 'TARTA DE QUESO',
  description: 'Tarta de queso façon española',
  price: 80,
  detailedDescription: 'Nuestra tarta de queso façon española está preparada con una mezcla aterciopelada de queso fresco y crema. Su textura sedosa y cremosa ofrece una experiencia gustativa rica y delicada, perfectamente equilibrada.'
},
{
  name: 'TURRÓN HELADO',
  description: 'Parfait helado con frutos secos y miel.',
  price: 80,
  detailedDescription: 'Este refinado postre provenzal presenta un parfait helado que incorpora almendras, pistachos y frutas confitadas, delicadamente perfumado con miel.'
},
        {
          name: 'COULANT DE CHOCOLATE',
          description: 'Bizcocho de chocolate negro 70% con corazón fundente, servido con una bola de helado de vainilla',
          price: 80,
          detailedDescription: 'Nuestro coulant está preparado con un chocolate negro excepcional al 70% de cacao, cuyo corazón revela una ganache fundente que fluye a la primera cucharada. Su textura aérea contrasta perfectamente con su intensidad en boca, suavizada por un helado de vainilla como acompañamiento.'
        },
        {
          name: 'COOKIE TANGERINO',
          description: 'Cookie casera con trozos de chocolate, helado de vainilla y caramelo de mantequilla salada',
          price: 80,
          detailedDescription: 'Nuestra cookie insignia combina la textura perfecta - crujiente en los bordes y tierna en el centro. Servida tibia con una bola de helado de vainilla y caramelo de mantequilla salada que se casa perfectamente con sus notas dulces.'
        },
        {
          name: 'PLATO DE FRUTAS',
          description: 'Selección de frutas frescas de temporada delicadamente preparadas',
          price: 80,
          detailedDescription: 'Una composición colorida y refrescante de frutas de temporada cuidadosamente seleccionadas en su perfecta madurez.'
        },
        {
          name: 'CAFÉ GOURMET',
          description: 'Espresso acompañado de un trío de mini postres: coulant de chocolate, crema catalana y helado de vainilla',
          price: 80,
          detailedDescription: 'Un final de comida ideal para los indecisos: nuestro café espresso de origen etíope se acompaña de una degustación de tres mini postres emblemáticos de nuestra carta. Un coulant de chocolate en formato miniatura, una crema catalana servida en una cuchara y una quenelle de helado de vainilla colocada sobre una cama de crumble de almendras.'
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