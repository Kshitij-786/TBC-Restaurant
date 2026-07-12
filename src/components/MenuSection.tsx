import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import { MENU_ITEMS } from '../data/menu';
import { MenuItem, MenuCategory } from '../types';
import { useTheme } from '../ThemeContext';
import { supabase } from '../supabaseClient';

interface MenuSectionProps {
  onSelectItem: (item: MenuItem) => void;
}

const CATEGORIES: { id: MenuCategory | 'All'; label: string }[] = [
  { id: 'All', label: 'All Items' },
  { id: 'Appetizers', label: 'Appetizers' },
  { id: 'Side Order / Momos', label: 'Side Order / Momos' },
  { id: 'Soup', label: 'Soup' },
  { id: 'Rice & Noodles', label: 'Rice & Noodles' },
  { id: 'Roti & Breads', label: 'Breads & Rotis' },
  { id: 'Pasta & Maggie', label: 'Pasta & Maggie' },
  { id: 'Main Course', label: 'Indian Mains' },
  { id: 'Biryani', label: 'Biryani Special' },
];

export default function MenuSection({ onSelectItem }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<MenuCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const { isDark } = useTheme();

  // Load menu items from Supabase or fallback to static list
  const [itemsList, setItemsList] = useState<MenuItem[]>(MENU_ITEMS);
  const [isMenuLoading, setIsMenuLoading] = useState(false);

  useEffect(() => {
    const fetchMenu = async () => {
      setIsMenuLoading(true);
      try {
        const { data, error } = await supabase
          .from('menu_items')
          .select('*')
          .order('category', { ascending: true });

        if (error) throw error;

        if (data && data.length > 0) {
          const formatted: MenuItem[] = data.map((item: any) => ({
            id: item.id,
            name: item.name,
            category: item.category as MenuCategory,
            price: Number(item.price),
            description: item.description,
            image: item.image,
            isVeg: item.is_veg,
            isPopular: item.is_popular,
          }));
          setItemsList(formatted);
        } else {
          setItemsList(MENU_ITEMS);
        }
      } catch (err) {
        console.warn('Could not load menu_items from database (this is expected if you have not run the setup SQL script). Falling back to static menu:', err);
        setItemsList(MENU_ITEMS);
      } finally {
        setIsMenuLoading(false);
      }
    };

    fetchMenu();
  }, []);

  // Filter items based on activeCategory, searchQuery, and vegOnly option
  const filteredItems = itemsList.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVeg = !vegOnly || item.isVeg;
    return matchesCategory && matchesSearch && matchesVeg;
  });

  return (
    <section 
      id="menu" 
      className={`relative py-24 overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-[#050505]' : 'bg-zinc-50'
      }`}
    >
      {/* Ambient background glows */}
      <div className={`absolute top-1/2 right-10 w-96 h-96 rounded-full blur-[150px] pointer-events-none ${
        isDark ? 'bg-[#ff4d00]/5' : 'bg-[#ff4d00]/3'
      }`}></div>
      <div className={`absolute bottom-10 left-10 w-80 h-80 rounded-full blur-[120px] pointer-events-none ${
        isDark ? 'bg-[#ff4d00]/5' : 'bg-[#ff4d00]/3'
      }`}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16" id="menu-header">
          <div className={`inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border transition-colors ${
            isDark ? 'bg-[#ff4d00]/10 border-[#ff4d00]/20' : 'bg-[#ff4d00]/5 border-[#ff4d00]/15'
          }`}>
            <Sparkles className="w-3.5 h-3.5 text-[#ff4d00]" />
            <span className="text-[10px] font-bold tracking-widest text-[#ff4d00] uppercase font-mono">
              Basement Specials
            </span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight font-sans transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-zinc-950'
          }`}>
            Explore TBC Culinary Craft
          </h2>
          <p className={`text-sm sm:text-base transition-colors duration-300 ${
            isDark ? 'text-zinc-400' : 'text-zinc-650'
          }`}>
            Satisfy your midnight cravings and daily appetite with freshly cooked tandoori, pasta, spicy noodles, and juicy momos at standard pocket-friendly prices.
          </p>
        </div>

        {/* Filter & Search Toolbar */}
        <div className={`space-y-6 mb-12 p-5 rounded-2xl border backdrop-blur-md transition-all duration-300 ${
          isDark 
            ? 'bg-white/3 border-white/5' 
            : 'bg-white border-zinc-200 shadow-md'
        }`} id="menu-filters-wrapper">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-500">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Search momos, butter chicken, naan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm font-sans transition-all focus:outline-none focus:ring-1 focus:ring-[#ff4d00] focus:border-[#ff4d00] ${
                  isDark
                    ? 'bg-zinc-950 border-white/10 text-white placeholder-zinc-500'
                    : 'bg-zinc-50 border-zinc-250 text-zinc-900 placeholder-zinc-400'
                }`}
              />
            </div>

            {/* Toggle Veg / Non-Veg switches */}
            <div className="flex items-center gap-4 shrink-0">
              <span className={`text-xs font-mono ${isDark ? 'text-zinc-400' : 'text-zinc-550'}`}>Filter Preferences:</span>
              <button
                onClick={() => setVegOnly(!vegOnly)}
                className={`inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all duration-300 ${
                  vegOnly
                    ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.15)]'
                    : isDark
                      ? 'bg-zinc-950 border-white/10 text-zinc-400 hover:text-zinc-3d0 hover:border-white/20'
                      : 'bg-zinc-50 border-zinc-250 text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <span className={`w-2.5 h-2.5 rounded-full ${vegOnly ? 'bg-emerald-500 animate-pulse' : 'bg-emerald-600/40'}`}></span>
                <span>Vegetarian Only</span>
              </button>
            </div>
          </div>

          {/* Categories Tab Bar */}
          <div className="overflow-x-auto -mx-5 px-5 py-2 scrollbar-none flex items-center space-x-2 md:flex-wrap md:space-x-0 md:gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider whitespace-nowrap cursor-pointer transition-all duration-300 border ${
                  activeCategory === cat.id
                    ? 'bg-[#ff4d00] border-[#ff4d00] text-black shadow-[0_4px_15px_rgba(255,77,0,0.25)]'
                    : isDark
                      ? 'bg-[#050505] border-white/5 text-zinc-400 hover:text-white hover:border-white/10'
                      : 'bg-zinc-100 border-zinc-200 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid with AnimatePresence */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          id="menu-items-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35 }}
                onClick={() => onSelectItem(item)}
                className={`group relative flex flex-col justify-between rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden p-3 shadow-sm ${
                  isDark
                    ? 'bg-white/3 border-white/5 hover:border-[#ff4d00]/30 hover:bg-white/5'
                    : 'bg-white border-zinc-200/80 hover:border-[#ff4d00]/30 hover:bg-zinc-50/50 shadow-[0_4px_15px_rgba(0,0,0,0.02)]'
                }`}
              >
                <div>
                  {/* Food Image Container */}
                  <div className={`relative aspect-[4/3] rounded-xl overflow-hidden mb-4 transition-colors duration-300 ${
                    isDark ? 'bg-zinc-950' : 'bg-zinc-100'
                  }`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 to-transparent"></div>

                    {/* Popular Tag */}
                    {item.isPopular && (
                      <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#ff4d00] text-[9px] font-black tracking-widest text-black uppercase shadow-[0_2px_8px_rgba(255,77,0,0.4)]">
                        <Sparkles className="w-2.5 h-2.5" /> Popular
                      </span>
                    )}

                    {/* Veg / Non-Veg Indicator */}
                    <div className="absolute top-2.5 right-2.5 flex items-center justify-center w-6 h-6 rounded-lg bg-zinc-950/85 backdrop-blur-md border border-white/5">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          item.isVeg ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-[#ff4d00]'
                        }`}
                        title={item.isVeg ? 'Veg' : 'Non-Veg'}
                      ></span>
                    </div>
                  </div>

                  {/* Header & Title */}
                  <div className="flex items-start justify-between gap-2 px-1">
                    <h3 className={`text-base font-bold group-hover:text-[#ff4d00] transition-colors font-sans line-clamp-1 ${
                      isDark ? 'text-white' : 'text-zinc-900'
                    }`}>
                      {item.name}
                    </h3>
                    <span className="text-base font-extrabold text-[#ff4d00] font-mono shrink-0">
                      ₹{item.price}
                    </span>
                  </div>

                  {/* Description */}
                  <p className={`text-xs mt-1.5 leading-relaxed px-1 line-clamp-2 transition-colors duration-300 ${
                    isDark ? 'text-zinc-400' : 'text-zinc-650'
                  }`}>
                    {item.description}
                  </p>
                </div>

                {/* Footer Interaction Action */}
                <div className={`mt-4 pt-3 border-t px-1 flex items-center justify-between transition-colors duration-300 ${
                  isDark ? 'border-white/5' : 'border-zinc-100'
                }`}>
                  <span className={`text-[10px] uppercase tracking-widest font-mono ${
                    isDark ? 'text-zinc-500' : 'text-zinc-400'
                  }`}>
                    {item.category}
                  </span>
                  <span className="text-xs font-semibold text-[#ff4d00] group-hover:text-[#ff6a00] flex items-center gap-1 group-hover:translate-x-0.5 transition-all">
                    Check Details &rarr;
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-center py-16 border border-dashed rounded-3xl mt-6 transition-all duration-300 ${
              isDark 
                ? 'border-white/5 bg-white/1' 
                : 'border-zinc-250 bg-zinc-100/50'
            }`}
            id="menu-empty-state"
          >
            <AlertCircle className="w-8 h-8 text-zinc-500 mx-auto mb-3" />
            <h3 className={`text-lg font-bold font-sans ${isDark ? 'text-white' : 'text-zinc-900'}`}>No matching items found</h3>
            <p className={`text-sm mt-1 max-w-sm mx-auto ${isDark ? 'text-zinc-500' : 'text-zinc-650'}`}>
              We couldn't find any dish matching your filters. Try checking spelling or clearing search query.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
                setVegOnly(false);
              }}
              className={`mt-4 inline-flex items-center px-4 py-2 border text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
                isDark
                  ? 'bg-white/5 border-white/10 text-white hover:border-[#ff4d00]/40'
                  : 'bg-white border-zinc-200 text-zinc-800 hover:bg-zinc-100'
              }`}
            >
              Reset All Filters
            </button>
          </motion.div>
        )}

      </div>
    </section>
  );
}
