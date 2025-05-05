'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  name: string;
  description: string;
  price: number;
  detailedDescription?: string;
  forMinPersons?: number;
  specialDay?: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const PaellasMenuItem: React.FC<MenuItem & { onExpand: () => void, isExpanded: boolean }> = ({
  name,
  description,
  price,
  detailedDescription,
  forMinPersons,
  specialDay,
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
          <div className="text-right">
            <span className="text-amber-200 font-light">{price}</span>
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
        
        <div className="flex flex-wrap justify-between items-end mt-4">
          {detailedDescription && (
            <div className="text-xs text-amber-200 opacity-70 flex items-center">
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
          
          <div className="flex gap-2 ml-auto mt-1">
            {specialDay && (
              <div className="relative group/special">
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-amber-400 rounded-full animate-pulse"></div>
                <div className="inline-flex items-center justify-center bg-gradient-to-r from-amber-700/60 to-amber-600/60 border border-amber-300/40 rounded-lg px-3 py-1 text-xs font-semibold text-amber-100 transform rotate-2 shadow-sm">
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
                    className="mr-1"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  {specialDay}
                </div>
              </div>
            )}
            
            {forMinPersons && (
              <div className="inline-flex items-center justify-center bg-amber-900/40 border border-amber-200/30 rounded-full px-3 py-1 text-xs text-amber-200/90">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="10" 
                  height="10" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="mr-1"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                min {forMinPersons} pers
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Highlight effect */}
      <div className="absolute -inset-2 bg-gradient-to-tr from-amber-500/5 to-amber-300/10 opacity-0 group-hover:opacity-100 transform translate-y-full group-hover:translate-y-0 transition-all duration-700 rounded-lg"></div>
    </motion.div>
  );
};

const PaellasMenuSection: React.FC<MenuSection> = ({ title, items }) => {
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
          <PaellasMenuItem
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

export default function PaellasMenu() {
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
      title: 'PAELLAS',
      items: [
        {
          name: 'PAELLA "A BANDA" AVEC SAUCE À L\'AIL',
          description: 'Riz safrané garni de délicats morceaux de poisson blanc mijoté dans un fumet marin parfumé',
          price: 120,
          forMinPersons: 2,
          detailedDescription: 'Cette paella traditionnelle de la côte valencienne est préparée avec un riz bomba infusé au safran et cuit dans un riche fumet de poisson. Servie avec une sauce à l\'ail émulsionnée à part pour rehausser les délicates saveurs marines selon votre goût.'
        },
        {
          name: 'PAELLA AUX CALAMARS ET CREVETTES',
          description: 'Riz doré au safran garni de tendres calamars et crevettes juteuses cuits à la perfection',
          price: 150,
          forMinPersons: 2,
          detailedDescription: 'Notre paella aux fruits de mer associe un riz bomba subtilement parfumé avec des calamars frais coupés en anneaux et des crevettes sauvages. Le tout est lentement mijoté dans un bouillon marin savamment épicé jusqu\'à formation de la délicieuse socarrat, cette croûte caramélisée qui fait tout le charme d\'une authentique paella.'
        },
        {
          name: 'PAELLA À L\'ENCRE DE SEICHE ET CREVETTES',
          description: 'Riz noir intense infusé à l\'encre de seiche et garni de crevettes rosées au doux parfum iodé',
          price: 160,
          forMinPersons: 2,
          detailedDescription: 'Cette paella spectaculaire tire sa couleur noir d\'ébène de l\'encre de seiche qui apporte également une saveur marine profonde. Le riz crémeux contraste parfaitement avec la chair tendre des crevettes, le tout rehaussé d\'un filet d\'huile d\'olive infusée au citron et d\'un soupçon d\'ail.'
        },
        {
          name: 'PAELLA DE PIEDS DE BOEUF ET DE POIS CHICHES FAÇON "HERGMA"',
          description: 'Fusion méditerranéenne unissant la tradition espagnole aux saveurs nord-africaines du Hergma',
          price: 150,
          forMinPersons: 2,
          detailedDescription: 'Cette création originale marie l\'art de la paella espagnole avec les saveurs du traditionnel Hergma tunisien. Les pieds de bœuf, mijotés pendant des heures jusqu\'à fondre, se mêlent aux pois chiches onctueux et au riz parfumé aux épices douces pour une expérience gustative unique entre deux rives de la Méditerranée.'
        },
        {
          name: 'PAELLA AUX FRUITS DE MER (DÉCORTIQUÉS)',
          description: 'Généreux festin marin de crevettes, moules, calamars et palourdes sur lit de riz safrané',
          price: 220,
          forMinPersons: 2,
          detailedDescription: 'Notre paella royale aux fruits de mer associe une sélection variée de trésors marins entièrement décortiqués pour votre confort : crevettes tigrées, moules de Galice, anneaux de calamars, et palourdes fraîches. Le riz, parfumé au safran et paprika fumé, capture toutes les saveurs des fruits de mer pour une expérience gustative iodée incomparable.'
        },
        {
          name: 'PAELLA AU LANGOUSTE',
          description: 'Luxueuse paella ornée de langouste entière, révélant la quintessence des saveurs marines',
          price: 380,
          forMinPersons: 2,
          detailedDescription: 'Cette paella d\'exception met à l\'honneur la langouste dans toute sa splendeur, posée au centre d\'un lit de riz doré parfumé à son bouillon. La chair délicate et sucrée de ce crustacé noble se marie parfaitement avec le riz imprégné des saveurs marines et du safran. Une expérience gastronomique méditerranéenne par excellence.'
        },
        {
          name: 'PAELLA DE LÉGUMES',
          description: 'Mosäique colorée de légumes de saison sur riz safrané, célébration des saveurs du potager',
          price: 140,
          forMinPersons: 2,
          detailedDescription: 'Notre paella végétarienne met en valeur une généreuse sélection de légumes méditerranéens de saison : artichauts, poivrons, aubergines, courgettes et haricots verts. Cuits dans un bouillon aux herbes aromatiques et au safran, ces légumes transmettent toute leur fraîcheur au riz pour un plat aussi savoureux que coloré.'
        },
        {
          name: 'PAELLA VALENCIANA DE LÉGUMES ET POULET',
          description: 'La paella originelle de Valence mariant tendres morceaux de poulet fermier et légumes frais',
          price: 150,
          forMinPersons: 2,
          detailedDescription: 'Fidèle à l\'authentique recette valencienne, cette paella combine des morceaux de poulet fermier dorés avec une sélection de légumes de saison. Le riz bomba, cuit lentement dans un bouillon parfumé au safran et paprika, absorbe toutes les saveurs pour créer ce plat emblématique de l\'Espagne dans sa version la plus traditionnelle.'
        },
      ]
    },
    {
      title: 'RIZ ET PÂTES',
      items: [
        {
          name: 'RIZ MOELLEUX À LA MARINIÈRE AVEC GAMBAS ROUGE',
          description: 'Riz crémeux façon risotto aux notes iodées, couronné de gambas rouges à la chair sucrée',
          price: 280,
          detailedDescription: 'Ce riz moelleux inspiré du "arroz meloso" espagnol est préparé avec un fumet de crustacés intense et garni de gambas rouges de Méditerranée. Sa texture, entre la paella et le risotto, offre une onctuosité qui enveloppe les papilles tandis que les gambas apportent leur saveur délicate et leur texture ferme caractéristique.'
        },
        {
          name: 'FIDEUA FRUITS DE MER (DÉCORTIQUÉS)',
          description: 'Vermicelles dorés préparés comme une paella, richement garnis de fruits de mer décortiqués',
          price: 220,
          detailedDescription: 'Cette spécialité de la côte valencienne substitue de fins vermicelles au riz traditionnel de la paella. Dorés puis mijotés dans un fumet de poisson safrané, ces vermicelles s\'enrichissent des saveurs des crevettes, calamars, moules et palourdes soigneusement décortiqués pour un confort de dégustation optimal.'
        },
        {
          name: 'SPAGHETTI AUX PALOURDES (À LA VONGOLE)',
          description: 'Spaghetti al dente aux palourdes fraîches, parfumés à l\'ail, au persil et au vin blanc',
          price: 160,
          detailedDescription: 'Ce classique italien est préparé dans le respect de la tradition : des palourdes fraîches ouvertes à la minute dans un bouillon d\'ail, de persil frais et de vin blanc de qualité. Les spaghetti, cuits al dente, se marient parfaitement à ce jus de cuisson aux parfums marins, rehaussé d\'un trait d\'huile d\'olive extra vierge.'
        },
        {
          name: 'SPAGHETTI À L\'ENCRE DE SEICHE AU CALAMAR ET BASILIC',
          description: 'Spaghetti noirs à l\'encre de seiche, ornés de tendres morceaux de calamar et de basilic frais',
          price: 120,
          detailedDescription: 'Ces spaghetti noirs teintés à l\'encre de seiche sont servis avec des morceaux de calamar juste saisis pour préserver leur tendreté. Le basilic frais apporte une note aromatique qui contraste délicieusement avec les saveurs marines, le tout lié par une touche d\'huile d\'olive et un soupçon d\'ail.'
        },
        {
          name: 'LINGUINE AUX POISSONS ET FRUITS DE MER',
          description: 'Linguine aux délices de la mer mêlant poissons nobles et fruits de mer dans une sauce parfumée',
          price: 180,
          detailedDescription: 'Nos linguine sont généreusement garnis d\'une sélection de poissons blancs, crevettes, moules et calamars, le tout lié par une délicate sauce tomate parfumée au basilic et au fenouil sauvage. Chaque bouchée révèle la fraîcheur des produits de la mer soigneusement sélectionnés par notre chef.'
        },
        {
          name: 'TAGLIATELLE AU POULET GRILLÉ AU CHARBON ET CHAMPIGNON',
          description: 'Ruban de pâtes fraîches aux lamelles de poulet grillé et champignons sautés en sauce crémeuse',
          price: 140,
          detailedDescription: 'Nos tagliatelles fraîches sont accompagnées de morceaux de poulet fermier grillés au charbon de bois et de champignons forestiers sautés à l\'ail. Une sauce crémeuse au parmesan et aux herbes fraîches enrobe délicatement les pâtes pour un plat réconfortant aux saveurs authentiques.'
        },
        {
          name: 'COUSCOUS DE LA MER AUX PARFUMS DU MAROC',
          description: 'Semoule vapeur aux épices marocaines surmontée d\'une riche sélection de poissons et fruits de mer',
          price: 240,
          specialDay: "VENDREDI",
          detailedDescription: 'Disponible uniquement le vendredi, notre couscous de la mer propose une généreuse sélection de poissons et fruits de mer mijotés dans un bouillon aux épices marocaines traditionnelles. La semoule vapeur, parfaitement hydratée et parfumée, s\'accompagne d\'une harissa maison dont vous pouvez doser l\'intensité selon votre goût.'
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
        <h2 className="font-SweetSansProBold font-serif text-4xl md:text-5xl tracking-wider text-amber-50 mb-4">Paellas, Riz et Pâtes</h2>
        <div className="flex items-center justify-center mb-6">
          <div className="h-px w-12 bg-amber-200/40"></div>
          <div className="mx-4 text-amber-200/60">✦</div>
          <div className="h-px w-12 bg-amber-200/40"></div>
        </div>
        <p className="text-amber-100/70 font-light max-w-2xl mx-auto">
          Des paellas traditionnelles valenciennes aux pâtes méditerranéennes, découvrez nos créations qui célèbrent les saveurs ensoleillées de la mer et de la terre
        </p>
      </motion.div>
      
      {/* Menu content */}
      <div className="container mx-auto px-4">
        {menuSections.map((section, index) => (
          <div key={index}>
            <PaellasMenuSection title={section.title} items={section.items} />
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