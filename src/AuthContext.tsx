import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from './supabaseClient';
import { MenuItem } from './types';

export interface UserProfile {
  name: string;
  phone: string;
  address: string;
  email: string;
}

export interface CartItem {
  id?: string | number;
  item_id: string;
  item_name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

interface AuthContextType {
  user: UserProfile | null;
  signUpWithEmail: (email: string, password: string, name: string, phone: string, address: string) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  updateProfile: (profile: Omit<UserProfile, 'email'>) => Promise<void>;
  logout: () => Promise<void>;
  cart: CartItem[];
  addToCart: (item: MenuItem, qty?: number) => Promise<void>;
  updateCartQty: (itemId: string, qty: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  isCartLoading: boolean;
  isAuthLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartLoading, setIsCartLoading] = useState(false);

  // Initialize and listen to Auth state changes
  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const email = session.user.email || '';
          const meta = session.user.user_metadata || {};
          const profile: UserProfile = {
            email,
            name: meta.name || '',
            phone: meta.phone || '',
            address: meta.address || '',
          };
          setUser(profile);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Error initializing auth:', err);
      } finally {
        setIsAuthLoading(false);
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const email = session.user.email || '';
        const meta = session.user.user_metadata || {};
        const profile: UserProfile = {
          email,
          name: meta.name || '',
          phone: meta.phone || '',
          address: meta.address || '',
        };
        setUser(profile);
      } else {
        setUser(null);
        setCart([]);
      }
      setIsAuthLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fetch cart items from Supabase when user phone changes
  const fetchCartFromDb = async (phone: string) => {
    setIsCartLoading(true);
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select('*')
        .eq('customer_phone', phone);

      if (error) throw error;

      if (data) {
        const formatted: CartItem[] = data.map((item: any) => ({
          id: item.id,
          item_id: item.item_id,
          item_name: item.item_name,
          price: Number(item.price),
          quantity: item.quantity,
          image: item.image || '',
          category: item.category || '',
        }));
        setCart(formatted);
      }
    } catch (err) {
      console.error('Error fetching cart from DB:', err);
    } finally {
      setIsCartLoading(false);
    }
  };

  useEffect(() => {
    if (user?.phone) {
      fetchCartFromDb(user.phone);
    } else {
      setCart([]);
    }
  }, [user?.phone]);

  // Sync single cart operation helper
  const syncCartWithDb = async (updatedCart: CartItem[]) => {
    if (!user?.phone) return;

    try {
      // Direct approach: Delete old cart items for this phone, and insert new ones
      const { error: deleteError } = await supabase
        .from('cart_items')
        .delete()
        .eq('customer_phone', user.phone);

      if (deleteError) throw deleteError;

      if (updatedCart.length > 0) {
        const toInsert = updatedCart.map(item => ({
          customer_phone: user.phone,
          item_id: item.item_id,
          item_name: item.item_name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          category: item.category,
        }));

        const { error: insertError } = await supabase
          .from('cart_items')
          .insert(toInsert);

        if (insertError) throw insertError;
      }
    } catch (err) {
      console.error('Error syncing cart with Supabase:', err);
    }
  };

  const signUpWithEmail = async (email: string, password: string, name: string, phone: string, address: string) => {
    setIsAuthLoading(true);
    try {
      const cleanPhone = phone.replace(/\s+/g, '');
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            phone: cleanPhone,
            address,
          }
        }
      });

      if (error) throw error;

      // Also upsert into customers_tbc so they exist in database
      const { error: dbError } = await supabase
        .from('customers_tbc')
        .upsert([
          {
            phone: cleanPhone,
            name,
            address,
            updated_at: new Date().toISOString(),
          }
        ], { onConflict: 'phone' });

      if (dbError) {
        console.warn('Database sync warning during sign up:', dbError.message);
      }
    } catch (err) {
      throw err;
    } finally {
      setIsAuthLoading(false);
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    setIsAuthLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    } catch (err) {
      throw err;
    } finally {
      setIsAuthLoading(false);
    }
  };

  const updateProfile = async (profile: Omit<UserProfile, 'email'>) => {
    setIsAuthLoading(true);
    try {
      const cleanPhone = profile.phone.replace(/\s+/g, '');
      
      // Update Supabase auth user metadata
      const { error: authError } = await supabase.auth.updateUser({
        data: {
          name: profile.name,
          phone: cleanPhone,
          address: profile.address,
        }
      });
      if (authError) throw authError;

      // Update customers_tbc table
      const { error: dbError } = await supabase
        .from('customers_tbc')
        .upsert([
          {
            phone: cleanPhone,
            name: profile.name,
            address: profile.address,
            updated_at: new Date().toISOString(),
          }
        ], { onConflict: 'phone' });

      if (dbError) {
        console.warn('Database sync warning during profile update:', dbError.message);
      }

      if (user) {
        setUser({
          ...user,
          name: profile.name,
          phone: cleanPhone,
          address: profile.address,
        });
      }
    } catch (err) {
      throw err;
    } finally {
      setIsAuthLoading(false);
    }
  };

  const logout = async () => {
    setIsAuthLoading(true);
    try {
      await supabase.auth.signOut();
      setUser(null);
      setCart([]);
    } catch (err) {
      console.error('Error signing out:', err);
    } finally {
      setIsAuthLoading(false);
    }
  };

  const addToCart = async (item: MenuItem, qty = 1) => {
    let newCart: CartItem[] = [];
    const exists = cart.find(c => c.item_id === item.id);

    if (exists) {
      newCart = cart.map(c => 
        c.item_id === item.id 
          ? { ...c, quantity: c.quantity + qty } 
          : c
      );
    } else {
      const newItem: CartItem = {
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        quantity: qty,
        image: item.image,
        category: item.category,
      };
      newCart = [...cart, newItem];
    }

    setCart(newCart);
    await syncCartWithDb(newCart);
  };

  const updateCartQty = async (itemId: string, qty: number) => {
    if (qty <= 0) {
      await removeFromCart(itemId);
      return;
    }

    const newCart = cart.map(c => 
      c.item_id === itemId ? { ...c, quantity: qty } : c
    );
    setCart(newCart);
    await syncCartWithDb(newCart);
  };

  const removeFromCart = async (itemId: string) => {
    const newCart = cart.filter(c => c.item_id !== itemId);
    setCart(newCart);
    await syncCartWithDb(newCart);
  };

  const clearCart = async () => {
    setCart([]);
    if (user?.phone) {
      try {
        await supabase
          .from('cart_items')
          .delete()
          .eq('customer_phone', user.phone);
      } catch (err) {
        console.error('Error clearing cart from DB:', err);
      }
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      signUpWithEmail,
      signInWithEmail,
      updateProfile,
      logout,
      cart,
      addToCart,
      updateCartQty,
      removeFromCart,
      clearCart,
      isCartLoading,
      isAuthLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
