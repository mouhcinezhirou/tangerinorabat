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
      {/* Decorative elements */}
      <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-amber-200/30"></div>
      <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-amber-200/30"></div>
      
      {/* Content */}
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

  // All menu data in one place
  const menuSections: CocktailSection[] = [
    {
  title: 'SIGNATURE COCKTAILS',
  items: [
    {
  name: 'CAP SPARTEL',
  description: 'Bombay Dry Gin, Grape Purée, White Vermouth, Rosemary',
  price: 95,
  detailedDescription: 'Named after Morocco\'s iconic lighthouse, this sophisticated cocktail marries the botanical complexity of Bombay Dry gin with the sweetness of grape purée. White vermouth adds elegance while fresh rosemary brings an aromatic Mediterranean touch to this refined creation.'
},
{
  name: 'ACHAKKAR',
  description: 'Lavender Syrup, Hibiscus Infused Tequila, Homemade Coconut Purée, Lemon, Coconut Liqueur',
  price: 95,
  detailedDescription: 'A floral and tropical masterpiece where hibiscus-infused tequila meets the richness of homemade coconut purée. Natural lavender syrup adds Provençal elegance, while coconut liqueur and fresh lemon create a perfect balance of exotic sweetness and citrus brightness.'
},
{
  name: 'TANGERINO',
  description: 'Bourbon, Napoléon Mandarine Liqueur, Tangerine & Grilled Peach Syrup, Ginger Honey',
  price: 95,
  detailedDescription: 'A warm and sophisticated cocktail celebrating the essence of tangerine. Premium bourbon provides the foundation while Napoléon mandarine liqueur adds French elegance. The house-made tangerine and grilled peach syrup brings smoky sweetness, finished with the warming spice of ginger honey.'
},
{
  name: 'HAFA',
  description: 'Mezcal San Cosme, Spiced Banana Oleo-Saccharum, White Wine Peach & Grilled Pineapple Syrup, Grilled Banana Purée',
  price: 95,
  detailedDescription: 'An adventurous tropical creation featuring artisanal mezcal and house-made spiced banana oleo-saccharum. The complex syrup of white wine, peach, and grilled pineapple adds sophisticated sweetness, while smashed grilled banana purée brings smoky depth to this innovative cocktail.'
}
      ]
    },
    {
      title: 'MOCKTAILS',
      items: [
        {
          name: 'SOCCO BREEZE',
          description: 'Hibiscus, Orange Juice, Lemon, Agave Syrup',
          price: 90,
          detailedDescription: 'A vibrant, alcohol-free tribute to the Grand Socco square, featuring a deep red hibiscus infusion. The natural sweetness of agave perfectly complements the citrus notes for a refreshing market day companion.'
        },
    {
      name: 'MENDOUBIA SUNSET',
      description: 'Orgeat, Lemon, Aquafaba, Natural Pineapple',
      price: 90,
      detailedDescription: 'Inspired by the Mendoubia gardens, this tropical delight combines almond orgeat with natural pineapple. The aquafaba creates a silky texture that rivals any classic cocktail foam.'
    },
        {
          name: 'CERVANTES COOLER',
          description: 'Homemade Melon Purée, Basil Syrup, Lemon',
          price: 90,
          detailedDescription: 'A garden-fresh mocktail that celebrates Mediterranean flavors. Sweet cantaloupe purée meets aromatic basil syrup, finished with a touch of citrus that evokes summer sidewalks.'
        }
      ]
    },
    {
  title: 'SHOTS',
  items: [
    {
      name: 'MALABATA',
      description: 'Vodka Titos, Licor Pasión, Pure Passion, Orange Juice',
      price: null,
      detailedDescription: 'Sunny beach memories captured in a glass, where clean vodka meets tropical passion. Fresh orange juice adds brightness and balance, creating a refreshing seaside escape.'
    },
    {
      name: 'RMILATH',
      description: 'Gin Bombay Dry, Licor Litchi, Pineapple Juice, Mint',
      price: null,
      detailedDescription: 'An exotic blend where dry gin meets the sweetness of lychee and the freshness of pineapple. Mint brings a refreshing note to this tropical creation.'
    },
    {
      name: 'KASBAH',
      description: 'Tequila Camino, Kahlua, Cold Brew',
      price: null,
      detailedDescription: 'A warm tribute to intense flavors, blending premium tequila with coffee liqueur. Cold brew adds unmatched depth and richness.'
    },
    {
      name: 'PERDICARIS',
      description: 'Hibiscus Infused Tequila, Orange Liqueur, Orange, Grenadine',
      price: null,
      detailedDescription: 'Inspired by local legends, this colorful shot combines hibiscus-infused tequila with citrus. A perfect balance between strength and floral flavors.'
    }
      ]
    },
    {
      title: 'WATER & SOFT DRINKS',
      items: [
        {
          name: 'SIDI ALI 75cl',
          description: 'Natural mineral water',
          price: 50,
          detailedDescription: 'Refreshing natural mineral water from Morocco, sourced from the Atlas mountains offering a lightly mineralized water with a pure, balanced taste.'
        },
        {
          name: 'EVIAN 75cl',
          description: 'Premium mineral water',
          price: 90,
          detailedDescription: 'Pure mineral water from the French Alps, resulting from a journey of over 15 years through alpine rocks. Its purity and balanced composition make it a worldwide reference.'
        },
        {
          name: 'OULMÈS 75cl',
          description: 'Sparkling mineral water',
          price: 50,
          detailedDescription: 'Classic Moroccan sparkling mineral water, naturally effervescent with fine bubbles. A national reference recognized for its digestive properties and refreshing taste.'
        },
        {
          name: 'SPARKLING EVIAN 75cl',
          description: 'Natural sparkling mineral water',
          price: 90,
          detailedDescription: 'Naturally sparkling Evian mineral water, combining the legendary purity of the source with a delicate effervescence. Perfect to accompany your gourmet meals.'
        },
        {
          name: 'SODA',
          description: 'Various flavors available',
          price: 50,
          detailedDescription: 'Coca Cola, Coca Cola Zero, Schweppes Lemon, Schweppes Tonic, Sprite, Poms, Hawaii.'
        },
        {
          name: 'RED BULL',
          description: 'Energy drink',
          price: 100,
          detailedDescription: 'Premium energy drink, ideal pure or mixed with your favorite spirits.'
        },
        {
          name: 'GINGER ALE TRIBUTE',
          description: 'Premium ginger soda',
          price: 100,
          detailedDescription: 'Premium artisanal soda with vibrant notes of fresh ginger, perfect alone or in cocktails.'
        },
        {
          name: 'FRESH FRUIT JUICES',
          description: 'Fresh juices pressed to order',
          price: 60,
          detailedDescription: 'Artisanal juices pressed to order from the best seasonal fruits of the day. Our selection changes with the market rhythm, guaranteeing optimal flavor in every glass.'
        },
        {
          name: 'ESPRESSO COFFEE',
          description: 'Illy coffee',
          price: 50,
          detailedDescription: 'Single-origin Arabica beans locally roasted and prepared according to your preferences. From intense espresso to creamy latte, each cup is expertly crafted.'
        },
       // {
       //   name: 'MINT TEA',
       //   description: 'Traditional Moroccan tea',
       //   price: 50,
       //   detailedDescription: 'Refreshing mint tea prepared in the traditional way.'
       // },
        {
          name: 'SAYRA TEA',
          description: 'Different flavors',
          price: 50,
          detailedDescription: 'An exclusive collection of flavored teas with subtle and captivating aromas. Each cup reveals a symphony of flavors between floral, fruity, and spicy notes, for a moment of pure relaxation.'
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
        {/* Notice about classics - Now between main title and cocktails signature */}
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
                <p>ALL CLASSICS AVAILABLE <span className="font-light">*Ask your waiter*</span></p>
              </div>
            </div>
          </div>
        </motion.div>
        <ElegantDivider />
        
        {/* SIGNATURE COCKTAILS section */}
        <CocktailMenuSection title={menuSections[0].title} items={menuSections[0].items} />
        <ElegantDivider />
        
        {/* MOCKTAILS section */}
        <CocktailMenuSection title={menuSections[1].title} items={menuSections[1].items} />
        <ElegantDivider />
        
        {/* SHOTS section with pricing information */}
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
                  <span className="block text-lg text-amber-100">5 FOR 180 DHS</span>
                </div>
                <div className="text-center">
                  <span className="block text-lg text-amber-100">10 FOR 300 DHS</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Shot items */}
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
        
        {/* WATER & SOFT DRINKS section */}
        <CocktailMenuSection title={menuSections[3].title} items={menuSections[3].items} />
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