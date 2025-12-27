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
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-SweetSansProBold text-xl font-serif tracking-wider text-amber-100">
            {name}
          </h3>
          {price && <span className="text-amber-200 font-light">{price}</span>}
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
  const [expandedShot, setExpandedShot] = useState<number | null>(null);

  const handleShotExpand = (index: number) => {
    setExpandedShot(expandedShot === index ? null : index);
  };

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
  name: 'CAP SPARTEL',
  description: 'Gin Bombay Dry, Purée de Fruits Rouges Maison, Vermouth Blanc, Essence de Romarin',
  price: 95,
  detailedDescription: 'Inspiré par le légendaire phare du Cap Spartel où l\'Atlantique rencontre la Méditerranée, ce cocktail élégant au gin met en valeur l\'héritage botanique du Bombay Dry. La purée de fruits rouges maison apporte une douceur naturelle vibrante tandis que le vermouth blanc offre une sophistication classique. Une délicate essence de romarin vous transporte vers les falaises parfumées aux herbes du nord du Maroc.'
},
{
  name: 'ACHAKAR',
  description: 'Sirop de Lavande, Tequila Infusée à l\'Hibiscus, Purée de Coco Maison, Citron Frais, Liqueur de Coco',
  price: 95,
  detailedDescription: 'Une célébration vibrante de l\'harmonie florale et tropicale. La tequila premium infusée aux pétales d\'hibiscus crée une base cramoisie saisissante, tandis que notre purée de coco signature apporte une richesse crémeuse. Le sirop de lavande naturelle évoque l\'élégance de la campagne française, parfaitement équilibré avec du citron vif et une luxueuse liqueur de coco pour un voyage sensoriel inoubliable.'
},
{
  name: 'TANGERINE',
  description: 'Bourbon Premium, Napoléon Mandarine, Sirop Mandarine & Pêche Grillée, Miel au Gingembre',
  price: 95,
  detailedDescription: 'Une célébration audacieuse de la chaleur d\'agrumes et de la sophistication fumée. Le bourbon riche crée la toile parfaite pour la liqueur Napoléon mandarine premium, tandis que notre sirop signature mandarine et pêche grillée au feu ajoute des couches de complexité fruitée caramélisée. Le miel doré au gingembre apporte la touche finale de chaleur épicée à ce chef-d\'œuvre artisanal.'
},
{
  name: 'HAFA',
  description: 'Vodka Titos, Liqueur de Café Kahlua, Liqueur "Falfla" Maison (Fumée, Douce, Non Piquante)',
  price: 95,
  detailedDescription: 'Un voyage sensoriel sophistiqué mettant en vedette la douceur veloutée de la Vodka Titos associée à la richesse du Kahlua. Notre liqueur "Falfla" maison apporte une dimension fumée et douce unique, créant un équilibre parfait entre profondeur aromatique et douceur envoûtante. Une création audacieuse qui capture l\'esprit mystérieux des cafés tangérois.'
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
      description: 'Orgeat, Citron, Aquafaba, Ananas Naturel',
      price: 90,
      detailedDescription: 'Inspiré par les jardins de Mendoubia, ce délice tropical combine l\'orgeat d\'amande avec l\'ananas naturel. L\'aquafaba crée une texture soyeuse qui rivalise avec n\'importe quelle mousse de cocktail classique.'
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
      name: 'MALABATA',
      description: 'Vodka Titos, Licor Pasión, Pure Passion, Jus d\'Orange',
      price: null,
      detailedDescription: 'Souvenirs de plages ensoleillées capturés dans un verre, où la vodka pure rencontre la passion tropicale. Le jus d\'orange frais ajoute brillance et équilibre, créant une échappée rafraîchissante au bord de la mer.'
    },
    {
      name: 'RMILATH',
      description: 'Gin Bombay Dry, Licor Litchi, Jus d\'Ananas, Menthe',
      price: null,
      detailedDescription: 'Un mélange exotique où le gin sec rencontre la douceur du litchi et la fraîcheur de l\'ananas. La menthe apporte une note rafraîchissante à cette création tropicale.'
    },
    {
      name: 'KASBAH',
      description: 'Tequila Camino, Kahlua, Cold Brew',
      price: null,
      detailedDescription: 'Un hommage chaleureux aux saveurs intenses, mélangeant la tequila premium avec la liqueur de café. Le cold brew ajoute une profondeur et une richesse incomparables.'
    },
    {
      name: 'PERDICARIS',
      description: 'Tequila Infusée Hibiscus, Licor Orange, Orange, Grenadine',
      price: null,
      detailedDescription: 'Inspiré par les légendes locales, ce shot coloré marie la tequila infusée à l\'hibiscus avec les agrumes. Un équilibre parfait entre force et saveurs florales.'
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
                <p>TOUS LES CLASSIQUES DISPONIBLES <span className="font-light">*Demandez à votre serveur*</span></p>
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
        
        {/* SHOTS section with pricing information and working expand functionality */}
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
              <div className="flex flex-col items-center space-y-4">
                <div className="text-center">
                  <span className="block text-lg text-amber-100">5 POUR 180 DHS</span>
                </div>
                <div className="text-center">
                  <span className="block text-lg text-amber-100">10 POUR 300 DHS</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Shot items with working expand functionality */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {menuSections[2].items.map((item, index) => (
              <CocktailMenuItem
                key={index}
                {...item}
                onExpand={() => handleShotExpand(index)}
                isExpanded={expandedShot === index}
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