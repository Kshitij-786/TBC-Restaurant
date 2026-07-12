import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import MenuSection from './components/MenuSection';
import ReviewsSection from './components/ReviewsSection';
import ItemModal from './components/ItemModal';
import Footer from './components/Footer';
import OrdersDrawer from './components/OrdersDrawer';
import CartDrawer from './components/CartDrawer';
import AdminPortal from './components/AdminPortal';
import UserProfileDrawer from './components/UserProfileDrawer';
import { MenuItem } from './types';
import { ThemeProvider, useTheme } from './ThemeContext';
import { AuthProvider } from './AuthContext';

function AppContent() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { isDark } = useTheme();

  // Simple state routing for Admin Panel
  const [isAdminActive, setIsAdminActive] = useState(() => {
    return window.location.pathname === '/admin-portal' || window.location.hash === '#admin-portal';
  });

  useEffect(() => {
    const handleLocationChange = () => {
      setIsAdminActive(window.location.pathname === '/admin-portal' || window.location.hash === '#admin-portal');
    };

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  if (isAdminActive) {
    return (
      <AdminPortal
        onGoBack={() => {
          // Reset hash and URL safely without full reload
          window.location.hash = '';
          if (window.location.pathname === '/admin-portal') {
            window.history.pushState(null, '', '/');
          }
          setIsAdminActive(false);
        }}
      />
    );
  }

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 antialiased ${
      isDark 
        ? 'bg-[#050505] text-white selection:bg-[#ff4d00] selection:text-black' 
        : 'bg-zinc-50 text-zinc-900 selection:bg-[#ff4d00] selection:text-white'
    }`}>
      {/* Glow Ambient Top Cover */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-1 bg-gradient-to-r from-transparent via-[#ff4d00] to-transparent blur-sm z-50 pointer-events-none ${
        isDark ? 'opacity-80' : 'opacity-40'
      }`}></div>

      {/* Global Navigation Bar */}
      <Navbar 
        onOpenAdmin={() => {
          window.location.hash = '#admin-portal';
          setIsAdminActive(true);
        }} 
        onOpenCart={() => setIsCartOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Page Body Contents */}
      <main className="flex-grow">
        {/* Immersive Hero section */}
        <Hero />

        {/* Brand identity / About section */}
        <About />

        {/* Interactive filterable Menu Section */}
        <MenuSection onSelectItem={setSelectedItem} />

        {/* Premium Cryptographically Anonymized Reviews Section */}
        <ReviewsSection />
      </main>

      {/* Modern interactive map & branding footer */}
      <Footer />

      {/* Animated Pop-Up modal for stock availability checking */}
      <AnimatePresence mode="wait">
        {selectedItem && (
          <ItemModal
            item={selectedItem}
            onClose={handleCloseModal}
            onOpenCart={() => setIsCartOpen(true)}
          />
        )}
      </AnimatePresence>

      {/* Slide-out Ledger Drawer for Live Supabase Order Tracking */}
      <OrdersDrawer
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
      />

      {/* Real-time sync Database-Backed Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      {/* Responsive Personal User Profile & Order Tracker Drawer */}
      <UserProfileDrawer
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onOpenMenu={() => {
          const element = document.getElementById('menu');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
