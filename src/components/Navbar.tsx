import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Phone, 
  MapPin, 
  Clock, 
  Menu as MenuIcon, 
  X, 
  ShieldCheck, 
  Sparkles,
  Calendar
} from 'lucide-react';
import { PIZZAGARDEN_CONTACT } from '../data/menuData';
import { CartItem } from '../types';

interface NavbarProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onOpenReservation: () => void;
  onOpenStaff: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cart,
  onOpenCart,
  onOpenReservation,
  onOpenStaff,
  onNavigate,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800">
      {/* Top Banner with Chakwal Location & Hours */}
      <div className="bg-neutral-900 border-b border-neutral-800 text-xs text-neutral-300 py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-amber-400 font-medium">
              <MapPin className="w-3.5 h-3.5" />
              Talagang Hwy, opposite NFC, Chakwal
            </span>
            <span className="hidden sm:flex items-center gap-1 text-neutral-400">
              <Clock className="w-3.5 h-3.5" />
              {PIZZAGARDEN_CONTACT.openingHours}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${PIZZAGARDEN_CONTACT.whatsappRaw}?text=Hello%20PizzaGarden%20Chakwal!%20I%20would%20like%20to%20place%20an%20order.`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp: {PIZZAGARDEN_CONTACT.phone}</span>
            </a>
            <button
              onClick={onOpenStaff}
              className="text-neutral-400 hover:text-amber-400 flex items-center gap-1 transition-colors pl-2 border-l border-neutral-700"
              title="Staff & Kitchen Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Staff</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div 
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3.5 cursor-pointer select-none group"
          >
            <div className="relative w-12 h-12 rounded-full bg-white p-0.5 shadow-md shadow-amber-500/10 border-2 border-amber-400/40 transition-transform group-hover:scale-105 flex items-center justify-center overflow-hidden">
              <img 
                src="/pizzagarden-logo.svg" 
                alt="Pizza Garden Official Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-extrabold tracking-tight text-white font-['Cabinet_Grotesk',sans-serif]">
                  PIZZA
                </span>
                <span className="text-2xl font-extrabold tracking-tight text-amber-400 font-['Cabinet_Grotesk',sans-serif]">
                  GARDEN
                </span>
              </div>
              <div className="text-[11px] tracking-widest uppercase font-semibold text-neutral-400">
                Chakwal · Taste · Ambience
              </div>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            <button
              onClick={() => handleNavClick('deals')}
              className="text-sm font-medium text-neutral-300 hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              Special Deals
            </button>
            <button
              onClick={() => handleNavClick('menu')}
              className="text-sm font-medium text-neutral-300 hover:text-amber-400 transition-colors"
            >
              Full Menu
            </button>
            <button
              onClick={() => handleNavClick('reels')}
              className="text-sm font-medium text-neutral-300 hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              Inside PizzaGarden (Reels)
            </button>
            <button
              onClick={() => handleNavClick('ambience')}
              className="text-sm font-medium text-neutral-300 hover:text-amber-400 transition-colors"
            >
              Dining Ambience
            </button>
            <button
              onClick={() => handleNavClick('location')}
              className="text-sm font-medium text-neutral-300 hover:text-amber-400 transition-colors"
            >
              Location &amp; Hours
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenReservation}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-neutral-900 hover:bg-neutral-800 text-amber-400 border border-neutral-800 transition-colors"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Table</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <ShoppingBag className="w-4 h-4 text-neutral-950" />
              <span className="hidden sm:inline">Order Cart</span>
              {totalCartCount > 0 && (
                <span className="bg-neutral-950 text-amber-400 text-xs px-2 py-0.5 rounded-full font-extrabold">
                  {totalCartCount} · Rs. {cartSubtotal}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-neutral-950 border-b border-neutral-800 px-4 py-5 space-y-3">
          <button
            onClick={() => handleNavClick('deals')}
            className="w-full text-left px-3 py-2 text-base font-semibold text-neutral-200 hover:bg-neutral-900 rounded-lg flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            Special Deals &amp; 36&quot; Train Pizza
          </button>
          <button
            onClick={() => handleNavClick('menu')}
            className="w-full text-left px-3 py-2 text-base font-semibold text-neutral-200 hover:bg-neutral-900 rounded-lg"
          >
            Explore Full Menu
          </button>
          <button
            onClick={() => handleNavClick('reels')}
            className="w-full text-left px-3 py-2 text-base font-semibold text-neutral-200 hover:bg-neutral-900 rounded-lg flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            Inside PizzaGarden (Video Reels)
          </button>
          <button
            onClick={() => handleNavClick('ambience')}
            className="w-full text-left px-3 py-2 text-base font-semibold text-neutral-200 hover:bg-neutral-900 rounded-lg"
          >
            Restaurant Ambience &amp; Seating
          </button>
          <button
            onClick={() => handleNavClick('location')}
            className="w-full text-left px-3 py-2 text-base font-semibold text-neutral-200 hover:bg-neutral-900 rounded-lg"
          >
            Location &amp; Contact Info
          </button>
          <div className="pt-2 border-t border-neutral-800 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenReservation();
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2.5 bg-neutral-900 text-amber-400 font-semibold text-sm rounded-lg border border-neutral-800"
            >
              Book a Dining Table
            </button>
            <button
              onClick={() => {
                onOpenStaff();
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2 text-neutral-400 text-xs hover:text-white"
            >
              Staff & Kitchen Portal
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
