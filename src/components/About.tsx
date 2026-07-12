import { motion } from 'motion/react';
import { Sparkles, Utensils, Zap, Users } from 'lucide-react';
import { useTheme } from '../ThemeContext';

export default function About() {
  const { isDark } = useTheme();

  const highlights = [
    {
      icon: <Zap className="w-6 h-6 text-[#ff4d00]" />,
      title: "Late Night Energy",
      desc: "Perfect spot for late-night exam study sessions, project debates, and birthday party celebrations."
    },
    {
      icon: <Utensils className="w-6 h-6 text-[#ff4d00]" />,
      title: "Master of Wok & Clay",
      desc: "Sizzling paneer appetizers, smoky tandoori naans, and gourmet pastas prepared by expert chefs."
    },
    {
      icon: <Users className="w-6 h-6 text-[#ff4d00]" />,
      title: "Local Student Hub",
      desc: "Directly located opposite the campus area. Your second home for high-quality food, cozy seating, and endless laughs."
    }
  ];

  return (
    <section 
      id="about" 
      className={`relative py-24 overflow-hidden border-t transition-colors duration-300 ${
        isDark ? 'bg-[#050505] border-white/5' : 'bg-zinc-100/50 border-zinc-200'
      }`}
    >
      {/* Background blobs */}
      <div className={`absolute top-1/3 left-10 w-80 h-80 rounded-full blur-[120px] pointer-events-none ${
        isDark ? 'bg-[#ff4d00]/5' : 'bg-[#ff4d00]/3'
      }`}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* About Left Visual Block */}
          <div className="lg:col-span-5 relative" id="about-visual-panel">
            <div className={`relative aspect-[4/5] rounded-3xl overflow-hidden p-2.5 border group transition-all duration-300 ${
              isDark 
                ? 'bg-zinc-950 border-white/5 shadow-[0_10px_45px_rgba(0,0,0,0.7)]' 
                : 'bg-white border-zinc-200 shadow-[0_10px_45px_rgba(0,0,0,0.03)]'
            }`}>
              <img
                src="https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=700&q=80"
                alt="Cozy basement cafe interior vibes"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-700 ease-out brightness-90"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${
                isDark ? 'from-zinc-950 via-zinc-950/30 to-transparent' : 'from-zinc-900/40 via-transparent to-transparent'
              }`}></div>
              
              {/* Overlay Stat Card */}
              <div className={`absolute bottom-6 left-6 right-6 p-4 rounded-xl border shadow-md transition-colors duration-300 ${
                isDark
                  ? 'bg-zinc-950/90 border-white/5'
                  : 'bg-white/95 border-zinc-250 text-zinc-900 shadow-lg'
              }`}>
                <div className="flex items-center space-x-3">
                  <div className="text-3xl font-black text-[#ff4d00] font-mono">10k+</div>
                  <div>
                    <h5 className={`text-sm font-bold font-sans ${isDark ? 'text-white' : 'text-zinc-900'}`}>Happy Guests Served</h5>
                    <p className="text-[10px] text-zinc-500 font-mono">Mathura's favorite underground taste</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* About Right Information */}
          <div className="lg:col-span-7 space-y-8 text-left" id="about-content-panel">
            <div className="space-y-4">
              <div className={`inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border transition-colors ${
                isDark ? 'bg-[#ff4d00]/10 border-[#ff4d00]/20' : 'bg-[#ff4d00]/5 border-[#ff4d00]/15'
              }`}>
                <Sparkles className="w-3.5 h-3.5 text-[#ff4d00]" />
                <span className="text-[10px] font-bold tracking-widest text-[#ff4d00] uppercase font-mono">
                  Welcome to TBC
                </span>
              </div>
              <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight font-sans leading-tight transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-zinc-950'
              }`}>
                An Underground Culinary Vault Built for Food Connoisseurs
              </h2>
              <p className={`text-sm sm:text-base leading-relaxed transition-colors duration-300 ${
                isDark ? 'text-zinc-400' : 'text-zinc-650'
              }`}>
                TBC (The Basement Cafe) isn't just an ordinary dine-in; it's a sensory escape built deep into the heart of the city. Focused around a gorgeous modern dark aesthetic, high-contrast neon accents, and upbeat energy, we serve fresh gourmet creations suited to fuel your late-night cravings and busy schedules.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 pt-4">
              {highlights.map((hl, idx) => (
                <div 
                  key={idx} 
                  className={`flex items-start space-x-4 p-4 rounded-2xl border transition-all duration-300 ${
                    isDark 
                      ? 'bg-white/3 border-white/5 hover:border-white/10' 
                      : 'bg-white border-zinc-200 hover:border-zinc-300/80 shadow-sm'
                  }`}
                >
                  <div className={`p-3 rounded-xl border shrink-0 transition-colors duration-300 ${
                    isDark ? 'bg-zinc-950 border-white/5' : 'bg-zinc-50 border-zinc-200'
                  }`}>
                    {hl.icon}
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold font-sans ${isDark ? 'text-white' : 'text-zinc-900'}`}>{hl.title}</h4>
                    <p className={`text-xs leading-relaxed mt-1 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>{hl.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
