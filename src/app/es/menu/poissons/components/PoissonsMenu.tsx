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
          descripcion: 'Medallón de pez espada a la llama',
          precio: 220,
          descripcionDetallada: 'Nuestro pez espada, pescado en el Mediterráneo, es delicadamente marinado y luego asado a la llama para preservar su textura tierna y su sabor delicado.'
        },
        {
          nombre: 'CALAMAR EN SU TINTA',
          descripcion: 'Calamar entero cocido lentamente en su propia tinta',
          precio: 220,
          descripcionDetallada: 'Este plato emblemático de la cocina mediterránea presenta un calamar entero cocido suavemente en una salsa a base de su propia tinta, ajo y vino blanco. La carne tierna del calamar se combina perfectamente con el arroz negro cremoso y las verduras confitadas que lo acompañan.'
        },
        {
          nombre: 'FILETE DE ATÚN ROJO',
          descripcion: 'Filete de atún rojo semi-cocido, soja',
          precio: 220,
          descripcionDetallada: 'Nuestro atún rojo de pesca sostenible es brevemente marinado en una salsa de sésamo y soja antes de ser sellado rápidamente para conservar un centro rosado. Se sirve con un suave puré de batata aromatizado con jengibre fresco que equilibra perfectamente sus notas yodadas.'
        },
        {
          nombre: 'SALMÓN A LA BRASA',
          descripcion: 'Filete de salmón Label Rouge a la parrilla con hierbas frescas y limón confitado',
          precio: 260,
          descripcionDetallada: 'Nuestro filete de salmón de Escocia Label Rouge está marinado en una mezcla de hierbas frescas y luego asado a la perfección, con la piel crujiente y la carne tierna. Se sirve con gajos de limón confitado y una salsa virgen de hierbas que realzan delicadamente la riqueza natural del pescado.'
        },
        {
          nombre: 'SAN PEDRO A LA BRASA',
          descripcion: 'Filete de San Pedro asado al horno de leña, aceite de oliva con hierbas provenzales',
          precio: 260,
          descripcionDetallada: 'Este noble pescado es delicadamente asado entero en nuestro horno de leña para desarrollar todos sus sabores. Su carne firme y delicada es realzada con un aceite de oliva infusionado con hierbas de Provenza y un toque de flor de sal. Un clásico mediterráneo de refinada simplicidad.'
        },
        {
          nombre: 'LUBINA DE ANZUELO A LA BRASA',
          descripcion: 'Filete asado sobre fuego de carbón',
          precio: 280,
          descripcionDetallada: 'Nuestra lubina de anzuelo pescada en las costas mediterráneas es asada entera para preservar su excepcional sabor. La carne nacarada y delicada del pescado está perfumada con cítricos y acompañada de hinojo suavemente confitado que aporta una nota anisada sutil y refrescante.'
        },
        {
          nombre: 'CAZUELA DE LUBINA DE ANZUELO',
          descripcion: 'Lubina salvaje cocida en cazuela con patatas tiernas, aceitunas y tomates confitados',
          precio: 320,
          descripcionDetallada: 'Esta preparación tradicional presenta nuestra lubina de anzuelo cocida en cazuela con patatas que se impregnan de los jugos del pescado, aceitunas Taggiasche, tomates confitados y un ramillete de hierbas frescas. Todo bañado en un fumet reducido con vino blanco y servido directamente en su cazuela.'
        },
        {
          nombre: 'LUBINA A LA SAL SIN ESPINAS',
          descripcion: 'Lubina cocida en costra de sal de Camargue con hierbas aromáticas',
          precio: 280,
          descripcionDetallada: 'Este método de cocción ancestral consiste en encerrar nuestra lubina en una costra de sal de Camargue mezclada con hierbas aromáticas. Cocida al horno, la carne del pescado permanece increíblemente jugosa y se impregna delicadamente de los aromas de las hierbas. La costra se rompe delante de usted para un servicio espectacular.'
        }
      ]
    },
    {
      titulo: 'CARNES',
      items: [
        {
          nombre: 'SOLOMILLO DE TERNERA',
          descripcion: 'Solomillo de ternera asado a la mibrasa acompañado de una salsa a elección',
          precio: 290,
          descripcionDetallada: 'Nuestro solomillo de ternera Black Angus es asado a la perfección según su preferencia, para una carne tierna y sabrosa. Está acompañado de una reducción untuosa de Oporto añejo y chalotas suavemente confitadas que aportan un toque de dulzura que contrasta con el carácter de la carne.'
        },
        {
          nombre: 'SOLOMILLO DE TERNERA FILETEADO SALTEADO CON AJO Y "PATATAS A LO POBRE"',
          descripcion: 'Solomillo de ternera fileteado salteado al ajo y perejil, patatas rústicas al estilo español',
          precio: 280,
          descripcionDetallada: 'Nuestro solomillo de ternera es finamente fileteado y luego rápidamente sellado a fuego vivo con ajo fresco y perejil para preservar su ternura y su jugo. Se sirve con "patatas a lo pobre", estas patatas tradicionales españolas cocinadas lentamente con cebollas dulces y pimientos, impregnadas de aceite de oliva aromatizado.'
        },
        {
          nombre: 'ENTRECOT DE TERNERA ',
          descripcion: 'Generoso entrecot madurado asado al carbón, salsa a elección',
          precio: 220,
          descripcionDetallada: 'Nuestro entrecot de ternera seleccionado por su veteado es madurado durante 30 días para desarrollar su excepcional sabor. Es asado sobre nuestras brasas de carbón que le confieren unas notas ahumadas únicas. Servido con una mantequilla maison que se funde delicadamente sobre la carne caliente.'
        },
        {
          nombre: 'CHULETON DE TERNERA TRINCHADO',
          descripcion: 'Imponente chuletón de ternera madurado, asado a la brasa, flor de sal de Camargue (1kg – 2 personas)',
          precio: 490,
          descripcionDetallada: 'Esta pieza excepcional es madurada durante 40 días para desarrollar aromas complejos y una ternura incomparable. Asada con experiencia sobre nuestras brasas de madera de olivo, es presentada entera y luego cortada en la mesa. Su corteza caramelizada y su carne jugosa son simplemente realzadas con una flor de sal de Camargue que exalta su sabor natural.'
        },
        {
          nombre: 'CARNE PICADA "KEFTA"',
          descripcion: 'Carne picada con especias orientales, salsa a elección',
          precio: 140,
          descripcionDetallada: 'Nuestras keftas son preparadas a partir de carne de ternera picada a mano y sazonada con una mezcla de especias orientales cuidadosamente dosificadas: comino, pimentón, cilantro y menta fresca. Asadas a la brasa, se sirven con una salsa ligera de yogur griego, menta fresca y pepino rallado.'
        },
        {
          nombre: 'PECHUGA DE POLLO ACOMPAÑADA DE ESPINACAS SALTEADAS',
          descripcion: 'Suprema de pollo aplanada y asada, espinacas frescas salteadas al ajo',
          precio: 160,
          descripcionDetallada: 'Nuestra suprema de pollo es delicadamente aplanada y luego marinada con hierbas frescas antes de ser asada para obtener una carne jugosa y una piel crujiente. Está acompañada de espinacas frescas rápidamente salteadas al ajo y un chorrito de aceite de oliva al limón que aporta frescura y ligereza.'
        }
      ]
    },
    {
      titulo: 'GUARNICIONES',
      items: [
        {
          nombre: 'VERDURAS SALTEADAS',
          descripcion: 'Surtido de verduras de temporada salteadas con aceite de oliva y hierbas frescas',
          precio: 50,
          descripcionDetallada: 'Una selección colorida de verduras de temporada – calabacines, pimientos, berenjenas, tomates cherry – rápidamente salteadas en aceite de oliva virgen extra para preservar su crujiente y sus sabores. Perfumadas con hierbas frescas del jardín y un toque de ajo, ofrecen un acompañamiento ligero y sabroso.'
        },
        {
          nombre: 'PATATAS FRITAS CASERAS',
          descripcion: 'Patatas fritas rústicas cortadas a mano, doble cocción y flor de sal',
          precio: 50,
          descripcionDetallada: 'Nuestras patatas seleccionadas son peladas y cortadas a mano en bastones generosos, luego cocinadas dos veces según el método tradicional belga: primero a baja temperatura para cocinar el interior, luego a alta temperatura para una corteza dorada y crujiente. Servidas con una pizca de flor de sal.'
        },
        {
          nombre: 'PATATAS "A LO POBRE"',
          descripcion: 'Patatas guisadas al estilo español con cebollas, pimientos y aceite de oliva',
          precio: 50,
          descripcionDetallada: 'Esta receta tradicional española consiste en patatas cortadas en finas rodajas, cocinadas lentamente en aceite de oliva con cebollas dulces y pimientos que caramelizán suavemente. El resultado es una guarnición tierna, impregnada de sabores mediterráneos, con una ligera coloración dorada.'
        },
        {
          nombre: 'PATATAS PURÉ',
          descripcion: 'Cremoso puré de patatas con crema fresca y mantequilla avellana',
          precio: 50,
          descripcionDetallada: 'Nuestro puré está preparado con patatas Ratte de carne fundente, aplastadas con tenedor para conservar carácter. Enriquecido con crema fresca espesa y mantequilla ligeramente avellana, ofrece una textura a la vez aérea y reconfortante, sutilmente perfumada con nuez moscada recién rallada.'
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