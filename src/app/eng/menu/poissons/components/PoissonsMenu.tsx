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
          description: 'Flame-grilled swordfish medallion',
          price: 220,
          detailedDescription: 'Our Mediterranean swordfish is delicately marinated then flame-grilled to preserve its tender texture and delicate flavor.'
        },
        {
          name: 'SQUID WITH INK',
          description: 'Whole squid slowly cooked in its own ink',
          price: 220,
          detailedDescription: 'This iconic Mediterranean dish features a whole squid gently cooked in a sauce made from its own ink, garlic, and white wine. The tender squid meat pairs perfectly with creamy black rice and confited vegetables.'
        },
        {
          name: 'BLUEFIN TUNA FILLET',
          description: 'Medium-rare bluefin tuna fillet, soy sauce',
          price: 220,
          detailedDescription: 'Our sustainably caught bluefin tuna is briefly marinated in a sesame and soy sauce before being quickly seared to maintain a pink center. It is served with a creamy sweet potato purée infused with fresh ginger that perfectly balances its oceanic notes.'
        },
        {
          name: 'GRILLED SALMON',
          description: 'Red Label salmon fillet grilled with fresh herbs and preserved lemon',
          price: 260,
          detailedDescription: 'Our Scottish Red Label salmon fillet is marinated in a mix of fresh herbs then grilled to perfection, with crispy skin and melt-in-the-mouth flesh. Served with preserved lemon wedges and a herb virgin sauce that delicately enhances the natural richness of the fish.'
        },
        {
          name: 'GRILLED JOHN DORY',
          description: 'Wood-fired oven grilled John Dory fillet, olive oil with Provençal herbs',
          price: 260,
          detailedDescription: 'This noble fish is delicately grilled whole in our wood-fired oven to develop all its flavors. Its firm and delicate flesh is enhanced by olive oil infused with herbs of Provence and a touch of fleur de sel. A Mediterranean classic of refined simplicity.'
        },
        {
          name: 'GRILLED LINE-CAUGHT SEA BASS',
          description: 'Charcoal-grilled fillet',
          price: 280,
          detailedDescription: 'Our line-caught sea bass from the Mediterranean coast is grilled whole to preserve its exceptional flavor. The pearly, delicate flesh of the fish is infused with citrus and accompanied by gently confited fennel that brings a subtle and refreshing aniseed note.'
        },
        {
          name: 'LINE-CAUGHT SEA BASS CASSEROLE',
          description: 'Wild sea bass cooked in a casserole with melt-in-your-mouth potatoes, olives, and confited tomatoes',
          price: 320,
          detailedDescription: 'This traditional preparation features our line-caught sea bass cooked in a casserole with potatoes that absorb the fish juices, Taggiasche olives, confited tomatoes, and a bouquet of fresh herbs. All topped with a reduced white wine fish fumet and served directly in its casserole dish.'
        },
        {
          name: 'SALT-CRUSTED SEA BASS',
          description: 'Sea bass cooked in Camargue salt crust with aromatic herbs',
          price: 280,
          detailedDescription: 'This ancestral cooking method involves encasing our sea bass in a Camargue salt crust mixed with aromatic herbs. Baked in the oven, the fish flesh remains incredibly juicy and is delicately infused with herb aromas. The crust is broken in front of you for a spectacular service.'
        }
      ]
    },
    {
      title: 'MEATS',
      items: [
        {
          name: 'GRILLED BEEF TENDERLOIN',
          description: 'Mibrasa-grilled beef tenderloin with a sauce of your choice',
          price: 290,
          detailedDescription: 'Our Black Angus beef tenderloin is grilled to perfection according to your preference, for tender and flavorful meat. It is accompanied by a smooth aged Port reduction and slowly confited shallots that bring a touch of sweetness contrasting with the character of the meat.'
        },
        {
          name: 'SLICED BEEF TENDERLOIN SAUTÉED WITH GARLIC & "PATATAS A LO POBRE"',
          description: 'Sliced beef tenderloin sautéed with garlic and parsley, rustic Spanish-style potatoes',
          price: 280,
          detailedDescription: 'Our beef tenderloin is finely sliced then quickly seared over high heat with fresh garlic and parsley to preserve its tenderness and juices. It is served with "patatas a lo pobre," traditional Spanish potatoes slowly cooked with sweet onions and peppers, infused with flavored olive oil.'
        },
        {
          name: 'GRILLED BEEF RIBEYE',
          description: 'Generous aged ribeye grilled over charcoal, sauce of your choice',
          price: 220,
          detailedDescription: 'Our beef ribeye, selected for its marbling, is aged for 30 days to develop its exceptional flavor. It is grilled on our charcoal fire which gives it unique smoky notes. Served with homemade herb butter that melts delicately on the hot meat.'
        },
        {
          name: 'GRILLED BEEF PRIME RIB',
          description: 'Impressive aged prime rib, grilled over embers, Camargue fleur de sel (1kg – 2 people)',
          price: 490,
          detailedDescription: 'This exceptional cut is aged for 40 days to develop complex flavors and incomparable tenderness. Expertly grilled on our olive wood embers, it is presented whole then carved at the table. Its caramelized crust and juicy flesh are simply enhanced with Camargue fleur de sel that brings out its natural flavor.'
        },
        {
          name: 'KEFTA MINCED MEAT',
          description: 'Minced meat with oriental spices, sauce of your choice',
          price: 140,
          detailedDescription: 'Our keftas are prepared from hand-minced beef seasoned with a carefully dosed blend of oriental spices: cumin, paprika, coriander, and fresh mint. Grilled over embers, they are served with a light sauce of Greek yogurt, fresh mint, and grated cucumber.'
        },
        {
          name: 'CHICKEN PAILLARD WITH SAUTÉED SPINACH',
          description: 'Flattened and grilled chicken supreme, fresh spinach sautéed with garlic',
          price: 160,
          detailedDescription: 'Our chicken supreme is delicately flattened then marinated with fresh herbs before being grilled for tender meat and crispy skin. It is accompanied by fresh spinach quickly sautéed with garlic and a drizzle of lemon-infused olive oil that brings freshness and lightness.'
        }
      ]
    },
    {
      title: 'SIDE DISHES',
      items: [
        {
          name: 'SAUTÉED VEGETABLES',
          description: 'Assortment of seasonal vegetables sautéed in olive oil with fresh herbs',
          price: 50,
          detailedDescription: 'A colorful selection of seasonal vegetables – zucchini, bell peppers, eggplant, cherry tomatoes – quickly sautéed in extra virgin olive oil to preserve their crunch and flavors. Seasoned with fresh garden herbs and a touch of garlic, they offer a light and flavorful accompaniment.'
        },
        {
          name: 'HOUSE FRIES',
          description: 'Hand-cut rustic fries, double-cooked with fleur de sel',
          price: 50,
          detailedDescription: 'Our selected potatoes are peeled and hand-cut into generous sticks, then cooked twice according to the traditional Belgian method: first at low temperature to cook the inside, then at high temperature for a golden and crispy crust. Served with a pinch of fleur de sel.'
        },
        {
          name: 'POTATOES "A LO POBRE"',
          description: 'Spanish-style simmered potatoes with onions, peppers, and olive oil',
          price: 50,
          detailedDescription: 'This traditional Spanish recipe consists of thinly sliced potatoes, slowly cooked in olive oil with sweet onions and peppers that gently caramelize. The result is a melt-in-the-mouth side dish, infused with Mediterranean flavors, with a slight golden coloration.'
        },
        {
          name: 'MASHED POTATOES',
          description: 'Creamy mashed potatoes with crème fraîche and brown butter',
          price: 50,
          detailedDescription: 'Our mash is prepared with Ratte potatoes with melt-in-the-mouth flesh, fork-mashed to maintain character. Enriched with thick crème fraîche and lightly browned butter, it offers a texture that is both airy and comforting, subtly flavored with freshly grated nutmeg.'
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