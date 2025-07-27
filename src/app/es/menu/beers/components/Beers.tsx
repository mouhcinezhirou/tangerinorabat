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
      { threshold: 0.01 } // Umbral reducido para una activación más rápida
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

  // Datos del menú actualizados según el menú proporcionado
  const menuData = {
    beers: [
      { name: 'San Miguel 33cl', price: 45 },
      { name: 'Mahou Original 33cl', price: 50 },
      { name: 'San Miguel Sin Alcohol', price: 50 },
      { name: 'Smirnoff Ice', price: 60 },
      { name: 'Budweiser', price: 60 },
      { name: 'Leffe rubia 33cl', price: 60 },
      { name: 'Corona', price: 80 }
    ],
    aperitifs: [
      { name: 'Pastis', price: 70 },
      { name: 'Porto Offley Tinto', price: 70 },
      { name: 'Porto Offley Blanco', price: 70 },
      { name: 'Martini Rojo', price: 70 },
      { name: 'Martini Blanco', price: 70 },
      { name: 'Martini Rosado', price: 70 },
      { name: 'Campari', price: 70 },
      { name: 'Pastis 12/12 St Tropez', price: 100 },
    ],
    digestifs: [
      { name: 'Sambuca Isolabella', price: 70 },
      { name: 'Fernet Branca', price: 70 },
      { name: 'Armagnac', price: 70 },
      { name: 'Get 27', price: 70 },
      { name: 'Grappa Sandro Bottega', price: 70 },
      { name: 'Limoncello', price: 70 },
      { name: 'Cointreau', price: 70 },
      { name: 'Aguardiente de Ciruela', price: 70 },
      { name: 'Aguardiente de Pera Williams', price: 70 },
      { name: 'Baileys', price: 80 },
      { name: 'Amaretto Disaronno', price: 80 }
    ],
    cognacs: [
      { name: 'Calvados Boulard', price: 90 },
      { name: 'ABK6 VS', price: 90 },
      { name: 'ABK6 VSOP', price: 150 },
      { name: 'HENNESSY V.S.', price: 190 },
      { name: 'HENNESSY V.S.O.P.', price: 290 },
      { name: 'ABK6 XO', price: 300 },
      { name: 'HENNESSY X.O. BOTELLA', price: 6500 }
    ],
    rums: [
      { name: 'Bacardi blanco', glass: 80, bottle: '-' },
      { name: 'Bacardi Gold', glass: 80, bottle: '-' },
      { name: 'Relicario Superior', glass: 90, bottle: '-' },
      { name: 'Bacardi 8 años', glass: 140, bottle: '-' },
      { name: 'Relicario Supremo', glass: 140, bottle: '-' },
      { name: 'Ron Zacapa 23', glass: 350, bottle: '-' },
      { name: 'Ron Zacapa XO', glass: '-', bottle: 6500 }
    ],
    whiskies: [
      { name: 'Irish Tullamore Dew', glass: 90, bottle: '-' },
      { name: 'Monkey Shoulder', glass: 95, bottle: 1400 },
      { name: "Jack Daniel's", glass: 90, bottle: 1300 },
      { name: "Jack Daniel's Honey", glass: 90, bottle: 1300 },
      { name: 'Gentleman Jack', glass: 140, bottle: 1400 },
      { name: 'Woodford Reserve', glass: 110, bottle: 1450 },
      { name: 'Bourbon Bulleit', glass: 110, bottle: 1450 },
      { name: 'Glenfiddich 12 años', glass: 120, bottle: 1500 },
      { name: 'Glenfiddich 15 años', glass: 140, bottle: 2200 },
      { name: 'Glenfiddich 18 años', glass: 220, bottle: 3000 },
      { name: 'Black Label', glass: 95, bottle: 1500 },
      { name: 'Blue Label', glass: '-', bottle: 8000 },
      { name: 'Blue Label King George V', glass: '-', bottle: 14000 }
    ],
    vodkas: [
      { name: "Tito's Handmade", glass: 75, bottle: 1100 },
      { name: 'Grey Goose', glass: 90, bottle: 1400 },
      { name: 'Crystal head', glass: 140, bottle: 1900 },
      { name: 'Grey Goose Altius', glass: '-', bottle: 4500 },
      { name: 'Belvedere 10', glass: '-', bottle: 6000 }
    ],
    gins: [
      { name: 'Bombay Sapphire', glass: 80, bottle: 1200 },
      { name: "Hendrick's", glass: 100, bottle: 1400 },
      { name: 'Tanqueray', glass: 120, bottle: 1600 },
      { name: 'Tanqueray Royale', glass: 120, bottle: 1600 },
      { name: 'Gin Mare', glass: 140, bottle: 2000 },
      { name: 'Monkey 47', glass: 160, bottle: 2200 },
      { name: 'Palmarae (Gin de Lujo)', glass: 250, bottle: 3000 }
    ],
    tequilas: [
      { name: 'Camino Real', glass: 70, bottle: '-' },
      { name: 'Mezcal San Cosme', glass: 150, bottle: 1500 },
      { name: 'Patron Silver', glass: 100, bottle: 1500 },
      { name: 'Patron Reposado', glass: '-', bottle: 2000 },
      { name: 'Patron Añejo', glass: '-', bottle: 2000 },
      { name: 'Clase Azul Reposado', glass: '-', bottle: 9000 },
      { name: 'Don Julio 1942', glass: '-', bottle: 12000 }
    ],
    sangrias: [
      { name: 'Sangría Original (Vino) Tinta/Blanca/Rosada', glass: 70, bottle: 280 },
      { name: 'Sangría de Cava Tinta/Blanca/Rosada', glass: 95, bottle: 380 }
    ]
  };

  // Variantes de animación
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

  // Primero, definir tipos para los elementos del menú
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

  // Componente DrinkSection actualizado con mejor alineación
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
            <div className="text-center">Copa</div>
            <div className="text-center">Botella</div>
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

  // Componente de divisor decorativo pequeño
  const SmallDivider = () => (
    <div className="flex items-center justify-center my-10">
      <div className="h-px w-10 bg-amber-200/30"></div>
      <div className="mx-2 text-amber-200/50 text-xs">✦</div>
      <div className="h-px w-10 bg-amber-200/30"></div>
    </div>
  );

  return (
    <section ref={menuRef} className="py-16 bg-[#3e4c52] text-amber-50 relative">
      {/* Elementos de fondo */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-[url('/texture.png')] bg-repeat opacity-10"></div>
      </div>
      
      {/* Contenido del menú */}
      <div className="container mx-auto px-4">
        {/* SECCIÓN DE CERVEZAS */}
        <DrinkSection 
          title="CERVEZAS" 
          items={menuData.beers} 
          className="mb-14"
        />

        <SmallDivider />

        {/* SECCIÓN DE APERITIVOS Y DIGESTIVOS - Lado a lado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          <DrinkSection title="APERITIVOS" items={menuData.aperitifs} />
          <DrinkSection title="DIGESTIVOS" items={menuData.digestifs} columns={2} />
        </div>

        <SmallDivider />

        {/* SECCIÓN DE COÑAC/BRANDY Y RON */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          <DrinkSection title="COÑAC / CALVADOS" items={menuData.cognacs} />
          <DrinkSection title="RON" items={menuData.rums} hasBottle={true} />
        </div>

        <SmallDivider />

        {/* SECCIÓN DE WHISKY */}
        <DrinkSection 
          title="WHISKY" 
          items={menuData.whiskies} 
          hasBottle={true}
          className="mb-14"
        />

        <SmallDivider />

        {/* SECCIÓN DE LICORES - VODKA, GIN, TEQUILA */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          <DrinkSection title="VODKA" items={menuData.vodkas} hasBottle={true} />
          <DrinkSection title="GIN" items={menuData.gins} hasBottle={true} />
          <DrinkSection title="TEQUILA / MEZCAL" items={menuData.tequilas} hasBottle={true} />
        </div>

        <SmallDivider />

        {/* SECCIÓN DE SANGRÍA - Actualizada para coincidir con el estilo de otras secciones */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="mb-12 max-w-lg mx-auto"
        >
          <div className="bg-amber-900/20 backdrop-blur-sm rounded-lg p-5 border border-amber-200/20">
            <h3 className="text-center font-SweetSansProBold text-2xl font-serif tracking-wider text-amber-100 mb-4">
              SANGRÍA
            </h3>
            
            <motion.div variants={containerVariants}>
              <div className="grid grid-cols-[2fr_0.5fr_0.5fr] text-amber-100/80 font-light text-sm mb-2">
                <div className="text-left"></div>
                <div className="text-center">Copa</div>
                <div className="text-center">Jarra</div>
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
      
      {/* Divisor elegante inferior */}
      <div className="flex items-center justify-center mt-12">
        <div className="h-px w-16 bg-amber-200/40"></div>
        <div className="mx-3 text-amber-200/60">✦</div>
        <div className="h-px w-16 bg-amber-200/40"></div>
      </div>
    </section>
  );
}