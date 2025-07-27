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

const OeufsFrituresMenuItem: React.FC<MenuItem & { onExpand: () => void, isExpanded: boolean }> = ({
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

const OeufsFrituresMenuSection: React.FC<MenuSection> = ({ title, items }) => {
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
          <OeufsFrituresMenuItem
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

export default function OeufsFrituresMenu() {
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
      title: 'TORTILLAS ET ŒUFS',
      items: [
{
  name: 'TORTILLA ESPAGNOLE AU CHORIZO',
  description: 'L\'omelette traditionnelle espagnole enrichie d\'un savoureux chorizo légèrement relevé',
  price: 90,
  detailedDescription: 'Notre tortilla est préparée selon la recette traditionnelle avec des pommes de terre confites dans l\'huile d\'olive, auxquelles nous ajoutons un chorizo artisanal légèrement piquant. Cuite lentement pour obtenir un cœur moelleux et fondant, elle est servie tiède pour en apprécier toutes les saveurs.'
},
      {
        name: 'TORTILLA ESPAGNOLE CLASSIQUE',
        description: 'L\'authentique omelette espagnole aux pommes de terre',
        price: 70,
        detailedDescription: 'Notre tortilla traditionnelle est préparée avec des pommes de terre soigneusement sélectionnées, confites à basse température dans notre huile d\'olive vierge extra. Elle est cuite à la perfection pour offrir un contraste entre l\'extérieur légèrement doré et un cœur tendre et onctueux.'
      },
      {
        name: 'TORTILLA ESPAGNOLE AUX ÉPINARDS ET MANCHEGO',
        description: 'Variante délicate de la tortilla classique aux épinards frais et manchego affiné',
        price: 90,
        detailedDescription: 'Cette élégante version de notre tortilla associe la douceur des épinards frais légèrement wilted et la richesse du fromage manchego affiné pendant 6 mois. La combinaison des pommes de terre fondantes, des épinards et du fromage crée un équilibre parfait entre onctuosité et caractère.'
      },
      {
        name: 'HUEVOS ROTOS CON CHORIZO (HALAL)',
        description: 'Œufs cuits sur un lit de pommes de terre avec du chorizo grillé',
        price: 95,
        detailedDescription: 'Nos œufs aux jaunes oranges sont délicatement cuits sur un lit de pommes de terre tendres et accompagnés de chorizo halal légèrement grillé. Le jaune coulant se mêle aux pommes de terre et au chorizo pour créer une harmonie de saveurs rustiques et réconfortantes.'
      }
      ]
    },
    {
      title: 'FRITURES',
      items: [
        {
        name: 'ANCHOIS AL LIMON',
        description: 'Anchois frais marinés au citron, enrobé d\'une fine panure, frits à la perfection.',
        price: 80,
        detailedDescription: 'Nos anchois frais sont délicatement filetés puis enrobés d\'une légère pâte à tempura avant d\'être frits à l\'instant. Croustillants à l\'extérieur et fondants à l\'intérieur, ils sont servis avec des quartiers de citron frais et une touche de fleur de sel pour sublimer leur saveur marine.'
      },
      {
        name: 'CREVETTES POPCORN',
        description: 'Crevettes croustillantes façon popcorn avec une sauce cocktail maison',
        price: 80,
        detailedDescription: 'Nos crevettes sont enrobées d\'une panure croustillante, puis frites à la perfection pour obtenir un extérieur doré et craquant tout en préservant la tendreté de la chair. Servies avec notre sauce cocktail maison légèrement épicée, c\'est un délice irrésistible.'
      },
      {
        name: 'CALAMARES FRITOS',
        description: 'Rondelles de calamars tendre en friture légère, servis avec une sauce tartare',
        price: 140,
        detailedDescription: 'Inspirés par la tradition andalouse, nos calamars sont trempés dans une pâte à frire aérienne puis frits rapidement à haute température pour préserver leur tendreté. Servis avec une sauce tartare maison et une touche de persil frais haché, ils offrent un équilibre parfait entre croustillant et moelleux.'
      },
      {
        name: 'CROQUETTES DE POULET',
        description: 'Croquettes crémeuses au poulet, champignons sauvages et fromage fondu',
        price: 80,
        detailedDescription: 'Nos croquettes sont préparées avec une béchamel onctueuse enrichie de poulet effiloché, de champignons sauvages sautés et d\'un mélange de fromages affinés. L\'ensemble est enrobé d\'une chapelure dorée et frit jusqu\'à obtenir une coque croustillante qui révèle un cœur fondant et savoureux.'
      },
      {
        name: 'CROQUETTES DE CREVETTES',
        description: 'Croquettes crémeuses aux crevettes et bisque maison, parfumées au piment d\'Espelette',
        price: 80,
        detailedDescription: 'Ces croquettes délicates sont élaborées à partir d\'une bisque de crevettes réduite et concentrée, incorporée à une béchamel soyeuse avec des morceaux de crevettes. Une légère touche de piment d\'Espelette apporte une subtile chaleur qui rehausse les saveurs marines, le tout enveloppé d\'une fine croûte dorée et croustillante.'
      },
      {
        name: 'FISH & CHIPS',
        description: 'Filet de cabillaud en tempura croustillante avec pommes de terre en spirale',
        price: 160,
        detailedDescription: 'Notre interprétation du classique britannique associe un filet de cabillaud ultra-frais enrobé d\'une pâte tempura croustillante et aérienne, servi avec nos pommes de terre Hurricane en spirale à la texture incomparable. Le tout est accompagné d\'une sauce tartare maison aux câpres croquantes et cornichons finement hachés.'
      },
      {
        name: 'FRITURE DE POISSON',
        description: 'Généreuse sélection de poissons et fruits de mer frits à la perfection',
        price: 220,
        detailedDescription: 'Cette friture royale propose une sélection variée de poissons méditerranéens, calamars, crevettes et accras de morue, chacun enrobé d\'une panure spécifique qui sublime sa saveur naturelle. L\'assortiment est servi avec notre sauce tartare maison pour satisfaire toutes les envies.'
      },
      {
        name: 'CHANQUETES ET ŒUFS CASSÉS SUR LE PLAT',
        description: 'Œufs fondants servis sur un lit de délicats petits poissons croustillants',
        price: 140,
        detailedDescription: 'Une spécialité méditerranéenne par excellence, nos chanquetes (petits poissons argentés) sont légèrement farinés puis frits jusqu\'à obtenir une texture parfaitement croustillante. Les œufs cassés sont cuits doucement et déposés sur ce lit de poissons croustillants, dont le jaune crémeux se mêle délicieusement aux saveurs marines, créant une symphonie de textures et de saveurs qui évoque instantanément le littoral ensoleillé de la Méditerranée.'
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
            <OeufsFrituresMenuSection title={section.title} items={section.items} />
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