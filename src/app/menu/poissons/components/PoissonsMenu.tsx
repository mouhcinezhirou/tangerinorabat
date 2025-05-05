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

const PoissonViandeMenuItem: React.FC<MenuItem & { onExpand: () => void, isExpanded: boolean }> = ({
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

  // All menu data in one place
  const menuSections: MenuSection[] = [
    {
      title: 'POISSONS',
      items: [
        {
          name: 'ESPADON GRILLÉ',
          description: 'Médaillon d\'espadon grillé à la flamme avec émulsion au citron vert et câpres',
          price: 220,
          detailedDescription: 'Notre espadon, pêché en Méditerranée, est délicatement mariné puis grillé à la flamme pour préserver sa texture tendre et son goût délicat. Servi avec une émulsion légère au citron vert et câpres qui sublime ses saveurs marines, accompagné d\'une touche d\'huile d\'olive au persil frais.'
        },
        {
          name: 'CALAMAR AVEC SON ENCRE',
          description: 'Calamar entier cuit lentement dans sa propre encre avec riz noir et légumes confits',
          price: 220,
          detailedDescription: 'Ce plat emblématique de la cuisine méditerranéenne présente un calamar entier cuit doucement dans une sauce à base de sa propre encre, d\'ail et de vin blanc. La chair tendre du calamar se marie parfaitement avec le riz noir crémeux et les légumes confits qui l\'accompagnent.'
        },
        {
          name: 'FILET DE THON ROUGE',
          description: 'Filet de thon rouge mi-cuit, mariné au sésame et soja, purée de patate douce au gingembre',
          price: 220,
          detailedDescription: 'Notre thon rouge issu de pêche durable est brièvement mariné dans une sauce au sésame et soja avant d\'être saisi rapidement pour conserver un cœur rosé. Il est servi avec une onctueuse purée de patate douce parfumée au gingembre frais qui équilibre parfaitement ses notes iodées.'
        },
        {
          name: 'SAUMON GRILLÉ',
          description: 'Filet de saumon Label Rouge grillé aux herbes fraîches et citron confit',
          price: 260,
          detailedDescription: 'Notre filet de saumon d\'Écosse Label Rouge est mariné dans un mélange d\'herbes fraîches puis grillé à la perfection, la peau croustillante et la chair fondante. Servi avec des quartiers de citron confit et une sauce vierge aux herbes qui rehaussent délicatement la richesse naturelle du poisson.'
        },
        {
          name: 'ST PIERRE GRILLÉ',
          description: 'Saint-Pierre entier grillé au four à bois, huile d\'olive aux herbes provençales',
          price: 260,
          detailedDescription: 'Ce poisson noble est délicatement grillé entier dans notre four à bois pour développer toutes ses saveurs. Sa chair ferme et délicate est sublimée par une huile d\'olive infusée aux herbes de Provence et une touche de fleur de sel. Un classique méditerranéen d\'une simplicité raffinée.'
        },
        {
          name: 'BAR DE LIGNE GRILLÉ',
          description: 'Bar sauvage grillé entier aux agrumes et fenouil confit',
          price: 280,
          detailedDescription: 'Notre bar de ligne pêché au large des côtes méditerranéennes est grillé entier pour préserver sa saveur exceptionnelle. La chair nacrée et délicate du poisson est parfumée aux agrumes et accompagnée de fenouil doucement confit qui apporte une note anisée subtile et rafraîchissante.'
        },
        {
          name: 'BAR DE LIGNE ET POMMES DE TERRE À LA CASSOLETTE',
          description: 'Bar sauvage cuit en cocotte avec pommes de terre fondantes, olives et tomates confites',
          price: 320,
          detailedDescription: 'Cette préparation traditionnelle présente notre bar de ligne cuit en cocotte avec des pommes de terre qui s\'imprègnent des sucs du poisson, des olives Taggiasche, des tomates confites et un bouquet d\'herbes fraîches. Le tout est nappé d\'un fumet réduit au vin blanc et servi directement dans sa cassolette.'
        },
        {
          name: 'LOUP EN CROÛTE DE SEL',
          description: 'Loup de mer cuit en croûte de sel de Camargue aux herbes aromatiques',
          price: 280,
          detailedDescription: 'Cette méthode de cuisson ancestrale consiste à enfermer notre loup de mer dans une croûte de sel de Camargue mêlé d\'herbes aromatiques. Cuite au four, la chair du poisson reste incroyablement juteuse et s\'imprègne délicatement des arômes d\'herbes. La croûte est brisée devant vous pour un service spectaculaire.'
        }
      ]
    },
    {
      title: 'VIANDES',
      items: [
        {
          name: 'FILET DE BŒUF GRILLÉ',
          description: 'Filet de bœuf Black Angus grillé, réduction au Porto et échalotes confites',
          price: 290,
          detailedDescription: 'Notre filet de bœuf Black Angus est grillé à la perfection selon votre préférence, pour une viande tendre et savoureuse. Il est accompagné d\'une réduction onctueuse au Porto vieilli et d\'échalotes doucement confites qui apportent une touche de douceur contrastant avec le caractère de la viande.'
        },
        {
          name: 'FILET DE BŒUF ÉMINCÉ SAUTÉ AVEC AIL & "PATATAS A LO POBRE"',
          description: 'Émincé de filet de bœuf sauté à l\'ail et au persil, pommes de terre rustiques à l\'espagnole',
          price: 280,
          detailedDescription: 'Notre filet de bœuf est finement émincé puis rapidement saisi à feu vif avec de l\'ail frais et du persil pour préserver sa tendreté et son jus. Il est servi avec des "patatas a lo pobre", ces pommes de terre traditionnelles espagnoles cuites lentement avec des oignons doux et des poivrons, imprégnées d\'huile d\'olive aromatisée.'
        },
        {
          name: 'ENTRECÔTE DE BŒUF GRILLÉE',
          description: 'Généreuse entrecôte maturée grillée au charbon de bois, beurre maître d\'hôtel',
          price: 220,
          detailedDescription: 'Notre entrecôte de bœuf sélectionnée pour son persillage est maturée pendant 30 jours pour développer sa saveur exceptionnelle. Elle est grillée sur notre braise de charbon de bois qui lui confère des notes fumées uniques. Servie avec un beurre maître d\'hôtel maison qui se fond délicatement sur la viande chaude.'
        },
        {
          name: 'CÔTE DE BŒUF GRILLÉE',
          description: 'Imposante côte de bœuf maturée, grillée à la braise, fleur de sel de Camargue (1kg – 2 personnes)',
          price: 490,
          detailedDescription: 'Cette pièce d\'exception est maturée pendant 40 jours pour développer des arômes complexes et une tendreté incomparable. Grillée avec expertise sur notre braise de bois d\'olivier, elle est présentée entière puis découpée à table. Sa croûte caramélisée et sa chair juteuse sont simplement rehaussées d\'une fleur de sel de Camargue qui en exalte la saveur naturelle.'
        },
        {
          name: 'VIANDE HACHÉE "KEFTA"',
          description: 'Brochettes de viande hachée aux épices orientales, sauce yaourt à la menthe',
          price: 140,
          detailedDescription: 'Nos keftas sont préparées à partir de viande de bœuf hachée à la main et assaisonnée d\'un mélange d\'épices orientales soigneusement dosées : cumin, paprika, coriandre et menthe fraîche. Grillées sur la braise, elles sont servies avec une sauce légère au yaourt grec, menthe fraîche et concombre râpé.'
        },
        {
          name: 'PAILLARDE DE POULET ACCOMPAGNÉE D\'ÉPINARDS SAUTÉS',
          description: 'Suprême de poulet fermier aplati et grillé, épinards frais sautés à l\'ail',
          price: 160,
          detailedDescription: 'Notre suprême de poulet fermier est délicatement aplati puis mariné aux herbes fraîches avant d\'être grillé pour obtenir une chair moelleuse et une peau croustillante. Il est accompagné d\'épinards frais rapidement sautés à l\'ail et d\'un filet d\'huile d\'olive citronnée qui apporte fraîcheur et légèreté.'
        }
      ]
    },
    {
      title: 'ACCOMPAGNEMENTS',
      items: [
        {
          name: 'LÉGUMES SAUTÉS',
          description: 'Assortiment de légumes de saison sautés à l\'huile d\'olive et aux herbes fraîches',
          price: 50,
          detailedDescription: 'Une sélection colorée de légumes de saison – courgettes, poivrons, aubergines, tomates cerises – rapidement sautés à l\'huile d\'olive extra vierge pour préserver leur croquant et leurs saveurs. Parfumés d\'herbes fraîches du jardin et d\'une touche d\'ail, ils offrent une accompagnement léger et savoureux.'
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
      
      {/* Section Title */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }} /* Always animate in */
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-SweetSansProBold font-serif text-4xl md:text-5xl tracking-wider text-amber-50 mb-4">Poissons & Viandes</h2>
        <div className="flex items-center justify-center mb-6">
          <div className="h-px w-12 bg-amber-200/40"></div>
          <div className="mx-4 text-amber-200/60">✦</div>
          <div className="h-px w-12 bg-amber-200/40"></div>
        </div>
        <p className="text-amber-100/70 font-light max-w-2xl mx-auto">
          Des trésors de la mer aux délices terrestres, découvrez nos poissons frais et viandes d'exception préparés selon les traditions méditerranéennes
        </p>
      </motion.div>
      
      {/* Menu content */}
      <div className="container mx-auto px-4">
        {menuSections.map((section, index) => (
          <div key={index}>
            <PoissonViandeMenuSection title={section.title} items={section.items} />
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