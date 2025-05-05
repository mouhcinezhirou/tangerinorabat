'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function BeerSpiritsMenuPage() {
  const menuRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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

  // Menu data - with consistent naming style
  const menuData = {
    beers: [
      { name: 'Corelli Lager', price: 35 },
      { name: 'Mahou Original', price: 50 },
      { name: 'San Miguel', price: 45 },
      { name: 'San Miguel Fresca', price: 55 },
      { name: 'San Miguel Sans Alcool', price: 45 },
      { name: 'Leffe Blonde', price: 65 },
      { name: 'Budweiser', price: 60 },
      { name: 'Casablanca', price: 50 },
      { name: 'Smirnoff Ice', price: 60 }
    ],
    aperitifs: [
      { name: 'Pastis', price: 70 },
      { name: 'Porto Offley Rouge', price: 70 },
      { name: 'Porto Offley Blanc', price: 70 },
      { name: 'Martini Rouge', price: 70 },
      { name: 'Martini Blanc', price: 70 },
      { name: 'Martini Rosé', price: 70 },
      { name: 'Campari', price: 70 }
    ],
    digestifs: [
      { name: 'Sambuca Isolabella', price: 70 },
      { name: 'Fernet-Branca', price: 70 },
      { name: 'Armagnac', price: 70 },
      { name: 'Get 27', price: 70 },
      { name: 'Grappa Sandro Bottega', price: 70 },
      { name: 'Limoncello', price: 70 },
      { name: 'Jägermeister', price: 70 },
      { name: 'Baileys', price: 70 },
      { name: 'Amaretto Disaronno', price: 70 },
      { name: 'Cointreau', price: 70 },
      { name: 'Grand Marnier', price: 70 },
      { name: 'Eau de Vie Prune', price: 70 },
      { name: 'Eau de Vie Poire Williams', price: 70 }
    ],
    cognacs: [
      { name: 'Calvados Boulard', price: 90 },
      { name: 'ABK6 VS', price: 90 },
      { name: 'ABK6 VSPO', price: 150 },
      { name: 'ABK6 X.O', price: 300 }
    ],
    rums: [
      { name: 'Bacardi Blanc', price: 75 },
      { name: 'Bacardi Gold', price: 75 },
      { name: 'Relicario Superior', price: 90 },
      { name: 'Relicario Supremo', price: 140 }
    ],
    whiskies: [
      { name: "Grant's", glass: 70, bottle: '-' },
      { name: 'Chivas', glass: 95, bottle: '-' },
      { name: 'Monkey Shoulder', glass: 95, bottle: '-' },
      { name: "Jack Daniel's", glass: 90, bottle: 1300 },
      { name: "Jack Daniel's Honey", glass: 90, bottle: '-' },
      { name: 'Gentleman Jack', glass: 140, bottle: 1400 },
      { name: "Jack Daniel's Single Barrel", glass: 150, bottle: '-' },
      { name: "Dewar's 12 Years", glass: 100, bottle: '-' },
      { name: "Dewar's 15 Years", glass: 120, bottle: '-' },
      { name: "Dewar's 18 Years", glass: 150, bottle: '-' },
      { name: 'Glenfiddich 12 Years', glass: 120, bottle: '-' },
      { name: 'Glenfiddich 15 Years', glass: 140, bottle: '-' },
      { name: 'Black Label', glass: 95, bottle: 1500 },
      { name: 'Blue Label', glass: '-', bottle: 8000 },
      { name: 'Blue Label King George V', glass: '-', bottle: 14000 }
    ],
    vodkas: [
      { name: "Tito's", glass: 75, bottle: 1100 },
      { name: 'Grey Goose', glass: 90, bottle: 1400 },
      { name: 'Cristal Head', glass: 140, bottle: 1900 }
    ],
    gins: [
      { name: 'Bombay Original', glass: 70, bottle: 1100 },
      { name: 'Bombay Sapphire', glass: 80, bottle: 1200 },
      { name: "Hendrick's", glass: 100, bottle: 1400 },
      { name: 'Monkey 47', glass: 160, bottle: 1700 }
    ],
    tequilas: [
      { name: 'Camino', glass: 70, bottle: '-' },
      { name: 'Patron Silver', glass: 100, bottle: 1500 },
      { name: 'Patron Añejo', glass: '-', bottle: 2000 },
      { name: 'Patron Reposado', glass: '-', bottle: 2000 }
    ],
    sangrias: [
      { name: 'Rouge - Blanche - Rosé', glass: 70, bottle: 280 }
    ]
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  // First, define types for your menu items
  type DrinkItem = {
    name: string;
    price?: number;
    glass?: number | string;
    bottle?: number | string;
  };

  type DrinkSectionProps = {
    title: string;
    items: DrinkItem[];
    hasBottle?: boolean;
    className?: string;
    columns?: number;
  };

  // Updated DrinkSection component with better alignment
  const DrinkSection = ({ title, items, hasBottle = false, className = "", columns = 1 }: DrinkSectionProps) => (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      className={`bg-amber-900/10 backdrop-blur-sm rounded-lg p-5 border border-amber-200/10 ${className}`}
    >
      <h3 className="text-center font-SweetSansProBold text-2xl font-serif tracking-wider text-amber-100 mb-4">
        {title}
      </h3>
      
      <motion.div variants={containerVariants}>
        {hasBottle ? (
          <div className="grid grid-cols-[2fr_0.5fr_0.5fr] text-amber-100/80 font-light text-sm mb-2">
            <div className="text-left"></div>
            <div className="text-center">Verre</div>
            <div className="text-center">Bouteille</div>
          </div>
        ) : (
          <div className="grid grid-cols-[3fr_0.5fr] text-amber-100/80 font-light text-sm mb-2">
            <div className="text-left"></div>
          </div>
        )}
        
        <div className={`grid grid-cols-1 ${columns > 1 ? `md:grid-cols-${columns}` : ''} gap-3`}>
          {items.map((item: DrinkItem, index: number) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={hasBottle 
                ? "grid grid-cols-[2fr_0.5fr_0.5fr] py-2 border-b border-amber-200/10 group hover:bg-amber-200/5 transition-colors"
                : "grid grid-cols-[3fr_0.5fr] py-2 border-b border-amber-200/10 group hover:bg-amber-200/5 transition-colors"
              }
            >
              <span className="tracking-wider text-amber-100 group-hover:text-amber-200 transition-colors duration-300 pr-2">
                {item.name}
              </span>
              
              {hasBottle ? (
                <>
                  <span className="text-center text-amber-200/80 text-sm">{item.glass}</span>
                  <span className="text-center text-amber-200/80 text-sm">{item.bottle}</span>
                </>
              ) : (
                <span className="text-center text-amber-200/80 text-sm">{item.price}</span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );

  // Small decorative divider component
  const SmallDivider = () => (
    <div className="flex items-center justify-center my-10">
      <div className="h-px w-10 bg-amber-200/30"></div>
      <div className="mx-2 text-amber-200/50 text-xs">✦</div>
      <div className="h-px w-10 bg-amber-200/30"></div>
    </div>
  );

  return (
    <section ref={menuRef} className="py-16 bg-[#3e4c52] text-amber-50 relative">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-[url('/texture.png')] bg-repeat opacity-10"></div>
      </div>
      
      {/* Section Title */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }} /* Always animate in */
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-SweetSansProBold text-4xl md:text-5xl font-serif tracking-wider text-amber-50 mb-3">BIÈRES & SPIRITUEUX</h2>
        <div className="flex items-center justify-center mb-4">
          <div className="h-px w-12 bg-amber-200/40"></div>
          <div className="mx-4 text-amber-200/60">✦</div>
          <div className="h-px w-12 bg-amber-200/40"></div>
        </div>
        <p className="text-amber-100/70 font-light max-w-2xl mx-auto">
          Découvrez notre sélection raffinée de bières et spiritueux premium, choisis avec soin pour accompagner votre expérience gastronomique
        </p>
      </motion.div>
      
      {/* Menu content */}
      <div className="container mx-auto px-4">
        {/* BEERS SECTION */}
        <DrinkSection 
          title="BIÈRES" 
          items={menuData.beers} 
          className="mb-14"
        />

        <SmallDivider />

        {/* APERITIFS & DIGESTIFS SECTION - Side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          <DrinkSection title="APÉRITIFS" items={menuData.aperitifs} />
          <DrinkSection title="DIGESTIFS" items={menuData.digestifs} columns={2} />
        </div>

        <SmallDivider />

        {/* COGNAC/BRANDY & RUM SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          <DrinkSection title="COGNAC / BRANDY" items={menuData.cognacs} />
          <DrinkSection title="RHUM" items={menuData.rums} />
        </div>

        <SmallDivider />

        {/* WHISKY SECTION */}
        <DrinkSection 
          title="WHISKY" 
          items={menuData.whiskies} 
          hasBottle={true}
          className="mb-14"
        />

        <SmallDivider />

        {/* SPIRITS SECTION - VODKA, GIN, TEQUILA */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          <DrinkSection title="VODKA" items={menuData.vodkas} hasBottle={true} />
          <DrinkSection title="GIN" items={menuData.gins} hasBottle={true} />
          <DrinkSection title="TEQUILA" items={menuData.tequilas} hasBottle={true} />
        </div>

        <SmallDivider />

        {/* SANGRIA SECTION - Updated to match the style of other sections */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="mb-12 max-w-lg mx-auto"
        >
          <div className="bg-amber-900/20 backdrop-blur-sm rounded-lg p-5 border border-amber-200/20">
            <h3 className="text-center font-SweetSansProBold text-2xl font-serif tracking-wider text-amber-100 mb-4">
              SANGRIA
            </h3>
            
            <motion.div variants={containerVariants}>
              <div className="grid grid-cols-[2fr_0.5fr_0.5fr] text-amber-100/80 font-light text-sm mb-2">
                <div className="text-left"></div>
                <div className="text-center">Verre</div>
                <div className="text-center">Carafe</div>
              </div>
              
              {menuData.sangrias.map((sangria, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="grid grid-cols-[2fr_0.5fr_0.5fr] py-2 border-b border-amber-200/10 group hover:bg-amber-200/5 transition-colors"
                >
                  <span className="tracking-wider text-amber-100 group-hover:text-amber-200 transition-colors duration-300">
                    {sangria.name}
                  </span>
                  <span className="text-center text-amber-200/80 text-sm">{sangria.glass}</span>
                  <span className="text-center text-amber-200/80 text-sm">{sangria.bottle}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Elegant divider bottom */}
      <div className="flex items-center justify-center mt-12">
        <div className="h-px w-16 bg-amber-200/40"></div>
        <div className="mx-3 text-amber-200/60">✦</div>
        <div className="h-px w-16 bg-amber-200/40"></div>
      </div>
    </section>
  );
}