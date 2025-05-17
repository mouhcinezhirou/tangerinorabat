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
      {/* Decorative elements */}
      <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-amber-200/30"></div>
      <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-amber-200/30"></div>
      
      {/* Content */}
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
            <span className="mr-1">{isExpanded ? 'Less' : 'Details'}</span>
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
      
      {/* Highlight effect */}
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
    // Make sure the observer is created
    const observer = new IntersectionObserver(
      (entries) => {
        // Log to help debug
        console.log("Intersection observed:", entries[0].isIntersecting);
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    // Log to help debug
    console.log("Setting up observer on:", menuRef.current);
    
    if (menuRef.current) {
      observer.observe(menuRef.current);
    }

    return () => {
      if (menuRef.current) {
        observer.unobserve(menuRef.current);
      }
    };
  }, []);

  // Force visibility state to true for testing
  useEffect(() => {
    // Automatically set visible after a short delay as a fallback
    const timer = setTimeout(() => {
      if (!isVisible) {
        console.log("Forcing visibility after timeout");
        setIsVisible(true);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [isVisible]);

  // All menu data in one place
  const menuSections: MenuSection[] = [
    {
      title: 'TAPAS',
      items: [
        {
          name: 'PATATAS BRAVAS',
          description: 'Crispy potato cubes served with a slightly spicy sauce',
          price: 60,
          detailedDescription: 'Our potatoes are first confit then fried to achieve a perfect contrast between crispiness and softness, accompanied by a spicy tomato sauce with smoked chilies and mild La Vera paprika.'
        },
        {
          name: 'HURRICANE POTATOES WITH 3 SAUCES',
          description: 'Spiral-cut potatoes served with a trio of homemade sauces',
          price: 60,
          detailedDescription: 'Potatoes cut in a spiral pattern and fried to perfection, served with saffron aioli sauce, spicy brava sauce, and a creamy sauce made with fresh garden herbs.'
        },
        {
          name: 'PIMIENTOS DEL PADRON',
          description: 'Small green Spanish peppers grilled and seasoned with fleur de sel',
          price: 70,
          detailedDescription: 'These small peppers from Galicia are quickly seared at high temperature then delicately seasoned with fleur de sel. Their uniqueness: some are mild, while others surprise with their spiciness!'
        },
        {
          name: 'VINEGAR ANCHOVIES',
          description: 'Anchovy fillets marinated in olive oil and sherry vinegar',
          price: 80,
          detailedDescription: 'Fresh anchovies delicately filleted and marinated in our secret blend of extra virgin olive oil, aged sherry vinegar, and confit garlic, enhanced with touches of fresh parsley.'
        },
        {
          name: 'BURRATA',
          description: 'Creamy burrata served with tomatoes slowly smoked over wood fire',
          price: 95,
          detailedDescription: 'Our creamy burrata from Puglia is served with tomatoes gently smoked over olive wood embers for several hours, all enhanced by our cold-pressed olive oil and fresh basil.'
        },
        {
          name: 'TUNA VENTRESCA & ROASTED PEPPERS',
          description: 'Sweet roasted peppers accompanied by tuna belly confit in olive oil',
          price: 90,
          detailedDescription: 'Our peppers are slowly roasted until caramelized then paired with the most flavorful part of the tuna, the ventresca, confit in our olive oil infused with Mediterranean herbs.'
        },
        {
          name: 'VEAL PARMIGIANA WITH HALAL CHORIZO',
          description: 'Delicious preparation of eggplant, veal, and halal chorizo baked au gratin',
          price: 90,
          detailedDescription: 'Alternating layers of grilled eggplant, slow-cooked veal, and lightly spiced halal chorizo, all topped with a fresh herb tomato sauce and generously gratinéed with 24-month aged parmesan.'
        },
        {
          name: 'SEAFOOD PARMIGIANA',
          description: 'Marine variation of traditional parmigiana with seafood',
          price: 90,
          detailedDescription: 'Our marine interpretation combines grilled eggplant, a delicate selection of seafood, and a saffron-flavored béchamel sauce, all covered with cheese and delicately baked in the oven.'
        },
        {
          name: 'MANCHEGO FLOR DE ESGUEVA',
          description: 'Assortment of aged manchego slices',
          price: 140,
          detailedDescription: 'Our Flor de Esgueva manchego is aged for 12 months to develop its complex hazelnut and butter flavors.'
        },
        {
          name: 'IBERIAN HAM',
          description: 'Thin slices of Iberian ham aged 36 months',
          price: 220,
          detailedDescription: 'Our Iberian ham comes from free-range pigs fed on acorns. Aged for 36 months in the best conditions, it offers a melt-in-your-mouth texture and complex hazelnut flavors with a slight sweet note.'
        },
        {
          name: 'IBERIAN CHORIZO',
          description: 'Slices of artisanal chorizo from acorn-fed Iberian pork',
          price: 140,
          detailedDescription: 'This exceptional chorizo is made from Iberian pork exclusively fed on acorns during the montanera. Its smoked paprika seasoning gives it intense and complex flavors revealed through traditional aging.'
        },
        {
          name: 'HAM AND MANCHEGO ASSORTMENT',
          description: 'Selection of Iberian hams and Spanish cheeses with accompaniments',
          price: 200,
          detailedDescription: 'Our tasting platter includes a refined selection of Iberian hams and artisanal Spanish cheeses, accompanied by marinated olives, rosemary-roasted almonds, and crispy bread.'
        },
        {
          name: 'BRESAOLA AND MANCHEGO ASSORTMENT',
          description: 'Thin slices of turkey bresaola and aged manchego',
          price: 90,
          detailedDescription: 'The finesse of our delicately spiced turkey bresaola pairs perfectly with the richness of aged manchego. The combination is subtly enhanced with a drizzle of virgin olive oil and a few drops of reduced balsamic vinegar.'
        },
        {
          name: 'LOBSTER RUSSIAN SALAD',
          description: 'Refined version of the traditional vegetable and mayonnaise salad',
          price: 70,
          detailedDescription: 'Our elegant interpretation of traditional Russian salad combines finely chopped potatoes, carrots, and peas, all coated in a light mayonnaise flavored with lemon and fresh dill.'
        },
        {
          name: 'RUSSIAN SALAD WITH LOBSTER AND LEMON MAYONNAISE',
          description: 'Luxurious version of our Russian salad with fresh lobster pieces',
          price: 180,
          detailedDescription: 'This gourmet version of Russian salad is enhanced with generous pieces of blue lobster caught in the Mediterranean and a delicate lemon mayonnaise with candied citrus and fresh garden chives.'
        },
        {
          name: 'OCTOPUS RUSSIAN SALAD',
          description: 'Our revisited Russian salad with tender octopus and fruity touches',
          price: 90,
          detailedDescription: 'This creative reinterpretation combines our slow-cooked octopus, diced Granny Smith green apple for a tangy touch, and crunchy red onions, all bound with a fresh herb mayonnaise.'
        },
        {
          name: 'VEGETABLE PARILLADA',
          description: 'Colorful assortment of seasonal vegetables cooked over embers',
          price: 120,
          detailedDescription: 'Our seasonal vegetables from local producers are grilled over oak embers to develop their natural flavors, lightly smoked and simply seasoned with olive oil, confit garlic, and fleur de sel.'
        },
        {
          name: 'GALICIAN-STYLE OCTOPUS',
          description: 'Tender octopus served on a bed of potatoes with smoked paprika',
          price: 140,
          detailedDescription: 'Our octopus is slowly cooked according to Galician tradition then served on a bed of soft potatoes, generously sprinkled with La Vera smoked paprika and drizzled with extra virgin olive oil infused with garlic.'
        },
        {
          name: 'WOOD-FIRED OCTOPUS',
          description: 'Majestic octopus tentacle confit then grilled over embers',
          price: 160,
          detailedDescription: 'Our octopus tentacle is first confit for several hours then grilled over hot embers to achieve a perfect contrast between a melt-in-your-mouth texture and slightly smoky notes.'
        }
      ]
    },
    {
      title: 'SALADS',
      items: [
        {
          name: 'TUNA ESCALIVADA',
          description: 'Roasted peppers, eggplants, and onions with grilled tuna and a touch of black garlic',
          price: 100,
          detailedDescription: 'Our traditional escalivada consisting of peppers, eggplants, and onions slowly roasted over wood fire is enhanced by pieces of ember-seared tuna and a touch of fermented black garlic oil for a unique aromatic depth.'
        },
        {
          name: 'SMOKED SALMON AND AVOCADO SALAD',
          description: 'Fresh mix of smoked salmon and avocado with honey-mustard vinaigrette',
          price: 110,
          detailedDescription: 'Delicate slices of house-smoked salmon pair perfectly with creamy avocado quarters, all enhanced by our signature vinaigrette made with wildflower honey and whole grain mustard.'
        },
        {
          name: 'ORIGINAL CAESAR SALAD',
          description: 'Romaine lettuce, homemade Caesar dressing, charcoal-grilled chicken, and parmesan',
          price: 120,
          detailedDescription: 'Our Caesar salad combines crisp romaine lettuce, garlic croutons, aged parmesan shavings, and marinated free-range chicken grilled on our Mibrasa barbecue, all coated in our freshly prepared anchovy Caesar dressing.'
        },
        {
          name: 'MARINERA SALAD',
          description: 'Fresh composition of seafood and crispy vegetables',
          price: 120,
          detailedDescription: 'A marine festival combining shrimp, smoked salmon, calamari, mussels, and clams with crispy vegetables, all delicately seasoned with a citrus and fresh herb vinaigrette for an explosion of Mediterranean flavors.'
        }
      ]
    },
    {
      title: 'CARPACCIOS',
      items: [
        {
          name: 'TANGERINO TOMATO CARPACCIO',
          description: 'Thin slices of tomato with tuna, capers, and extra virgin olive oil',
          price: 120,
          detailedDescription: 'A refined carpaccio of finely sliced Tangerino tomatoes, offering a tangy freshness balanced by the richness of delicately crumbled tuna. Garnished with crunchy capers for a spicy touch, all enhanced by generous extra virgin olive oil, bringing a fruity and silky note. A light and elegant appetizer that celebrates the simplicity of Mediterranean flavors.'
        },
        {
          name: 'OCTOPUS CARPACCIO',
          description: 'Thin slices of tender octopus marinated in citrus',
          price: 120,
          detailedDescription: 'Our octopus is first slowly cooked then thinly sliced and marinated in a blend of olive oil and citrus. Each bite offers a tender texture and a perfect balance between marine flavors and tangy notes.'
        },
        {
          name: 'FLAMBÉED RED SHRIMP CARPACCIO',
          description: 'Delicate slices of wild red shrimp with a touch of spicy garlic',
          price: 160,
          detailedDescription: 'Our wild Mediterranean red shrimp are lightly flambéed then finely sliced and seasoned with garlic and chili-infused oil. A marine delicacy with intense flavors and incomparable texture.'
        },
        {
          name: 'BLUEFIN TUNA CARPACCIO',
          description: 'Thin slices of raw bluefin tuna with a slightly spicy Asian sauce',
          price: 140,
          detailedDescription: 'Our line-caught Mediterranean bluefin tuna, thinly sliced, is enhanced by a Thai sauce with balanced notes of ginger, lime, and chili, creating a perfect marriage between Mediterranean tradition and Asian influences.'
        },
        {
          name: 'BEEF CARPACCIO',
          description: 'Thin slices of raw beef seasoned with olive oil and parmesan',
          price: 120,
          detailedDescription: 'Our beef tenderloin is lightly seared then thinly sliced and presented with a drizzle of extra virgin olive oil, 24-month aged parmesan shavings, a few capers, and freshly ground pepper.'
        },
        {
          name: 'BRESAOLA-STYLE CARPACCIO',
          description: 'Thin slices of marinated and dried turkey loin like a bresaola',
          price: 120,
          detailedDescription: 'Our turkey loin is marinated in a blend of spices, wine, and aromatic herbs then slowly dried to develop a complex flavor reminiscent of traditional bresaola, served with arugula and parmesan shavings.'
        },
        {
          name: 'MARINATED AND FLAMBÉED RED MULLET SASHIMI',
          description: 'Thin slices of red mullet accompanied by a shrimp salpicon',
          price: 145,
          detailedDescription: 'Our Mediterranean red mullet is briefly marinated then flambéed to develop its flavors while preserving its delicate texture. It is accompanied by a refreshing salpicon of shrimp, fresh herbs, and citrus.'
        },
      ]
    },
    {
      title: 'SOUPS',
      items: [
        {
          name: 'FISH AND SEAFOOD SOUP',
          description: 'Rich broth of fish and shellfish with croutons and rouille',
          price: 120,
          detailedDescription: 'Our soup is prepared according to Mediterranean tradition with an intense fumet of rocky fish and a selection of fresh seafood, served with garlic croutons, grated gruyère cheese, and our homemade saffron rouille.'
        }
      ]
    }
  ];

  // Elegant divider component to reduce repetition
  const ElegantDivider = () => (
    <div className="flex items-center justify-center my-16">
      <div className="h-px w-16 bg-amber-200/30"></div>
      <div className="mx-3 text-amber-200/50">✦</div>
      <div className="h-px w-16 bg-amber-200/30"></div>
    </div>
  );

  return (
    <section ref={menuRef} className="py-20 bg-[#3e4c52] text-amber-50 relative">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10"></div>
      
      {/* Menu content */}
      <div className="container mx-auto px-4">
        {menuSections.map((section, index) => (
          <div key={index}>
            <TapasMenuSection title={section.title} items={section.items} />
            {index < menuSections.length - 1 && <ElegantDivider />}
          </div>
        ))}
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