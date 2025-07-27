'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CocktailItem {
  name: string;
  description: string;
  price: number | null;
  detailedDescription?: string;
}

interface CocktailSection {
  title: string;
  items: CocktailItem[];
}

const CocktailMenuItem: React.FC<CocktailItem & { onExpand: () => void, isExpanded: boolean }> = ({
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
className="bg-amber-900/20 backdrop-blur-sm rounded-lg p-6 border border-amber-200/20 relative overflow-hidden group cursor-pointer"
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
{price && <span className="text-amber-200 font-light">{price}</span>}
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
      </div>
      
      {/* Efecto de resaltado */}
      <div className="absolute -inset-2 bg-gradient-to-tr from-amber-500/5 to-amber-300/10 opacity-0 group-hover:opacity-100 transform translate-y-full group-hover:translate-y-0 transition-all duration-700 rounded-lg"></div>
    </motion.div>
  );
};

const CocktailMenuSection: React.FC<CocktailSection> = ({ title, items }) => {
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
          <CocktailMenuItem
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

export default function CocktailsMenu() {
  const menuRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [expandedShot, setExpandedShot] = useState<number | null>(null);

  const handleShotExpand = (index: number) => {
  setExpandedShot(expandedShot === index ? null : index);
};


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

  // Todos los datos del menú en un solo lugar
  const menuSections: CocktailSection[] = [
    {
      title: 'CÓCTELES SIGNATURE',
      items: [
{
      name: 'CAP SPARTEL',
      description: 'Gin Bombay Dry, Zumo de Sandía, Limón, Menta',
      price: 95,
      detailedDescription: 'Inspirado por el faro de Cap Spartel, este cóctel refrescante combina las notas botánicas del Bombay Dry con la frescura de la sandía. El limón y la menta aportan una vivacidad mediterránea a esta creación costera.'
    },
    {
      name: 'ACHAKKAR',
      description: 'Vodka Titos, Zumo de Melón Natural, Miel y Flor de Saúco, Licor de Melón',
      price: 95,
      detailedDescription: 'Una sinfonía de dulzura veraniega donde el vodka premium se encuentra con la frescura del melón natural. La miel y la flor de saúco añaden una complejidad floral delicada, coronada por la riqueza del licor de melón.'
    },
    {
      name: 'TANGERINO',
      description: 'Sirope de Lavanda, Tequila Infusionada con Hibisco, Coco Puro Casero, Limón',
      price: 95,
      detailedDescription: 'Una puesta de sol provenzal en un vaso, donde la tequila infusionada con hibisco se encuentra con la dulzura del coco casero. El sirope de lavanda aporta una nota floral sofisticada a esta creación exótica.'
    },
{
  name: 'HAFA',
  description: 'Mezcal San Cosme, Aperol, Sirope de Menta y Azafrán, Limón, Orange Bitters',
  price: 95,
  detailedDescription: 'Un viaje complejo que presenta mezcal y Aperol italiano. El sirope de menta con azafrán crea un sofisticado equilibrio entre frescura y especias preciosas, realzado por los bitters de naranja.'
}

      ]
    },
    {
      title: 'MOCKTAILS',
      items: [
        {
          name: 'SOCCO BREEZE',
          description: 'Hibisco, Zumo de Naranja, Limón, Sirope de Agave',
          price: 90,
          detailedDescription: 'Un vibrante homenaje sin alcohol a la plaza del Gran Socco, presentando una infusión de hibisco de un rojo profundo. La dulzura natural del agave combina perfectamente con las notas cítricas para un refrescante compañero de un día en el mercado.'
        },
    {
      name: 'MENDOUBIA SUNSET',
      description: 'Orgeat, Limón, Aquafaba, Piña Natural',
      price: 90,
      detailedDescription: 'Inspirado en los jardines de Mendoubia, esta delicia tropical combina el orgeat de almendra con la piña natural. La aquafaba crea una textura sedosa que rivaliza con cualquier espuma de cóctel clásico.'
    },
        {
          name: 'CERVANTES COOLER',
          description: 'Puré de Melón Casero, Sirope de Albahaca, Limón',
          price: 90,
          detailedDescription: 'Un mocktail fresco como un jardín que celebra los sabores mediterráneos. El dulce puré de melón cantalupo se encuentra con el aromático sirope de albahaca, finalizado con un toque de cítricos que evoca las aceras de verano.'
        }
      ]
    },
{
  title: 'SHOTS',
  items: [
    {
      name: 'MALABATA',
      description: 'Vodka Titos, Licor Pasión, Pure Passion, Zumo de Naranja',
      price: null,
      detailedDescription: 'Recuerdos de playas soleadas capturados en un vaso, donde el vodka puro se encuentra con la pasión tropical. El zumo de naranja fresco añade brillo y equilibrio, creando una refrescante escapada junto al mar.'
    },
    {
      name: 'RMILATH',
      description: 'Gin Bombay Dry, Licor Litchi, Zumo de Piña, Menta',
      price: null,
      detailedDescription: 'Una mezcla exótica donde la ginebra seca se encuentra con la dulzura del lichi y la frescura de la piña. La menta aporta una nota refrescante a esta creación tropical.'
    },
    {
      name: 'KASBAH',
      description: 'Tequila Camino, Kahlua, Cold Brew',
      price: null,
      detailedDescription: 'Un cálido homenaje a los sabores intensos, mezclando tequila premium con licor de café. El cold brew añade una profundidad y riqueza incomparables.'
    },
    {
      name: 'PERDICARIS',
      description: 'Tequila Infusionada con Hibisco, Licor de Naranja, Naranja, Granadina',
      price: null,
      detailedDescription: 'Inspirado en leyendas locales, este colorido shot combina tequila infusionada con hibisco y cítricos. Un equilibrio perfecto entre fuerza y sabores florales.'
    }
      ]
    },
    {
      title: 'AGUAS Y REFRESCOS',
      items: [
        {
          name: 'SIDI ALI 75cl',
          description: 'Agua mineral natural',
          price: 50,
          detailedDescription: 'Agua mineral natural refrescante de Marruecos, manantial de las montañas del Atlas que ofrece un agua ligeramente mineralizada con un sabor puro y equilibrado.'
        },
        {
          name: 'EVIAN 75cl',
          description: 'Agua mineral premium',
          price: 90,
          detailedDescription: 'Agua mineral pura de los Alpes franceses, resultado de un viaje de más de 15 años a través de las rocas alpinas. Su pureza y composición equilibrada la convierten en una referencia mundial.'
        },
        {
          name: 'OULMÈS 75cl',
          description: 'Agua mineral con gas',
          price: 50,
          detailedDescription: 'Agua mineral con gas marroquí clásica, naturalmente efervescente con burbujas finas. Una referencia nacional reconocida por sus propiedades digestivas y su sabor refrescante.'
        },
        {
          name: 'EVIAN CON GAS 75cl',
          description: 'Agua mineral con gas natural',
          price: 90,
          detailedDescription: 'Agua mineral naturalmente con gas de Evian, combinando la legendaria pureza de la fuente con una delicada efervescencia. Perfecta para acompañar sus comidas gastronómicas.'
        },
        {
          name: 'SODAS',
          description: 'Diferentes sabores disponibles',
          price: 50,
          detailedDescription: 'coca cola, coca cola zero, schweppes limón, schweppes tonic, sprite, poms, hawai.'
        },
        {
          name: 'RED BULL',
          description: 'Bebida energética',
          price: 100,
          detailedDescription: 'Bebida energética premium, ideal sola o mezclada con sus licores favoritos.'
        },
        {
          name: 'GINGER ALE TRIBUTE',
          description: 'Refresco premium de jengibre',
          price: 100,
          detailedDescription: 'Refresco artesanal premium con vivas notas de jengibre fresco, perfecto solo o en cóctel.'
        },
        {
          name: 'ZUMO FRESCO',
          description: 'Zumos recién exprimidos por encargo',
          price: 60,
          detailedDescription: 'Zumos artesanales exprimidos al momento con las mejores frutas de temporada del día. Nuestra selección cambia al ritmo del mercado, garantizando un sabor óptimo en cada vaso.'
        },
        {
          name: 'CAFÉ ESPRESSO',
          description: 'Illy café',
          price: 50,
          detailedDescription: 'Granos de Arábica de origen único tostados localmente y preparados según sus preferencias. Desde el intenso espresso hasta el cremoso café con leche, cada taza está elaborada con experiencia.'
        },
        //{
        //  name: 'TÉ DE MENTA',
         // description: 'Té marroquí tradicional',
         // price: 50,
         // detailedDescription: 'Refrescante té de menta preparado a la manera tradicional.'
       // },
        {
          name: 'TÉ SAYRA',
          description: 'Diferentes aromas',
          price: 50,
          detailedDescription: 'Una colección exclusiva de tés perfumados con aromas sutiles y cautivadores. Cada taza revela una sinfonía de sabores entre notas florales, afrutadas y especiadas, para un momento de pura relajación.'
        }
      ]
    }
  ];

  // Componente divisor elegante para reducir la repetición
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
        {/* Aviso sobre clásicos - Ahora entre el título principal y cócteles signature */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="bg-amber-900/20 backdrop-blur-sm rounded-lg p-6 border border-amber-200/20 relative overflow-hidden">
            <div className="relative z-10">              
              <div className="text-center text-amber-100/80 italic">
                <p>TODOS LOS CLÁSICOS DISPONIBLES <span className="font-light">*Pregunta su camarero*</span></p>
              </div>
            </div>
          </div>
        </motion.div>
        <ElegantDivider />
        
        {/* Sección CÓCTELES SIGNATURE */}
        <CocktailMenuSection title={menuSections[0].title} items={menuSections[0].items} />
        <ElegantDivider />
        
        {/* Sección MOCKTAILS */}
        <CocktailMenuSection title={menuSections[1].title} items={menuSections[1].items} />
        <ElegantDivider />
        
        {/* Sección SHOTS con información de precios */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h3 className="font-SweetSansProBold text-center font-serif text-3xl tracking-wider text-amber-100 mb-10">
            SHOTS
          </h3>
          
          <div className="bg-amber-900/20 backdrop-blur-sm rounded-lg p-6 border border-amber-200/20 relative overflow-hidden mb-8">
            <div className="relative z-10">              
              <div className="flex flex-col items-center space-y-4">
                <div className="text-center">
                  <span className="block text-lg text-amber-100">5 POR 180 DHS</span>
                </div>
                <div className="text-center">
                  <span className="block text-lg text-amber-100">10 POR 300 DHS</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Elementos de shots */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
{menuSections[2].items.map((item, index) => (
  <CocktailMenuItem
    key={index}
    {...item}
    onExpand={() => handleShotExpand(index)}  // ← Proper function
    isExpanded={expandedShot === index}       // ← Proper state check
  />
))}
          </div>
        </motion.div>
        <ElegantDivider />
        
        {/* Sección AGUAS Y REFRESCOS */}
        <CocktailMenuSection title={menuSections[3].title} items={menuSections[3].items} />
      </div>
      
      {/* Divisor elegante inferior */}
      <div className="flex items-center justify-center mt-20">
        <div className="h-px w-24 bg-amber-200/40"></div>
        <div className="mx-4 text-amber-200/60">✦</div>
        <div className="h-px w-24 bg-amber-200/40"></div>
      </div>
    </section>
  );
}