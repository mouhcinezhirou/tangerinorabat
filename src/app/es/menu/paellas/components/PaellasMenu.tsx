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
      {/* Elementos decorativos */}
      <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-amber-200/30"></div>
      <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-amber-200/30"></div>
      
      {/* Contenido */}
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
              <span className="mr-1">{isExpanded ? 'Menos' : 'Detalles'}</span>
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
                mín {forMinPersons} pers
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Efecto de resaltado */}
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
      <div className="text-center mb-10">
        <h3 className="font-SweetSansProBold font-serif text-3xl tracking-wider text-amber-100">
          {title}
        </h3>
        {title === 'PAELLAS' && (
          <p className="text-amber-100/70 text-sm mt-2">Precio por Persona</p>
        )}
      </div>
      
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

  // Datos del menú en un solo lugar
  const menuSections: MenuSection[] = [
    {
      title: 'PAELLAS',
      items: [
        {
        name: 'PAELLA A BANDA',
        description: 'Arroz redondo con calamar pequeño y gamba pequeña, caldo de pescado y salsa alioli ligera sobre la paella',
        price: 120,
        forMinPersons: 2,
        detailedDescription: 'Esta paella tradicional de la costa valenciana se prepara con arroz redondo cocido en un rico caldo de pescado. Servida con una salsa alioli ligera para realzar los delicados sabores marinos según su gusto.'
      },
      {
        name: 'PAELLA DE CALAMARES Y GAMBAS',
        description: 'Arroz dorado guarnecido con tiernos aros de calamar y gambas cocidas a la perfección',
        price: 150,
        forMinPersons: 2,
        detailedDescription: 'Nuestra paella de mariscos combina un arroz sutilmente aromatizado con calamares frescos cortados en anillos y gambas. Todo se cuece lentamente en caldo de pescado casero.'
      },
      {
        name: 'PAELLA NEGRA',
        description: 'Arroz de paella con tinta de calamar y langostinos',
        price: 160,
        forMinPersons: 2,
        detailedDescription: 'Esta paella espectacular obtiene su color negro ébano de la tinta de calamar que también aporta un sabor marino profundo. El arroz cremoso se casa perfectamente con los langostinos, todo realzado con un chorrito de aceite de oliva infusionado con limón y un toque de ajo.'
      },
      {
        name: 'PAELLA ESTILO HERGMA',
        description: 'Paella de pies de ternera y garbanzos estilo hergma. Fusión mediterránea que une la tradición española con los sabores norteafricanos del hergma.',
        price: 150,
        forMinPersons: 2,
        detailedDescription: 'Esta creación original casa el arte de la paella española con los sabores del tradicional Hergma marroquí. Los pies de ternera, guisados durante horas hasta fundirse, se mezclan con garbanzos cremosos y arroz perfumado con especias suaves para una experiencia gustativa única entre dos orillas del Mediterráneo.'
      },
      {
        name: 'PAELLA DEL SEÑORITO',
        description: 'Generoso festín marino de mariscos y pescado sobre un lecho de arroz redondo',
        price: 220,
        forMinPersons: 2,
        detailedDescription: 'Nuestra paella real de mariscos combina una selección variada de tesoros marinos completamente pelados para su comodidad: mariscos y pescado fresco. El arroz redondo captura todos los sabores de los mariscos para una experiencia gustativa yodada incomparable.'
      },
      {
        name: 'PAELLA DE BOGAVANTE',
        description: 'Lujosa paella adornada con bogavante entero, revelando la quintaesencia de los sabores marinos',
        price: 380,
        forMinPersons: 2,
        detailedDescription: 'Esta paella excepcional pone en valor el bogavante en todo su esplendor, colocado en el centro de un lecho de arroz dorado aromatizado con su caldo. La carne delicada de este crustáceo noble se casa perfectamente con el arroz impregnado de sabores marinos. Una experiencia gastronómica mediterránea por excelencia.'
      },
      {
        name: 'PAELLA DE VERDURAS',
        description: 'Mosaico colorido de verduras de temporada sobre arroz, celebración de los sabores del huerto',
        price: 140,
        forMinPersons: 2,
        detailedDescription: 'Nuestra paella vegetariana pone en valor una generosa selección de verduras de temporada. Cocidas en un caldo de hierbas aromáticas, estas verduras transmiten toda su frescura al arroz para un plato tan sabroso como colorido.'
      },
      {
        name: 'PAELLA VALENCIANA',
        description: 'La paella auténtica de Valencia que casa tiernos trozos de pollo con verduras de temporada',
        price: 150,
        forMinPersons: 2,
        detailedDescription: 'Fiel a la auténtica receta valenciana, esta paella combina trozos de pollo dorados con una selección de verduras de temporada. El arroz redondo, cocido lentamente en caldo condimentado, absorbe todos los sabores para crear este plato emblemático de España en su versión más tradicional.'
      },
    ]
  },
  {
    title: 'ARROZ Y PASTA',
    items: [
      {
        name: 'ARROZ MELOSO A LA MARINERA CON LANGOSTINOS ROJOS',
        description: 'Arroz cremoso estilo risotto con notas yodadas, coronado con langostinos rojos',
        price: 280,
        detailedDescription: 'Este arroz meloso inspirado en el "arroz meloso" español se prepara con un fumet de crustáceos intenso y se guarnece con langostinos rojos del Mediterráneo. Su textura, entre la paella y el risotto, ofrece una cremosidad que envuelve el paladar mientras los langostinos aportan su sabor delicado y su textura firme característica.'
      },
      {
        name: 'FIDEUA DEL SEÑORITO',
        description: 'Fideos fideua ricamente guarnecidos con mariscos',
        price: 220,
        detailedDescription: 'Esta especialidad de la costa valenciana utiliza fideos fideua finos. Dorados y luego guisados en fumet de pescado, estos fideos se enriquecen con sabores de mariscos para un confort de degustación óptimo.'
      },
      {
        name: 'ESPAGUETIS ALLE VONGOLE',
        description: 'Espaguetis al dente con almejas frescas, aromatizados con aceite de oliva, ajo y tomate triturado',
        price: 160,
        detailedDescription: 'Este clásico italiano se prepara respetando la tradición: almejas frescas abiertas al momento con aceite de oliva, ajo y tomate triturado. Los espaguetis, cocidos al dente, se casan perfectamente con esta preparación de aromas marinos, realzada con aceite de oliva virgen extra.'
      },
      {
        name: 'ESPAGUETIS AL NERO',
        description: 'Espaguetis negros con tinta de calamar, adornados con tiernos trozos de calamar y albahaca fresca',
        price: 120,
        detailedDescription: 'Estos espaguetis negros teñidos con tinta de calamar se sirven con trozos de calamar apenas sellados para preservar su ternura. La albahaca fresca aporta una nota aromática que contrasta deliciosamente con los sabores marinos, todo ligado por un toque de aceite de oliva y una pizca de ajo.'
      },
      {
        name: 'LINGUINE CON PESCADO Y MARISCOS',
        description: 'Linguine con delicias del mar con aceite de oliva, ajo y mariscos y tomates triturados frescos',
        price: 180,
        detailedDescription: 'Nuestros linguine están generosamente guarnecidos con mariscos, todo preparado con aceite de oliva, ajo y tomates triturados frescos. Cada bocado revela la frescura de los mariscos cuidadosamente seleccionados por nuestro chef.'
      },
      {
        name: 'TAGLIATELLE CON POLLO A LA BRASA Y CHAMPIÑONES',
        description: 'Cintas de pasta con láminas de pollo a la brasa y champiñones salteados en salsa cremosa',
        price: 140,
        detailedDescription: 'Nuestros tagliatelle se acompañan de trozos de pollo asado al carbón y champiñones forestales salteados con ajo. Una salsa cremosa de parmesano y hierbas frescas envuelve delicadamente la pasta para un plato reconfortante con sabores auténticos.'
      },
      {
        name: 'CUSCÚS DEL MAR CON AROMAS DE MARRUECOS',
        description: 'Sémola al vapor con especias marroquíes con caldo de pescado con especias marroquíes',
        price: 240,
        specialDay: "VIERNES",
        detailedDescription: 'Disponible únicamente los viernes, nuestro cuscús del mar ofrece un caldo de pescado guisado con especias marroquíes tradicionales. La sémola al vapor, perfectamente hidratada y aromatizada, se acompaña de una harissa casera cuya intensidad pueden dosificar según su gusto.'
      }
      ]
    }
  ];

  // Componente de separador elegante para reducir la repetición
  const ElegantDivider = () => (
    <div className="flex items-center justify-center my-16">
      <div className="h-px w-16 bg-amber-200/30"></div>
      <div className="mx-3 text-amber-200/50">✦</div>
      <div className="h-px w-16 bg-amber-200/30"></div>
    </div>
  );

  return (
    <section ref={menuRef} className="py-20 bg-[#3e4c52] text-amber-50 relative">
      {/* Elementos de fondo */}
      <div className="absolute inset-0 opacity-10"></div>
      
      {/* Contenido del menú */}
      <div className="container mx-auto px-4">
        {menuSections.map((section, index) => (
          <div key={index}>
            <PaellasMenuSection title={section.title} items={section.items} />
            {index < menuSections.length - 1 && <ElegantDivider />}
          </div>
        ))}
      </div>
      
      {/* Separador elegante inferior */}
      <div className="flex items-center justify-center mt-20">
        <div className="h-px w-24 bg-amber-200/40"></div>
        <div className="mx-4 text-amber-200/60">✦</div>
        <div className="h-px w-24 bg-amber-200/40"></div>
      </div>
    </section>
  );
}