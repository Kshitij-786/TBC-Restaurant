import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Heart, Navigation } from 'lucide-react';
import { useTheme } from '../ThemeContext';

export default function Footer() {
  const { isDark } = useTheme();

  // Live google maps search link pointing to TBC (The Basement Cafe), opposite GLA University, Mathura.
  const mapUrl = "https://www.google.com/maps/search/?api=1&query=TBC+The+Basement+Cafe+opp+GLA+University+Bharthia+Uttar+Pradesh+281406";

  return (
    <footer 
      id="location" 
      className={`relative pt-24 pb-12 border-t overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-[#050505] border-white/5' : 'bg-zinc-100 border-zinc-200'
      }`}
    >
      {/* Glow Backdrops */}
      <div className={`absolute top-0 left-1/3 w-80 h-80 rounded-full blur-[120px] pointer-events-none ${
        isDark ? 'bg-[#ff4d00]/5' : 'bg-[#ff4d00]/3'
      }`}></div>
      <div className={`absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-[150px] pointer-events-none ${
        isDark ? 'bg-[#ff4d00]/3' : 'bg-[#ff4d00]/2'
      }`}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch">
          
          {/* Footer Left Column: Restaurant Info & Branding */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8" id="footer-branding-info">
            <div className="space-y-6">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-[#ff4d00] shadow-[0_0_15px_rgba(255,77,0,0.35)]">
                  <span className="font-black text-black text-lg">TBC</span>
                </div>
                <div>
                  <h3 className={`text-xl font-black tracking-wide font-sans transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-zinc-950'
                  }`}>
                    THE BASEMENT CAFE
                  </h3>
                  <p className={`text-[10px] tracking-widest uppercase font-mono mt-0.5 ${
                    isDark ? 'text-zinc-500' : 'text-zinc-550'
                  }`}>
                    Flavor Underground
                  </p>
                </div>
              </div>

              {/* Pitch */}
              <p className={`text-sm leading-relaxed max-w-sm transition-colors duration-300 ${
                isDark ? 'text-zinc-400' : 'text-zinc-650'
              }`}>
                Mathura's premium culinary bunker. Crafted especially for the students, faculty, and food connoisseurs of GLA University. Delicious, clean, fast, and always fresh.
              </p>

              {/* Location Details */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-[#ff4d00] shrink-0 mt-0.5" />
                  <p className={`text-sm font-sans transition-colors duration-300 ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    <strong className={isDark ? 'text-white' : 'text-zinc-900'}>Address:</strong>
                    <br />
                    ON NH2, opp. GLA UNIVERSITY, Bharthia, Uttar Pradesh 281406
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-emerald-500 shrink-0 animate-pulse" />
                  <p className={`text-sm font-sans transition-colors duration-300 ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    <strong className={isDark ? 'text-white' : 'text-zinc-900'}>Timings:</strong> <span className={`font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>Open 24 Hours</span> <span className="text-[10px] uppercase font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 ml-2 animate-pulse">Non-Stop</span>
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-[#ff4d00] shrink-0" />
                  <p className={`text-sm font-mono transition-colors duration-300 ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    <strong className={`font-sans ${isDark ? 'text-white' : 'text-zinc-900'}`}>Phone:</strong> +91 98765 43210
                  </p>
                </div>
              </div>
            </div>

            {/* Micro Badges */}
            <div className={`flex items-center space-x-4 border-t pt-6 ${isDark ? 'border-white/5' : 'border-zinc-200'}`}>
              <div className="flex items-center space-x-1.5 text-zinc-500 text-xs font-mono">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>100% Hygiene Certified</span>
              </div>
            </div>
          </div>

          {/* Footer Right Column: Embedded Modern Map Container Mockup */}
          <div className="lg:col-span-7 flex flex-col justify-between" id="footer-map-container">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`text-sm font-bold tracking-wider uppercase font-mono transition-colors duration-300 ${
                    isDark ? 'text-zinc-300' : 'text-zinc-700'
                  }`}>
                    Interactive Location Hub
                  </h4>
                  <p className="text-xs text-[#ff4d00] font-sans mt-0.5">
                    Click anywhere on the map to navigate with live GPS
                  </p>
                </div>
                <div className="hidden sm:flex items-center space-x-1 px-3 py-1 rounded-lg bg-[#ff4d00]/10 border border-[#ff4d00]/20 text-[10px] font-bold text-[#ff4d00] uppercase font-mono">
                  <Navigation className="w-3 h-3 text-[#ff4d00]" />
                  <span>GPS Grounded</span>
                </div>
              </div>

              {/* Crucial Action: Map block anchor link wrapping the interactive visual */}
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`block relative aspect-[16/9] w-full rounded-2xl p-0.5 bg-gradient-to-r from-[#ff4d00]/30 to-[#ff4d00]/10 hover:from-[#ff4d00] hover:to-[#ff6a00] border overflow-hidden transition-all duration-500 cursor-pointer ${
                  isDark
                    ? 'border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.6)]'
                    : 'border-zinc-200 shadow-md'
                }`}
                id="live-map-anchor"
              >
                {/* Visual Map Content Mockup - Highly Cyberpunk & Neon Styled */}
                <div className={`relative w-full h-full rounded-[14px] overflow-hidden flex items-center justify-center transition-colors duration-300 ${
                  isDark ? 'bg-[#050505]' : 'bg-zinc-50'
                }`}>
                  
                  {/* Faux Grid & Street Lines */}
                  <svg className={`absolute inset-0 w-full h-full opacity-15 transition-colors duration-300 ${
                    isDark ? 'stroke-zinc-750' : 'stroke-zinc-350'
                  }`} xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="street-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#street-grid)" />
                    {/* Faux Main Highways */}
                    <path d="M-10 80 L500 120 L1000 140" fill="none" stroke="#ff4d00" strokeWidth="4" className="opacity-40" />
                    <path d="M250 -10 L280 400" fill="none" stroke="#ff4d00" strokeWidth="3" className="opacity-20" />
                  </svg>

                  {/* Faux River/Waterbody */}
                  <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-[#ff4d00]/5 blur-xl rounded-bl-full pointer-events-none"></div>

                  {/* Faux Landmarks */}
                  <div className="absolute top-10 left-12 text-[10px] font-mono text-zinc-500 select-none">NH2 Highway</div>
                  <div className="absolute bottom-12 left-16 text-[10px] font-mono text-[#ff4d00]/40 font-bold tracking-widest select-none uppercase">
                    Campus Area
                  </div>

                  {/* Glowing Radar & Ping for TBC Location */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
                    {/* Glowing outer rings */}
                    <span className="absolute w-24 h-24 rounded-full border border-[#ff4d00]/30 animate-ping opacity-60"></span>
                    <span className="absolute w-12 h-12 rounded-full bg-[#ff4d00]/10 border border-[#ff4d00]/50 animate-pulse"></span>
                    
                    {/* Glowing Pin Marker */}
                    <div className="relative p-2.5 rounded-full bg-zinc-900 border border-[#ff4d00] shadow-[0_0_20px_rgba(255,77,0,0.6)] group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-5 h-5 text-[#ff4d00]" />
                    </div>
                    
                    {/* Text Label on top of Marker */}
                    <div className={`mt-2.5 px-3 py-1 rounded-lg border text-[10px] font-bold tracking-wider font-mono shadow-md text-center transition-colors duration-300 ${
                      isDark ? 'bg-zinc-950/95 border-[#ff4d00]/30 text-white' : 'bg-white border-[#ff4d00]/30 text-zinc-900'
                    }`}>
                      TBC (THE BASEMENT CAFE)
                    </div>
                  </div>

                  {/* Bottom Hover Navigation Card overlay */}
                  <div className={`absolute bottom-3 left-3 right-3 py-2 px-3 rounded-lg border flex items-center justify-between transition-colors duration-300 ${
                    isDark 
                      ? 'bg-zinc-900/90 border-white/5 group-hover:bg-zinc-900' 
                      : 'bg-white/95 border-zinc-200 shadow-sm group-hover:bg-zinc-50'
                  }`}>
                    <span className={`text-[10px] font-mono tracking-wide ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
                      Latitude: 27.6046&deg; N, Longitude: 77.5932&deg; E
                    </span>
                    <span className="text-xs font-bold text-[#ff4d00] group-hover:text-[#ff6a00] inline-flex items-center gap-1">
                      Navigate Now <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </span>
                  </div>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* Legal & Footer Bottom Credits */}
        <div className={`mt-16 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left transition-colors duration-300 ${
          isDark ? 'border-white/5' : 'border-zinc-200'
        }`} id="footer-bottom-bar">
          <p className="text-xs text-zinc-500 font-mono">
            &copy; {new Date().getFullYear()} TBC - The Basement Cafe. All Rights Reserved.
            <span className="mx-2 text-zinc-700">|</span>
            <a href="#admin-portal" className="hover:text-[#ff4d00] underline decoration-dotted transition-colors">Supervisor Backstage</a>
          </p>
          <div className="flex items-center space-x-1 text-xs text-zinc-500 font-mono">
            <span>Made with</span>
            <Heart className="w-3 h-3 text-[#ff4d00] fill-[#ff4d00]" />
            <span>for food lovers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
