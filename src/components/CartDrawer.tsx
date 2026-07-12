import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, ShoppingBag, Loader2, CheckCircle, AlertTriangle, User, MapPin, Phone, ShieldCheck, HelpCircle } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { useTheme } from '../ThemeContext';
import { supabase } from '../supabaseClient';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { isDark } = useTheme();
  const { user, login, logout, cart, updateCartQty, removeFromCart, clearCart } = useAuth();

  // Authentication State (if user is not logged in yet)
  const [authName, setAuthName] = useState('');
  const [authPhone, setAuthPhone] = useState('');
  const [authAddress, setAuthAddress] = useState('');
  const [authError, setAuthError] = useState('');
  const [isSubmittingAuth, setIsSubmittingAuth] = useState(false);

  // Availability / Approval State
  // Statuses: 'idle' | 'checking' | 'approved' | 'rejected'
  const [availabilityStatus, setAvailabilityStatus] = useState<'idle' | 'checking' | 'approved' | 'rejected'>('idle');
  const [requestId, setRequestId] = useState<number | string | null>(null);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [orderPlacedSuccess, setOrderPlacedSuccess] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState<string | number | null>(null);

  // Calculate cart total
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Reset order placement states on open/close
  useEffect(() => {
    if (isOpen) {
      setOrderPlacedSuccess(false);
      setPlacedOrderId(null);
      
      // If we were checking, let's keep it or reset based on existing state
      if (availabilityStatus === 'approved' || availabilityStatus === 'rejected') {
        setAvailabilityStatus('idle');
      }
    }
  }, [isOpen]);

  // Auth Submit handler
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authName.trim() || !authPhone.trim() || !authAddress.trim()) {
      setAuthError('Please fill in all details.');
      return;
    }
    setAuthError('');
    setIsSubmittingAuth(true);
    try {
      await login({
        name: authName.trim(),
        phone: authPhone.replace(/\s+/g, ''),
        address: authAddress.trim()
      });
    } catch (err: any) {
      setAuthError(err.message || 'Error saving user profile.');
    } finally {
      setIsSubmittingAuth(false);
    }
  };

  // Poll for availability status changes
  useEffect(() => {
    let intervalId: any = null;
    
    if (availabilityStatus === 'checking' && requestId) {
      intervalId = setInterval(async () => {
        try {
          const { data, error } = await supabase
            .from('availability_requests')
            .select('status')
            .eq('id', requestId)
            .single();

          if (error) throw error;
          
          if (data) {
            if (data.status === 'approved') {
              setAvailabilityStatus('approved');
              clearInterval(intervalId);
            } else if (data.status === 'rejected') {
              setAvailabilityStatus('rejected');
              clearInterval(intervalId);
            }
          }
        } catch (err) {
          console.error('Error polling availability status:', err);
        }
      }, 2000); // Poll every 2 seconds
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [availabilityStatus, requestId]);

  // Trigger Availability Request
  const handleCheckAvailability = async () => {
    if (!user) return;
    if (cart.length === 0) return;

    setAvailabilityStatus('checking');
    
    // Create detailed cart summary text
    const summary = cart.map(item => `${item.item_name} (x${item.quantity}) - ₹${item.price * item.quantity}`).join(', ');

    try {
      const { data, error } = await supabase
        .from('availability_requests')
        .insert([
          {
            customer_name: user.name,
            customer_phone: user.phone,
            customer_address: user.address,
            cart_summary: summary,
            status: 'pending'
          }
        ])
        .select();

      if (error) throw error;

      if (data && data.length > 0) {
        setRequestId(data[0].id);
      }
    } catch (err: any) {
      console.error('Error requesting availability:', err);
      alert('Could not submit availability check. Please verify your Supabase tables.');
      setAvailabilityStatus('idle');
    }
  };

  // Confirm and Place Order
  const handleConfirmOrder = async () => {
    if (!user || cart.length === 0) return;

    setIsSubmittingOrder(true);
    const summary = cart.map(item => `${item.item_name} (x${item.quantity})`).join('\n');

    try {
      const { data, error } = await supabase
        .from('orders_v2')
        .insert([
          {
            customer_name: user.name,
            customer_phone: user.phone,
            customer_address: user.address,
            items: summary,
            total_price: subtotal,
            status: 'placed'
          }
        ])
        .select();

      if (error) throw error;

      if (data && data.length > 0) {
        setPlacedOrderId(data[0].id);
      }

      // Success sequence
      setOrderPlacedSuccess(true);
      setAvailabilityStatus('idle');
      setRequestId(null);
      await clearCart();
    } catch (err: any) {
      console.error('Error placing order:', err);
      alert('Failed to save order to orders_v2 table.');
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" id="cart-drawer-backdrop">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className={`w-screen max-w-md border-l shadow-2xl flex flex-col transition-colors duration-300 ${
                isDark 
                  ? 'bg-[#080808] border-white/5 text-white' 
                  : 'bg-white border-zinc-200 text-zinc-900'
              }`}
              id="cart-drawer-container"
            >
              {/* Header */}
              <div className={`p-6 border-b flex items-center justify-between transition-colors duration-300 ${
                isDark ? 'bg-zinc-950 border-white/5' : 'bg-zinc-50 border-zinc-200'
              }`}>
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-[#ff4d00]/10 border border-[#ff4d00]/20 text-[#ff4d00]">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className={`text-lg font-black tracking-wider uppercase font-sans ${
                      isDark ? 'text-white' : 'text-zinc-900'
                    }`}>
                      Your Cart
                    </h3>
                    <p className={`text-[10px] font-mono tracking-widest uppercase ${
                      isDark ? 'text-zinc-500' : 'text-zinc-400'
                    }`}>
                      Flavor Basket
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className={`p-2 rounded-lg cursor-pointer transition-all ${
                    isDark 
                      ? 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10' 
                      : 'bg-zinc-100 text-zinc-650 hover:text-zinc-950 hover:bg-zinc-200'
                  }`}
                  aria-label="Close cart"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Main Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {orderPlacedSuccess ? (
                  /* Successful Order View */
                  <div className="text-center py-10 space-y-6" id="order-v2-success">
                    <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                      <h3 className={`text-2xl font-black uppercase font-sans tracking-wide ${isDark ? 'text-white' : 'text-zinc-950'}`}>
                        Order Placed!
                      </h3>
                      <p className={`text-xs max-w-xs mx-auto leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        Your order has been approved by Admin and logged in the local restaurant ledger.
                      </p>
                    </div>

                    <div className={`p-4 rounded-2xl border text-left space-y-2 text-xs font-mono transition-colors ${
                      isDark ? 'bg-zinc-950 border-white/5' : 'bg-zinc-50 border-zinc-200'
                    }`}>
                      <div className="flex justify-between border-b pb-2 mb-2 border-dashed border-zinc-700">
                        <span className="text-zinc-500">LEDGER ID</span>
                        <span className="text-[#ff4d00] font-bold">#ORD-{placedOrderId || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Customer:</span>
                        <span className={isDark ? 'text-zinc-300' : 'text-zinc-800'}>{user?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Phone:</span>
                        <span className={isDark ? 'text-zinc-300' : 'text-zinc-800'}>{user?.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Table/Address:</span>
                        <span className={`text-right max-w-[200px] truncate ${isDark ? 'text-zinc-300' : 'text-zinc-800'}`}>{user?.address}</span>
                      </div>
                    </div>

                    <button
                      onClick={onClose}
                      className="w-full py-3 rounded-xl bg-[#ff4d00] hover:bg-[#ff6a00] text-xs font-black uppercase tracking-widest text-black shadow-lg"
                    >
                      Back to Restaurant
                    </button>
                  </div>
                ) : !user ? (
                  /* Non-Logged In User profile Flow */
                  <div className="space-y-5" id="cart-auth-form">
                    <div className="space-y-2 text-center pb-2">
                      <div className={`inline-flex p-3 rounded-full ${isDark ? 'bg-zinc-900 border border-white/5 text-zinc-400' : 'bg-zinc-100 text-zinc-650'}`}>
                        <User className="w-6 h-6" />
                      </div>
                      <h4 className={`text-base font-bold font-sans ${isDark ? 'text-white' : 'text-zinc-950'}`}>Simplified TBC Login</h4>
                      <p className={`text-xs max-w-xs mx-auto leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        No passwords required. Just provide your basic details so we can track your cart and verify meal availability.
                      </p>
                    </div>

                    <form onSubmit={handleAuthSubmit} className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1">Your Full Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Rahul Varshney"
                          value={authName}
                          onChange={(e) => setAuthName(e.target.value)}
                          className={`w-full border focus:border-[#ff4d00]/50 font-sans text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#ff4d00]/20 transition-all ${
                            isDark
                              ? 'bg-zinc-950 border-white/5 text-white placeholder:text-zinc-800'
                              : 'bg-zinc-50 border-zinc-250 text-zinc-900 placeholder:text-zinc-400'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1">Phone Number</label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 9876543210"
                          value={authPhone}
                          onChange={(e) => setAuthPhone(e.target.value)}
                          className={`w-full border focus:border-[#ff4d00]/50 font-sans text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#ff4d00]/20 transition-all ${
                            isDark
                              ? 'bg-zinc-950 border-white/5 text-white placeholder:text-zinc-800'
                              : 'bg-zinc-50 border-zinc-250 text-zinc-900 placeholder:text-zinc-400'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1">Hostel Room No. / Table Details</label>
                        <textarea
                          required
                          rows={2}
                          placeholder="e.g. Table No. 5, Basement Cafe / Hostel 2 Room 104, GLA University"
                          value={authAddress}
                          onChange={(e) => setAuthAddress(e.target.value)}
                          className={`w-full border focus:border-[#ff4d00]/50 font-sans text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#ff4d00]/20 transition-all ${
                            isDark
                              ? 'bg-zinc-950 border-white/5 text-white placeholder:text-zinc-800'
                              : 'bg-zinc-50 border-zinc-250 text-zinc-900 placeholder:text-zinc-400'
                          }`}
                        />
                      </div>

                      {authError && (
                        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-semibold">
                          {authError}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmittingAuth}
                        className="w-full py-3.5 rounded-xl bg-[#ff4d00] hover:bg-[#ff6a00] text-sm font-black uppercase tracking-widest text-black shadow-lg disabled:opacity-55 cursor-pointer flex items-center justify-center gap-2 transition-all duration-300"
                      >
                        {isSubmittingAuth ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-black" />
                            <span>Saving Profile...</span>
                          </>
                        ) : (
                          <span>Connect My Cart</span>
                        )}
                      </button>
                    </form>
                  </div>
                ) : cart.length === 0 ? (
                  /* Empty state */
                  <div className="text-center py-16 space-y-4" id="empty-cart-state">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full border ${
                      isDark ? 'bg-zinc-900 border-white/5 text-zinc-600' : 'bg-zinc-50 border-zinc-200 text-zinc-400'
                    }`}>
                      <ShoppingBag className="w-6 h-6" />
                    </div>
                    <div>
                      <p className={`text-sm font-bold font-sans ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>Your Basket is Empty</p>
                      <p className="text-xs text-zinc-500 font-sans mt-1 max-w-[240px] mx-auto leading-relaxed">
                        Add delicious momos, butter chicken, or cold beverages from the main menu!
                      </p>
                    </div>
                  </div>
                ) : (
                  /* Active Cart Items list */
                  <div className="space-y-4" id="active-cart-list">
                    {/* Logged in info banner */}
                    <div className={`p-4 rounded-2xl border flex items-start justify-between transition-colors ${
                      isDark ? 'bg-zinc-900/40 border-white/5' : 'bg-zinc-50 border-zinc-200'
                    }`}>
                      <div className="space-y-1 text-left">
                        <div className="flex items-center gap-1 text-xs font-bold font-sans">
                          <User className="w-3.5 h-3.5 text-[#ff4d00]" />
                          <span className={isDark ? 'text-white' : 'text-zinc-900'}>{user.name}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-zinc-500 font-mono">
                          <Phone className="w-3 h-3 text-zinc-400" />
                          <span>{user.phone}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-zinc-500 font-sans max-w-[250px] truncate">
                          <MapPin className="w-3 h-3 text-zinc-400 shrink-0" />
                          <span className="truncate">{user.address}</span>
                        </div>
                      </div>
                      <button
                        onClick={logout}
                        className="text-[9px] uppercase font-mono px-2 py-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 hover:text-rose-400 transition-all cursor-pointer"
                      >
                        Sign Out
                      </button>
                    </div>

                    <div className="space-y-3">
                      {cart.map((item) => (
                        <div
                          key={item.item_id}
                          className={`p-3 rounded-2xl border flex gap-3 items-center justify-between transition-all ${
                            isDark 
                              ? 'bg-zinc-900/20 border-white/5 hover:border-white/10' 
                              : 'bg-zinc-50/50 border-zinc-200 hover:border-zinc-250'
                          }`}
                        >
                          <img
                            src={item.image}
                            alt={item.item_name}
                            className="w-12 h-12 rounded-xl object-cover shrink-0"
                          />
                          <div className="flex-1 text-left min-w-0">
                            <h4 className={`text-xs font-bold font-sans truncate ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                              {item.item_name}
                            </h4>
                            <span className="text-[10px] text-[#ff4d00] font-mono block mt-0.5">
                              ₹{item.price} each
                            </span>
                          </div>

                          {/* Control row */}
                          <div className="flex items-center space-x-3 shrink-0">
                            <div className="flex items-center border rounded-lg overflow-hidden border-zinc-700">
                              <button
                                onClick={() => updateCartQty(item.item_id, item.quantity - 1)}
                                className={`px-1.5 py-1 hover:bg-zinc-800 transition-all cursor-pointer text-xs ${
                                  isDark ? 'text-zinc-400' : 'text-zinc-650'
                                }`}
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className={`px-2.5 font-bold font-sans text-xs ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateCartQty(item.item_id, item.quantity + 1)}
                                className={`px-1.5 py-1 hover:bg-zinc-800 transition-all cursor-pointer text-xs ${
                                  isDark ? 'text-zinc-400' : 'text-zinc-650'
                                }`}
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.item_id)}
                              className="text-zinc-500 hover:text-rose-500 p-1.5 transition-all cursor-pointer"
                              title="Delete Item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Cart Footer */}
              {user && cart.length > 0 && !orderPlacedSuccess && (
                <div className={`p-6 border-t space-y-4 transition-colors ${
                  isDark ? 'bg-zinc-950 border-white/5' : 'bg-zinc-50 border-zinc-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-mono uppercase tracking-widest ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                      Basket Subtotal
                    </span>
                    <span className="text-xl font-black font-mono text-[#ff4d00]">
                      ₹{subtotal}
                    </span>
                  </div>

                  {/* Availability / Order Flow Control */}
                  {availabilityStatus === 'idle' && (
                    <button
                      onClick={handleCheckAvailability}
                      className="w-full py-4 rounded-2xl bg-[#ff4d00] hover:bg-[#ff6a00] text-sm font-black uppercase tracking-widest text-black shadow-lg shadow-[#ff4d00]/20 cursor-pointer active:scale-98 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <span>Check Availability</span>
                    </button>
                  )}

                  {availabilityStatus === 'checking' && (
                    <div className="space-y-2">
                      <div className={`p-4 rounded-2xl border flex flex-col items-center justify-center space-y-3 text-center transition-colors ${
                        isDark ? 'bg-zinc-900 border-white/5' : 'bg-white border-zinc-200'
                      }`}>
                        <Loader2 className="w-6 h-6 text-[#ff4d00] animate-spin" />
                        <div>
                          <p className={`text-xs font-bold font-sans ${isDark ? 'text-white' : 'text-zinc-900'}`}>Waiting for Admin Approval...</p>
                          <p className="text-[10px] text-zinc-500 font-mono mt-1">
                            Your request is live on the Admin panel. Do not close this drawer.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {availabilityStatus === 'approved' && (
                    <div className="space-y-3">
                      <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center space-x-2.5 text-emerald-400">
                        <CheckCircle className="w-5 h-5" />
                        <span className="text-xs font-bold font-sans">All Items Approved as Available!</span>
                      </div>
                      
                      <button
                        onClick={handleConfirmOrder}
                        disabled={isSubmittingOrder}
                        className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-sm font-black uppercase tracking-widest text-black shadow-lg cursor-pointer active:scale-98 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        {isSubmittingOrder ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-black" />
                            <span>LOGGING ORDER...</span>
                          </>
                        ) : (
                          <span>Place My Order Now</span>
                        )}
                      </button>
                    </div>
                  )}

                  {availabilityStatus === 'rejected' && (
                    <div className="space-y-3">
                      <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center space-x-2.5 text-rose-500 text-center">
                        <AlertTriangle className="w-5 h-5 shrink-0" />
                        <div className="text-left">
                          <span className="text-xs font-bold font-sans block">Some items in your cart are Unavailable!</span>
                          <span className="text-[9px] text-zinc-500 font-sans block mt-0.5">Please modify your items and check again.</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => setAvailabilityStatus('idle')}
                        className="w-full py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-bold uppercase tracking-widest text-white transition-all cursor-pointer"
                      >
                        Reset Cart & Try Again
                      </button>
                    </div>
                  )}

                  {/* Micro Certification Badges */}
                  <div className="flex items-center justify-center space-x-4 pt-1 text-[10px] text-zinc-550 font-mono">
                    <div className="flex items-center space-x-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Clean Kitchen</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <HelpCircle className="w-3.5 h-3.5 text-zinc-500" />
                      <span>24/7 Support</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
