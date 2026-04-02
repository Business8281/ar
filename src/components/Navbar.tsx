'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, UtensilsCrossed } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import Link from 'next/link';

interface NavbarProps {
  onCartToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onCartToggle }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const items = useCartStore((state) => state.items);
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'py-4 bg-black/70 backdrop-blur-xl border-b border-white/10' : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white rotate-12 group-hover:rotate-0 transition-transform duration-300 shadow-lg shadow-primary/20">
            <UtensilsCrossed size={20} />
          </div>
          <span className="text-xl font-black tracking-tighter text-white">
            AR<span className="text-primary">BURGER</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/menu" className="text-gray-300 hover:text-primary transition-colors">Menu</Link>
          <Link href="/locations" className="text-gray-300 hover:text-primary transition-colors">Locations</Link>
          <Link href="/about" className="text-gray-300 hover:text-primary transition-colors">About Us</Link>
          <Link href="/admin" className="text-gray-300 hover:text-primary transition-colors italic opacity-60">Admin Dash</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={onCartToggle}
            className="relative w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all border border-white/10"
          >
            <ShoppingBag size={20} />
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg border-2 border-black"
                >
                  {itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/90 backdrop-blur-2xl border-b border-white/10 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6 text-lg font-bold">
              <Link href="/menu" onClick={() => setMobileMenuOpen(false)}>Menu</Link>
              <Link href="/locations" onClick={() => setMobileMenuOpen(false)}>Locations</Link>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
              <Link href="/admin" className="italic opacity-50" onClick={() => setMobileMenuOpen(false)}>Admin Dash</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
