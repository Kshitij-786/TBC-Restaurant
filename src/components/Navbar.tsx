import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Utensils, Menu, X, Phone, Clock, ShoppingBag, Sun, Moon, ShoppingCart, User, Settings } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import { useAuth } from '../AuthContext';

interface NavbarProps {
  onOpenAdmin: () => void;
  onOpenCart: () => void;
  onOpenProfile: () => void;
}

export default function Navbar({ onOpenAdmin, onOpenCart, onOpenProfile }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { cart, user } = useAuth();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? isDark
              ? 'bg-[#050505]/95 backdrop-blur-md border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
              : 'bg-white/95 backdrop-blur-md border-b border-zinc-200 shadow-[0_4px_30px_rgba(0,0,0,0.05)] text-zinc-900'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo with Glow Effect */}
            <div 
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => handleScrollTo('home')}
              id="nav-logo-container"
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[#ff4d00] shadow-[0_0_20px_rgba(255,77,0,0.3)]">
                <Utensils className="w-5 h-5 text-black" />
                <span className="absolute inset-0 rounded-xl bg-[#ff4d00] blur-sm opacity-50 animate-pulse pointer-events-none"></span>
              </div>
              <div className="flex flex-col">
                <span className={`text-xl font-bold tracking-wider font-sans flex items-center gap-1.5 ${
                  isDark ? 'text-white' : 'text-zinc-950'
                }`}>
                  THE BASEMENT
                  <span className="text-[10px] uppercase tracking-widest font-mono px-1.5 py-0.5 rounded-full bg-[#ff4d00]/10 text-[#ff4d00] border border-[#ff4d00]/20 shadow-[0_0_8px_rgba(255,77,0,0.2)]">
                    CAFE
                  </span>
                </span>
                <span className={`text-[10px] tracking-widest uppercase font-mono leading-none mt-0.5 ${
                  isDark ? 'text-zinc-400' : 'text-zinc-500'
                }`}>
                  Flavor Underground
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8" id="desktop-nav">
              <button
                onClick={() => handleScrollTo('home')}
                className={`text-sm font-medium transition-colors cursor-pointer relative py-1 group ${
                  isDark ? 'text-zinc-300 hover:text-[#ff4d00]' : 'text-zinc-600 hover:text-[#ff4d00]'
                }`}
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#ff4d00] transition-all duration-300 group-hover:w-full shadow-[0_0_8px_rgba(255,77,0,0.8)]"></span>
              </button>
              <button
                onClick={() => handleScrollTo('about')}
                className={`text-sm font-medium transition-colors cursor-pointer relative py-1 group ${
                  isDark ? 'text-zinc-300 hover:text-[#ff4d00]' : 'text-zinc-600 hover:text-[#ff4d00]'
                }`}
              >
                Our Story
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#ff4d00] transition-all duration-300 group-hover:w-full shadow-[0_0_8px_rgba(255,77,0,0.8)]"></span>
              </button>
              <button
                onClick={() => handleScrollTo('menu')}
                className={`text-sm font-medium transition-colors cursor-pointer relative py-1 group ${
                  isDark ? 'text-zinc-300 hover:text-[#ff4d00]' : 'text-zinc-600 hover:text-[#ff4d00]'
                }`}
              >
                Menu
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#ff4d00] transition-all duration-300 group-hover:w-full shadow-[0_0_8px_rgba(255,77,0,0.8)]"></span>
              </button>
              <button
                onClick={() => handleScrollTo('location')}
                className={`text-sm font-medium transition-colors cursor-pointer relative py-1 group ${
                  isDark ? 'text-zinc-300 hover:text-[#ff4d00]' : 'text-zinc-600 hover:text-[#ff4d00]'
                }`}
              >
                Location & Map
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#ff4d00] transition-all duration-300 group-hover:w-full shadow-[0_0_8px_rgba(255,77,0,0.8)]"></span>
              </button>
              <button
                onClick={onOpenAdmin}
                className="text-xs font-black tracking-widest uppercase font-mono text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-3.5 py-1 flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(6,182,212,0.1)] hover:bg-cyan-500/20 cursor-pointer ml-2"
                id="open-admin-portal-desktop"
              >
                <Settings className="w-3.5 h-3.5 text-cyan-400" />
                <span>Admin Portal</span>
              </button>

              <button
                onClick={onOpenCart}
                className="text-xs font-black tracking-widest uppercase font-mono text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3.5 py-1 flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(16,185,129,0.1)] hover:bg-emerald-500/20 cursor-pointer"
                id="open-cart-desktop"
              >
                <ShoppingCart className="w-3.5 h-3.5 text-emerald-400" />
                <span>Your Cart ({cartCount})</span>
              </button>

              <button
                onClick={onOpenProfile}
                className="text-xs font-black tracking-widest uppercase font-mono text-amber-400 hover:text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-full px-3.5 py-1 flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(245,158,11,0.1)] hover:bg-amber-500/20 cursor-pointer"
                id="open-profile-desktop"
              >
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span>{user ? `Hi, ${user.name.split(' ')[0]}` : 'My Profile'}</span>
              </button>
            </nav>

            {/* Quick Contact & Action Buttons */}
            <div className="hidden lg:flex items-center space-x-6" id="desktop-meta-nav">
              <div className={`flex items-center space-x-2 text-xs font-mono font-bold ${
                isDark ? 'text-emerald-400' : 'text-emerald-600'
              }`}>
                <Clock className={`w-4 h-4 animate-pulse ${isDark ? 'text-emerald-500' : 'text-emerald-600'}`} />
                <span className="flex items-center gap-1.5">
                  Open 24 Hours
                  <span className={`inline-block w-2 h-2 rounded-full animate-ping ${isDark ? 'bg-emerald-500' : 'bg-emerald-600'}`}></span>
                </span>
              </div>
              <a
                href="tel:+910000000000"
                className={`inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-full border text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-sm ${
                  isDark
                    ? 'bg-white/5 border-white/10 text-white hover:bg-white hover:text-black hover:border-white'
                    : 'bg-zinc-100 border-zinc-200 text-zinc-800 hover:bg-zinc-950 hover:text-white hover:border-zinc-950'
                }`}
              >
                <Phone className="w-3.5 h-3.5 animate-pulse" />
                <span className="font-mono">Call TBC</span>
              </a>
            </div>

            {/* Theme Toggle & Mobile Menu Button */}
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleTheme}
                className={`p-2.5 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-center ${
                  isDark
                    ? 'bg-zinc-900/85 border-zinc-850 text-amber-400 hover:bg-zinc-800 hover:text-amber-300'
                    : 'bg-white border-zinc-200 text-indigo-600 hover:bg-zinc-100 hover:text-indigo-750 shadow-sm'
                }`}
                aria-label="Toggle Theme"
                title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {isDark ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
              </button>

              <div className="md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className={`p-2.5 rounded-xl border focus:outline-none transition-all duration-200 ${
                    isDark
                      ? 'bg-zinc-900/80 border-zinc-800 text-zinc-300 hover:text-white'
                      : 'bg-white border-zinc-200 text-zinc-700 hover:text-zinc-950 shadow-sm'
                  }`}
                  aria-label="Toggle Menu"
                  id="mobile-menu-toggle"
                >
                  {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className={`fixed inset-0 z-40 md:hidden pt-24 px-4 pb-6 backdrop-blur-xl flex flex-col justify-between ${
              isDark
                ? 'bg-zinc-950/98 border-b border-zinc-850 shadow-[0_10px_40px_rgba(0,0,0,0.9)] text-white'
                : 'bg-white/98 border-b border-zinc-200 shadow-[0_10px_40px_rgba(0,0,0,0.08)] text-zinc-950'
            }`}
            id="mobile-nav-menu"
          >
            <div className="space-y-4 flex flex-col pt-4">
              <button
                onClick={() => handleScrollTo('home')}
                className={`w-full text-left py-3 px-4 rounded-xl text-lg font-medium border border-transparent transition-all ${
                  isDark
                    ? 'text-zinc-200 hover:bg-white/5 hover:text-[#ff4d00]'
                    : 'text-zinc-800 hover:bg-zinc-100 hover:text-[#ff4d00]'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => handleScrollTo('about')}
                className={`w-full text-left py-3 px-4 rounded-xl text-lg font-medium border border-transparent transition-all ${
                  isDark
                    ? 'text-zinc-200 hover:bg-white/5 hover:text-[#ff4d00]'
                    : 'text-zinc-800 hover:bg-zinc-100 hover:text-[#ff4d00]'
                }`}
              >
                Our Story
              </button>
              <button
                onClick={() => handleScrollTo('menu')}
                className={`w-full text-left py-3 px-4 rounded-xl text-lg font-medium border border-transparent transition-all ${
                  isDark
                    ? 'text-zinc-200 hover:bg-white/5 hover:text-[#ff4d00]'
                    : 'text-zinc-800 hover:bg-zinc-100 hover:text-[#ff4d00]'
                }`}
              >
                Menu
              </button>
              <button
                onClick={() => handleScrollTo('location')}
                className={`w-full text-left py-3 px-4 rounded-xl text-lg font-medium border border-transparent transition-all ${
                  isDark
                    ? 'text-zinc-200 hover:bg-white/5 hover:text-[#ff4d00]'
                    : 'text-zinc-800 hover:bg-zinc-100 hover:text-[#ff4d00]'
                }`}
              >
                Location & Map
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenAdmin();
                }}
                className="w-full text-left py-3 px-4 rounded-xl text-lg font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 flex items-center gap-2 transition-all mt-1"
              >
                <Settings className="w-5 h-5 text-cyan-400" />
                <span>Admin Portal</span>
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenCart();
                }}
                className="w-full text-left py-3 px-4 rounded-xl text-lg font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 flex items-center gap-2 transition-all mt-1"
              >
                <ShoppingCart className="w-5 h-5 text-emerald-400" />
                <span>Your Cart ({cartCount})</span>
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenProfile();
                }}
                className="w-full text-left py-3 px-4 rounded-xl text-lg font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 flex items-center gap-2 transition-all mt-1"
              >
                <User className="w-5 h-5 text-amber-400" />
                <span>{user ? `Hi, ${user.name}` : 'My Profile'}</span>
              </button>
            </div>

            <div className={`border-t pt-6 space-y-4 ${isDark ? 'border-white/5' : 'border-zinc-200'}`}>
              <div className={`flex items-center space-x-3 px-4 text-sm font-mono font-bold ${
                isDark ? 'text-emerald-400' : 'text-emerald-600'
              }`}>
                <Clock className={`w-4 h-4 animate-pulse ${isDark ? 'text-emerald-500' : 'text-emerald-600'}`} />
                <span className="flex items-center gap-1.5">
                  Open 24 Hours
                  <span className={`inline-block w-2 h-2 rounded-full animate-ping ${isDark ? 'bg-emerald-500' : 'bg-emerald-600'}`}></span>
                </span>
              </div>
              <div className="px-4">
                <a
                  href="tel:+910000000000"
                  className="w-full inline-flex items-center justify-center space-x-2 py-4 rounded-2xl bg-[#ff4d00] text-sm font-black uppercase tracking-widest text-black shadow-[0_10px_30px_rgba(255,77,0,0.2)] hover:bg-[#ff6a00] active:scale-98 transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call to Place Order</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
