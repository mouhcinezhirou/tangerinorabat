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

  // All menu data in one place
  const menuSections: MenuSection[] = [
    {
      title: 'CASSOLETTES DE LA MER',
      items: [
        {
          name: 'ANGULAS D\'ESPAGNE (100GR)',
          description: 'Délicates civelles espagnoles cuites à l\'huile d\'olive, ail et piment doux',
          price: 650,
          detailedDescription: 'Ce mets d\'exception nous vient directement des côtes cantabriques d\'Espagne. Les angulas, ou civelles, sont préparées selon la tradition basque dans des cassolettes en terre cuite chauffées à haute température. Cuites avec une huile d\'olive extra vierge infusée à l\'ail et relevées d\'un soupçon de piment doux, elles révèlent leur texture unique et leur saveur marine délicate. Servies fumantes avec du pain croustillant pour en savourer chaque goutte.'
        },
        {
          name: 'CREVETTES SAUVAGES À L\'AIL ET PIMENT FORT',
          description: 'Crevettes sauvages flambées dans une huile parfumée à l\'ail et au piment rouge',
          price: 180,
          detailedDescription: 'Nos crevettes sauvages pêchées en Méditerranée sont saisies dans une cassolette brûlante avec une huile d\'olive infusée à l\'ail frais et au piment rouge. Le jus de cuisson épicé et parfumé est idéal pour être savouré avec notre pain maison croustillant. Un plat emblématique qui réveille les papilles et évoque instantanément les tavernes méditerranéennes.'
        },
        {
          name: 'PALOURDES À LA MARINIÈRE',
          description: 'Palourdes fraîches ouvertes dans un bain d\'huile d\'olive, ail et persil',
          price: 120,
          detailedDescription: 'Nos palourdes vivantes sont soigneusement sélectionnées chaque matin et cuites à la commande dans nos cassolettes traditionnelles en terre cuite. Elles s\'ouvrent délicatement dans un bain d\'huile d\'olive parfumée à l\'ail frais écrasé et au persil. Une touche de jus de citron vient équilibrer leur saveur iodée naturelle. Un classique méditerranéen d\'une simplicité trompeuse, où la qualité exceptionnelle du produit est mise à l\'honneur.'
        },
        {
          name: 'ESPADON ET CREVETTES À L\'AIL ',
          description: 'Médaillons d\'espadon frais et crevettes sautés à l\'ail et fines herbes',
          price: 160,
          detailedDescription: 'D\'élégants médaillons d\'espadon frais sont sautés rapidement avec des crevettes dans une huile infusée à l\'ail et au thym frais. Ce duo marin est servi dans une cassolette bouillonnante qui préserve toutes leurs saveurs. Une pointe de piment d\'Espelette, un filet de citron et quelques herbes fraîches viennent parfaire ce plat à la fois raffiné et généreux. L\'alliance parfaite de deux trésors de la Méditerranée, que le service en cassolette rend encore plus savoureux.'
        },
        {
          name: 'ESPADON ET PALOURDES À L\'AIL',
          description: 'Harmonieuse combinaison d\'espadon tendre et de palourdes juteuses à l\'ail',
          price: 160,
          detailedDescription: 'Cette cassolette marie avec élégance la chair fondante de l\'espadon et la saveur iodée des palourdes. Les deux produits sont cuits séparément pour respecter leur texture, puis réunis dans une cassolette brûlante avec une huile parfumée à l\'ail, au persil et au citron. Le jus des palourdes imprègne délicatement l\'espadon, créant une symphonie de saveurs marines sublimée par la chaleur de la cassolette en terre cuite qui continue la cuisson à table.'
        }
      ]
    },
    {
      title: 'CASSOLETTES DE LA TERRE',
      items: [
        {
          name: 'CASSOLETTE DE CHAMPIGNONS',
          description: 'Sélection de champignons sauvages et cultivés, ail confit et herbes fraîches',
          price: 80,
          detailedDescription: 'Notre cassolette réunit une collection de champignons soigneusement sélectionnés : cèpes, pleurotes, shiitakés et champignons de Paris. Ils sont sautés à feu vif puis mijotés lentement avec de l\'ail confit, du persil frais et une touche de crème. Une légère réduction de vin blanc et un filet d\'huile de truffe viennent parfaire ce plat terrestre aux saveurs profondes et réconfortantes. Servi bouillonnant, il libère des arômes boisés irrésistibles.'
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
            <CassoletteMenuSection title={section.title} items={section.items} />
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