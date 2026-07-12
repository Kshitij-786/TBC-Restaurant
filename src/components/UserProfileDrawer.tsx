import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Phone, MapPin, Loader2, ShoppingBag, Edit2, CheckCircle, Clock, ArrowRight, Save, LogOut, Mail, Lock } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { useTheme } from '../ThemeContext';
import { supabase } from '../supabaseClient';

interface UserProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenMenu?: () => void;
}

interface CustomerOrder {
  id: number;
  created_at: string;
  items: string;
  total_price: number;
  status: string;
}

export default function UserProfileDrawer({ isOpen, onClose, onOpenMenu }: UserProfileDrawerProps) {
  const { isDark } = useTheme();
  const { user, signUpWithEmail, signInWithEmail, updateProfile, logout, isAuthLoading } = useAuth();

  // Authentication Tab
  const [authTab, setAuthTab] = useState<'signin' | 'signup'>('signin');

  // Authentication Fields
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authPhone, setAuthPhone] = useState('');
  const [authAddress, setAuthAddress] = useState('');
  const [authError, setAuthError] = useState('');
  const [isSubmittingAuth, setIsSubmittingAuth] = useState(false);

  // Profile Edit Mode (for Logged-in)
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [editError, setEditError] = useState('');
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // User Orders History State
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [isOrdersLoading, setIsOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState('');

  // Synchronize edit fields when user info changes
  useEffect(() => {
    if (user) {
      setEditName(user.name);
      setEditPhone(user.phone);
      setEditAddress(user.address);
    }
  }, [user]);

  // Fetch orders when drawer opens and user phone exists
  const fetchUserOrders = async () => {
    if (!user?.phone) return;
    setIsOrdersLoading(true);
    setOrdersError('');
    try {
      const { data, error } = await supabase
        .from('orders_v2')
        .select('*')
        .eq('customer_phone', user.phone)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setOrders(data || []);
    } catch (err: any) {
      console.error('Error fetching customer orders:', err);
      setOrdersError(err.message || 'Failed to retrieve order history.');
    } finally {
      setIsOrdersLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && user?.phone) {
      fetchUserOrders();
    }
  }, [isOpen, user?.phone]);

  // Authentication Sign In/Up Handler
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsSubmittingAuth(true);

    try {
      if (authTab === 'signin') {
        if (!authEmail.trim() || !authPassword) {
          setAuthError('Please fill in both Email and Password.');
          setIsSubmittingAuth(false);
          return;
        }
        await signInWithEmail(authEmail.trim(), authPassword);
      } else {
        if (!authName.trim() || !authPhone.trim() || !authAddress.trim() || !authEmail.trim() || !authPassword) {
          setAuthError('Please fill in all details for registration.');
          setIsSubmittingAuth(false);
          return;
        }
        if (authPassword.length < 6) {
          setAuthError('Password must be at least 6 characters long.');
          setIsSubmittingAuth(false);
          return;
        }
        const cleanPhone = authPhone.replace(/\s+/g, '');
        await signUpWithEmail(
          authEmail.trim(),
          authPassword,
          authName.trim(),
          cleanPhone,
          authAddress.trim()
        );
      }
      
      // Clear fields on success
      setAuthPassword('');
      setIsSubmittingAuth(false);
    } catch (err: any) {
      setAuthError(err.message || 'Authentication operation failed.');
      setIsSubmittingAuth(false);
    }
  };

  // Profile Save Changes Handler
  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim() || !editPhone.trim() || !editAddress.trim()) {
      setEditError('Please fill in all the details.');
      return;
    }
    setEditError('');
    setIsSavingProfile(true);
    try {
      const cleanPhone = editPhone.replace(/\s+/g, '');
      await updateProfile({
        name: editName.trim(),
        phone: cleanPhone,
        address: editAddress.trim(),
      });
      setIsEditingProfile(false);
      setIsSavingProfile(false);
    } catch (err: any) {
      setEditError(err.message || 'Failed to update customer profile.');
      setIsSavingProfile(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'placed':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'preparing':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'out_for_delivery':
      case 'delivering':
        return 'text-teal-400 bg-teal-500/10 border-teal-500/20';
      case 'delivered':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      default:
        return 'text-zinc-400 bg-zinc-500/10 border-zinc-500/20';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status.toLowerCase()) {
      case 'placed':
        return 'Order Placed';
      case 'preparing':
        return 'In the Kitchen';
      case 'out_for_delivery':
      case 'delivering':
        return 'Out for Delivery';
      case 'delivered':
        return 'Delivered';
      default:
        return status;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" id="user-profile-drawer-root">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-all"
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className={`w-screen max-w-md h-full flex flex-col shadow-2xl relative ${
                isDark 
                  ? 'bg-zinc-950 border-l border-white/5 text-white' 
                  : 'bg-white border-l border-zinc-200 text-zinc-900'
              }`}
              id="user-profile-container"
            >
              {/* Drawer Header */}
              <div className={`p-6 border-b flex items-center justify-between ${
                isDark ? 'border-white/5' : 'border-zinc-200'
              }`}>
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-[#ff4d00]/10 border border-[#ff4d00]/20 flex items-center justify-center text-[#ff4d00]">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black tracking-wider uppercase font-sans">
                      Your Profile
                    </h3>
                    <p className={`text-[10px] font-mono tracking-widest uppercase ${
                      isDark ? 'text-zinc-500' : 'text-zinc-400'
                    }`}>
                      Flavor Underground Account
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                    isDark
                      ? 'bg-zinc-900/40 border-white/5 text-zinc-400 hover:text-white hover:bg-zinc-900'
                      : 'bg-zinc-50 border-zinc-250 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'
                  }`}
                  aria-label="Close drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body Scrollable */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {!user ? (
                  /* GUEST SCREEN: Email Authentication Forms */
                  <div className="space-y-6">
                    <div className="text-center space-y-2">
                      <div className="w-16 h-16 rounded-2xl bg-[#ff4d00]/10 border border-[#ff4d00]/20 flex items-center justify-center text-[#ff4d00] mx-auto shadow-[0_0_20px_rgba(255,77,0,0.15)]">
                        <User className="w-8 h-8" />
                      </div>
                      <h4 className="text-lg font-bold font-sans">Join the Flavor Basement</h4>
                      <p className={`text-xs max-w-xs mx-auto leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
                        Authenticating with email secures your cart, allows editing your profile, and unlocks private live order history logs.
                      </p>
                    </div>

                    {/* Auth Navigation Tabs */}
                    <div className={`p-1 rounded-xl flex gap-1 ${isDark ? 'bg-zinc-900/50' : 'bg-zinc-100'}`}>
                      <button
                        type="button"
                        onClick={() => {
                          setAuthTab('signin');
                          setAuthError('');
                        }}
                        className={`flex-1 py-2 text-center text-xs font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                          authTab === 'signin'
                            ? isDark
                              ? 'bg-zinc-800 text-[#ff4d00] shadow'
                              : 'bg-white text-[#ff4d00] shadow-sm'
                            : 'text-zinc-500 hover:text-zinc-400'
                        }`}
                      >
                        Log In
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setAuthTab('signup');
                          setAuthError('');
                        }}
                        className={`flex-1 py-2 text-center text-xs font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                          authTab === 'signup'
                            ? isDark
                              ? 'bg-zinc-800 text-[#ff4d00] shadow'
                              : 'bg-white text-[#ff4d00] shadow-sm'
                            : 'text-zinc-500 hover:text-zinc-400'
                        }`}
                      >
                        Sign Up
                      </button>
                    </div>

                    <form onSubmit={handleAuthSubmit} className="space-y-4">
                      {authError && (
                        <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/20 text-rose-500 text-xs">
                          {authError}
                        </div>
                      )}

                      {/* SIGN UP ONLY FIELDS */}
                      {authTab === 'signup' && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-4"
                        >
                          <div className="space-y-1.5">
                            <label className={`block text-[10px] uppercase font-mono tracking-widest font-bold ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                              Your Full Name
                            </label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                              <input
                                type="text"
                                required
                                placeholder="e.g. Rahul Sharma"
                                value={authName}
                                onChange={(e) => setAuthName(e.target.value)}
                                className={`w-full border focus:border-[#ff4d00]/50 font-sans text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#ff4d00]/20 transition-all ${
                                  isDark
                                    ? 'bg-zinc-900/40 border-white/5 text-white placeholder:text-zinc-800'
                                    : 'bg-zinc-50 border-zinc-250 text-zinc-900 placeholder:text-zinc-400'
                                }`}
                              />
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <label className={`block text-[10px] uppercase font-mono tracking-widest font-bold ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                              Contact Phone Number
                            </label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                              <input
                                type="tel"
                                required
                                placeholder="e.g. +91 98765 43210"
                                value={authPhone}
                                onChange={(e) => setAuthPhone(e.target.value)}
                                className={`w-full border focus:border-[#ff4d00]/50 font-sans text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#ff4d00]/20 transition-all ${
                                  isDark
                                    ? 'bg-zinc-900/40 border-white/5 text-white placeholder:text-zinc-800'
                                    : 'bg-zinc-50 border-zinc-250 text-zinc-900 placeholder:text-zinc-400'
                                }`}
                              />
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <label className={`block text-[10px] uppercase font-mono tracking-widest font-bold ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                              Delivery Address / Hostel Table
                            </label>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-4 w-4 h-4 text-zinc-500" />
                              <textarea
                                required
                                rows={3}
                                placeholder="e.g. Hostel 4 Room 201, TBC Main Campus, Mathura"
                                value={authAddress}
                                onChange={(e) => setAuthAddress(e.target.value)}
                                className={`w-full border focus:border-[#ff4d00]/50 font-sans text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#ff4d00]/20 transition-all ${
                                  isDark
                                    ? 'bg-zinc-900/40 border-white/5 text-white placeholder:text-zinc-800'
                                    : 'bg-zinc-50 border-zinc-250 text-zinc-900 placeholder:text-zinc-400'
                                }`}
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* COMMON AUTH FIELDS (Email & Password) */}
                      <div className="space-y-1.5">
                        <label className={`block text-[10px] uppercase font-mono tracking-widest font-bold ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                          <input
                            type="email"
                            required
                            placeholder="e.g. name@domain.com"
                            value={authEmail}
                            onChange={(e) => setAuthEmail(e.target.value)}
                            className={`w-full border focus:border-[#ff4d00]/50 font-sans text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#ff4d00]/20 transition-all ${
                              isDark
                                ? 'bg-zinc-900/40 border-white/5 text-white placeholder:text-zinc-800'
                                : 'bg-zinc-50 border-zinc-250 text-zinc-900 placeholder:text-zinc-400'
                            }`}
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className={`block text-[10px] uppercase font-mono tracking-widest font-bold ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                          Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                          <input
                            type="password"
                            required
                            placeholder="••••••••"
                            value={authPassword}
                            onChange={(e) => setAuthPassword(e.target.value)}
                            className={`w-full border focus:border-[#ff4d00]/50 font-sans text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#ff4d00]/20 transition-all ${
                              isDark
                                ? 'bg-zinc-900/40 border-white/5 text-white placeholder:text-zinc-800'
                                : 'bg-zinc-50 border-zinc-250 text-zinc-900 placeholder:text-zinc-400'
                            }`}
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmittingAuth || isAuthLoading}
                        className="w-full py-4 rounded-xl bg-[#ff4d00] hover:bg-[#ff6a00] text-sm font-black uppercase tracking-widest text-black shadow-lg shadow-[#ff4d00]/25 transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                      >
                        {isSubmittingAuth || isAuthLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-black" />
                            <span>Processing...</span>
                          </>
                        ) : (
                          <>
                            <span>{authTab === 'signin' ? 'Sign In to Account' : 'Register Profile'}</span>
                            <ArrowRight className="w-4 h-4 text-black" />
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                ) : (
                  /* LOGGED-IN HUB SCREEN */
                  <div className="space-y-6">
                    {/* Customer Profile Info Card */}
                    <div className={`p-5 rounded-2xl border transition-all ${
                      isDark 
                        ? 'bg-zinc-900/35 border-white/5 shadow-inner' 
                        : 'bg-zinc-50 border-zinc-200/80 shadow-sm'
                    }`}>
                      {isEditingProfile ? (
                        /* PROFILE EDIT FORM */
                        <form onSubmit={handleSaveChanges} className="space-y-4">
                          <div className="flex items-center justify-between border-b pb-3 mb-2 border-zinc-800">
                            <span className="text-xs font-black font-sans uppercase text-[#ff4d00]">Edit Profile Info</span>
                            <button
                              type="button"
                              onClick={() => setIsEditingProfile(false)}
                              className="text-[10px] font-mono uppercase text-zinc-500 hover:text-zinc-300"
                            >
                              Cancel
                            </button>
                          </div>

                          {editError && (
                            <div className="p-2 text-xs rounded bg-rose-500/10 text-rose-500">
                              {editError}
                            </div>
                          )}

                          <div className="space-y-1">
                            <label className="block text-[9px] uppercase font-mono text-zinc-500">Name</label>
                            <input
                              type="text"
                              required
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              className={`w-full border focus:border-[#ff4d00]/50 font-sans text-xs rounded-lg px-3 py-2 focus:outline-none ${
                                isDark ? 'bg-zinc-950 border-white/5 text-white' : 'bg-white border-zinc-250 text-zinc-900'
                              }`}
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[9px] uppercase font-mono text-zinc-500">Phone</label>
                            <input
                              type="tel"
                              required
                              value={editPhone}
                              onChange={(e) => setEditPhone(e.target.value)}
                              className={`w-full border focus:border-[#ff4d00]/50 font-sans text-xs rounded-lg px-3 py-2 focus:outline-none ${
                                isDark ? 'bg-zinc-950 border-white/5 text-white' : 'bg-white border-zinc-250 text-zinc-900'
                              }`}
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[9px] uppercase font-mono text-zinc-500">Address / Location</label>
                            <textarea
                              required
                              rows={2}
                              value={editAddress}
                              onChange={(e) => setEditAddress(e.target.value)}
                              className={`w-full border focus:border-[#ff4d00]/50 font-sans text-xs rounded-lg px-3 py-2 focus:outline-none ${
                                isDark ? 'bg-zinc-950 border-white/5 text-white' : 'bg-white border-zinc-250 text-zinc-900'
                              }`}
                            />
                          </div>

                          <button
                            type="submit"
                            disabled={isSavingProfile || isAuthLoading}
                            className="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-xs font-black uppercase text-black flex items-center justify-center space-x-1.5 shadow-sm transition-all cursor-pointer"
                          >
                            {isSavingProfile || isAuthLoading ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Save className="w-3.5 h-3.5" />
                            )}
                            <span>Save Profile</span>
                          </button>
                        </form>
                      ) : (
                        /* DISPLAY PROFILE DETAILS */
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#ff4d00] to-orange-500 flex items-center justify-center text-black shadow-md">
                                <span className="font-sans font-black text-lg">
                                  {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div className="text-left">
                                <h4 className={`text-base font-black font-sans ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                                  {user.name || 'Basement Resident'}
                                </h4>
                                <div className="space-y-0.5 mt-0.5">
                                  <div className="flex items-center gap-1 text-xs text-zinc-500 font-mono">
                                    <Mail className="w-3 h-3 text-zinc-400" />
                                    <span>{user.email}</span>
                                  </div>
                                  {user.phone && (
                                    <div className="flex items-center gap-1 text-xs text-zinc-500 font-mono">
                                      <Phone className="w-3 h-3 text-zinc-400" />
                                      <span>{user.phone}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            <button
                              onClick={() => setIsEditingProfile(true)}
                              className={`p-2 rounded-lg border hover:text-[#ff4d00] transition-colors cursor-pointer ${
                                isDark ? 'bg-zinc-950 border-white/5 text-zinc-500' : 'bg-white border-zinc-200 text-zinc-500'
                              }`}
                              title="Edit Details"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {user.address && (
                            <div className={`border-t pt-3 flex gap-2 text-xs font-sans ${isDark ? 'border-white/5' : 'border-zinc-200'}`}>
                              <MapPin className="w-4 h-4 text-[#ff4d00] shrink-0 mt-0.5 animate-pulse" />
                              <div className="text-left">
                                <span className="text-[10px] font-mono uppercase text-zinc-500">Delivery Location:</span>
                                <p className={`mt-0.5 leading-relaxed ${isDark ? 'text-zinc-300' : 'text-zinc-750'}`}>
                                  {user.address}
                                </p>
                              </div>
                            </div>
                          )}

                          <div className={`border-t pt-3 flex justify-between items-center ${isDark ? 'border-white/5' : 'border-zinc-200'}`}>
                            <button
                              onClick={logout}
                              disabled={isAuthLoading}
                              className="text-xs font-mono uppercase tracking-wider text-rose-500 hover:text-rose-400 flex items-center gap-1.5 cursor-pointer bg-rose-500/10 hover:bg-rose-500/15 border border-rose-500/20 px-3 py-1.5 rounded-xl transition-all"
                            >
                              <LogOut className="w-3.5 h-3.5" />
                              <span>Sign Out</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* LIVE ORDER HISTORY HUB */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b pb-2 border-zinc-800">
                        <h4 className={`text-xs font-black tracking-widest uppercase font-mono flex items-center gap-2 ${
                          isDark ? 'text-white' : 'text-zinc-800'
                        }`}>
                          <ShoppingBag className="w-4 h-4 text-[#ff4d00]" />
                          <span>Order History ({orders.length})</span>
                        </h4>

                        <button
                          onClick={fetchUserOrders}
                          disabled={isOrdersLoading}
                          className="text-[10px] font-mono text-[#ff4d00] hover:text-[#ff6a00] uppercase transition-all disabled:opacity-50 cursor-pointer"
                        >
                          Refresh
                        </button>
                      </div>

                      {isOrdersLoading ? (
                        <div className="p-12 text-center flex flex-col items-center justify-center space-y-2">
                          <Loader2 className="w-6 h-6 text-[#ff4d00] animate-spin" />
                          <span className="text-xs font-mono text-zinc-500">Querying Basement Ledger...</span>
                        </div>
                      ) : ordersError ? (
                        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs">
                          {ordersError}
                        </div>
                      ) : orders.length === 0 ? (
                        /* Empty Order History state */
                        <div className="p-8 text-center space-y-4">
                          <div className="w-12 h-12 rounded-full border border-dashed border-zinc-700 text-zinc-500 flex items-center justify-center mx-auto">
                            <ShoppingBag className="w-5 h-5" />
                          </div>
                          <div className="space-y-1">
                            <h5 className="text-xs font-bold font-sans">No orders yet</h5>
                            <p className="text-[11px] text-zinc-500 font-sans max-w-xs mx-auto leading-relaxed">
                              You haven't ordered anything yet under this phone number. Head over to our basement menu to place your first flavor order!
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              onClose();
                              if (onOpenMenu) onOpenMenu();
                            }}
                            className="inline-flex items-center justify-center space-x-1.5 px-4 py-2 rounded-xl bg-[#ff4d00] hover:bg-[#ff6a00] text-xs font-black text-black transition-all shadow-md shadow-[#ff4d00]/20 cursor-pointer"
                          >
                            <span>Browse Menu</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        /* ORDERS LIST */
                        <div className="space-y-4">
                          {orders.map((order) => {
                            const statusColor = getStatusColor(order.status);
                            const statusLabel = getStatusLabel(order.status);
                            const formattedDate = new Date(order.created_at).toLocaleString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit',
                            });

                            return (
                              <div
                                key={order.id}
                                className={`border p-4 rounded-2xl space-y-3.5 text-left transition-all hover:shadow-md ${
                                  isDark 
                                    ? 'bg-zinc-900/10 border-white/5 hover:border-white/10' 
                                    : 'bg-zinc-50/50 border-zinc-200 hover:border-zinc-250'
                                }`}
                              >
                                {/* Order header bar */}
                                <div className="flex items-center justify-between">
                                  <div>
                                    <span className="text-[11px] font-mono font-bold text-[#ff4d00]">
                                      #{order.id}
                                    </span>
                                    <div className="flex items-center space-x-1.5 text-[10px] text-zinc-500 font-mono leading-none mt-1">
                                      <Clock className="w-3 h-3" />
                                      <span>{formattedDate}</span>
                                    </div>
                                  </div>

                                  <span className={`text-[10px] uppercase font-black font-mono tracking-wider px-2.5 py-1 rounded-full border ${statusColor}`}>
                                    {statusLabel}
                                  </span>
                                </div>

                                {/* Items summary */}
                                <div className={`p-2.5 rounded-xl text-xs leading-relaxed font-sans ${
                                  isDark ? 'bg-zinc-950/60 text-zinc-300' : 'bg-zinc-100/60 text-zinc-750'
                                }`}>
                                  <span className="text-[10px] uppercase font-mono text-zinc-500 block mb-1">Ordered Items:</span>
                                  <pre className="font-sans whitespace-pre-wrap font-medium">{order.items}</pre>
                                </div>

                                {/* Order price summary */}
                                <div className="flex items-center justify-between border-t border-dashed pt-2.5 border-zinc-800">
                                  <span className="text-[10px] uppercase font-mono text-zinc-500">
                                    Total Amount Paid:
                                  </span>
                                  <span className="text-sm font-black font-mono text-[#ff4d00]">
                                    ₹{order.total_price}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
