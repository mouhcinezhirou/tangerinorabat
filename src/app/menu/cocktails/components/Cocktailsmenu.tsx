'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CocktailItem {
  name: string;
  description: string;
  price: number | null;
  detailedDescription?: string;
}

interface CocktailSection {
  title: string;
  items: CocktailItem[];
}

const CocktailMenuItem: React.FC<CocktailItem & { onExpand: () => void, isExpanded: boolean }> = ({
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

const CocktailMenuSection: React.FC<CocktailSection> = ({ title, items }) => {
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
          <CocktailMenuItem
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

export default function CocktailsMenu() {
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
  const menuSections: CocktailSection[] = [
    {
      title: 'COCKTAILS SIGNATURE',
      items: [
        {
          name: 'ACHAKKAR',
          description: 'Bourbon Woodford Reserve, Purée de Fraise Maison, Citron, Mousse vegan',
          price: 95,
          detailedDescription: 'Notre variation du classique bourbon sour, mettant en vedette le Woodford Reserve premium et un nuage de mousse végane qui fond délicatement. La purée de fraise maison apporte une douceur ensoleillée qui s\'accorde parfaitement avec le mordant des agrumes.'
        },
        {
          name: 'TANGERINO',
          description: 'Vodka Tito\'s, Liqueur de Coco, Purée de Mangue Maison, Ginger Soda',
          price: 95,
          detailedDescription: 'Un coucher de soleil tropical dans un verre, où la douce vodka Tito\'s rencontre la liqueur de noix de coco luxuriante. Couronné de purée de mangue maison et agrémenté d\'un pétillant soda au gingembre qui danse sur votre palais.'
        },
        {
          name: 'CAP SPARTEL',
          description: 'Gin Bombay Saphire, Liqueur de Pêche, Purée de Pêche Maison, Sirop de Lavande',
          price: 95,
          detailedDescription: 'Inspiré par le phare de Cap Spartel, ce cocktail aromatique combine les notes botaniques du Bombay Sapphire avec des pêches d\'été. Une touche de sirop de lavande provençale ajoute une élégante note florale à cette création inspirée par la côte.'
        },
        {
          name: 'HAFA',
          description: 'Bacardi Blanc, Cachaça, Oleo-saccharum à la Banane Épicée, Sirop de Vin Blanc Infusé à la Pêche et à l\'Ananas Grillé',
          price: 95,
          detailedDescription: 'Un voyage tropical complexe mettant en vedette des spiritueux des Caraïbes et des infusions maison. L\'oleo-saccharum de banane épicée et le sirop de vin aux fruits grillés créent un équilibre sophistiqué entre douceur caramélisée et épices exotiques.'
        }
      ]
    },
    {
      title: 'MOCKTAILS',
      items: [
        {
          name: 'SOCCO BREEZE',
          description: 'Hibiscus, Jus d\'Orange, Citron, Sirop d\'Agave',
          price: 90,
          detailedDescription: 'Un hommage vibrant et sans alcool à la place du Grand Socco, présentant une infusion d\'hibiscus d\'un rouge profond. La douceur naturelle de l\'agave s\'accorde parfaitement avec les notes d\'agrumes pour un compagnon rafraîchissant de journée au marché.'
        },
        {
          name: 'MENDOUBIA SUNSET',
          description: 'Orgeat, Citron, Aquafaba, Purée de Coco Maison',
          price: 90,
          detailedDescription: 'Inspiré par les jardins de Mendoubia, ce délice crémeux combine l\'orgeat d\'amande avec la noix de coco tropicale. L\'aquafaba crée une texture soyeuse qui rivalise avec n\'importe quelle mousse de cocktail classique.'
        },
        {
          name: 'CERVANTES COOLER',
          description: 'Purée de Melon Maison, Sirop de Basilic, Citron',
          price: 90,
          detailedDescription: 'Un mocktail frais comme un jardin qui célèbre les saveurs méditerranéennes. La purée de cantaloupe sucrée rencontre le sirop de basilic aromatique, terminé par une touche d\'agrumes qui évoque les trottoirs d\'été.'
        }
      ]
    },
    {
      title: 'SHOTS',
      items: [
        {
          name: 'MALABATA BEACH',
          description: 'Vodka Tito\'s, Purée de Fruit de la Passion, Jus d\'Orange',
          price: null,
          detailedDescription: 'Souvenirs de plages ensoleillées capturés dans un verre, où la vodka pure rencontre la purée de fruit de la passion tropicale. Le jus d\'orange frais ajoute brillance et équilibre, créant une échappée rafraîchissante au bord de la mer.'
        },
        {
          name: 'KASBAH',
          description: 'Whisky Grants, Liqueur de Pommes, Jus de Pommes',
          price: null,
          detailedDescription: 'Un hommage chaleureux à l\'hospitalité marocaine, mélangeant le whisky écossais avec la liqueur de pomme française. Le jus de pomme frais ajoute une touche croustillante et fruitée à ce cocktail réconfortant.'
        },
        {
          name: 'RMILAT',
          description: 'Purée de Litchi, Menthe, Gin Bombay, Vermouth Rosé',
          price: null,
          detailedDescription: 'Un classique local revisité avec notre touche signature, parfait pour célébrer.'
        },
        {
          name: 'PERDICARIS',
          description: 'Tequila, Jus d’Orange, Sirop de Grenadine, Liqueur d’Orange',
          price: null,
          detailedDescription: 'Inspiré par les légendes locales, ce shot rafraîchissant offre un équilibre parfait entre force et saveur.'
        }
      ]
    },
    {
      title: 'EAUX ET SOFTS',
      items: [
        {
          name: 'SIDI ALI 75cl',
          description: 'Eau minérale naturelle',
          price: 50,
          detailedDescription: 'Eau minérale naturelle rafraîchissante du Maroc, source des montagnes de l\'Atlas offrant une eau légèrement minéralisée au goût pur et équilibré.'
        },
        {
          name: 'EVIAN 75cl',
          description: 'Eau minérale premium',
          price: 90,
          detailedDescription: 'Eau minérale pure des Alpes françaises, issue d\'un voyage de plus de 15 ans à travers les roches alpines. Sa pureté et sa composition équilibrée en font une référence mondiale.'
        },
        {
          name: 'OULMÈS 75cl',
          description: 'Eau minérale gazeuse',
          price: 50,
          detailedDescription: 'Eau minérale gazeuse marocaine classique, naturellement pétillante avec des bulles fines. Une référence nationale reconnue pour ses propriétés digestives et son goût rafraîchissant.'
        },
        {
          name: 'EVIAN PÉTILLANTE 75cl',
          description: 'Eau minérale gazeuse naturelle',
          price: 90,
          detailedDescription: 'Eau minérale naturellement pétillante d\'Evian, alliant la pureté légendaire de la source avec une effervescence délicate. Parfaite pour accompagner vos repas gastronomiques.'
        },
        {
          name: 'SODA',
          description: 'Différents parfums disponibles',
          price: 50,
          detailedDescription: 'coca cola, coca cola zero, shweppes citron, schweppes tonic, sprite, poms, hawai.'
        },
        {
          name: 'RED BULL',
          description: 'Boisson énergisante',
          price: 100,
          detailedDescription: 'Boisson énergisante premium, idéale pure ou en mélange avec vos spiritueux préférés.'
        },
        {
          name: 'GINGER ALE TRIBUTE',
          description: 'Soda premium au gingembre',
          price: 100,
          detailedDescription: 'Soda artisanal premium avec des notes vives de gingembre frais, parfait seul ou en cocktail.'
        },
        {
          name: 'JUS DE FRUITS FRAIS',
          description: 'Jus frais pressés sur commande',
          price: 60,
          detailedDescription: 'Jus artisanaux pressés à la commande à partir des meilleurs fruits de saison du jour. Notre sélection change au rythme du marché, garantissant une saveur optimale dans chaque verre.'
        },
        {
          name: 'CAFÉ ESPRESSO  ',
          description: 'Illy café',
          price: 50,
          detailedDescription: 'Des grains d\'Arabica d\'origine unique torréfiés localement et préparés selon vos préférences. De l\'expresso intense au café au lait crémeux, chaque tasse est élaborée avec expertise.'
        },
        {
          name: 'THÉ À LA MENTHE',
          description: 'Thé marocain traditionnel',
          price: 50,
          detailedDescription: 'Thé à la menthe rafraîchissant préparé à la traditionnelle.'
        },
        {
          name: 'THÉ SAYRA',
          description: 'Parfums différents',
          price: 50,
          detailedDescription: 'Une collection exclusive de thés parfumés aux arômes subtils et envoûtants. Chaque tasse révèle une symphonie de saveurs entre notes florales, fruitées et épicées, pour un moment de pure détente.'
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
        {/* Notice about classics - Now between main title and cocktails signature */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="bg-amber-900/20 backdrop-blur-sm rounded-lg p-6 border border-amber-200/20 relative overflow-hidden">
            <div className="relative z-10">              
              <div className="text-center text-amber-100/80 italic">
                <p>TOUS LES CLASSIQUES DISPONIBLES <span className="font-light">*Demandez à votre Serveur*</span></p>
              </div>
            </div>
          </div>
        </motion.div>
        <ElegantDivider />
        
        {/* COCKTAILS SIGNATURE section */}
        <CocktailMenuSection title={menuSections[0].title} items={menuSections[0].items} />
        <ElegantDivider />
        
        {/* MOCKTAILS section */}
        <CocktailMenuSection title={menuSections[1].title} items={menuSections[1].items} />
        <ElegantDivider />
        
        {/* SHOTS section with pricing information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h3 className="font-SweetSansProBold text-center font-serif text-3xl tracking-wider text-amber-100 mb-10">
            SHOTS
          </h3>
          
          <div className="bg-amber-900/20 backdrop-blur-sm rounded-lg p-6 border border-amber-200/20 relative overflow-hidden mb-8">
            <div className="relative z-10">              
              <div className="flex justify-center items-center gap-10">
                <div className="text-center">
                  <span className="block text-lg text-amber-100">5 POUR 180 </span>
                </div>
                <div className="text-center">
                  <span className="block text-lg text-amber-100">10 POUR 300 </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Shot items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {menuSections[2].items.map((item, index) => (
              <CocktailMenuItem
                key={index}
                {...item}
                onExpand={() => {}}
                isExpanded={false}
              />
            ))}
          </div>
        </motion.div>
        <ElegantDivider />
        
        {/* EAUX ET SOFTS section */}
        <CocktailMenuSection title={menuSections[3].title} items={menuSections[3].items} />
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