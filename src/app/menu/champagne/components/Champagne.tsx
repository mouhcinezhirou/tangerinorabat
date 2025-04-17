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
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  return (
    <section ref={menuRef} className="py-20 bg-[#3e4c52] text-amber-50 relative">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-[url('/texture.png')] bg-repeat opacity-10"></div>
      </div>
      
      {/* Section Title */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-SweetSansProBold text-4xl md:text-5xl font-serif tracking-wider text-amber-50 mb-4">CHAMPAGNES & VINS</h2>
        <div className="flex items-center justify-center mb-6">
          <div className="h-px w-12 bg-amber-200/40"></div>
          <div className="mx-4 text-amber-200/60">✦</div>
          <div className="h-px w-12 bg-amber-200/40"></div>
        </div>
        <p className="text-amber-100/70 font-light max-w-2xl mx-auto">
          Discover our curated selection of prestigious champagnes and exquisite wines from Morocco and around the world
        </p>
      </motion.div>
      
      {/* Menu content */}
      <div className="container mx-auto px-4">
        {/* CHAMPAGNES SECTION */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="mb-20"
        >
          <h3 className="text-center font-SweetSansProBold text-3xl font-serif tracking-wider text-amber-100 mb-10">
            CHAMPAGNES
          </h3>
          
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {champagnes.map((champagne, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-amber-900/20 backdrop-blur-sm rounded-lg p-6 border border-amber-200/20 relative overflow-hidden group"
              >
                {/* Decorative elements */}
                <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-amber-200/30"></div>
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-amber-200/30"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex justify-between items-center">
                    <h3 className="font-SweetSansProBold text-lg font-serif tracking-wider text-amber-100">
                      {champagne.name}
                    </h3>
                    <span className="text-amber-200 font-light">{champagne.price}</span>
                  </div>
                </div>
                
                {/* Highlight effect */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-amber-500/5 to-amber-300/10 opacity-0 group-hover:opacity-100 transform translate-y-full group-hover:translate-y-0 transition-all duration-700 rounded-lg"></div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Elegant divider */}
        <div className="flex items-center justify-center my-16">
          <div className="h-px w-16 bg-amber-200/30"></div>
          <div className="mx-3 text-amber-200/50">✦</div>
          <div className="h-px w-16 bg-amber-200/30"></div>
        </div>

        {/* VINS MAROCAINS SECTION */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="mb-20"
        >
          <h3 className="text-center font-SweetSansProBold text-3xl font-serif tracking-wider text-amber-100 mb-10">
            VINS MAROCAINS
          </h3>
          
          {/* White Wines */}
          <h4 className="text-center font-SweetSansProBold text-xl font-serif tracking-wider text-amber-100 mb-6">
            BLANC
          </h4>
          <motion.div
            variants={containerVariants}
            className="overflow-x-auto mb-10"
          >
            <table className="w-full">
              <thead>
                <tr className="text-amber-100/80 font-light">
                  <th className="py-2 px-4 text-left"></th>
                  <th className="py-2 px-4 text-right">75cl</th>
                  <th className="py-2 px-4 text-right">37.5cl</th>
                  <th className="py-2 px-4 text-right">Verre</th>
                </tr>
              </thead>
              <tbody>
                {moroccanWines.white.map((wine, index) => (
                  <motion.tr
                    key={index}
                    variants={itemVariants}
                    className="border-b border-amber-200/10 hover:bg-amber-200/5 transition-colors"
                  >
                    <td className="py-3 px-4 text-amber-100">{wine.name}</td>
                    <td className="py-3 px-4 text-right text-amber-200/80">{wine.bottle}</td>
                    <td className="py-3 px-4 text-right text-amber-200/80">{wine.half}</td>
                    <td className="py-3 px-4 text-right text-amber-200/80">{wine.glass}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Red Wines */}
          <h4 className="text-center font-SweetSansProBold text-xl font-serif tracking-wider text-amber-100 mb-6">
            ROUGES
          </h4>
          <motion.div
            variants={containerVariants}
            className="overflow-x-auto mb-10"
          >
            <table className="w-full">
              <thead>
                <tr className="text-amber-100/80 font-light">
                  <th className="py-2 px-4 text-left"></th>
                  <th className="py-2 px-4 text-right">75cl</th>
                  <th className="py-2 px-4 text-right">37.5cl</th>
                  <th className="py-2 px-4 text-right">Verre</th>
                </tr>
              </thead>
              <tbody>
                {moroccanWines.red.map((wine, index) => (
                  <motion.tr
                    key={index}
                    variants={itemVariants}
                    className="border-b border-amber-200/10 hover:bg-amber-200/5 transition-colors"
                  >
                    <td className="py-3 px-4 text-amber-100">{wine.name}</td>
                    <td className="py-3 px-4 text-right text-amber-200/80">{wine.bottle}</td>
                    <td className="py-3 px-4 text-right text-amber-200/80">{wine.half}</td>
                    <td className="py-3 px-4 text-right text-amber-200/80">{wine.glass}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Rosé Wines */}
          <h4 className="text-center font-SweetSansProBold text-xl font-serif tracking-wider text-amber-100 mb-6">
            ROSÉ
          </h4>
          <motion.div
            variants={containerVariants}
            className="overflow-x-auto"
          >
            <table className="w-full">
              <thead>
                <tr className="text-amber-100/80 font-light">
                  <th className="py-2 px-4 text-left"></th>
                  <th className="py-2 px-4 text-right">75cl</th>
                  <th className="py-2 px-4 text-right">37.5cl</th>
                  <th className="py-2 px-4 text-right">Verre</th>
                </tr>
              </thead>
              <tbody>
                {moroccanWines.rose.map((wine, index) => (
                  <motion.tr
                    key={index}
                    variants={itemVariants}
                    className="border-b border-amber-200/10 hover:bg-amber-200/5 transition-colors"
                  >
                    <td className="py-3 px-4 text-amber-100">{wine.name}</td>
                    <td className="py-3 px-4 text-right text-amber-200/80">{wine.bottle}</td>
                    <td className="py-3 px-4 text-right text-amber-200/80">{wine.half}</td>
                    <td className="py-3 px-4 text-right text-amber-200/80">{wine.glass}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </motion.div>

        {/* Elegant divider */}
        <div className="flex items-center justify-center my-16">
          <div className="h-px w-16 bg-amber-200/30"></div>
          <div className="mx-3 text-amber-200/50">✦</div>
          <div className="h-px w-16 bg-amber-200/30"></div>
        </div>

        {/* VINS DU MONDE SECTION */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="mb-20"
        >
          <h3 className="text-center font-SweetSansProBold text-3xl font-serif tracking-wider text-amber-100 mb-10">
            VINS DU MONDE
          </h3>
          
          {/* White Wines */}
          <h4 className="text-center font-SweetSansProBold text-xl font-serif tracking-wider text-amber-100 mb-6">
            BLANC
          </h4>
          <motion.div
            variants={containerVariants}
            className="overflow-x-auto mb-10"
          >
            <table className="w-full">
              <thead>
                <tr className="text-amber-100/80 font-light">
                  <th className="py-2 px-4 text-left"></th>
                  <th className="py-2 px-4 text-right">75cl</th>
                  <th className="py-2 px-4 text-right">Verre</th>
                </tr>
              </thead>
              <tbody>
                {worldWines.white.map((wine, index) => (
                  <motion.tr
                    key={index}
                    variants={itemVariants}
                    className="border-b border-amber-200/10 hover:bg-amber-200/5 transition-colors"
                  >
                    <td className="py-3 px-4 text-amber-100">{wine.name}</td>
                    <td className="py-3 px-4 text-right text-amber-200/80">{wine.bottle}</td>
                    <td className="py-3 px-4 text-right text-amber-200/80">{wine.glass}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Red Wines */}
          <h4 className="text-center font-SweetSansProBold text-xl font-serif tracking-wider text-amber-100 mb-6">
            ROUGE
          </h4>
          <motion.div
            variants={containerVariants}
            className="overflow-x-auto mb-10"
          >
            <table className="w-full">
              <thead>
                <tr className="text-amber-100/80 font-light">
                  <th className="py-2 px-4 text-left"></th>
                  <th className="py-2 px-4 text-right">75cl</th>
                  <th className="py-2 px-4 text-right">Verre</th>
                </tr>
              </thead>
              <tbody>
                {worldWines.red.map((wine, index) => (
                  <motion.tr
                    key={index}
                    variants={itemVariants}
                    className="border-b border-amber-200/10 hover:bg-amber-200/5 transition-colors"
                  >
                    <td className="py-3 px-4 text-amber-100">{wine.name}</td>
                    <td className="py-3 px-4 text-right text-amber-200/80">{wine.bottle}</td>
                    <td className="py-3 px-4 text-right text-amber-200/80">{wine.glass}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Rosé Wines */}
          <h4 className="text-center font-SweetSansProBold text-xl font-serif tracking-wider text-amber-100 mb-6">
            ROSÉ
          </h4>
          <motion.div
            variants={containerVariants}
            className="overflow-x-auto"
          >
            <table className="w-full">
              <thead>
                <tr className="text-amber-100/80 font-light">
                  <th className="py-2 px-4 text-left"></th>
                  <th className="py-2 px-4 text-right">75cl</th>
                  <th className="py-2 px-4 text-right">Verre</th>
                </tr>
              </thead>
              <tbody>
                {worldWines.rose.map((wine, index) => (
                  <motion.tr
                    key={index}
                    variants={itemVariants}
                    className="border-b border-amber-200/10 hover:bg-amber-200/5 transition-colors"
                  >
                    <td className="py-3 px-4 text-amber-100">{wine.name}</td>
                    <td className="py-3 px-4 text-right text-amber-200/80">{wine.bottle}</td>
                    <td className="py-3 px-4 text-right text-amber-200/80">{wine.glass}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </motion.div>
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