'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight, CreditCard } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { items, addItem, removeItem, clearCart, total } = useCartStore();
  const router = useRouter();

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('Cart is empty!');
      return;
    }
    onClose();
    router.push('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0F0F0F] border-l border-white/10 z-[70] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#1A1A1A]/50">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-primary" />
                <h2 className="text-xl font-bold">Your Order</h2>
                <span className="bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full font-bold">
                  {items.length} items
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-all"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50 space-y-4">
                  <ShoppingBag size={64} className="stroke-1" />
                  <div>
                    <p className="text-lg font-bold">Empty Cravings!</p>
                    <p className="text-sm">Start adding some 3D deliciousness.</p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="text-primary font-bold hover:underline"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    className="flex gap-4 group"
                  >
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold">{item.name}</h3>
                        <span className="font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                      <p className="text-xs text-gray-500 mb-3 underline decoration-white/10">3D model included</p>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center bg-white/5 rounded-lg border border-white/10 px-1 py-1">
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="w-7 h-7 flex items-center justify-center hover:text-primary transition-colors"
                          >
                            {item.quantity === 1 ? <Trash2 size={14} /> : <Minus size={14} />}
                          </button>
                          <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                          <button 
                            onClick={() => addItem(item)}
                            className="w-7 h-7 flex items-center justify-center hover:text-primary transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-[#1A1A1A]/80 backdrop-blur-xl">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-2xl font-black">${total().toFixed(2)}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={clearCart}
                    className="py-4 text-xs font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-widest"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={handleCheckout}
                    className="bg-primary hover:bg-primary/80 text-white rounded-2xl py-4 font-bold flex items-center justify-center gap-2 glow-hover shadow-xl shadow-primary/20 transition-all active:scale-95"
                  >
                    Checkout <ArrowRight size={18} />
                  </button>
                </div>
                <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                  <CreditCard size={12} />
                  Secure Payments via Razorpay
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
