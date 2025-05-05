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
      title: 'DOUCEURS',
      items: [
        {
          name: 'CHOUX PRALINÉ',
          description: 'Délicat choux garni de crème praliné, accompagné d\'une boule de glace vanille de Madagascar',
          price: 80,
          detailedDescription: 'Notre pâte à choux croustillante renferme une onctueuse crème praliné aux noisettes caramélisées et amandes torréfiées. Ce petit chef-d\'œuvre est couronné d\'un craquelin doré et servi avec une boule de glace vanille de Madagascar aux grains intenses qui fond délicatement contre la tiédeur du choux.'
        },
        {
          name: 'CARPACCIO D\'ANANAS',
          description: 'Fines tranches d\'ananas frais infusé au rhum ambré, accompagnées d\'une petite crème brûlée',
          price: 95,
          detailedDescription: 'L\'ananas Victoria est tranché finement en carpaccio puis brièvement mariné dans un sirop au rhum ambré et à la vanille. Servi avec une mini crème brûlée au sucre caramélisé qui offre un contraste parfait entre le croustillant de la cassonade et la fraîcheur acidulée de l\'ananas.'
        },
        {
          name: 'TARTE AU CITRON',
          description: 'Tarte au citron revisitée, curd onctueux au citron de Menton et meringue italienne légèrement torchée',
          price: 80,
          detailedDescription: 'Sur une fine pâte sablée croustillante repose un curd au citron de Menton parfaitement équilibré entre acidité et douceur. La tarte est couronnée d\'une meringue italienne soyeuse, légèrement caramélisée à la flamme pour créer un contraste de textures et de températures inoubliable.'
        },
        {
          name: 'TIRAMISU',
          description: 'Tiramisu classique aux biscuits imbibés de café, mascarpone aérien et cacao amer',
          price: 80,
          detailedDescription: 'Notre tiramisu respecte la recette traditionnelle italienne : des biscuits savoiardi délicatement imbibés d\'un café expresso corsé, recouverts d\'une crème au mascarpone d\'une légèreté incomparable. Une fine couche de cacao amer saupoudrée à la minute apporte la note finale à ce dessert intemporel.'
        },
        {
          name: 'CHEESECAKE',
          description: 'Cheesecake onctueux au fromage frais, servi avec un coulis de fruits rouges et éclats de spéculoos',
          price: 80,
          detailedDescription: 'Notre cheesecake new-yorkais est préparé avec un mélange velouté de fromage frais et crème, reposant sur une base croustillante de spéculoos concassés. Sa texture soyeuse est magnifiée par un coulis de fruits rouges légèrement acidulé et quelques éclats croquants de spéculoos caramélisés.'
        },
        {
          name: 'NOUGAT GLACÉ',
          description: 'Parfait glacé aux fruits secs et miel de lavande, éclats de caramel et coulis d\'abricot',
          price: 80,
          detailedDescription: 'Ce dessert provençal raffiné présente un parfait glacé incorporant amandes, pistaches et fruits confits, délicatement parfumé au miel de lavande. Servi sur un miroir de coulis d\'abricot et parsemé d\'éclats de caramel croustillant, il offre une expérience gustative alliant fraîcheur et douceur méditerranéenne.'
        },
        {
          name: 'FONDANT AU CHOCOLAT',
          description: 'Moelleux au chocolat noir 70% au cœur coulant, servi avec une crème anglaise à la vanille',
          price: 80,
          detailedDescription: 'Notre fondant est préparé avec un chocolat noir d\'exception à 70% de cacao, dont le cœur révèle une ganache fondante qui s\'écoule à la première cuillère. Sa texture aérienne contraste parfaitement avec son intensité en bouche, adoucie par une crème anglaise à la vanille bourbon servie tiède en accompagnement.'
        },
        {
          name: 'COOKIE TANGERINO',
          description: 'Cookie maison aux éclats de chocolat et fleur d\'oranger, glace à la cannelle',
          price: 80,
          detailedDescription: 'Notre cookie signature allie la texture parfaite - croustillant sur les bords et moelleux au centre - à une saveur unique grâce à l\'eau de fleur d\'oranger qui parfume délicatement la pâte aux éclats de chocolat. Servi tiède avec une boule de glace à la cannelle qui se marie parfaitement à ses notes orientales.'
        },
        {
          name: 'ASSIETTE DE FRUITS',
          description: 'Sélection de fruits frais de saison délicatement préparés, sirop léger à la menthe fraîche',
          price: 80,
          detailedDescription: 'Une composition colorée et rafraîchissante de fruits de saison minutieusement sélectionnés pour leur maturité parfaite. Mangue, fruits rouges, agrumes et fruits exotiques sont présentés en harmonieuses découpes, subtilement nappés d\'un sirop infusé à la menthe fraîche et au citron vert.'
        },
        {
          name: 'CAFÉ GOURMAND',
          description: 'Expresso accompagné d\'un trio de mini-desserts: fondant au chocolat, crème brûlée et glace vanille',
          price: 80,
          detailedDescription: 'Une fin de repas idéale pour les indécis: notre café expresso d\'origine éthiopienne s\'accompagne d\'une dégustation de trois mini-desserts emblématiques de notre carte. Un fondant au chocolat en format mignardise, une crème brûlée servie dans une cuillère et une quenelle de glace vanille posée sur un lit de crumble aux amandes.'
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
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-SweetSansProBold font-serif text-4xl md:text-5xl tracking-wider text-amber-50 mb-4">Desserts</h2>
        <div className="flex items-center justify-center mb-6">
          <div className="h-px w-12 bg-amber-200/40"></div>
          <div className="mx-4 text-amber-200/60">✦</div>
          <div className="h-px w-12 bg-amber-200/40"></div>
        </div>
        <p className="text-amber-100/70 font-light max-w-2xl mx-auto">
          Une symphonie de douceurs pour clôturer votre expérience gustative, où tradition pâtissière et créativité contemporaine se rencontrent dans un ballet de saveurs et textures
        </p>
      </motion.div>
      
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