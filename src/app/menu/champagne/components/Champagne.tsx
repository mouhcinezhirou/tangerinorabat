'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ChampagneWineMenuPage() {
  const menuRef = useRef<HTMLDivElement>(null);
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

  // Champagnes data
  const champagnes = [
    { name: 'Laurent Perrier Brut', price: 1200 },
    { name: 'Laurent Perrier Rosé', price: 2400 },
    { name: 'Laurent Perrier Blanc de Blancs', price: 2500 },
    { name: 'Dom Perignon Brut', price: 6000 },
    { name: 'Dom Perignon Rosé', price: 15000 },
    { name: 'Ruinart Blanc de Blanc', price: 3300 }
  ];

  // Moroccan wines data
  const moroccanWines = {
    white: [
      { name: 'Beauvallon', bottle: 280, half: '-', glass: 70 },
      { name: 'Médaillon', bottle: 280, half: 150, glass: 70 },
      { name: 'S de Siroua', bottle: 300, half: '-', glass: '-' },
      { name: 'Aït Souala', bottle: 320, half: '-', glass: '-' },
      { name: 'CB Signature', bottle: 310, half: '-', glass: '-' },
      { name: 'CB Initiales', bottle: 390, half: '-', glass: '-' },
      { name: 'Chateau Roslane', bottle: 520, half: '-', glass: '-' }
    ],
    red: [
      { name: 'Beauvallon', bottle: 280, half: '-', glass: 70 },
      { name: 'Médaillon', bottle: 280, half: 150, glass: 70 },
      { name: 'S de Siroua', bottle: 300, half: '-', glass: '-' },
      { name: 'CB Signature', bottle: 310, half: '-', glass: '-' },
      { name: 'CB Initiales', bottle: 390, half: '-', glass: '-' },
      { name: 'Azayi', bottle: 470, half: '-', glass: '-' },
      { name: 'Chateau Roslane', bottle: 520, half: '-', glass: '-' },
      { name: 'Tandem', bottle: 520, half: '-', glass: '-' }
    ],
    rose: [
      { name: 'Médaillon', bottle: 280, half: 150, glass: 70 },
      { name: 'S de Siroua', bottle: 300, half: '-', glass: '-' },
      { name: 'Médaillon', bottle: 280, half: '-', glass: '-' },
      { name: 'Aït Souala', bottle: 320, half: '-', glass: '-' },
      { name: 'Boulaouane', bottle: 180, half: '-', glass: '-' }
    ]
  };

  // World wines data
  const worldWines = {
    white: [
      { name: 'Màrqués de Caceres', bottle: 280, glass: 80 },
      { name: 'Sangre de Toro', bottle: 270, glass: '-' },
      { name: 'Viña Esmeralda', bottle: 270, glass: '-' },
      { name: 'Les Abeilles Colombo', bottle: 290, glass: '-' },
      { name: 'Bourgogne Chardonnay Rodet', bottle: 450, glass: '-' },
      { name: 'Chablis Tremblay', bottle: 480, glass: '-' },
      { name: 'Sancerre', bottle: 590, glass: '-' },
      { name: 'Pouilly Fume', bottle: 540, glass: '-' }
    ],
    red: [
      { name: 'La Vieille Ferme Ventoux', bottle: 290, glass: '-' },
      { name: 'Feur de Cazeau Bordeaux', bottle: 290, glass: 80 },
      { name: 'Sangre de Toro', bottle: 270, glass: '-' },
      { name: 'Hauts de Sainte Marie', bottle: 320, glass: '-' },
      { name: 'Abeilles Colombo Côtes de Rhône', bottle: 330, glass: '-' },
      { name: 'Marqués de Câceres', bottle: 280, glass: 80 },
      { name: 'Tarapaca Reserva Carmenere', bottle: 390, glass: '-' },
      { name: 'La Celia Reserva Malbec', bottle: 420, glass: '-' },
      { name: 'Chianti Superiore', bottle: 460, glass: '-' },
      { name: 'Brouilly les Jarrons Thorin', bottle: 460, glass: '-' },
      { name: 'Bourgogne Pinot Noir Rodet', bottle: 500, glass: '-' },
      { name: 'Sancerre', bottle: 570, glass: '-' },
      { name: 'Château Lafitte', bottle: 580, glass: '-' },
      { name: 'Marques de Varga Reserva', bottle: 650, glass: '-' },
      { name: 'Chamirey Mercurey Bourgogne', bottle: 900, glass: '-' },
      { name: 'Chateauneuf-du-Pape', bottle: 1200, glass: '-' },
      { name: 'Marques de Vargas Reserva Privada Rioja', bottle: 1450, glass: '-' },
      { name: 'Pauillac de Latour', bottle: 2200, glass: '-' },
      { name: 'Pommard 1er Cru Jarollieres Boillot', bottle: 2600, glass: '-' }
    ],
    rose: [
      { name: 'Manon Côte de Provence', bottle: 270, glass: 90 },
      { name: 'M de Minuty', bottle: 380, glass: '-' },
      { name: 'Pétales de Rose', bottle: 390, glass: '-' },
      { name: 'Minuty Prestige', bottle: 580, glass: '-' }
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

  // Drink section component with optional columns and bottle/glass support
  type DrinkItem = {
    name: string;
    price?: number;
    bottle?: number | string;
    half?: string | number;
    glass?: string | number;
  };

  type DrinkSectionProps = {
    title: string;
    items: DrinkItem[];
    hasBottle?: boolean;
    hasHalf?: boolean;
    className?: string;
    columns?: number;
  };

  const DrinkSection = ({ title, items, hasBottle = false, hasHalf = false, className = "", columns = 1 }: DrinkSectionProps) => (
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
        {hasBottle && (
          <div className={`grid ${hasHalf ? 'grid-cols-[2fr_0.5fr_0.5fr_0.5fr]' : 'grid-cols-[2fr_0.5fr_0.5fr]'} text-amber-100/80 font-light text-sm mb-2`}>
            <div className="text-left"></div>
            <div className="text-center">75cl</div>
            {hasHalf && <div className="text-center">37.5cl</div>}
            <div className="text-center">Verre</div>
          </div>
        )}
        
        <div className={`grid grid-cols-1 ${columns > 1 ? `md:grid-cols-${columns}` : ''} gap-3`}>
          {items.map((item: DrinkItem, index: number) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={hasBottle 
                ? `grid ${hasHalf ? 'grid-cols-[2fr_0.5fr_0.5fr_0.5fr]' : 'grid-cols-[2fr_0.5fr_0.5fr]'} py-2 border-b border-amber-200/10 group hover:bg-amber-200/5 transition-colors`
                : "flex justify-between items-center py-2 border-b border-amber-200/10 group hover:bg-amber-200/5 transition-colors"
              }
            >
              <span className="tracking-wider text-amber-100 group-hover:text-amber-200 transition-colors duration-300 pr-2 max-w-full">
                {item.name}
              </span>
              
              {hasBottle ? (
                <>
                  <span className="text-center text-amber-200/80 text-sm">{item.bottle}</span>
                  {hasHalf && <span className="text-center text-amber-200/80 text-sm">{item.half}</span>}
                  <span className="text-center text-amber-200/80 text-sm">{item.glass}</span>
                </>
              ) : (
                <span className="text-amber-200/80 text-sm">{item.price}</span>
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
        <h2 className="font-SweetSansProBold text-4xl md:text-5xl font-serif tracking-wider text-amber-50 mb-3">CHAMPAGNES & VINS</h2>
        <div className="flex items-center justify-center mb-4">
          <div className="h-px w-12 bg-amber-200/40"></div>
          <div className="mx-4 text-amber-200/60">✦</div>
          <div className="h-px w-12 bg-amber-200/40"></div>
        </div>
        <p className="text-amber-100/70 font-light max-w-2xl mx-auto">
        Découvrez notre sélection soignée de champagnes prestigieux et de vins exquis du Maroc et du monde entier
        </p>
      </motion.div>
      
      {/* Menu content */}
      <div className="container mx-auto px-4">
        {/* CHAMPAGNES SECTION */}
        <DrinkSection 
          title="CHAMPAGNES" 
          items={champagnes} 
          className="mb-14"
        />

        <SmallDivider />

        {/* MOROCCAN WINES SECTION */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="mb-14"
        >
          <h3 className="text-center font-SweetSansProBold text-3xl font-serif tracking-wider text-amber-100 mb-6">
            VINS MAROCAINS
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <DrinkSection 
              title="BLANC" 
              items={moroccanWines.white} 
              hasBottle={true}
              hasHalf={true}
            />
            
            <DrinkSection 
              title="ROUGE" 
              items={moroccanWines.red} 
              hasBottle={true}
              hasHalf={true}
            />
            
            <DrinkSection 
              title="ROSÉ" 
              items={moroccanWines.rose} 
              hasBottle={true}
              hasHalf={true}
            />
          </div>
        </motion.div>

        <SmallDivider />

        {/* WORLD WINES SECTION */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="mb-14"
        >
          <h3 className="text-center font-SweetSansProBold text-3xl font-serif tracking-wider text-amber-100 mb-6">
            VINS DU MONDE
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <DrinkSection 
              title="BLANC" 
              items={worldWines.white} 
              hasBottle={true}
            />
            
            <DrinkSection 
              title="ROUGE" 
              items={worldWines.red.slice(0, 10)} 
              hasBottle={true}
            />
            
            <DrinkSection 
              title="ROSÉ" 
              items={worldWines.rose} 
              hasBottle={true}
            />
          </div>
          
          {/* Additional red wines since there are many */}
          <div className="mt-6">
            <DrinkSection 
              title="ROUGE (PREMIUM)" 
              items={worldWines.red.slice(10)} 
              hasBottle={true}
              columns={2}
            />
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