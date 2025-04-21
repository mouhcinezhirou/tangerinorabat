'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Define cocktail type
type Cocktail = {
  id: string;
  name: string;
  ingredients: string;
  price?: number;
  featured?: boolean;
  detailedDescription: string;
};

type MocktailItem = {
  id: string;
  name: string;
  ingredients: string;
  price: number;
  detailedDescription: string;
};

type SoftDrink = {
  id: string;
  name: string;
  description?: string;
  options?: { name: string; price: number }[];
  price?: number;
  detailedDescription?: string;
};

export default function CocktailsMenuPage() {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

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

  // Cocktails data with detailed descriptions
  const cocktails: Cocktail[] = [
    {
      id: 'achakkar',
      name: 'ACHAKKAR',
      ingredients: 'Bourbon Woodford Reserve, Purée de Fraise Maison, Citron, Mousse vegan',
      price: 95,
      featured: true,
      detailedDescription: 'Our twist on the classic bourbon sour, featuring premium Woodford Reserve and a cloud of vegan foam that melts delicately. The housemade strawberry purée brings a sun-ripened sweetness that plays beautifully against the citrus bite.'
    },
    {
      id: 'tangerino',
      name: 'TANGERINO',
      ingredients: 'Vodka Tito\'s, Liqueur de Coco, Purée de Mangue Maison, Ginger Soda',
      price: 95,
      featured: true,
      detailedDescription: 'A tropical sunset in a glass, where smooth Tito\'s vodka meets luscios coconut liqueur. Crowned with housemade mango purée and finished with a refreshing ginger soda sparkle that dances on your palate.'
    },
    {
      id: 'cap-spartel',
      name: 'CAP SPARTEL',
      ingredients: 'Gin Bombay Saphire, Liqueur de Pêche, Purée de Pêche Maison, Sirop de Lavande',
      price: 95,
      detailedDescription: 'Inspired by the Cap Spartel lighthouse, this aromatic cocktail combines Bombay Sapphire\'s botanicals with summer peaches. A whisper of Provençal lavender syrup adds an elegant floral note to this coastal-inspired creation.'
    },
    {
      id: 'hafa',
      name: 'HAFA',
      ingredients: 'Bacardi Blanc, Cachaça, Oleo-saccharum à la Banane Épicée, Sirop de Vin Blanc Infusé à la Pêche et à l\'Ananas Grillé, Banane Grillée Écrasée',
      price: 95,
      detailedDescription: 'A complex tropical journey featuring Caribbean spirits and house-made infusions. The spiced banana oleo-saccharum and grilled fruit wine syrup create a sophisticated balance of caramelized sweetness and exotic spice.'
    },
    {
      id: 'malabata',
      name: 'MALABATA BEACH',
      ingredients: 'Vodka Tito\'s, Purée de Fruit de la Passion, Jus d\'Orange',
      price: 95,
      detailedDescription: 'Memories of sun-kissed beaches captured in a glass, where clean vodka meets tropical passion fruit purée. The fresh orange juice adds brightness and balance, creating a refreshing seaside escape.'
    },
    {
      id: 'kasbah',
      name: 'KASBAH',
      ingredients: 'Whisky Grants, Liqueur de Pommes, Jus de Pommes',
      price: 95,
      detailedDescription: 'A spirited tribute to Moroccan hospitality, blending Scottish whisky with French apple liqueur. The fresh apple juice adds a crisp, orchard-fresh finish to this warming cocktail.'
    },
    {
      id: 'rmilat',
      name: 'RMILAT',
      ingredients: 'Purée de Litchi, Menthe, Gin Bombay, Vermouth Rosé',
      price: 95,
      detailedDescription: 'An exotic take on the classic martini, where fragrant lychee purée meets London gin and rose vermouth. Fresh mint leaves add a refreshing herbal lift to this sophisticated sipper.'
    },
    {
      id: 'perdicaris',
      name: 'PERDICARIS',
      ingredients: 'Tequila, Jus d\'Orange, Sirop de Grenadine, Liqueur d\'Orange',
      price: 95,
      detailedDescription: 'Named after Tangier\'s historic park, this vibrant cocktail layers agave tequila with citrus notes. The grenadine creates a beautiful sunset effect while adding a subtle pomegranate sweetness.'
    }
  ];

  // Shots data
  const shots = [
    { quantity: 5, price: 180 },
    { quantity: 10, price: 300 }
  ];

  // Mocktails data with detailed descriptions
  const mocktails: MocktailItem[] = [
    {
      id: 'socco',
      name: 'SOCCO BREEZE',
      ingredients: 'Hibiscus, Jus d\'Orange, Citron, Sirop d\'Agave',
      price: 90,
      detailedDescription: 'A vibrant non-alcoholic tribute to the Grand Socco square, featuring a deep crimson hibiscus infusion. The natural sweetness of agave pairs perfectly with citrus notes for a refreshing market-day companion.'
    },
    {
      id: 'mendoubia',
      name: 'MENDOUBIA SUNSET',
      ingredients: 'Orgeat, Citron, Aquafaba, Purée de Coco Maison',
      price: 90,
      detailedDescription: 'Inspired by the gardens of Mendoubia, this creamy delight combines almond orgeat with tropical coconut. The aquafaba creates a silky texture that rivals any classic cocktail foam.'
    },
    {
      id: 'cervantes',
      name: 'CERVANTES COOLER',
      ingredients: 'Purée de Melon Maison, Sirop de Basilic, Citron',
      price: 90,
      detailedDescription: 'A garden-fresh mocktail that celebrates the Mediterranean palate. Sweet cantaloupe purée meets aromatic basil syrup, finished with a bright citrus lift that evokes summer sidewalks.'
    }
  ];

  // Soft drinks data with detailed descriptions
  const softDrinks: SoftDrink[] = [
    {
      id: 'mineral-water',
      name: 'AGUA MINERAL',
      description: 'Eau Minérale Mineral Water',
      options: [
        { name: 'Sidi Ali', price: 50 },
        { name: 'Evian', price: 90 },
        { name: 'Evian Petillante', price: 90 },
        { name: 'Oulmès', price: 50 }
      ],
      detailedDescription: 'A curated selection of premium waters from natural springs and mountain sources. From Morocco\'s Atlas Mountains to the French Alps, each bottle brings pure mineral refreshment to your table.'
    },
    {
      id: 'fresh-juice',
      name: 'ZUMO FRESCO',
      description: 'Jus frais Freshly squeezed juice',
      price: 60,
      detailedDescription: 'Handcrafted juices pressed to order from the day\'s finest seasonal fruits. Our selection changes with the market\'s rhythm, ensuring peak flavor in every glass.'
    },
    {
      id: 'soda',
      name: 'SODA',
      price: 50,
      detailedDescription: 'Classic soft drinks served ice-cold in vintage glass bottles. From cola to lemon-lime, these familiar favorites complement any meal perfectly.'
    },
    {
      id: 'red-bull',
      name: 'RED BULL',
      price: 100,
      detailedDescription: 'The iconic energy drink that gives you wings. Served chilled with your choice of glass over ice or straight from the can.'
    },
    {
      id: 'ginger-ale',
      name: 'GINGER ALE TRIBUTE',
      price: 100,
      detailedDescription: 'A premium ginger ale with real ginger root extract and natural botanicals. Its robust flavor profile makes it perfect as a mixer or enjoyed on its own.'
    },
    {
      id: 'coffee',
      name: 'CAFÉ',
      price: 50,
      detailedDescription: 'Single-origin Arabica beans roasted locally and prepared to your preference. From rich espresso to creamy café au lait, each cup is crafted with expertise.'
    },
    {
      id: 'tea',
      name: 'TÉ',
      price: 50,
      detailedDescription: 'A worldly selection of fine teas, from classic Moroccan mint to rare Chinese oolongs. Each variety is steeped to perfection and served with traditional accompaniments.'
    }
  ];

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
        <h2 className="font-SweetSansProBold text-4xl md:text-5xl font-serif tracking-wider text-amber-50 mb-4">COCKTAILS</h2>
        <div className="flex items-center justify-center mb-6">
          <div className="h-px w-12 bg-amber-200/40"></div>
          <div className="mx-4 text-amber-200/60">✦</div>
          <div className="h-px w-12 bg-amber-200/40"></div>
        </div>
        <p className="text-amber-100/70 font-light max-w-2xl mx-auto">
          Indulge in our signature cocktails crafted with artisanal spirits and fresh Mediterranean ingredients
        </p>
      </motion.div>
      
      {/* Menu content - ALL SECTIONS DISPLAYED */}
      <div className="container mx-auto px-4">
        {/* COCKTAILS SECTION */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="mb-20"
        >
          <h3 className="text-center font-SweetSansProBold text-3xl font-serif tracking-wider text-amber-100 mb-10">
            SIGNATURE COCKTAILS
          </h3>
          
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {cocktails.map((cocktail) => (
              <motion.div
                key={cocktail.id}
                variants={itemVariants}
                className={`bg-amber-900/20 backdrop-blur-sm rounded-lg p-6 border border-amber-200/20 relative overflow-hidden group ${
                  cocktail.featured ? 'md:col-span-2' : ''
                }`}
              >
                {/* Decorative elements */}
                <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-amber-200/30"></div>
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-amber-200/30"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-SweetSansProBold text-xl font-serif tracking-wider text-amber-100">
                      {cocktail.name}
                    </h3>
                    <span className="text-amber-200 font-light">{cocktail.price} </span>
                  </div>
                  
                  <div className="w-10 h-px bg-amber-200/40 mb-4"></div>
                  
                  <p className="text-amber-100/70 italic text-sm mb-4">
                    {cocktail.ingredients}
                  </p>

                  {/* Details button and content */}
                  <div className="mt-auto">
                    <button
                      onClick={() => setSelectedItem(selectedItem === cocktail.id ? null : cocktail.id)}
                      className="text-amber-200/70 hover:text-amber-200 transition-colors duration-300 text-sm flex items-center"
                    >
                      <span>{selectedItem === cocktail.id ? 'Hide Details' : 'View Details'}</span>
                      <motion.span
                        animate={{ rotate: selectedItem === cocktail.id ? 180 : 0 }}
                        className="ml-2"
                      >
                        ▼
                      </motion.span>
                    </button>
                    
                    <motion.div
                      initial={false}
                      animate={{ height: selectedItem === cocktail.id ? 'auto' : 0, opacity: selectedItem === cocktail.id ? 1 : 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-amber-100/60 text-sm mt-3 pl-3 border-l-2 border-amber-200/20">
                        {cocktail.detailedDescription}
                      </p>
                    </motion.div>
                  </div>
                </div>
                
                {/* Highlight effect */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-amber-500/5 to-amber-300/10 opacity-0 group-hover:opacity-100 transform translate-y-full group-hover:translate-y-0 transition-all duration-700 rounded-lg"></div>
              </motion.div>
            ))}
            
            {/* Classic cocktails note */}
            <motion.div 
              variants={itemVariants}
              className="md:col-span-2 text-center my-6"
            >
              <p className="text-amber-100/80 italic">
                ALL CLASSICS AVAILABLE <span className="font-light">*Ask your Waiter*</span>
              </p>
            </motion.div>
            
            {/* Shots section */}
            <motion.div 
              variants={itemVariants}
              className="md:col-span-2 bg-gradient-to-r from-amber-900/30 to-amber-800/20 rounded-lg p-6 border border-amber-200/20"
            >
              <h3 className="font-SweetSansProBold text-xl font-serif tracking-wider text-amber-100 text-center mb-3">
                SHOTS
              </h3>
              
              <div className="flex justify-center items-center gap-10 mt-4">
                {shots.map((shot, index) => (
                  <div key={index} className="text-center">
                    <span className="block text-lg text-amber-100">{shot.quantity} POUR {shot.price} </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Elegant divider */}
        <div className="flex items-center justify-center my-16">
          <div className="h-px w-16 bg-amber-200/30"></div>
          <div className="mx-3 text-amber-200/50">✦</div>
          <div className="h-px w-16 bg-amber-200/30"></div>
        </div>
        
        {/* MOCKTAILS SECTION */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="mb-20"
        >
          <h3 className="text-center font-SweetSansProBold text-3xl font-serif tracking-wider text-amber-100 mb-10">
            MOCKTAILS
          </h3>
          
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {mocktails.map((mocktail) => (
              <motion.div
                key={mocktail.id}
                variants={itemVariants}
                className="bg-amber-900/20 backdrop-blur-sm rounded-lg p-6 border border-amber-200/20 relative overflow-hidden group"
              >
                {/* Decorative elements */}
                <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-amber-200/30"></div>
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-amber-200/30"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-SweetSansProBold text-xl font-serif tracking-wider text-amber-100">
                      {mocktail.name}
                    </h3>
                    <span className="text-amber-200 font-light">{mocktail.price} </span>
                  </div>
                  
                  <div className="w-10 h-px bg-amber-200/40 mb-4"></div>
                  
                  <p className="text-amber-100/70 italic text-sm mb-4">
                    {mocktail.ingredients}
                  </p>

                  {/* Details button and content */}
                  <div className="mt-auto">
                    <button
                      onClick={() => setSelectedItem(selectedItem === mocktail.id ? null : mocktail.id)}
                      className="text-amber-200/70 hover:text-amber-200 transition-colors duration-300 text-sm flex items-center"
                    >
                      <span>{selectedItem === mocktail.id ? 'Hide Details' : 'View Details'}</span>
                      <motion.span
                        animate={{ rotate: selectedItem === mocktail.id ? 180 : 0 }}
                        className="ml-2"
                      >
                        ▼
                      </motion.span>
                    </button>
                    
                    <motion.div
                      initial={false}
                      animate={{ height: selectedItem === mocktail.id ? 'auto' : 0, opacity: selectedItem === mocktail.id ? 1 : 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-amber-100/60 text-sm mt-3 pl-3 border-l-2 border-amber-200/20">
                        {mocktail.detailedDescription}
                      </p>
                    </motion.div>
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
        
        {/* SOFT DRINKS SECTION */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="mb-20"
        >
          <h3 className="text-center font-SweetSansProBold text-3xl font-serif tracking-wider text-amber-100 mb-10">
            SOFT DRINKS
          </h3>
          
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {softDrinks.map((drink) => (
              <motion.div
                key={drink.id}
                variants={itemVariants}
                className={`bg-amber-900/20 backdrop-blur-sm rounded-lg p-6 border border-amber-200/20 relative overflow-hidden group ${
                  drink.id === 'mineral-water' ? 'md:col-span-2' : ''
                }`}
              >
                {/* Decorative elements */}
                <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-amber-200/30"></div>
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-amber-200/30"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-SweetSansProBold text-xl font-serif tracking-wider text-amber-100">
                      {drink.name}
                    </h3>
                    {drink.price && <span className="text-amber-200 font-light">{drink.price} </span>}
                  </div>
                  
                  {drink.description && (
                    <p className="text-amber-100/70 italic text-sm mb-3">
                      {drink.description}
                    </p>
                  )}
                  
                  {drink.options && (
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {drink.options.map((option, idx) => (
                        <div key={idx} className="flex justify-between items-center">
                          <span className="text-amber-100/90">{option.name}</span>
                          <span className="text-amber-200/80">{option.price} </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Details button and content */}
                  {drink.detailedDescription && (
                    <div className="mt-auto pt-4">
                      <button
                        onClick={() => setSelectedItem(selectedItem === drink.id ? null : drink.id)}
                        className="text-amber-200/70 hover:text-amber-200 transition-colors duration-300 text-sm flex items-center"
                      >
                        <span>{selectedItem === drink.id ? 'Hide Details' : 'View Details'}</span>
                        <motion.span
                          animate={{ rotate: selectedItem === drink.id ? 180 : 0 }}
                          className="ml-2"
                        >
                          ▼
                        </motion.span>
                      </button>
                      
                      <motion.div
                        initial={false}
                        animate={{ height: selectedItem === drink.id ? 'auto' : 0, opacity: selectedItem === drink.id ? 1 : 0 }}
                        className="overflow-hidden"
                      >
                        <p className="text-amber-100/60 text-sm mt-3 pl-3 border-l-2 border-amber-200/20">
                          {drink.detailedDescription}
                        </p>
                      </motion.div>
                    </div>
                  )}
                </div>
                
                {/* Highlight effect */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-amber-500/5 to-amber-300/10 opacity-0 group-hover:opacity-100 transform translate-y-full group-hover:translate-y-0 transition-all duration-700 rounded-lg"></div>
              </motion.div>
            ))}
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