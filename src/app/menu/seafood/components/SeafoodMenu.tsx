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
            <span className="mr-1">{isExpanded ? 'Moins' : 'Détails'}</span>
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
      title: 'HUÎTRES',
      gridCols: "grid-cols-1 md:grid-cols-3",
      items: [
        {
          name: "HUÎTRES (6 PIÈCES)",
          description: "Huîtres fraîches de l'Atlantique, provenant de Dakhla, servies sur glace avec citron et sauce mignonette",
          price: 100,
          detailedDescription: "Sélectionnées à la main dans les eaux cristallines de l'Atlantique, au large de Dakhla, ces délices iodés sont ouverts à la commande. Chaque huître charnue porte l'essence de la mer, accompagnée d'une délicate mignonette à l'échalote et au vinaigre."
        },        
        {
          name: 'HUÎTRES (12 PIÈCES)',
          description: 'Une généreuse sélection de nos huîtres premium avec accompagnements traditionnels',
          price: 180,
          detailedDescription: 'Une douzaine luxueuse présentant les meilleures pêches quotidiennes de différentes régions atlantiques, notamment Dakhla. Servies sur un lit de glace pilée avec mignonette maison, raifort frais et sauce piquante artisanale.'
        },
        {
          name: 'HUÎTRES GRILLÉES A LA MIBRASA (6 PIÈCES)',
          description: 'Huîtres grillées au beurre aux herbes et à l\'ail, cuites dans notre Mibrasa',
          price: 120,
          detailedDescription: 'Ces huîtres subissent une transformation fumée dans notre four Mibrasa, chacune caressée d\'un beurre à l\'ail et aux herbes. La chaleur douce intensifie leur iode naturelle tout en ajoutant une note grillée complexe.'
        }
      ]
    },
    {
      title: 'FRUITS DE MER SIGNATURE',
      items: [
        {
          name: 'GRATIN DE FRUITS DE MER',
          description: 'Un mélange luxueux de fruits de mer frais cuits au four avec crème, et chapelure dorée',
          price: 130,
          detailedDescription: 'Un assortiment décadent de crustacés et de poissons enveloppés dans une sauce veloutée à la crème. Cuit au four jusqu\'à obtenir une croûte dorée de parmesan et de chapelure aux herbes qui ajoute un croustillant délicieux.'
        },
        {
          name: 'CEVICHE D\'HUÎTRES, CREVETTES ET POULPE',
          description: 'Fruits de mer frais marinés dans du leche de tigre avec des herbes méditerranéennes, oignon rouge et avocat',
          price: 180,
          detailedDescription: 'Une trilogie vibrante de trésors marins "cuits" dans des leche de tigre, infusés de coriandre et d\'oignon rouge. Garni d\'avocat crémeux pour un équilibre parfait de saveurs et de textures.'
        },
        {
          name: 'CREVETTES ROUGES SAUVAGES',
          description: 'Succulentes crevettes rouges sauvages grillées au barbecue Mibrasa, servies avec une riche bisque maison',
          price: 190,
          detailedDescription: 'Les précieuses crevettes rouges méditerranéennes, grillées à la perfection avec leurs carapaces qui confèrent une saveur intense. Accompagnées d\'une bisque soyeuse élaborée à partir des têtes rôties, infusée au safran et au fenouil.'
        },
        {
          name: 'EMNICÉ DE LANGOUSTE',
          description: "Queue de langouste premium délicatement tranchée et disposée, accompagnée d'une bisque de langouste aromatique servie dans un verre à shot",
          price: 420,
          detailedDescription: "Queue de langouste d'eau froide, précisément tranchée et disposée en éventail pour mettre en valeur sa chair tendre et nacrée. Servie avec une réduction intense de bisque de langouste, rehaussée de cognac et d'herbes fraîches pour une expérience gustative inoubliable."
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