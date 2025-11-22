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
      {/* Elementos decorativos */}
      <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-amber-200/30"></div>
      <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-amber-200/30"></div>
      
      {/* Contenido */}
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
    // Asegurar que el observador esté creado
    const observer = new IntersectionObserver(
      (entries) => {
        // Log para ayudar a depurar
        console.log("Intersección observada:", entries[0].isIntersecting);
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    // Log para ayudar a depurar
    console.log("Configurando observador en:", menuRef.current);
    
    if (menuRef.current) {
      observer.observe(menuRef.current);
    }

    return () => {
      if (menuRef.current) {
        observer.unobserve(menuRef.current);
      }
    };
  }, []);

  // Forzar el estado de visibilidad a true para pruebas
  useEffect(() => {
    // Automáticamente establecer visible después de un breve retraso como respaldo
    const timer = setTimeout(() => {
      if (!isVisible) {
        console.log("Forzando visibilidad después del tiempo de espera");
        setIsVisible(true);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [isVisible]);

  // Todos los datos del menú en un solo lugar
  const menuSections: MenuSection[] = [
    {
      title: 'TAPAS',
      items: [
        {
          name: 'PATATAS BRAVAS',
          description: 'Cubos de patata crujientes servidos con una salsa ligeramente picante',
          price: 60,
          detailedDescription: 'Nuestras patatas son primero confitadas y luego fritas para obtener un contraste perfecto entre lo crujiente y lo tierno, acompañadas de una salsa de tomate picante con pimientos ahumados y pimentón dulce de La Vera.'
        },
        {
          name: 'PATATAS "HURRICANE" CON SUS 3 SALSAS',
          description: 'Patatas en espiral servidas con trío de salsas caseras',
          price: 60,
          detailedDescription: 'Patatas cortadas en espiral y fritas a la perfección, acompañadas de una salsa alioli al azafrán, una salsa brava picante y una salsa cremosa con hierbas frescas del jardín.'
        },
        {
          name: 'PIMIENTOS DEL PADRÓN',
          description: 'Pimientos verdes dulces fritos, acompañados de flor de sal',
          price: 70,
          detailedDescription: 'Un juego de ruleta española donde algunos son dulces y otros sorprenden por su calor, estos pequeños pimientos fritos crujientes se realzan con el crujido de la sal marina gruesa.'
        },
        {
          name: 'ANCHOAS EN VINAGRE',
          description: 'Filetes de anchoa marinados en aceite de oliva y vinagre de Jerez',
          price: 80,
          detailedDescription: 'Anchoas frescas delicadamente fileteadas y marinadas en nuestra mezcla secreta de aceite de oliva virgen extra, vinagre de Jerez añejado y ajo confitado, todo ello realzado con unas pinceladas de perejil fresco.'
        },
        {
          name: 'LA BURRATA',
          description: 'Burrata cremosa acompañada de tomates lentamente ahumados a la leña',
          price: 95,
          detailedDescription: 'Nuestra cremosa burrata de Apulia se sirve con tomates suavemente ahumados sobre brasas de madera de olivo durante varias horas, todo ello sublimado con nuestro aceite de oliva de primera presión en frío y albahaca fresca.'
        },
{
  name: 'ASADILLOS DE PIMIENTOS CON VENTRESCA',
  description: 'Pimientos rojos asados al horno acompañados de ventresca de atún en aceite de oliva',
  price: 90,
  detailedDescription: 'Nuestros pimientos rojos son lentamente asados al horno hasta obtener una textura melosa y concentrar sus sabores. Se acompañan de ventresca de atún de primera calidad conservada en aceite de oliva infusionado con hierbas mediterráneas.'
},
        {
          name: 'PARMIGIANA DE TERNERA CON CHORIZO HALAL',
          description: 'Deliciosa preparación de berenjenas, ternera y chorizo halal gratinada al horno',
          price: 90,
          detailedDescription: 'Capas alternadas de berenjenas a la parrilla, ternera estofada y chorizo halal ligeramente picante, todo ello cubierto con una salsa de tomate con hierbas frescas y generosamente gratinado con parmesano curado 24 meses.'
        },
        {
          name: 'PARMIGIANA DE MARISCOS',
          description: 'Una variante marina de la tradicional parmigiana de mariscos.',
          price: 90,
          detailedDescription: 'Nuestra interpretación marina combina berenjenas a la parrilla, una delicada selección de mariscos y una salsa bechamel perfumada con azafrán, todo ello cubierto de queso y delicadamente gratinado al horno.'
        },
        {
          name: 'MANCHEGO FLOR DE ESGUEVA',
          description: 'Surtido de lonchas de queso manchego curado',
          price: 140,
          detailedDescription: 'Nuestro manchego Flor de Esgueva está curado durante 12 meses para desarrollar sus complejos aromas de avellana y mantequilla.'
        },
        {
          name: 'JAMÓN IBÉRICO',
          description: 'Finas lonchas de jamón ibérico curado 36 meses',
          price: 220,
          detailedDescription: 'Nuestro jamón ibérico proviene de cerdos criados en libertad y alimentados con bellotas. Curado durante 36 meses en las mejores condiciones, ofrece una textura fundente y aromas complejos a avellana con una ligera nota dulce.'
        },
        {
          name: 'CHORIZO IBÉRICO',
          description: 'Lonchas de chorizo artesanal de cerdo ibérico alimentado con bellotas',
          price: 140,
          detailedDescription: 'Este chorizo excepcional está elaborado con cerdo ibérico alimentado exclusivamente con bellotas durante la montanera. Su condimentación con pimentón ahumado le confiere sabores intensos y complejos revelados por una curación tradicional.'
        },
        {
          name: 'SURTIDO DE JAMÓN Y MANCHEGO',
          description: 'Selección de jamones ibéricos y quesos españoles con acompañamientos',
          price: 200,
          detailedDescription: 'Nuestra tabla de degustación incluye una refinada selección de jamones ibéricos y quesos españoles artesanales, acompañados de aceitunas marinadas, almendras tostadas al romero y pan crujiente.'
        },
        {
          name: 'SURTIDO DE BRESAOLA Y MANCHEGO',
          description: 'Finas lonchas de bresaola de pavo y de manchego curado',
          price: 90,
          detailedDescription: 'La finura de nuestra bresaola de pavo delicadamente especiada se combina perfectamente con la riqueza del manchego curado. Todo ello está sutilmente realzado con un chorrito de aceite de oliva virgen y unas gotas de vinagre balsámico reducido.'
        },
        {
          name: 'ENSALADILLA RUSA',
          description: 'Versión refinada de la tradicional ensaladilla de verduras y mayonesa',
          price: 70,
          detailedDescription: 'Nuestra elegante interpretación de la ensaladilla rusa tradicional combina patatas, zanahorias y guisantes finamente cortados, todo ello envuelto en una ligera mayonesa perfumada con limón y eneldo fresco.'
        },
        {
          name: 'ENSALADILLA DE LANGOSTA',
          description: 'Versión lujosa de nuestra ensaladilla rusa con trozos de langosta fresca',
          price: 180,
          detailedDescription: 'Esta versión gastronómica de la ensaladilla rusa se sublima con generosos trozos de langosta del Mediterráneo y una mayonesa delicadamente alimonada con cítricos confitados y cebollino fresco del huerto.'
        },
        {
          name: 'ENSALADILLA DE PULPO',
          description: 'Nuestra ensaladilla rusa revisitada con pulpo tierno y toques afrutados',
          price: 90,
          detailedDescription: 'Esta reinterpretación creativa combina nuestro pulpo cocinado a baja temperatura, dados de manzana verde Granny Smith para un toque ácido y cebollas rojas crujientes, todo ello ligado con una mayonesa de hierbas frescas.'
        },
{
  name: 'PARRILLADA DE VERDURAS DE TEMPORADA',
  description: 'Berenjena, calabacín, cebolla, tomate, champiñones, alcachofas, espárragos y pimientos',
  price: 160,
  detailedDescription: 'Colorido surtido de verduras de temporada cocinadas a la brasa para desarrollar sus sabores naturales.'
},
        {
          name: 'PULPO A LA GALLEGA',
          description: 'Pulpo tierno servido sobre lecho de patatas al pimentón ahumado',
          price: 140,
          detailedDescription: 'Nuestro pulpo se cocina lentamente según la tradición gallega y se sirve sobre un lecho de patatas tiernas, generosamente espolvoreado con pimentón ahumado de La Vera y rociado con aceite de oliva virgen extra infusionado con ajo.'
        },
        {
          name: 'PULPO A LA LEÑA',
          description: 'Majestuoso tentáculo de pulpo confitado y luego asado sobre brasas',
          price: 160,
          detailedDescription: 'Nuestro tentáculo de pulpo es primero confitado durante varias horas y luego asado sobre brasas ardientes para obtener un contraste perfecto entre una textura tierna y notas ligeramente ahumadas.'
        },
        {
  name: 'REVUELTO DE SETAS DE MONTAÑA CON CEPS',
  description: 'Huevos revueltos con setas silvestres de montaña y ceps (boletus edulis)',
  price: 140,
  detailedDescription: 'Nuestros huevos revueltos se preparan con una selección de setas silvestres de montaña y ceps (boletus edulis) para una experiencia gastronómica auténtica.'
},
{
  name: 'CORAZONES DE ALCACHOFAS RELLENOS DE MARISCO Y GRATINADOS',
  description: 'Corazones de alcachofas rellenos de marisco y gratinados a la perfección',
  price: 140,
  detailedDescription: 'Nuestros corazones de alcachofas están generosamente rellenos de una delicada selección de mariscos y gratinados al horno para obtener una textura dorada y crujiente.'
},
{
  name: 'ESPÁRRAGOS DE TUDELA A LA BRASA SOBRE CREMA DE TOMATE Y GRATINADOS CON PARMESANO',
  description: 'Espárragos de Tudela a la brasa servidos sobre crema de tomate y gratinados con parmesano',
  price: 140,
  detailedDescription: 'Nuestros espárragos de Tudela se asan a la perfección y se sirven sobre un lecho de crema de tomate casera, todo ello gratinado con parmesano curado.'
},
{
  name: 'ESPÁRRAGOS A LA BRASA CON ACEITE Y LIMÓN',
  description: 'Espárragos a la brasa con aceite de oliva y limón',
  price: 140,
  detailedDescription: 'Nuestros espárragos se asan a la brasa y se condimentan simplemente con aceite de oliva virgen extra y un chorrito de limón fresco.'
}
      ]
    },
    {
      title: 'ENSALADAS',
      items: [
        {
          name: 'ESCALIVADA CON ATÚN',
          description: 'Pimientos, berenjenas y cebollas asados con atún a la parrilla y un toque de aceite de ajo',
          price: 100,
          detailedDescription: 'Nuestra escalivada tradicional compuesta de pimientos, berenjenas y cebollas lentamente asados al fuego de leña se sublima con trozos de atún asado a la brasa y un toque de aceite de ajo para una profundidad aromática única.'
        },
        {
          name: 'ENSALADA DE SALMÓN AHUMADO Y AGUACATE',
          description: 'Mezcla fresca de salmón ahumado y aguacate con vinagreta de miel y mostaza',
          price: 110,
          detailedDescription: 'Delicadas lonchas de salmón ahumado casero se casan perfectamente con cuartos de aguacate cremoso, todo realzado por nuestra vinagreta signature con miel de flores silvestres y mostaza a la antigua.'
        },
        {
          name: 'ENSALADA CÉSAR ORIGINAL',
          description: 'Lechuga romana, salsa César casera, pollo asado al carbón y parmesano',
          price: 120,
          detailedDescription: 'Nuestra ensalada César combina lechuga romana crujiente, picatostes, virutas de parmesano curado y pollo de corral marinado y asado en nuestra barbacoa Mibrasa, todo envuelto en nuestra salsa César con anchoas preparada al momento.'
        },
        {
          name: 'ENSALADA MARINERA',
          description: 'Composición fresca de mariscos con aguacate y tomates cherry',
          price: 120,
          detailedDescription: 'Un festival marino que combina gambas, salmón ahumado y calamares con cuartos de aguacate cremoso y tomates cherry sobre un lecho de ensalada verde, todo delicadamente aliñado con vinagreta de cítricos y hierbas frescas.'
        }
      ]
    },
    {
      title: 'CARPACCIOS',
      items: [
        {
          name: 'CARPACCIO DE TOMATE TANGERINO',
          description: 'Finas lonchas de tomate con atún, alcaparras y aceite de oliva virgen extra',
          price: 120,
          detailedDescription: 'Un carpaccio refinado de tomates Tangerino finamente laminados, ofreciendo una frescura ácida equilibrada por la riqueza del atún delicadamente desmenuzado. Adornado con alcaparras y sublimado por un generoso aceite de oliva virgen extra. Un entrante ligero y elegante que celebra la simplicidad de los sabores mediterráneos.'
        },
        {
          name: 'CARPACCIO DE PULPO',
          description: 'Finas lonchas de pulpo tierno',
          price: 120,
          detailedDescription: 'Nuestro pulpo se cuece primero lentamente y luego se lamina finamente. Cada bocado ofrece una textura tierna y un perfecto equilibrio de sabores marinos.'
        },
        {
          name: 'CARPACCIO DE GAMBAS ROJAS FLAMEADAS',
          description: 'Delicadas lonchas de gambas rojas salvajes con un toque de ajo picante',
          price: 160,
          detailedDescription: 'Nuestras gambas rojas salvajes del Mediterráneo se flamean ligeramente, se laminan finamente y se aliñan con aceite perfumado con ajo y guindilla. Un manjar marino de sabores intensos y textura incomparable.'
        },
        {
          name: 'CARPACCIO DE ATÚN ROJO',
          description: 'Finas lonchas de atún rojo crudo con salsa tailandesa y pimientos verdes',
          price: 140,
          detailedDescription: 'Nuestro atún rojo del Mediterráneo, pescado con caña y finamente laminado, se sublima con salsa tailandesa con lima y pimientos verdes crujientes, todo acompañado de vinagreta creando un maridaje perfecto entre tradición mediterránea e influencias asiáticas.'
        },
        {
          name: 'CARPACCIO DE TERNERA',
          description: 'Finas lonchas de ternera cruda aliñadas con aceite de trufa y virutas de parmesano',
          price: 120,
          detailedDescription: 'Nuestro solomillo de ternera se sella ligeramente, se lamina finamente y se presenta con un hilo de aceite de trufa, virutas de parmesano curado 24 meses y algunas alcaparras.'
        },
        {
          name: 'CARPACCIO ESTILO BRESAOLA',
          description: 'Finas lonchas de lomo de pavo marinado y secado como bresaola',
          price: 120,
          detailedDescription: 'Nuestro lomo de pavo se marina en una mezcla de especias, vino y hierbas aromáticas y luego se seca lentamente para desarrollar un sabor complejo que recuerda a la bresaola tradicional, servido con rúcula y virutas de parmesano.'
        },
        {
          name: 'SASHIMI DE SALMONETE MARINADO Y FLAMEADO',
          description: 'Finas lonchas de salmonete acompañadas de un salpicón de gambas',
          price: 145,
          detailedDescription: 'Nuestro salmonete del Mediterráneo se marina brevemente y luego se flamea para desarrollar sus aromas preservando su delicada textura. Se acompaña de un refrescante salpicón de gambas, hierbas frescas y cítricos.'
        },
      ]
    },
    {
      title: 'SOPAS',
      items: [
        {
          name: 'SOPA DE PESCADOS Y MARISCOS',
          description: 'Rico caldo de pescados y crustáceos con picatostes y rouille',
          price: 120,
          detailedDescription: 'Nuestra sopa se prepara según la tradición mediterránea con un fumet intenso de pescados de roca y una selección de mariscos frescos, servida con picatostes al ajo, gruyere rallado y nuestro rouille casero al azafrán.'
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
            <TapasMenuSection title={section.title} items={section.items} />
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