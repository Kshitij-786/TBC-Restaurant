import { motion } from 'motion/react';
import { Flame, ArrowRight, Sparkles, Clock, MapPin, Instagram } from 'lucide-react';
import { useTheme } from '../ThemeContext';

export default function Hero() {
  const { isDark } = useTheme();

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className={`relative min-h-screen flex items-center justify-center pt-20 overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-[#050505]' : 'bg-zinc-50'
      }`}
    >
      {/* Immersive Ambient Glow Blobs */}
      <div className={`absolute top-1/4 left-10 w-72 h-72 rounded-full blur-[120px] pointer-events-none animate-pulse ${
        isDark ? 'bg-[#ff4d00]/10' : 'bg-[#ff4d00]/5'
      }`}></div>
      <div className={`absolute bottom-1/4 right-10 w-96 h-96 rounded-full blur-[150px] pointer-events-none ${
        isDark ? 'bg-[#ff4d00]/5' : 'bg-[#ff4d00]/3'
      }`}></div>
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[100px] border pointer-events-none ${
        isDark ? 'bg-zinc-900/30 border-[#ff4d00]/5' : 'bg-zinc-200/20 border-[#ff4d00]/2'
      }`}></div>

      {/* Grid Pattern Background overlay */}
      <div className={`absolute inset-0 pointer-events-none opacity-60 transition-colors duration-300 ${
        isDark 
          ? 'bg-[radial-gradient(#ffffff02_1px,transparent_1px)] [background-size:24px_24px]' 
          : 'bg-[radial-gradient(#00000004_1px,transparent_1px)] [background-size:24px_24px]'
      }`}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-24 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-8 text-left" id="hero-text-content">
            {/* Glowing Accent Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full border transition-colors ${
                isDark 
                  ? 'bg-[#ff4d00]/10 border-[#ff4d00]/20 shadow-[0_0_15px_rgba(255,77,0,0.15)]' 
                  : 'bg-[#ff4d00]/8 border-[#ff4d00]/25 shadow-sm'
              }`}
            >
              <Flame className="w-4 h-4 text-[#ff4d00] animate-pulse" />
              <span className="text-xs font-semibold tracking-wider text-[#ff4d00] uppercase font-mono">
                Mathura's Ultimate Basement Hangout
              </span>
            </motion.div>

            {/* Premium Typography Heading */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`text-4xl sm:text-5xl md:text-6xl font-black font-sans tracking-tight leading-none transition-colors duration-300 ${
                  isDark ? 'text-white' : 'text-zinc-950'
                }`}
              >
                THE <span className="text-[#ff4d00] drop-shadow-[0_2px_15px_rgba(255,77,0,0.3)] italic font-serif">BASEMENT</span>
                <br />
                CAFE
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`text-base sm:text-lg max-w-xl font-normal leading-relaxed transition-colors duration-300 ${
                  isDark ? 'text-zinc-400' : 'text-zinc-650'
                }`}
              >
                Where high-voltage vibes meet premium culinary craftsmanship. Serving smoky Tandoori classics, sizzling Momos, rich Curries, and decadent desserts straight to our food lovers.
              </motion.p>
            </div>

            {/* Quick Info Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg border-y py-5 transition-colors ${
                isDark ? 'border-white/5' : 'border-zinc-200'
              }`}
            >
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#ff4d00] shrink-0 mt-0.5" />
                <div>
                  <h4 className={`text-sm font-semibold font-sans ${isDark ? 'text-white' : 'text-zinc-900'}`}>Opp. Main Campus</h4>
                  <p className="text-xs text-zinc-500 font-mono mt-0.5">Mathura, UP 281406</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5 animate-pulse" />
                <div>
                  <h4 className={`text-sm font-bold font-sans flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                    Hours of Chill
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase animate-pulse">
                      Live
                    </span>
                  </h4>
                  <p className={`text-xs font-mono font-bold mt-0.5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>Open 24 Hours</p>
                </div>
              </div>
            </motion.div>

            {/* Action Call to Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
              id="hero-actions"
            >
              <button
                onClick={() => handleScrollTo('menu')}
                className="inline-flex items-center justify-center space-x-2.5 px-8 py-4 rounded-xl bg-[#ff4d00] hover:bg-[#ff6a00] text-base font-black uppercase tracking-wider text-black shadow-[0_10px_30px_rgba(255,77,0,0.2)] cursor-pointer active:scale-98 transition-all duration-300"
              >
                <span>Explore Menu</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <a
                href="https://www.instagram.com/the_basementcafe?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-xl border text-base font-semibold cursor-pointer active:scale-98 transition-all duration-300 ${
                  isDark
                    ? 'bg-white/5 border-white/10 text-white hover:bg-white hover:text-black hover:border-white'
                    : 'bg-zinc-100 border-zinc-200 text-zinc-800 hover:bg-zinc-950 hover:text-white hover:border-zinc-950 shadow-sm'
                }`}
              >
                <Instagram className="w-5 h-5 text-[#ff4d00]" />
                <span>Follow on Instagram</span>
              </a>
            </motion.div>
          </div>

          {/* Hero Right Visual Column */}
          <div className="lg:col-span-5 relative flex justify-center items-center" id="hero-graphic-panel">
            {/* Ambient Background Aura behind Image */}
            <div className={`absolute w-80 h-80 rounded-full blur-[80px] pointer-events-none animate-pulse ${
              isDark ? 'bg-[#ff4d00]/10' : 'bg-[#ff4d00]/5'
            }`}></div>
            
            {/* Frame with custom shadows and decorative borders */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 1 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`relative w-full max-w-sm sm:max-w-md aspect-square rounded-3xl p-2.5 border overflow-hidden group transition-all duration-300 ${
                isDark
                  ? 'bg-gradient-to-b from-white/5 to-[#050505] border-white/10 shadow-[0_15px_50px_rgba(0,0,0,0.8)]'
                  : 'bg-gradient-to-b from-white to-zinc-100 border-zinc-200 shadow-[0_15px_50px_rgba(0,0,0,0.05)]'
              }`}
            >
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#ff4d00] rounded-tl-3xl"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#ff4d00] rounded-tr-3xl"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#ff4d00] rounded-bl-3xl"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#ff4d00] rounded-br-3xl"></div>

              {/* High Quality Hero Food Image with fallback/Unsplash */}
              <div className="w-full h-full rounded-2xl overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80"
                  alt="TBC Butter Chicken and Tandoori Delights"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-700 ease-out brightness-90"
                />
                
                {/* Visual Cover Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${
                  isDark ? 'from-zinc-950 via-zinc-950/20 to-transparent' : 'from-zinc-900/60 via-transparent to-transparent'
                }`}></div>

                {/* Micro Floating Info Cards inside Graphic */}
                <div className={`absolute bottom-4 left-4 right-4 p-4 rounded-xl border shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-colors duration-300 ${
                  isDark
                    ? 'bg-zinc-950/90 border-white/5'
                    : 'bg-white/95 border-zinc-250'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-mono text-[#ff4d00] font-semibold flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#ff4d00]" /> Hot Seller
                      </p>
                      <h4 className={`text-sm font-bold font-sans mt-0.5 ${isDark ? 'text-white' : 'text-zinc-900'}`}>Murg Butter Chicken</h4>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-zinc-500 font-mono">Special Price</p>
                      <p className="text-sm font-extrabold text-[#ff4d00] font-sans">₹320</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
