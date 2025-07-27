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
      { threshold: 0.01 } // Umbral reducido para activación más rápida
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

  // Datos actualizados de Champagnes/Prosecco
  const champagnes = [
    { name: 'Martini Prosecco', bottle: 600, glass: 80 },
    { name: 'Laurent Perrier Brut', bottle: 1200, glass: '-' },
    { name: 'Laurent Perrier Rosé', bottle: 2400, glass: '-' },
    { name: 'Laurent Perrier Blanc de Blancs', bottle: 2500, glass: '-' },
    { name: 'Ruinart Blanc de Blanc', bottle: 3300, glass: '-' },
    { name: 'Dom Perignon', bottle: 7000, glass: '-' },
    { name: 'Dom Perignon Rosé', bottle: 15000, glass: '-' }
  ];

  // Datos actualizados de vinos marroquíes
  const moroccanWines = {
    white: [
      { name: 'Beauvallon', bottle: 280, half: '-', glass: 70 },
      { name: 'Médaillon', bottle: 280, half: 150, glass: 70 },
      { name: 'S de Siroua', bottle: 300, half: '-', glass: '-' },
      { name: 'CB Signature', bottle: 310, half: '-', glass: '-' },
      { name: 'CB Initiales', bottle: 390, half: '-', glass: '-' },
      { name: 'Château Roslane AOC', bottle: 540, half: '-', glass: '-' }
    ],
    red: [
      { name: 'Beauvallon', bottle: 280, half: '-', glass: 70 },
      { name: 'Médaillon', bottle: 280, half: 150, glass: 70 },
      { name: 'S de Siroua', bottle: 300, half: '-', glass: '-' },
      { name: 'CB Signature', bottle: 310, half: '-', glass: '-' },
      { name: 'CB Initiales', bottle: 390, half: '-', glass: '-' },
      { name: 'Azayi', bottle: 480, half: '-', glass: '-' },
      { name: 'Tandem', bottle: 520, half: '-', glass: '-' },
      { name: 'Château Roslane AOC', bottle: 540, half: '-', glass: '-' }
    ],
    rose: [
      { name: 'Médaillon', bottle: 280, half: 150, glass: 70 },
      { name: 'S de Siroua', bottle: 300, half: '-', glass: '-' },
      { name: 'Tandem', bottle: 360, half: '-', glass: '-' }
    ],
    gris: [
      { name: 'Boulaouane', bottle: 240, half: '-', glass: 60 },
      { name: 'Medaillon', bottle: 280, half: '-', glass: 70 },
      { name: 'Ait Souala', bottle: 320, half: '-', glass: '-' }
    ]
  };

  // Datos actualizados de vinos del mundo
  const worldWines = {
    white: {
      spain: [
        { name: 'Marques de Caceres', bottle: 280, glass: 80 },
        { name: 'Vina Esmeralda', bottle: 270, glass: '-' },
        { name: 'Albarino Pazo San Mauro', bottle: 390, glass: '-' }
      ],
      france: [
        { name: 'Les Abeilles Colombo', bottle: 290, glass: 90 },
        { name: 'Bourgogne Chardonnay Rodet', bottle: 450, glass: '-' },
        { name: 'Chablis Tremblay', bottle: 480, glass: '-' },
        { name: 'Pouilly Fumé J de Villebois', bottle: 540, glass: '-' },
        { name: 'Sancerre J de Villebois', bottle: 590, glass: '-' }
      ],
      portugal: [
        { name: 'Mateus Blanc 75cl', bottle: 270, glass: '-' }
      ]
    },
    red: {
      spain: [
        { name: 'Marques de Caceres', bottle: 280, glass: 80 },
        { name: 'Altos Ibericos', bottle: 290, glass: '-' },
        { name: 'Celeste Crianza Torres', bottle: 460, glass: '-' },
        { name: 'Conde de San Cristobal', bottle: 520, glass: '-' },
        { name: 'Sela Bodega Roda', bottle: 590, glass: '-' },
        { name: 'Marques de Vargas Reserva', bottle: 650, glass: '-' },
        { name: 'Roda 1 Bodega Roda', bottle: 1200, glass: '-' },
        { name: 'Marques de Vargas Reserva Privada', bottle: 1450, glass: '-' }
      ],
      france: [
        { name: 'La Vieille Ferme Ventoux', bottle: 290, glass: '-' },
        { name: 'Fleur de Bazeau', bottle: 290, glass: 80 },
        { name: 'Abeilles Colombo Côtes de Rhône', bottle: 330, glass: '-' },
        { name: 'Brouilly les Jarrons Thorin', bottle: 460, glass: '-' },
        { name: 'Bourgogne Pinot Noir Rodet', bottle: 500, glass: '-' },
        { name: 'Sancerre Cellier de Marnes Dezat', bottle: 570, glass: '-' },
        { name: 'Château Lafitte', bottle: 580, glass: '-' },
        { name: 'Chamirey Mercurey Bourgogne', bottle: 900, glass: '-' },
        { name: 'Châteauneuf Du-Pape Les Sinards Perrin', bottle: 1200, glass: '-' },
        { name: 'Pauillac de Latour', bottle: 2200, glass: '-' },
        { name: 'Pommard 1er Cru Jarollieres Boillot', bottle: 2600, glass: '-' }
      ],
      argentina: [
        { name: 'La Celia Reserva Malbec', bottle: 420, glass: '-' }
      ],
      chile: [
        { name: 'Tarapaca Reserva Carmenere', bottle: 390, glass: '-' }
      ],
      italia: [
        { name: 'Chianti Superiore Vigneti Trebbio', bottle: 460, glass: '-' }
      ],
      portugal: [
        { name: 'Silk & Spice Rouge', bottle: 320, glass: '-' }
      ]
    },
    rose: [
      { name: 'Mateus Rosé', bottle: 270, glass: '-' },
      { name: 'Manon Côte de Provence', bottle: 270, glass: 90 },
      { name: 'Studio By Miraval', bottle: 320, glass: '-' },
      { name: 'Pétales de Rose', bottle: 360, glass: '-' },
      { name: 'Miraval', bottle: 540, glass: '-' },
      { name: 'Minuty Prestige', bottle: 580, glass: '-' }
    ]
  };

  // Variantes de animación
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02, // Escalonamiento más rápido entre elementos
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.15 // Animación de elementos más rápida
    }
  }
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3, // Animación de sección más rápida
      ease: "easeOut"
    }
  }
};

  // Componente de sección de bebidas con columnas opcionales y soporte para botella/copa
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
    hasGlass?: boolean;
    className?: string;
    columns?: number;
  };

  const DrinkSection = ({ title, items, hasBottle = false, hasHalf = false, hasGlass = false, className = "", columns = 1 }: DrinkSectionProps) => (
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
          <div className={`grid ${hasHalf ? 'grid-cols-[2fr_0.5fr_0.5fr_0.5fr]' : hasGlass ? 'grid-cols-[2fr_0.5fr_0.5fr]' : 'grid-cols-[2fr_0.5fr]'} text-amber-100/80 font-light text-sm mb-2`}>
            <div className="text-left"></div>
            <div className="text-center">75cl</div>
            {hasHalf && <div className="text-center">37.5cl</div>}
            {hasGlass && <div className="text-center">Copa</div>}
          </div>
        )}
        
        <div className={`grid grid-cols-1 ${columns > 1 ? `md:grid-cols-${columns}` : ''} gap-3`}>
          {items.map((item: DrinkItem, index: number) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={hasBottle 
                ? `grid ${hasHalf ? 'grid-cols-[2fr_0.5fr_0.5fr_0.5fr]' : hasGlass ? 'grid-cols-[2fr_0.5fr_0.5fr]' : 'grid-cols-[2fr_0.5fr]'} py-2 border-b border-amber-200/10 group hover:bg-amber-200/5 transition-colors`
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
                  {hasGlass && <span className="text-center text-amber-200/80 text-sm">{item.glass}</span>}
                </>
              ) : (
                <div className="flex justify-between min-w-[120px]">
                  {item.glass !== undefined && item.glass !== '-' && (
                    <span className="text-amber-200/80 text-sm mr-4">Copa: {item.glass}</span>
                  )}
                  <span className="text-amber-200/80 text-sm">{item.price}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );

  // Componente de divisor decorativo pequeño
  const SmallDivider = () => (
    <div className="flex items-center justify-center my-10">
      <div className="h-px w-10 bg-amber-200/30"></div>
      <div className="mx-2 text-amber-200/50 text-xs">✦</div>
      <div className="h-px w-10 bg-amber-200/30"></div>
    </div>
  );

  // Componente de sección de vinos regionales
  type RegionalWineSectionProps = {
    title: string;
    regions: { [key: string]: DrinkItem[] };
    hasGlass?: boolean;
  };

  const RegionalWineSection = ({ title, regions, hasGlass = true }: RegionalWineSectionProps) => (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      className="bg-amber-900/10 backdrop-blur-sm rounded-lg p-5 border border-amber-200/10"
    >
      <h3 className="text-center font-SweetSansProBold text-2xl font-serif tracking-wider text-amber-100 mb-4">
        {title}
      </h3>
      
      <motion.div variants={containerVariants} className="space-y-6">
        {Object.entries(regions).map(([region, items], index) => (
          <div key={index} className="mb-4 last:mb-0">
            <h4 className="uppercase text-amber-100/90 text-sm font-medium border-b border-amber-200/20 pb-1 mb-3">
              {region}
            </h4>
            
            {hasGlass && (
              <div className="grid grid-cols-[2fr_0.5fr_0.5fr] text-amber-100/80 font-light text-sm mb-2">
                <div className="text-left"></div>
                <div className="text-center">75cl</div>
                <div className="text-center">Copa</div>
              </div>
            )}
            
            {items.map((item, itemIdx) => (
              <motion.div
                key={itemIdx}
                variants={itemVariants}
                className={`grid grid-cols-[2fr_0.5fr_0.5fr] py-2 border-b border-amber-200/10 group hover:bg-amber-200/5 transition-colors`}
              >
                <span className="tracking-wider text-amber-100 group-hover:text-amber-200 transition-colors duration-300 pr-2">
                  {item.name}
                </span>
                <span className="text-center text-amber-200/80 text-sm">{item.bottle}</span>
                <span className="text-center text-amber-200/80 text-sm">{item.glass}</span>
              </motion.div>
            ))}
          </div>
        ))}
      </motion.div>
    </motion.div>
  );

  return (
    <section ref={menuRef} className="py-16 bg-[#3e4c52] text-amber-50 relative">
      {/* Elementos de fondo */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-[url('/texture.png')] bg-repeat opacity-10"></div>
      </div>
      
      {/* Contenido del menú */}
      <div className="container mx-auto px-4">
        {/* SECCIÓN DE CHAMPAGNES */}
        <DrinkSection 
          title="CHAMPAGNES Y PROSECCO" 
          items={champagnes} 
          hasBottle={true}
          hasGlass={true}
          className="mb-14"
        />
        <SmallDivider />

        {/* SECCIÓN DE VINOS MARROQUÍES */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="mb-14"
        >
          <h3 className="text-center font-SweetSansProBold text-3xl font-serif tracking-wider text-amber-100 mb-6">
            VINOS MARROQUÍES
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <DrinkSection 
              title="BLANCO" 
              items={moroccanWines.white} 
              hasBottle={true}
              hasHalf={true}
              hasGlass={true}
            />
            
            <DrinkSection 
              title="TINTO" 
              items={moroccanWines.red} 
              hasBottle={true}
              hasHalf={true}
              hasGlass={true}
            />
            
            <DrinkSection 
              title="ROSADO" 
              items={moroccanWines.rose} 
              hasBottle={true}
              hasHalf={true}
              hasGlass={true}
            />
            
            <DrinkSection 
              title="GRIS" 
              items={moroccanWines.gris} 
              hasBottle={true}
              hasGlass={true}
            />
          </div>
        </motion.div>

        <SmallDivider />

        {/* SECCIÓN DE VINOS DEL MUNDO */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="mb-14"
        >
          <h3 className="text-center font-SweetSansProBold text-3xl font-serif tracking-wider text-amber-100 mb-6">
            VINOS DEL MUNDO
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-8">
              <h4 className="text-center font-SweetSansProBold text-2xl font-serif tracking-wider text-amber-100">BLANCO</h4>
              
              {Object.entries(worldWines.white).map(([region, items], index) => (
                <motion.div
                  key={index}
                  variants={sectionVariants}
                  className="bg-amber-900/10 backdrop-blur-sm rounded-lg p-5 border border-amber-200/10"
                >
                  <h4 className="uppercase text-amber-100/90 text-sm font-medium border-b border-amber-200/20 pb-1 mb-3">
                    {region === 'spain' ? 'España' : 
                     region === 'france' ? 'Francia' : 
                     region === 'portugal' ? 'Portugal' : region}
                  </h4>
                  
                  <div className="grid grid-cols-[2fr_0.5fr_0.5fr] text-amber-100/80 font-light text-sm mb-2">
                    <div className="text-left"></div>
                    <div className="text-center">75cl</div>
                    <div className="text-center">Copa</div>
                  </div>
                  
                  <motion.div variants={containerVariants}>
                    {items.map((item, itemIdx) => (
                      <motion.div
                        key={itemIdx}
                        variants={itemVariants}
                        className="grid grid-cols-[2fr_0.5fr_0.5fr] py-2 border-b border-amber-200/10 group hover:bg-amber-200/5 transition-colors"
                      >
                        <span className="tracking-wider text-amber-100 group-hover:text-amber-200 transition-colors duration-300 pr-2">
                          {item.name}
                        </span>
                        <span className="text-center text-amber-200/80 text-sm">{item.bottle}</span>
                        <span className="text-center text-amber-200/80 text-sm">{item.glass}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              ))}
            </div>
            
            <div className="space-y-8">
              <h4 className="text-center font-SweetSansProBold text-2xl font-serif tracking-wider text-amber-100">TINTO</h4>
              
              {Object.entries(worldWines.red).map(([region, items], index) => (
                <motion.div
                  key={index}
                  variants={sectionVariants}
                  className="bg-amber-900/10 backdrop-blur-sm rounded-lg p-5 border border-amber-200/10"
                >
                  <h4 className="uppercase text-amber-100/90 text-sm font-medium border-b border-amber-200/20 pb-1 mb-3">
                    {region === 'spain' ? 'España' : 
                     region === 'france' ? 'Francia' :
                     region === 'argentina' ? 'Argentina' :
                     region === 'chile' ? 'Chile' :
                     region === 'italia' ? 'Italia' :
                     region === 'portugal' ? 'Portugal' : region}
                  </h4>
                  
                  <div className="grid grid-cols-[2fr_0.5fr_0.5fr] text-amber-100/80 font-light text-sm mb-2">
                    <div className="text-left"></div>
                    <div className="text-center">75cl</div>
                    <div className="text-center">Copa</div>
                  </div>
                  
                  <motion.div variants={containerVariants}>
                    {items.map((item, itemIdx) => (
                      <motion.div
                        key={itemIdx}
                        variants={itemVariants}
                        className="grid grid-cols-[2fr_0.5fr_0.5fr] py-2 border-b border-amber-200/10 group hover:bg-amber-200/5 transition-colors"
                      >
                        <span className="tracking-wider text-amber-100 group-hover:text-amber-200 transition-colors duration-300 pr-2">
                          {item.name}
                        </span>
                        <span className="text-center text-amber-200/80 text-sm">{item.bottle}</span>
                        <span className="text-center text-amber-200/80 text-sm">{item.glass}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              ))}
            </div>
            
            <DrinkSection 
              title="ROSADO" 
              items={worldWines.rose} 
              hasBottle={true}
              hasGlass={true}
            />
          </div>
        </motion.div>
      </div>
      
      {/* Divisor elegante inferior */}
      <div className="flex items-center justify-center mt-12">
        <div className="h-px w-16 bg-amber-200/40"></div>
        <div className="mx-3 text-amber-200/60">✦</div>
        <div className="h-px w-16 bg-amber-200/40"></div>
      </div>
    </section>
  );
}