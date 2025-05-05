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

const TapasMenuItem: React.FC<MenuItem & { onExpand: () => void, isExpanded: boolean }> = ({
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

const TapasMenuSection: React.FC<MenuSection> = ({ title, items }) => {
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
          <TapasMenuItem
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

export default function TapasEntreesMenu() {
  const menuRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Make sure the observer is created
    const observer = new IntersectionObserver(
      (entries) => {
        // Log to help debug
        console.log("Intersection observed:", entries[0].isIntersecting);
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    // Log to help debug
    console.log("Setting up observer on:", menuRef.current);
    
    if (menuRef.current) {
      observer.observe(menuRef.current);
    }

    return () => {
      if (menuRef.current) {
        observer.unobserve(menuRef.current);
      }
    };
  }, []);

  // Force visibility state to true for testing
  useEffect(() => {
    // Automatically set visible after a short delay as a fallback
    const timer = setTimeout(() => {
      if (!isVisible) {
        console.log("Forcing visibility after timeout");
        setIsVisible(true);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [isVisible]);

  // All menu data in one place
  const menuSections: MenuSection[] = [
    {
      title: 'TAPAS',
      items: [
        {
          name: 'POMMES DE TERRE "BRAVAS"',
          description: 'Cubes de pommes de terre croustillants servis avec une sauce légèrement épicée',
          price: 60,
          detailedDescription: 'Nos pommes de terre sont d\'abord confites puis frites pour obtenir un contraste parfait entre le croustillant et le moelleux, accompagnées d\'une sauce tomate épicée aux piments fumés et paprika doux de La Vera.'
        },
        {
          name: 'POMMES DE TERRE "HURRICANE" AVEC SES 3 SAUCES',
          description: 'Pommes de terre en spirale servies avec trio de sauces maison',
          price: 60,
          detailedDescription: 'Pommes de terre taillées en spirale puis frites à la perfection, accompagnées d\'une sauce aïoli au safran, une sauce brava épicée et une sauce crémeuse aux herbes fraîches du jardin.'
        },
        {
          name: 'POIVRONS DE PADRÓN',
          description: 'Petits poivrons verts espagnols grillés et assaisonnés à la fleur de sel',
          price: 70,
          detailedDescription: 'Ces petits poivrons venus directement de Galice sont rapidement saisis à haute température puis délicatement assaisonnés à la fleur de sel. Leur particularité: certains sont doux, d\'autres surprennent par leur piquant!'
        },
        {
          name: 'ANCHOIS AU VINAIGRE',
          description: 'Filets d\'anchois marinés à l\'huile d\'olive et au vinaigre de Xérès',
          price: 80,
          detailedDescription: 'Anchois frais délicatement filetés puis marinés dans notre mélange secret d\'huile d\'olive extra vierge, vinaigre de Xérès vieilli et ail confit, le tout rehaussé de quelques touches de persil frais.'
        },
        {
          name: 'BURRATA CRÉMEUSE ET TOMATE FUMÉE',
          description: 'Burrata fondante accompagnée de tomates lentement fumées au feu de bois',
          price: 95,
          detailedDescription: 'Notre burrata crémeuse des Pouilles est servie avec des tomates doucement fumées sur braises de bois d\'olivier pendant plusieurs heures, le tout sublimé par notre huile d\'olive première pression à froid et basilic frais.'
        },
        {
          name: 'POIVRONS AU FOUR ET VENTRESCA DE THON',
          description: 'Poivrons doux rôtis accompagnés de ventre de thon confit à l\'huile d\'olive',
          price: 90,
          detailedDescription: 'Nos poivrons sont lentement rôtis jusqu\'à caramélisation puis associés à la partie la plus savoureuse du thon, le ventresca, confite dans notre huile d\'olive infusée aux herbes méditerranéennes.'
        },
        {
          name: 'PARMIGIANA DE VEAU AU CHORIZO HALAL',
          description: 'Délicieuse préparation d\'aubergines, veau et chorizo halal gratinée au four',
          price: 90,
          detailedDescription: 'Couches alternées d\'aubergines grillées, de veau mijoté et de chorizo halal légèrement épicé, le tout nappé d\'une sauce tomate aux herbes fraîches et généreusement gratiné au parmesan affiné 24 mois.'
        },
        {
          name: 'PARMIGIANA DE FRUITS DE MER',
          description: 'Variation marine de la parmigiana traditionnelle aux fruits de mer',
          price: 90,
          detailedDescription: 'Notre interprétation marine associe des aubergines grillées, une délicate sélection de fruits de mer et une sauce béchamel parfumée au safran, le tout recouvert de fromage et délicatement gratiné au four.'
        },
        {
          name: 'FROMAGE MANCHEGO FLOR DE ESGUEVA',
          description: 'Assortiment de tranches de manchego affiné, accompagné de pain et confiture de figues',
          price: 140,
          detailedDescription: 'Notre manchego Flor de Esgueva est affiné pendant 12 mois pour développer ses arômes complexes de noisette et de beurre. Servi avec du pain artisanal croustillant et notre confiture de figues maison au miel de romarin.'
        },
        {
          name: 'JAMBON IBÉRIQUE',
          description: 'Fines tranches de jambon ibérique affiné 36 mois',
          price: 220,
          detailedDescription: 'Notre jambon ibérique provient de porcs élevés en liberté et nourris aux glands. Affiné pendant 36 mois dans les meilleures conditions, il offre une texture fondante et des arômes complexes de noisette avec une légère note sucrée.'
        },
        {
          name: 'CHORIZO IBÉRIQUE DE GLAND',
          description: 'Tranches de chorizo artisanal de porc ibérique nourri aux glands',
          price: 140,
          detailedDescription: 'Ce chorizo d\'exception est élaboré à partir de porc ibérique nourri exclusivement aux glands pendant la montanera. Son assaisonnement au paprika fumé lui confère des saveurs intenses et complexes révélées par un affinage traditionnel.'
        },
        {
          name: 'ASSORTIMENT DE JAMBON ET FROMAGE',
          description: 'Sélection de jambons ibériques et fromages espagnols avec accompagnements',
          price: 200,
          detailedDescription: 'Notre plateau de dégustation comprend une sélection raffinée de jambons ibériques et de fromages espagnols artisanaux, accompagnés d\'olives marinées, d\'amandes grillées au romarin et de pain croustillant.'
        },
        {
          name: 'ASSORTIMENT DE BRESAOLA DE DINDE ET FROMAGE MANCHEGO',
          description: 'Fines tranches de bresaola de dinde et de manchego affiné',
          price: 90,
          detailedDescription: 'La finesse de notre bresaola de dinde délicatement épicée se marie parfaitement avec la richesse du manchego affiné. Le tout est subtilement rehaussé d\'un filet d\'huile d\'olive vierge et de quelques gouttes de vinaigre balsamique réduit.'
        },
        {
          name: 'SALADE RUSSE',
          description: 'Version raffinée de la traditionnelle salade de légumes et mayonnaise',
          price: 70,
          detailedDescription: 'Notre interprétation élégante de la salade russe traditionnelle associe pommes de terre, carottes et petits pois finement coupés, le tout enrobé d\'une mayonnaise légère parfumée au citron et à l\'aneth frais.'
        },
        {
          name: 'SALADE RUSSE AU HOMARD ET MAYONNAISE CITRONNÉE',
          description: 'Version luxueuse de notre salade russe avec des morceaux de homard frais',
          price: 180,
          detailedDescription: 'Cette version gastronomique de la salade russe est sublimée par des morceaux généreux de homard bleu pêché en Méditerranée et une mayonnaise délicatement citronnée aux agrumes confits et à la ciboulette fraîche du jardin.'
        },
        {
          name: 'SALADE RUSSE AU POULPE, POMME ET OIGNON ROUGE',
          description: 'Notre salade russe revisitée avec poulpe tendre et touches fruitées',
          price: 90,
          detailedDescription: 'Cette réinterprétation créative associe notre poulpe cuit à basse température, des dés de pomme verte Granny Smith pour une touche acidulée et des oignons rouges croquants, le tout lié par une mayonnaise aux herbes fraîches.'
        },
        {
          name: 'LÉGUMES DE SAISON GRILLÉS AU FEU DE BOIS',
          description: 'Assortiment coloré de légumes de saison cuits sur braises',
          price: 120,
          detailedDescription: 'Nos légumes de saison provenant de producteurs locaux sont grillés sur braises de chêne pour développer leurs saveurs naturelles, légèrement fumés et simplement assaisonnés d\'huile d\'olive, d\'ail confit et de fleur de sel.'
        },
        {
          name: 'POULPE À LA GALICIENNE',
          description: 'Poulpe tendre servi sur lit de pommes de terre au paprika fumé',
          price: 140,
          detailedDescription: 'Notre poulpe est cuit lentement selon la tradition galicienne puis servi sur un lit de pommes de terre fondantes, généreusement saupoudré de paprika fumé de La Vera et arrosé d\'une huile d\'olive extra vierge infusée à l\'ail.'
        },
        {
          name: 'TENTACULE DE POULPE GRILLÉE AU FEU DE BOIS',
          description: 'Majestueuse tentacule de poulpe confite puis grillée sur braises',
          price: 160,
          detailedDescription: 'Notre tentacule de poulpe est d\'abord confite pendant plusieurs heures puis grillée sur braises ardentes pour obtenir un contraste parfait entre une texture fondante et des notes légèrement fumées, servie sur une purée de pommes de terre à l\'huile d\'olive.'
        }
      ]
    },
    {
      title: 'SALADES',
      items: [
        {
          name: 'SALADE D\'ESCALIVADA AU THON GRILLÉ ET HUILE D\'AIL NOIR',
          description: 'Poivrons, aubergines et oignons rôtis avec thon grillé et touche d\'ail noir',
          price: 100,
          detailedDescription: 'Notre escalivada traditionnelle composée de poivrons, aubergines et oignons lentement rôtis au feu de bois est sublimée par des morceaux de thon saisi à la braise et une touche d\'huile d\'ail noir fermenté pour une profondeur aromatique unique.'
        },
        {
          name: 'SALADE DE SAUMON FUMÉ ET AVOCAT',
          description: 'Mélange frais de saumon fumé et avocat avec vinaigrette miel-moutarde',
          price: 110,
          detailedDescription: 'Des tranches délicates de saumon fumé maison se marient parfaitement avec des quartiers d\'avocat crémeux, le tout rehaussé par notre vinaigrette signature au miel de fleurs sauvages et moutarde à l\'ancienne.'
        },
        {
          name: 'SALADE CÉSAR AU POULET GRILLÉ',
          description: 'Laitue romaine, sauce César maison, poulet grillé au charbon de bois et parmesan',
          price: 120,
          detailedDescription: 'Notre salade César combine une laitue romaine croquante, des croûtons à l\'ail, des copeaux de parmesan affiné et un poulet fermier mariné puis grillé sur notre barbecue Mibrasa, le tout enrobé de notre sauce César aux anchois préparée minute.'
        },
        {
          name: 'SALADE MARINIÈRE',
          description: 'Fraîche composition de fruits de mer et légumes croquants',
          price: 120,
          detailedDescription: 'Un festival marin associant crevettes, calamars, moules et palourdes à des légumes croquants, le tout délicatement assaisonné d\'une vinaigrette aux agrumes et herbes fraîches pour une explosion de saveurs méditerranéennes.'
        }
      ]
    },
    {
      title: 'CARPACCIOS',
      items: [
        {
          name: 'CARPACCIO DE TOMATE TANGERINO',
          description: 'Fines tranches de tomate avec thon, câpres et huile d\'olive de qualité',
          price: 120,
          detailedDescription: 'Nos tomates Tangerino, variété ancestrale cultivée en Andalousie, sont finement tranchées puis agrémentées de miettes de thon, de câpres croquantes et d\'un filet généreux de notre huile d\'olive première pression à froid.'
        },
        {
          name: 'CARPACCIO DE POULPE',
          description: 'Fines tranches de poulpe tendre mariné aux agrumes',
          price: 120,
          detailedDescription: 'Notre poulpe est d\'abord cuit lentement puis tranché finement et mariné dans un mélange d\'huile d\'olive et d\'agrumes. Chaque bouchée offre une tendre texture et un parfait équilibre entre les saveurs marines et les notes acidulées.'
        },
        {
          name: 'CARPACCIO DE CREVETTES ROUGES FLAMBÉES',
          description: 'Délicates tranches de crevettes rouges sauvages avec touche d\'ail piquant',
          price: 160,
          detailedDescription: 'Nos crevettes rouges sauvages de Méditerranée sont légèrement flambées puis finement tranchées et assaisonnées d\'une huile parfumée à l\'ail et au piment. Un délice marin aux saveurs intenses et à la texture incomparable.'
        },
        {
          name: 'CARPACCIO DE THON ROUGE SAUCE THAÏ',
          description: 'Fines tranches de thon rouge cru avec sauce asiatique légèrement épicée',
          price: 140,
          detailedDescription: 'Notre thon rouge de Méditerranée, pêché à la ligne et tranché finement, est sublimé par une sauce thaï aux notes équilibrées de gingembre, citron vert et piment, créant un mariage parfait entre tradition méditerranéenne et influences asiatiques.'
        },
        {
          name: 'CARPACCIO DE BŒUF',
          description: 'Tranches fines de bœuf cru assaisonnées à l\'huile d\'olive et parmesan',
          price: 120,
          detailedDescription: 'Notre filet de bœuf est légèrement saisi puis finement tranché et présenté avec un filet d\'huile d\'olive extra vierge, des copeaux de parmesan affiné 24 mois, quelques câpres et un tour de moulin à poivre fraîchement moulu.'
        },
        {
          name: 'CARPACCIO DE LONGE DE DINDE FAÇON BRESAOLA',
          description: 'Fines tranches de longe de dinde marinée et séchée comme une bresaola',
          price: 120,
          detailedDescription: 'Notre longe de dinde est marinée dans un mélange d\'épices, de vin et d\'herbes aromatiques puis séchée lentement pour développer une saveur complexe rappelant la bresaola traditionnelle, servie avec roquette et copeaux de parmesan.'
        },
        {
          name: 'SASHIMI DE ROUGET MARINÉ ET FLAMBÉ',
          description: 'Tranches fines de rouget accompagnées d\'un salpicon de crevettes',
          price: 145,
          detailedDescription: 'Notre rouget de Méditerranée est brièvement mariné puis flambé pour développer ses arômes tout en préservant sa délicate texture. Il est accompagné d\'un salpicon rafraîchissant de crevettes, herbes fraîches et agrumes.'
        },
      ]
    },
    {
      title: 'SOUPES',
      items: [
        {
          name: 'SOUPE DE POISSONS ET FRUITS DE MER',
          description: 'Riche bouillon de poissons et crustacés avec croûtons et rouille',
          price: 120,
          detailedDescription: 'Notre soupe est préparée selon la tradition méditerranéenne avec un fumet intense de poissons rocheux et une sélection de fruits de mer frais, servie avec des croûtons à l\'ail, du gruyère râpé et notre rouille maison au safran.'
        },
        {
          name: 'GAZPACHO ANDALOU AVEC SA GARNITURE',
          description: 'Soupe froide de tomates et légumes avec sa garniture traditionnelle',
          price: 80,
          detailedDescription: 'Ce gazpacho traditionnel andalou est préparé avec des tomates mûres, concombres, poivrons et ail, mixés avec de la mie de pain et un filet d\'huile d\'olive. Il est servi bien frais avec sa garniture de brunoise de légumes croquants.'
        },
        {
          name: 'GAZPACHO ANDALOU AUX CREVETTES',
          description: 'Notre gazpacho signature rehaussé de crevettes marinées',
          price: 120,
          detailedDescription: 'Notre gazpacho rafraîchissant est sublimé par des crevettes délicatement marinées au citron et à l\'huile d\'olive. Un mariage parfait entre la fraîcheur des légumes et la douceur iodée des fruits de mer.'
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
      
      {/* Section Title - Always visible now */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }} /* Always animate in */
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-SweetSansProBold font-serif text-4xl md:text-5xl tracking-wider text-amber-50 mb-4">TAPAS & ENTRÉES</h2>
        <div className="flex items-center justify-center mb-6">
          <div className="h-px w-12 bg-amber-200/40"></div>
          <div className="mx-4 text-amber-200/60">✦</div>
          <div className="h-px w-12 bg-amber-200/40"></div>
        </div>
        <p className="text-amber-100/70 font-light max-w-2xl mx-auto">
          Découvrez notre sélection de tapas et entrées traditionnelles méditerranéennes avec une touche créative
        </p>
      </motion.div>
      
      {/* Menu content */}
      <div className="container mx-auto px-4">
        {menuSections.map((section, index) => (
          <div key={index}>
            <TapasMenuSection title={section.title} items={section.items} />
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