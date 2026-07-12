import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Plus, Minus, CheckCircle, Sparkles, ShoppingBag } from 'lucide-react';
import { MenuItem } from '../types';
import { useTheme } from '../ThemeContext';
import { useAuth } from '../AuthContext';

interface ItemModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onOpenCart?: () => void;
}

export default function ItemModal({ item, onClose, onOpenCart }: ItemModalProps) {
  const [quantity, setQuantity] = useState(1);
  const { isDark } = useTheme();
  const { addToCart } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Reset states when the modal opens with a new item
  useEffect(() => {
    if (item) {
      setQuantity(1);
      setIsSuccess(false);
      setIsSubmitting(false);
    }
  }, [item]);

  if (!item) return null;

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCartSubmit = async () => {
    setIsSubmitting(true);
    try {
      await addToCart(item, quantity);
      setIsSuccess(true);
    } catch (err) {
      console.error('Error adding item to cart:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" id="item-modal-overlay">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md"
      ></motion.div>

      {/* Modal Card container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className={`relative w-full max-w-lg border rounded-3xl overflow-hidden z-10 transition-colors duration-300 ${
          isDark
            ? 'bg-[#050505] border-white/10 shadow-[0_15px_50px_rgba(0,0,0,0.8)]'
            : 'bg-white border-zinc-200 shadow-[0_15px_50px_rgba(0,0,0,0.06)]'
        }`}
        id="item-modal-card"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 z-20 p-2 rounded-full border transition-colors cursor-pointer ${
            isDark
              ? 'bg-[#050505]/80 border-white/5 text-zinc-400 hover:text-white hover:border-white/10'
              : 'bg-white/90 border-zinc-200 text-zinc-650 hover:text-zinc-950 hover:border-zinc-300 shadow-sm'
          }`}
          aria-label="Close Modal"
          id="close-modal-button"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          /* Success Screen */
          <div className="p-8 text-center space-y-6 animate-fade-in" id="add-success-screen">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.2)]">
              <CheckCircle className="w-8 h-8 animate-bounce" />
            </div>

            <div className="space-y-2">
              <h3 className={`text-2xl font-black font-sans uppercase tracking-wide ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                Added to Cart!
              </h3>
              <p className={`text-xs font-sans max-w-sm mx-auto leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
                <strong>{item.name} (x{quantity})</strong> was successfully saved and synced to your live Supabase cart profile.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={onClose}
                className={`flex-1 py-3.5 rounded-xl border font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
                  isDark
                    ? 'bg-zinc-900 border-white/5 hover:bg-zinc-800 text-zinc-300'
                    : 'bg-zinc-100 border-zinc-200 hover:bg-zinc-200 text-zinc-700'
                }`}
              >
                Keep Browsing
              </button>
              <button
                onClick={() => {
                  onClose();
                  if (onOpenCart) onOpenCart();
                }}
                className="flex-1 py-3.5 rounded-xl bg-[#ff4d00] hover:bg-[#ff6a00] text-xs font-black uppercase tracking-widest text-black shadow-lg shadow-[#ff4d00]/20 transition-all duration-300 flex items-center justify-center gap-1.5"
              >
                <ShoppingBag className="w-4 h-4 text-black" />
                <span>View My Cart</span>
              </button>
            </div>
          </div>
        ) : (
          /* Core Modal Form */
          <>
            {/* Food Banner Image */}
            <div className="relative aspect-[16/10] bg-zinc-950">
              <img
                src={item.image}
                alt={item.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              {/* Gradients */}
              <div className={`absolute inset-0 bg-gradient-to-t ${
                isDark ? 'from-[#050505] via-transparent to-[#050505]/30' : 'from-zinc-950/40 via-transparent to-transparent'
              }`}></div>

              {/* Badges on image */}
              <div className="absolute bottom-4 left-4 flex gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                    item.isVeg
                      ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                      : 'bg-[#ff4d00]/10 border border-[#ff4d00]/30 text-[#ff4d00]'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-emerald-400' : 'bg-[#ff4d00]'}`}></span>
                  <span>{item.isVeg ? 'Pure Veg' : 'Non-Vegetarian'}</span>
                </span>

                {item.isPopular && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#ff4d00] text-xs font-black uppercase tracking-wider text-black shadow-lg">
                    <Sparkles className="w-3.5 h-3.5" /> Popular
                  </span>
                )}
              </div>
            </div>

            {/* Scrollable Content Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[50vh] sm:max-h-[60vh] overflow-y-auto">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-widest font-mono text-[#ff4d00] font-semibold">
                    {item.category}
                  </span>
                  <h3 className={`text-2xl font-black font-sans mt-0.5 ${isDark ? 'text-white' : 'text-zinc-950'}`}>
                    {item.name}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-zinc-500 font-mono">Single Price</span>
                  <div className="text-2xl font-black text-[#ff4d00] font-mono">
                    ₹{item.price}
                  </div>
                </div>
              </div>

              <p className={`text-sm leading-relaxed transition-colors duration-300 ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
                {item.description}
              </p>

              <div className={`border-t pt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 ${
                isDark ? 'border-white/5' : 'border-zinc-200'
              }`}>
                {/* Quantity Selector */}
                <div className="flex flex-col gap-1.5 text-left">
                  <span className="text-xs text-zinc-500 font-semibold font-mono uppercase tracking-wide">Select Quantity</span>
                  <div className={`inline-flex items-center space-x-1 p-1 border rounded-2xl w-fit transition-colors duration-300 ${
                    isDark ? 'bg-zinc-950 border-white/5' : 'bg-zinc-50 border-zinc-250'
                  }`}>
                    <button
                      onClick={handleDecrement}
                      disabled={quantity <= 1 || isSubmitting}
                      className={`p-2 rounded-xl disabled:opacity-35 disabled:hover:bg-transparent transition-all cursor-pointer ${
                        isDark ? 'text-zinc-400 hover:text-white hover:bg-zinc-900' : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200'
                      }`}
                      aria-label="Decrease quantity"
                      id="decrement-qty-button"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className={`w-10 text-center font-bold font-sans text-sm ${isDark ? 'text-white' : 'text-zinc-900'}`} id="quantity-display">
                      {quantity}
                    </span>
                    <button
                      onClick={handleIncrement}
                      disabled={isSubmitting}
                      className={`p-2 rounded-xl disabled:opacity-35 disabled:hover:bg-transparent transition-all cursor-pointer ${
                        isDark ? 'text-zinc-400 hover:text-white hover:bg-zinc-900' : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200'
                      }`}
                      aria-label="Increase quantity"
                      id="increment-qty-button"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Price Calculations */}
                <div className="text-right flex flex-col justify-end">
                  <span className="text-xs text-zinc-500 font-mono">Estimated Subtotal</span>
                  <span className={`text-2xl font-black font-mono ${isDark ? 'text-white' : 'text-zinc-950'}`}>
                    ₹{item.price * quantity}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className={`pt-2 border-t ${isDark ? 'border-white/5' : 'border-zinc-200'}`}>
                <button
                  onClick={handleAddToCartSubmit}
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center space-x-2 py-4 rounded-2xl bg-[#ff4d00] hover:bg-[#ff6a00] text-sm font-black uppercase tracking-widest text-black shadow-[0_10px_30px_rgba(255,77,0,0.2)] hover:shadow-[#ff4d00]/30 transition-all duration-300 cursor-pointer disabled:opacity-50"
                  id="add-to-cart-button"
                >
                  <ShoppingBag className="w-4 h-4 text-black" />
                  <span>{isSubmitting ? 'Syncing Cart...' : 'Add to Flavor Basket'}</span>
                </button>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
