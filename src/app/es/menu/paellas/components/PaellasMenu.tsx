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
          description: 'Arroz con azafrán guarnecido con delicados trozos de pescado blanco cocinado en un caldo marino aromatizado',
          price: 120,
          forMinPersons: 2,
          detailedDescription: 'Esta paella tradicional de la costa valenciana se prepara con arroz bomba infusionado en azafrán y cocinado en un rico caldo de pescado. Se sirve con una salsa de ajo emulsionada aparte para realzar los delicados sabores marinos según su gusto.'
        },
        {
          name: 'PAELLA DE CALAMARES Y GAMBAS',
          description: 'Arroz dorado con azafrán guarnecido con tiernos calamares y jugosas gambas cocinados a la perfección',
          price: 150,
          forMinPersons: 2,
          detailedDescription: 'Nuestra paella de mariscos combina arroz bomba sutilmente aromatizado con calamares frescos cortados en anillos y gambas salvajes. Todo se cocina a fuego lento en un caldo marino sabiamente condimentado hasta formar la deliciosa socarrat, esa costra caramelizada que da todo el encanto a una auténtica paella.'
        },
        {
          name: 'PAELLA NEGRA',
          description: 'Arroz negro intenso infusionado con tinta de calamar y guarnecido con gambas rosadas de suave aroma a mar',
          price: 160,
          forMinPersons: 2,
          detailedDescription: 'Esta espectacular paella debe su color negro ébano a la tinta de calamar que también aporta un profundo sabor marino. El arroz cremoso contrasta perfectamente con la tierna carne de las gambas, todo realzado con un chorrito de aceite de oliva infusionado con limón y un toque de ajo.'
        },
        {
          name: 'PAELLA ESTILO HERGMA',
          description: 'Paella de patas de ternera y garbanzos al estilo hergma. Fusión mediterránea que une la tradición española con los sabores norteafricanos del hergma.',
          price: 150,
          forMinPersons: 2,
          detailedDescription: 'Esta creación original une el arte de la paella española con los sabores del tradicional Hergma marroquí. Las patas de ternera, cocinadas durante horas hasta derretirse, se mezclan con cremosos garbanzos y arroz perfumado con especias suaves para una experiencia gustativa única entre las dos orillas del Mediterráneo.'
        },
        {
          name: 'PAELLA DEL SEÑORITOS',
          description: 'Generoso festín marino de gambas, mejillones, calamares y almejas sobre cama de arroz con azafrán',
          price: 220,
          forMinPersons: 2,
          detailedDescription: 'Nuestra paella real de mariscos combina una variada selección de tesoros marinos completamente pelados para su comodidad: gambas tigre, mejillones de Galicia, anillos de calamar y almejas frescas. El arroz, perfumado con azafrán y pimentón ahumado, captura todos los sabores de los mariscos para una experiencia gustativa marina incomparable.'
        },
        {
          name: 'PAELLA DE LANGOSTA',
          description: 'Lujosa paella adornada con langosta entera, revelando la quintaesencia de los sabores marinos',
          price: 380,
          forMinPersons: 2,
          detailedDescription: 'Esta excepcional paella destaca la langosta en todo su esplendor, colocada en el centro de una cama de arroz dorado perfumado con su caldo. La delicada y dulce carne de este noble crustáceo se combina perfectamente con el arroz impregnado de sabores marinos y azafrán. Una experiencia gastronómica mediterránea por excelencia.'
        },
        {
          name: 'PAELLA DE VERDURAS',
          description: 'Colorido mosaico de verduras de temporada sobre arroz con azafrán, celebración de los sabores de la huerta',
          price: 140,
          forMinPersons: 2,
          detailedDescription: 'Nuestra paella vegetariana destaca una generosa selección de verduras mediterráneas de temporada: alcachofas, pimientos, berenjenas, calabacines y judías verdes. Cocinadas en un caldo con hierbas aromáticas y azafrán, estas verduras transmiten toda su frescura al arroz para un plato tan sabroso como colorido.'
        },
        {
          name: 'PAELLA VALENCIANA',
          description: 'La auténtica paella de Valencia que combina tiernos trozos de pollo de corral y verduras frescas',
          price: 150,
          forMinPersons: 2,
          detailedDescription: 'Fiel a la auténtica receta valenciana, esta paella combina trozos dorados de pollo con una selección de verduras de temporada. El arroz bomba, cocinado lentamente en un caldo perfumado con azafrán y pimentón, absorbe todos los sabores para crear este emblemático plato español en su versión más tradicional.'
        },
      ]
    },
    {
      title: 'ARROCES Y PASTAS',
      items: [
        {
          name: 'ARROZ MELOSO A LA MARINERA CON GAMBA ROJA',
          description: 'Arroz cremoso estilo risotto con notas marinas, coronado con gambas rojas de carne dulce',
          price: 280,
          detailedDescription: 'Este arroz meloso inspirado en el arroz meloso español se prepara con un intenso fumet de crustáceos y se guarnece con gambas rojas del Mediterráneo. Su textura, entre la paella y el risotto, ofrece una cremosidad que envuelve el paladar mientras las gambas aportan su delicado sabor y su característica textura firme.'
        },
        {
          name: 'FIDEUÁ DEL SEÑORITOS',
          description: 'Fideos finos dorados preparados como una paella, ricamente guarnecidos con mariscos pelados',
          price: 220,
          detailedDescription: 'Esta especialidad de la costa valenciana sustituye los finos fideos por el arroz tradicional de la paella. Dorados y luego cocinados a fuego lento en un fumet de pescado con azafrán, estos fideos se enriquecen con los sabores de las gambas, calamares, mejillones y almejas cuidadosamente pelados para una óptima comodidad al degustar.'
        },
        {
          name: 'ESPAGUETIS A LA VONGOLE',
          description: 'Espaguetis al dente con almejas frescas, perfumados con ajo, perejil y vino blanco',
          price: 160,
          detailedDescription: 'Este clásico italiano se prepara respetando la tradición: almejas frescas abiertas al momento en un caldo de ajo, perejil fresco y vino blanco de calidad. Los espaguetis, cocinados al dente, se combinan perfectamente con este jugo de cocción con aromas marinos, realzado con un toque de aceite de oliva virgen extra.'
        },
        {
          name: 'ESPAGUETIS AL NERO',
          description: 'Espaguetis negros con tinta de calamar, adornados con tiernos trozos de calamar y albahaca fresca',
          price: 120,
          detailedDescription: 'Estos espaguetis negros teñidos con tinta de calamar se sirven con trozos de calamar apenas sellados para preservar su ternura. La albahaca fresca aporta una nota aromática que contrasta deliciosamente con los sabores marinos, todo ligado con un toque de aceite de oliva y un poco de ajo.'
        },
        {
          name: 'LINGUINE CON PESCADOS Y MARISCOS',
          description: 'Linguine con delicias del mar mezclando pescados nobles y mariscos en una salsa aromatizada',
          price: 180,
          detailedDescription: 'Nuestros linguine están generosamente guarnecidos con una selección de pescados blancos, gambas, mejillones y calamares, todo ligado con una delicada salsa de tomate perfumada con albahaca e hinojo silvestre. Cada bocado revela la frescura de los productos del mar cuidadosamente seleccionados por nuestro chef.'
        },
        {
          name: 'TAGLIATELLE CON POLLO AL CARBON Y SETAS',
          description: 'Cintas de pasta con láminas de pollo a la parrilla y champiñones salteados en salsa cremosa',
          price: 140,
          detailedDescription: 'Nuestros tagliatelle se acompañan de trozos de pollo de corral asados al carbón y champiñones forestales salteados con ajo. Una salsa cremosa de parmesano y hierbas frescas envuelve delicadamente la pasta para un plato reconfortante con sabores auténticos.'
        },
        {
          name: 'CUSCÚS DE PESCADO CON AROMAS DE MARRUECOS',
          description: 'Sémola al vapor con especias marroquíes coronada con una rica selección de pescados y mariscos',
          price: 240,
          specialDay: "VIERNES",
          detailedDescription: 'Disponible únicamente los viernes, nuestro cuscús de mar ofrece una generosa selección de pescados y mariscos cocinados a fuego lento en un caldo con especias tradicionales marroquíes. La sémola al vapor, perfectamente hidratada y perfumada, se acompaña de una harissa casera cuya intensidad puede dosificar según su gusto.'
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