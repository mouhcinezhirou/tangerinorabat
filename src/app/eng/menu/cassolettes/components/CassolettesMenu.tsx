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

  const CassoletteMenuItem: React.FC<MenuItem & { onExpand: () => void, isExpanded: boolean }> = ({
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

  const CassoletteMenuSection: React.FC<MenuSection> = ({ title, items }) => {
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
            <CassoletteMenuItem
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

  export default function CassolettesMenu() {
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
        title: 'SEAFOOD CASSOLETTES',
        items: [
          {
            name: 'SPANISH BABY EELS (100G)',
            description: 'Delicate Spanish baby eels cooked in olive oil, garlic, and mild chili',
            price: 650,
            detailedDescription: 'This exceptional delicacy comes directly from the Cantabrian coast of Spain. The angulas, or baby eels, are prepared according to Basque tradition in earthenware cassolettes heated to high temperature. Cooked with extra virgin olive oil infused with garlic and enhanced with a hint of mild chili, they reveal their unique texture and delicate marine flavor. Served steaming hot with crusty bread to savor every drop.'
          },
          {
            name: 'WILD SHRIMP WITH GARLIC AND HOT CHILI',
            description: 'Wild shrimp flambéed in oil infused with garlic and red chili',
            price: 180,
            detailedDescription: 'Our wild shrimp caught in the Mediterranean are seared in a hot cassolette with olive oil infused with fresh garlic and red chili. The spicy and fragrant cooking juice is ideal for savoring with our homemade crusty bread. An iconic dish that awakens the taste buds and instantly evokes Mediterranean taverns.'
          },
          {
            name: 'CLAMS MARINIÈRE',
            description: 'Fresh clams opened in a bath of olive oil, garlic, and parsley',
            price: 120,
            detailedDescription: 'Our live clams are carefully selected each morning and cooked to order in our traditional earthenware cassolettes. They open delicately in a bath of olive oil infused with freshly crushed garlic and parsley. A touch of lemon juice balances their natural briny flavor. A deceptively simple Mediterranean classic, where the exceptional quality of the product is showcased.'
          },
          {
            name: 'SWORDFISH AND SHRIMP WITH GARLIC',
            description: 'Fresh swordfish medallions and shrimp sautéed with garlic and fine herbs',
            price: 160,
            detailedDescription: 'Elegant medallions of fresh swordfish are quickly sautéed with shrimp in an oil infused with garlic and fresh thyme. This marine duo is served in a bubbling cassolette that preserves all their flavors. A hint of Espelette pepper, a drizzle of lemon, and some fresh herbs perfect this dish that is both refined and generous. The perfect alliance of two Mediterranean treasures, which the cassolette service makes even more flavorful.'
          },
          {
            name: 'SWORDFISH AND CLAMS WITH GARLIC',
            description: 'Harmonious combination of tender swordfish and juicy clams with garlic',
            price: 160,
            detailedDescription: 'This cassolette elegantly marries the melting flesh of swordfish with the briny flavor of clams. The two products are cooked separately to respect their texture, then reunited in a hot cassolette with oil flavored with garlic, parsley, and lemon. The clam juice delicately impregnates the swordfish, creating a symphony of marine flavors enhanced by the heat of the earthenware cassolette that continues cooking at the table.'
          }
        ]
      },
      {
        title: 'LAND CASSOLETTES',
        items: [
          {
            name: 'MUSHROOM CASSOLETTE',
            description: 'Selection of wild and cultivated mushrooms, confit garlic, and fresh herbs',
            price: 80,
            detailedDescription: 'Our cassolette brings together a carefully selected collection of mushrooms: porcini, oyster mushrooms, shiitakes, and button mushrooms. They are sautéed over high heat then slowly simmered with confit garlic, fresh parsley, and a touch of cream. A light reduction of white wine and a drizzle of truffle oil perfect this earthy dish with deep and comforting flavors. Served bubbling hot, it releases irresistible woody aromas.'
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
              <CassoletteMenuSection title={section.title} items={section.items} />
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