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

const NouveauBadge: React.FC = () => (
  <motion.span
    className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-amber-950 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold tracking-wide ml-0 sm:ml-2 shrink-0"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.2 }}
  >
    <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
    </svg>
    NOUVEAU
  </motion.span>
);

const PoissonViandeMenuItem: React.FC<MenuItem & { onExpand: () => void, isExpanded: boolean }> = ({
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
              <NouveauBadge />
            </div>
          )}
          <div className="flex justify-between items-start gap-2">
            <div className="flex items-center flex-wrap gap-y-1 min-w-0">
              <h3 className="font-SweetSansProBold text-lg sm:text-xl font-serif tracking-wider text-amber-100 break-words">
                {name}
              </h3>
              {isNew && <span className="hidden sm:inline-flex"><NouveauBadge /></span>}
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

const PoissonViandeMenuSection: React.FC<MenuSection> = ({ title, items }) => {
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
          <PoissonViandeMenuItem
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

export default function PoissonViandeMenu() {
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
      title: 'POISSONS',
      items: [
        {
          name: 'ESPADON GRILLÉ',
          description: 'Espadon de Tanger frais à la BBQ',
          price: 220,
          detailedDescription: 'Notre espadon de Tanger frais est grillé à la BBQ pour préserver sa texture tendre et son goût délicat.'
        },
        {
          name: 'CALAMAR GRILLÉ',
          description: 'Calamars frais cuit à la BBQ avec son encre',
          price: 220,
          detailedDescription: 'Ce plat emblématique de la cuisine méditerranéenne présente des calamars frais cuits à la BBQ avec son encre.'
        },
        {
          name: 'FILET DE THON ROUGE',
          description: 'Thon rouge frais au charbon servi au style tataki',
          price: 220,
          detailedDescription: 'Notre thon rouge frais est grillé au charbon et servi au style tataki.'
        },
        {
          name: 'SAUMON GRILLÉ',
          description: 'Saumon frais cuit au charbon servi avec tranche de citron',
          price: 260,
          detailedDescription: 'Notre saumon frais est cuit au charbon et servi avec une tranche de citron.'
        },
        {
          name: 'CASSOLETTE DE SCORPIO AU PIL-PIL ÉPICÉ',
          description: 'Scorpio servie dans une sauce pil-pil épicée',
          price: 180,
          detailedDescription: 'Notre cassolette de scorpio au pil-pil épicé offre une expérience méditerranéenne authentique.'
        },
        {
          name: 'POISSON DU JOUR',
          description: 'Sélection de poissons frais du marché',
          price: 260,
          detailedDescription: 'Notre poisson du jour est une sélection de poissons frais directement du marché local.'
        },
        {
          name: 'ST PIERRE GRILLÉ',
          description: 'Grillé avec la peau',
          price: 340,
          detailedDescription: 'Ce poisson noble est grillé avec la peau pour développer toutes ses saveurs.'
        },
        {
          name: 'BAR DE LIGNE GRILLÉ',
          description: 'Filet de loup bar grillé au charbon',
          price: 280,
          detailedDescription: 'Notre filet de loup bar est grillé au charbon pour préserver sa saveur exceptionnelle.'
        },
        {
          name: 'CASSOLETTE DE BAR DE LIGNE',
          description: 'Servi avec des pommes de terre façon papas a lo pobre',
          price: 320,
          detailedDescription: 'Notre bar de ligne est servi avec des pommes de terre façon papas a lo pobre.'
        },
        {
          name: 'LOUP EN CROÛTE DE SEL',
          description: 'Loup de mer cuit avec gros sel servi avec huile d\'olive',
          price: 280,
          detailedDescription: 'Notre loup de mer est cuit avec du gros sel et servi avec de l\'huile d\'olive.'
        }
      ]
    },
    {
      title: 'VIANDES',
      items: [
        {
          name: 'FILET DE BŒUF GRILLÉ',
          description: 'Filet de bœuf grillé à la mibrasa accompagné d\'une sauce au choix',
          price: 290,
          detailedDescription: 'Notre filet de bœuf est grillé à la perfection selon votre préférence, pour une viande tendre et savoureuse. Il est accompagné d\'une sauce au choix qui apporte une touche complémentaire au caractère de la viande.'
        },
        {
          name: 'FILET DE BŒUF ÉMINCÉ SAUTÉ AVEC AIL & "PATATAS A LO POBRE"',
          description: 'Émincé de filet de bœuf sauté à l\'ail et au persil, pommes de terre rustiques à l\'espagnole',
          price: 280,
          detailedDescription: 'Notre filet de bœuf est finement émincé puis rapidement saisi à feu vif avec de l\'ail frais et du persil pour préserver sa tendreté et son jus. Il est servi avec des "patatas a lo pobre", ces pommes de terre traditionnelles espagnoles cuites lentement avec des oignons doux et des poivrons, imprégnées d\'huile d\'olive aromatisée.'
        },
        {
          name: 'ENTRECÔTE DE BŒUF GRILLÉE',
          description: 'Généreuse entrecôte maturée 15 jours grillée au charbon de bois, sauce au choix',
          price: 220,
          detailedDescription: 'Notre entrecôte de bœuf sélectionnée pour son persillage est maturée pendant 15 jours pour développer sa saveur exceptionnelle. Elle est grillée sur notre braise de charbon de bois qui lui confère des notes fumées uniques. Servie avec une sauce au choix qui se marie parfaitement avec la viande chaude.'
        },
        {
          name: 'CÔTE DE BŒUF GRILLÉE',
          description: 'Imposante côte de bœuf maturée 20 jours, grillée à la braise, fleur de sel de Camargue (1kg – 2 personnes)',
          price: 490,
          detailedDescription: 'Cette pièce d\'exception est maturée pendant 20 jours pour développer des arômes complexes et une tendreté incomparable. Grillée avec expertise sur notre braise de bois d\'olivier, elle est présentée entière puis découpée à table. Sa chair juteuse est simplement rehaussée d\'une fleur de sel de Camargue qui en exalte la saveur naturelle.'
        },
        {
          name: 'VIANDE HACHÉE "KEFTA"',
          description: 'Viande hachée avec épices marocaines',
          price: 140,
          detailedDescription: 'Nos keftas sont préparées à partir de viande hachée assaisonnée avec des épices marocaines.'
        },
        {
          name: 'PAILLARDE DE POULET ACCOMPAGNÉE D\'ÉPINARDS SAUTÉS',
          description: 'Suprême de poulet aplati et grillé, épinards frais sautés à l\'ail',
          price: 160,
          detailedDescription: 'Notre suprême de poulet est délicatement aplati puis mariné aux herbes fraîches avant d\'être grillé pour obtenir une chair moelleuse et tendre. Il est accompagné d\'épinards frais rapidement sautés à l\'ail et d\'un filet d\'huile d\'olive citronnée qui apporte fraîcheur et légèreté.'
        },
        {
          name: 'ESCALOPINES AU CITRON',
          description: 'Château de riz blanc parfumé à l\'ail et au laurier',
          price: 240,
          detailedDescription: 'Escalopines au citron servies avec un château de riz blanc parfumé à l\'ail et au laurier.',
          isNew: true
        }
      ]
    },
    {
      title: 'ACCOMPAGNEMENTS',
      items: [
        {
          name: 'LÉGUMES SAUTÉS',
          description: 'Légumes de saison avec sauce soja façon wok',
          price: 50,
          detailedDescription: 'Une sélection de légumes de saison sautés avec sauce soja façon wok.'
        },
        {
          name: 'FRITES MAISON',
          description: 'Frites rustiques coupées à la main, double cuisson et fleur de sel',
          price: 50,
          detailedDescription: 'Nos pommes de terre sélectionnées sont épluchées et coupées à la main en bâtonnets généreux, puis cuites deux fois selon la méthode traditionnelle belge : d\'abord à basse température pour cuire l\'intérieur, puis à haute température pour une croûte dorée et croustillante. Servies avec une pincée de fleur de sel.'
        },
        {
          name: 'POMMES DE TERRE "A LO POBRE"',
          description: 'Pommes de terre mijotées à l\'espagnole avec oignons, poivrons et huile d\'olive',
          price: 50,
          detailedDescription: 'Cette recette traditionnelle espagnole consiste en des pommes de terre coupées en fines tranches, cuites lentement dans l\'huile d\'olive avec des oignons doux et des poivrons qui caramélisent doucement. Le résultat est un accompagnement fondant, imprégné des saveurs méditerranéennes, avec une légère coloration dorée.'
        },
        {
          name: 'PURÉE DE POMMES DE TERRE',
          description: 'Onctueuse purée de pommes de terre à la crème fraîche et beurre noisette',
          price: 50,
          detailedDescription: 'Notre purée est préparée avec des pommes de terre Ratte à la chair fondante, écrasées à la fourchette pour conserver du caractère. Enrichie de crème fraîche épaisse et de beurre légèrement noisette, elle offre une texture à la fois aérienne et réconfortante, subtilement parfumée à la noix de muscade fraîchement râpée.'
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
            <PoissonViandeMenuSection title={section.title} items={section.items} />
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