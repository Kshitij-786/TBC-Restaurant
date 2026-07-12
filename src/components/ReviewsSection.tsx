import { motion } from 'motion/react';
import { Star, Quote, Shield } from 'lucide-react';
import { useTheme } from '../ThemeContext';

interface Review {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  time: string;
  avatarSeed: string;
}

const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Ananya Sharma',
    role: 'Regular Guest',
    rating: 5,
    text: 'Yaar, yahan ka Paneer Tikka Butter Masala is absolutely out of this world! Aur sabse badiya baat, 24 ghante khula rehta hai toh late night cravings me yahi hamara sabse bada sahara hai. Must try spot!',
    time: '2 hours ago',
    avatarSeed: 'ananya'
  },
  {
    id: 'rev-2',
    name: 'Rahul Verma',
    role: 'Late Night Diner',
    rating: 4,
    text: 'TBC ka food solid hai boss. Hum log midnight me aksar Chicken Momos aur Hakka Noodles mangate hain. Delivery fast hai par kabhi kabhi peak hours me thoda time lagta hai. Swaad ekdum lajawab hai!',
    time: '1 day ago',
    avatarSeed: 'rahul'
  },
  {
    id: 'rev-3',
    name: 'Kapil Sharma',
    role: 'Verified Customer',
    rating: 5,
    text: 'Dal Makhni aur Lachha Paratha bilkul authentic style ka hai, maza aa gaya. Hygiene aur food quality dono top-notch hain yahan pe.',
    time: '3 days ago',
    avatarSeed: 'prof'
  },
  {
    id: 'rev-4',
    name: 'Sneha Mishra',
    role: 'Local Guide',
    rating: 4,
    text: 'Yahan ka Honey Chilli Potato aur White Sauce Pasta sahi me kaafi tasty hai. Dark neon vibe aur ambient lighting photo-worthy hai, par weekend evenings me seating ke liye thoda wait karna padta hai.',
    time: '4 days ago',
    avatarSeed: 'sneha'
  },
  {
    id: 'rev-5',
    name: 'Vikram Singh',
    role: 'Regular Customer',
    rating: 5,
    text: 'Deluxe Thali ka portion size aur price ka combo best hai, bilkul ghar jaisa swaad lagta hai. Pure campus area me aisi value aur kahin nahi milegi.',
    time: '1 week ago',
    avatarSeed: 'vikram'
  },
  {
    id: 'rev-6',
    name: 'Aditya Kapoor',
    role: 'Night Owl Diner',
    rating: 5,
    text: '24 hours open rehna is a complete game changer. Tandoori Chicken super juicy aur perfectly smoky hota hai inka. Agar bahut bhook lagi ho toh chupchap TBC Special Thali order kar lo!',
    time: '1 week ago',
    avatarSeed: 'aditya'
  }
];

export default function ReviewsSection() {
  const { isDark } = useTheme();

  return (
    <section 
      id="reviews" 
      className={`relative py-24 border-t transition-colors duration-300 ${
        isDark ? 'bg-[#0a0a0a] border-white/5' : 'bg-zinc-100/10 border-zinc-200'
      }`}
    >
      {/* Decorative Glow Elements */}
      <div className={`absolute top-1/4 right-0 w-80 h-80 rounded-full blur-[120px] pointer-events-none ${
        isDark ? 'bg-[#ff4d00]/5' : 'bg-[#ff4d00]/3'
      }`}></div>
      <div className={`absolute bottom-1/4 left-0 w-80 h-80 rounded-full blur-[120px] pointer-events-none ${
        isDark ? 'bg-[#ff4d00]/5' : 'bg-[#ff4d00]/3'
      }`}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="reviews-header">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border text-[11px] font-mono font-bold tracking-widest uppercase mb-4 transition-colors ${
              isDark ? 'bg-[#ff4d00]/10 border-[#ff4d00]/20 text-[#ff4d00]' : 'bg-[#ff4d00]/5 border-[#ff4d00]/15 text-[#ff4d00]'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-[#ff4d00]" />
            <span>Guest Feedback</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight font-sans transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-zinc-950'
            }`}
          >
            WHAT OUR <span className="text-[#ff4d00] font-serif italic">GUESTS</span> SAY
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`text-sm mt-4 font-sans max-w-xl mx-auto leading-relaxed transition-colors duration-300 ${
              isDark ? 'text-zinc-400' : 'text-zinc-650'
            }`}
          >
            Real reviews from our awesome basement community.
          </motion.p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" id="reviews-grid">
          {REVIEWS.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 flex flex-col justify-between group shadow-sm ${
                isDark
                  ? 'bg-zinc-900/30 border-white/5 hover:border-[#ff4d00]/30 hover:bg-zinc-900/50 shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
                  : 'bg-white border-zinc-200 hover:border-[#ff4d00]/30 hover:bg-zinc-50/50 shadow-md hover:shadow-lg'
              }`}
              id={`review-card-${review.id}`}
            >
              {/* Card top elements */}
              <div className="space-y-4">
                {/* Quotation icon and Rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'text-[#ff4d00] fill-[#ff4d00]'
                            : isDark
                              ? 'text-zinc-700 fill-zinc-800'
                              : 'text-zinc-300 fill-zinc-200'
                        }`}
                      />
                    ))}
                  </div>
                  <Quote className={`w-8 h-8 transition-colors ${
                    isDark ? 'text-white/5 group-hover:text-[#ff4d00]/10' : 'text-zinc-200 group-hover:text-[#ff4d00]/10'
                  }`} />
                </div>

                {/* Review Text */}
                <p className={`text-sm font-sans leading-relaxed italic transition-colors duration-300 ${
                  isDark ? 'text-zinc-300' : 'text-zinc-650'
                }`}>
                  "{review.text}"
                </p>
              </div>

              {/* Reviewer / Footer Column */}
              <div className={`mt-8 pt-4 border-t flex items-center justify-between transition-colors duration-300 ${
                isDark ? 'border-white/5' : 'border-zinc-100'
              }`}>
                <div className="flex items-center space-x-3">
                  
                  {/* Avatar Container */}
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gradient-to-tr from-[#ff4d00]/40 to-indigo-600/40 p-0.5 shadow-md">
                    <div className={`w-full h-full rounded-full relative overflow-hidden flex items-center justify-center text-xs font-black uppercase font-mono transition-colors ${
                      isDark ? 'bg-zinc-800 text-white/80' : 'bg-zinc-100 text-zinc-700'
                    }`}>
                      {review.name.charAt(0)}
                    </div>
                  </div>

                  {/* Name Column */}
                  <div>
                    <h4 className={`text-xs font-black tracking-wider uppercase font-mono select-none ${
                      isDark ? 'text-white' : 'text-zinc-900'
                    }`}>
                      {review.name}
                    </h4>
                    <p className={`text-[10px] tracking-wide font-sans mt-0.5 ${
                      isDark ? 'text-zinc-500' : 'text-zinc-650'
                    }`}>
                      {review.role}
                    </p>
                  </div>

                </div>

                {/* Relative timestamp */}
                <span className="text-[9px] font-mono text-zinc-500 select-none uppercase">
                  {review.time}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
