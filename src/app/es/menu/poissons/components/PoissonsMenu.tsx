'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  nombre: string;
  descripcion: string;
  precio: number;
  descripcionDetallada?: string;
}

interface MenuSection {
  titulo: string;
  items: MenuItem[];
}

const ElementoMenuPescadoCarne: React.FC<MenuItem & { onExpandir: () => void, estaExpandido: boolean }> = ({
  nombre,
  descripcion,
  precio,
  descripcionDetallada,
  onExpandir,
  estaExpandido
}) => {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (estaExpandido && itemRef.current) {
      itemRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [estaExpandido]);

  return (
    <motion.div
      ref={itemRef}
      className="bg-amber-900/20 backdrop-blur-sm rounded-lg p-6 border border-amber-200/20 relative overflow-hidden group"
      whileHover={{ y: -4 }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={onExpandir}
    >
      {/* Elementos decorativos */}
      <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-amber-200/30"></div>
      <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-amber-200/30"></div>
      
      {/* Contenido */}
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-SweetSansProBold text-xl font-serif tracking-wider text-amber-100">
            {nombre}
          </h3>
          <span className="text-amber-200 font-light">{precio}</span>
        </div>
        
        <div className="w-10 h-px bg-amber-200/40 mb-4"></div>
        
        <p className="text-amber-100/70 text-sm">
          {descripcion}
        </p>

        <AnimatePresence>
          {estaExpandido && descripcionDetallada && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="text-amber-100/80 text-sm pl-4 border-l-2 border-amber-200/50 mt-4">
                {descripcionDetallada}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {descripcionDetallada && (
          <div className="mt-4 text-xs text-amber-200 opacity-70 flex items-center">
            <span className="mr-1">{estaExpandido ? 'Menos' : 'Detalles'}</span>
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
              style={{ transform: estaExpandido ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
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

const SeccionMenuPescadoCarne: React.FC<MenuSection> = ({ titulo, items }) => {
  const [itemExpandido, setItemExpandido] = useState<number | null>(null);

  const manejarExpansion = (index: number) => {
    setItemExpandido(itemExpandido === index ? null : index);
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
        {titulo}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {items.map((item, index) => (
          <ElementoMenuPescadoCarne
            key={index}
            {...item}
            onExpandir={() => manejarExpansion(index)}
            estaExpandido={itemExpandido === index}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default function MenuPescadoCarne() {
  const menuRef = useRef<HTMLElement | null>(null);
  const [esVisible, setEsVisible] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEsVisible(true);
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
  const seccionesMenu: MenuSection[] = [
{
  titulo: 'PESCADOS',
  items: [
    {
      nombre: 'PEZ ESPADA A LA PARRILLA',
      descripcion: 'Pez espada fresco de Tánger a la BBQ',
      precio: 220,
      descripcionDetallada: 'Nuestro pez espada fresco de Tánger se asa a la BBQ para preservar su textura tierna y su sabor delicado.'
    },
    {
      nombre: 'CALAMAR A LA PARRILLA',
      descripcion: 'Calamares frescos cocinados a la BBQ con su tinta',
      precio: 220,
      descripcionDetallada: 'Este plato emblemático de la cocina mediterránea presenta calamares frescos cocinados a la BBQ con su tinta.'
    },
    {
      nombre: 'FILETE DE ATÚN ROJO',
      descripcion: 'Atún rojo fresco al carbón servido estilo tataki',
      precio: 220,
      descripcionDetallada: 'Nuestro atún rojo fresco se asa al carbón y se sirve estilo tataki.'
    },
    {
      nombre: 'SALMÓN A LA PARRILLA',
      descripcion: 'Salmón fresco cocinado al carbón servido con rodaja de limón',
      precio: 260,
      descripcionDetallada: 'Nuestro salmón fresco se cocina al carbón y se sirve con una rodaja de limón.'
    },
    {
      nombre: 'CAZUELA DE PEZ ESCORPIÓN AL PIL-PIL PICANTE',
      descripcion: 'Pez escorpión servido en salsa pil-pil picante',
      precio: 180,
      descripcionDetallada: 'Nuestra cazuela de pez escorpión al pil-pil picante ofrece una experiencia mediterránea auténtica.'
    },
    {
      nombre: 'PESCADO DEL DÍA',
      descripcion: 'Selección de pescados frescos del mercado',
      precio: 260,
      descripcionDetallada: 'Nuestro pescado del día es una selección de pescados frescos directamente del mercado local.'
    },
    {
      nombre: 'SAN PEDRO A LA PARRILLA',
      descripcion: 'Asado con piel',
      precio: 340,
      descripcionDetallada: 'Este pescado noble se asa con piel para desarrollar todos sus sabores.'
    },
    {
      nombre: 'LUBINA DE LÍNEA A LA PARRILLA',
      descripcion: 'Filete de lubina asado al carbón',
      precio: 280,
      descripcionDetallada: 'Nuestro filete de lubina se asa al carbón para preservar su sabor excepcional.'
    },
    {
      nombre: 'CAZUELA DE LUBINA DE LÍNEA',
      descripcion: 'Servida con patatas estilo papas a lo pobre',
      precio: 320,
      descripcionDetallada: 'Nuestra lubina de línea se sirve con patatas estilo papas a lo pobre.'
    },
    {
      nombre: 'LUBINA EN COSTRA DE SAL',
      descripcion: 'Lubina cocida con sal gorda servida con aceite de oliva',
      precio: 280,
      descripcionDetallada: 'Nuestra lubina se cocina con sal gorda y se sirve con aceite de oliva.'
    }
  ]
},
    {
      titulo: 'CARNES',
      items: [
        {
        nombre: 'FILETE DE TERNERA A LA PARRILLA',
        descripcion: 'Filete de ternera asado a la mibrasa acompañado de salsa a elegir',
        precio: 290,
        descripcionDetallada: 'Nuestro filete de ternera se asa a la perfección según su preferencia, para una carne tierna y sabrosa. Se acompaña de una salsa a elegir que aporta un toque complementario al carácter de la carne.'
      },
      {
        nombre: 'FILETE DE TERNERA LAMINADO SALTEADO CON AJO Y "PATATAS A LO POBRE"',
        descripcion: 'Laminado de filete de ternera salteado con ajo y perejil, patatas rústicas a la española',
        precio: 280,
        descripcionDetallada: 'Nuestro filete de ternera se lamina finamente y luego se sella rápidamente a fuego fuerte con ajo fresco y perejil para preservar su ternura y jugo. Se sirve con "patatas a lo pobre", estas patatas tradicionales españolas cocidas lentamente con cebollas dulces y pimientos, impregnadas de aceite de oliva aromatizado.'
      },
      {
        nombre: 'ENTRECOT DE TERNERA A LA PARRILLA',
        descripcion: 'Generoso entrecot madurado 15 días asado al carbón, salsa a elegir',
        precio: 220,
        descripcionDetallada: 'Nuestro entrecot de ternera seleccionado por su veteado se madura durante 15 días para desarrollar su sabor excepcional. Se asa sobre nuestras brasas de carbón que le confieren notas ahumadas únicas. Servido con una salsa a elegir que se casa perfectamente con la carne caliente.'
      },
      {
        nombre: 'CHULETÓN DE TERNERA A LA PARRILLA',
        descripcion: 'Imponente chuletón madurado 20 días, asado a la brasa, flor de sal de Camarga (1kg – 2 personas)',
        precio: 490,
        descripcionDetallada: 'Esta pieza excepcional se madura durante 20 días para desarrollar aromas complejos y una ternura incomparable. Asada con pericia sobre nuestras brasas de madera de olivo, se presenta entera y luego se corta en la mesa. Su carne jugosa se realza simplemente con una flor de sal de Camarga que exalta su sabor natural.'
      },
      {
        nombre: 'CARNE PICADA "KEFTA"',
        descripcion: 'Carne picada con especias marroquíes',
        precio: 140,
        descripcionDetallada: 'Nuestras keftas se preparan a partir de carne picada sazonada con especias marroquíes.'
      },
{
  nombre: 'PECHUGA DE POLLO APLASTADA CON ESPINACAS SALTEADAS',
  descripcion: 'Pechuga de pollo aplastada y asada, espinacas frescas salteadas con ajo',
  precio: 160,
  descripcionDetallada: 'Nuestra pechuga de pollo se aplasta delicadamente y luego se marina con hierbas frescas antes de asarse para obtener una carne tierna y jugosa. Se acompaña de espinacas frescas salteadas rápidamente con ajo y un chorrito de aceite de oliva al limón que aporta frescura y ligereza.'
},
      {
  nombre: 'ESCALOPINES AL LIMÓN',
  descripcion: 'Castillo de arroz blanco aromatizado con ajo y laurel',
  precio: 240,
  descripcionDetallada: 'Escalopines al limón servidas con un castillo de arroz blanco aromatizado con ajo y laurel.'
}
      ]
    },
    {
      titulo: 'GUARNICIONES',
      items: [
        {
        nombre: 'VERDURAS SALTEADAS',
        descripcion: 'Verduras de temporada con salsa de soja estilo wok',
        precio: 50,
        descripcionDetallada: 'Una selección de verduras de temporada salteadas con salsa de soja estilo wok.'
      },
      {
        nombre: 'PATATAS FRITAS CASERAS',
        descripcion: 'Patatas fritas rústicas cortadas a mano, doble cocción y flor de sal',
        precio: 50,
        descripcionDetallada: 'Nuestras patatas seleccionadas se pelan y cortan a mano en bastones generosos, luego se cocinan dos veces según el método tradicional belga: primero a baja temperatura para cocer el interior, luego a alta temperatura para una corteza dorada y crujiente. Servidas con una pizca de flor de sal.'
      },
      {
        nombre: 'PATATAS "A LO POBRE"',
        descripcion: 'Patatas guisadas a la española con cebollas, pimientos y aceite de oliva',
        precio: 50,
        descripcionDetallada: 'Esta receta tradicional española consiste en patatas cortadas en láminas finas, cocidas lentamente en aceite de oliva con cebollas dulces y pimientos que se carameliza suavemente. El resultado es un acompañamiento tierno, impregnado de sabores mediterráneos, con una ligera coloración dorada.'
      },
      {
        nombre: 'PURÉ DE PATATAS',
        descripcion: 'Cremoso puré de patatas con nata fresca y mantequilla avellana',
        precio: 50,
        descripcionDetallada: 'Nuestro puré se prepara con patatas Ratte de carne tierna, aplastadas con tenedor para conservar carácter. Enriquecido con nata fresca espesa y mantequilla ligeramente avellana, ofrece una textura a la vez aérea y reconfortante, sutilmente perfumada con nuez moscada recién rallada.'
      }
      ]
    }
  ];

  // Componente de divisor elegante para reducir la repetición
  const DivisorElegante = () => (
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
        {seccionesMenu.map((seccion, index) => (
          <div key={index}>
            <SeccionMenuPescadoCarne titulo={seccion.titulo} items={seccion.items} />
            {index < seccionesMenu.length - 1 && <DivisorElegante />}
          </div>
        ))}
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