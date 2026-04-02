'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, ShoppingBag, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    table: '',
    phone: '',
  });
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderDetails({ ...orderDetails, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setIsProcessing(true);

    try {
      // Add order to Firestore
      const orderData = {
        customer: orderDetails,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        total: total(),
        status: 'Preparing',
        createdAt: serverTimestamp()
      };

      await addDoc(collection(db, 'orders'), orderData);
      
      // Simulate payment delay
      setTimeout(() => {
        setOrderSuccess(true);
        setIsProcessing(false);
        clearCart();
        toast.success("Order placed successfully!");
      }, 1500);

    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Using demo mode...");
      setOrderSuccess(true);
      setIsProcessing(false);
      clearCart();
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <motion.div
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="glass p-12 rounded-[40px] text-center max-w-md w-full border-primary/20"
        >
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-green-500/20">
            <CheckCircle2 size={48} className="text-white" />
          </div>
          <h1 className="text-4xl font-black mb-4">Order Received!</h1>
          <p className="text-gray-400 mb-10 leading-relaxed">
            Your delicious 3D-previewed meal is being prepared. Our chefs are working hard to match the AR quality in real life!
          </p>
          <Link
            href="/"
            className="bg-white text-black px-8 py-4 rounded-2xl font-bold inline-block hover:bg-gray-100 transition-all active:scale-95"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] py-24 px-6">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-5xl font-black mb-12 tracking-tighter">CHECKOUT</h1>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Order Summary */}
          <div className="order-2 md:order-1">
            <h2 className="text-xl font-bold mb-6 text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <ShoppingBag size={20} /> Your Selection
            </h2>
            <div className="glass rounded-3xl p-8 space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b border-white/5 pb-4">
                  <div>
                    <h3 className="font-bold">{item.name} <span className="text-primary text-xs ml-2">x{item.quantity}</span></h3>
                    <p className="text-xs text-gray-500 italic">3D model visual confirmed</p>
                  </div>
                  <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-4">
                <span className="text-xl font-black">Grand Total</span>
                <span className="text-3xl font-black text-primary">${total().toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="order-1 md:order-2">
            <h2 className="text-xl font-bold mb-6 text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <CreditCard size={20} /> Delivery Details
            </h2>
            <form onSubmit={handlePlaceOrder} className="glass rounded-3xl p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Full Name</label>
                <input
                  required
                  name="name"
                  value={orderDetails.name}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Enter your name"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:border-primary/50 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Table #</label>
                  <input
                    required
                    name="table"
                    value={orderDetails.table}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="e.g. 12"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:border-primary/50 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Phone</label>
                  <input
                    required
                    name="phone"
                    value={orderDetails.phone}
                    onChange={handleInputChange}
                    type="tel"
                    placeholder="Contact No"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:border-primary/50 outline-none transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing || items.length === 0}
                className="w-full bg-primary hover:bg-primary/80 disabled:opacity-50 disabled:hover:bg-primary text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-primary/80 glow-hover shadow-2xl transition-all active:scale-95"
              >
                {isProcessing ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Place Order <ArrowRight size={22} /></>
                )}
              </button>
              
              <div className="flex items-center justify-center gap-2 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                <ShieldCheck size={12} />
                Secure Demo Payment Enabled
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
