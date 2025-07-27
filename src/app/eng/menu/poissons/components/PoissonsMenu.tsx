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

const FishMeatMenuItem: React.FC<MenuItem & { onExpand: () => void, isExpanded: boolean }> = ({
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

const FishMeatMenuSection: React.FC<MenuSection> = ({ title, items }) => {
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
          <FishMeatMenuItem
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

export default function FishMeatMenu() {
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

  // All menu data in one place
  const menuSections: MenuSection[] = [
    {
      title: 'FISH',
      items: [
       {
        name: 'GRILLED SWORDFISH',
        description: 'Fresh Tangier swordfish on BBQ',
        price: 220,
        detailedDescription: 'Our fresh Tangier swordfish is grilled on the BBQ to preserve its tender texture and delicate taste.'
      },
      {
        name: 'GRILLED SQUID',
        description: 'Fresh squid cooked on BBQ with its ink',
        price: 220,
        detailedDescription: 'This emblematic dish of Mediterranean cuisine features fresh squid cooked on the BBQ with its ink.'
      },
      {
        name: 'RED TUNA FILLET',
        description: 'Fresh red tuna cooked over charcoal served tataki style',
        price: 220,
        detailedDescription: 'Our fresh red tuna is grilled over charcoal and served tataki style.'
      },
      {
        name: 'GRILLED SALMON',
        description: 'Fresh salmon cooked over charcoal served with lemon slice',
        price: 260,
        detailedDescription: 'Our fresh salmon is cooked over charcoal and served with a lemon slice.'
      },
      {
        name: 'GRILLED JOHN DORY',
        description: 'Grilled with skin',
        price: 340,
        detailedDescription: 'This noble fish is grilled with skin to develop all its flavors.'
      },
      {
        name: 'GRILLED LINE-CAUGHT SEA BASS',
        description: 'Sea bass fillet grilled over charcoal',
        price: 280,
        detailedDescription: 'Our sea bass fillet is grilled over charcoal to preserve its exceptional flavor.'
      },
      {
        name: 'LINE-CAUGHT SEA BASS CASSEROLE',
        description: 'Served with potatoes papas a lo pobre style',
        price: 320,
        detailedDescription: 'Our line-caught sea bass is served with potatoes papas a lo pobre style.'
      },
      {
        name: 'SEA BASS IN SALT CRUST',
        description: 'Sea bass cooked with coarse salt served with olive oil',
        price: 280,
        detailedDescription: 'Our sea bass is cooked with coarse salt and served with olive oil.'
      }
    ]
  },
  {
    title: 'MEATS',
    items: [
      {
        name: 'GRILLED BEEF FILLET',
        description: 'Beef fillet grilled on mibrasa with sauce of your choice',
        price: 290,
        detailedDescription: 'Our beef fillet is grilled to perfection according to your preference, for tender and flavorful meat. It is served with a sauce of your choice that brings a complementary touch to the character of the meat.'
      },
      {
        name: 'SLICED BEEF FILLET SAUTÉED WITH GARLIC & "PATATAS A LO POBRE"',
        description: 'Sliced beef fillet sautéed with garlic and parsley, rustic Spanish-style potatoes',
        price: 280,
        detailedDescription: 'Our beef fillet is finely sliced then quickly seared over high heat with fresh garlic and parsley to preserve its tenderness and juice. It is served with "patatas a lo pobre", these traditional Spanish potatoes cooked slowly with sweet onions and peppers, infused with flavored olive oil.'
      },
      {
        name: 'GRILLED BEEF RIBEYE',
        description: 'Generous ribeye aged 15 days grilled over charcoal, sauce of your choice',
        price: 220,
        detailedDescription: 'Our beef ribeye selected for its marbling is aged for 15 days to develop its exceptional flavor. It is grilled over our charcoal embers which gives it unique smoky notes. Served with a sauce of your choice that pairs perfectly with the hot meat.'
      },
      {
        name: 'GRILLED BEEF RIB',
        description: 'Impressive beef rib aged 20 days, grilled over embers, Camargue sea salt (1kg – 2 people)',
        price: 490,
        detailedDescription: 'This exceptional piece is aged for 20 days to develop complex aromas and incomparable tenderness. Expertly grilled over our olive wood embers, it is presented whole then carved at the table. Its juicy flesh is simply enhanced with Camargue sea salt that exalts its natural flavor.'
      },
      {
        name: 'MINCED MEAT "KEFTA"',
        description: 'Minced meat with Moroccan spices',
        price: 140,
        detailedDescription: 'Our keftas are prepared from minced meat seasoned with Moroccan spices.'
      },
{
  name: 'CHICKEN PAILLARD WITH SAUTÉED SPINACH',
  description: 'Flattened and grilled chicken breast, fresh spinach sautéed with garlic',
  price: 160,
  detailedDescription: 'Our chicken breast is delicately flattened then marinated with fresh herbs before being grilled to obtain tender and juicy meat. It is served with fresh spinach quickly sautéed with garlic and a drizzle of lemon olive oil that brings freshness and lightness.'
}
    ]
  },
  {
    title: 'SIDES',
    items: [
      {
        name: 'SAUTÉED VEGETABLES',
        description: 'Seasonal vegetables with soy sauce wok style',
        price: 50,
        detailedDescription: 'A selection of seasonal vegetables sautéed with soy sauce wok style.'
      },
      {
        name: 'HOMEMADE FRIES',
        description: 'Rustic hand-cut fries, double cooked with sea salt',
        price: 50,
        detailedDescription: 'Our selected potatoes are peeled and hand-cut into generous sticks, then cooked twice according to the traditional Belgian method: first at low temperature to cook the inside, then at high temperature for a golden and crispy crust. Served with a pinch of sea salt.'
      },
      {
        name: 'POTATOES "A LO POBRE"',
        description: 'Spanish-style braised potatoes with onions, peppers and olive oil',
        price: 50,
        detailedDescription: 'This traditional Spanish recipe consists of potatoes cut into thin slices, cooked slowly in olive oil with sweet onions and peppers that caramelize gently. The result is a tender side dish, infused with Mediterranean flavors, with a light golden color.'
      },
      {
        name: 'MASHED POTATOES',
        description: 'Smooth mashed potatoes with fresh cream and brown butter',
        price: 50,
        detailedDescription: 'Our mash is prepared with Ratte potatoes with tender flesh, mashed with a fork to retain character. Enriched with thick fresh cream and lightly browned butter, it offers a texture that is both airy and comforting, subtly flavored with freshly grated nutmeg.'
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
            <FishMeatMenuSection title={section.title} items={section.items} />
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