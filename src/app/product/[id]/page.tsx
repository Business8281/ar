'use client';

import React, { use } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Flame, ShieldCheck, Clock } from 'lucide-react';
import ARViewer from '@/components/ARViewer';
import { MENU_ITEMS } from '@/lib/data';
import { useCartStore } from '@/lib/store';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import toast from 'react-hot-toast';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = MENU_ITEMS.find((item) => item.id === id);
  const addItem = useCartStore((state) => state.addItem);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addItem({ ...product, quantity: 1 });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen py-24 px-6 bg-[#0F0F0F]">
      <div className="container mx-auto">
        <Link href="/menu" className="inline-flex items-center gap-2 text-primary font-bold mb-12 hover:underline">
          <ArrowLeft size={16} /> Back to Menu
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: AR Viewer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-500 uppercase tracking-widest mb-2">Interactive 3D Preview</h2>
              <p className="text-sm text-gray-400">Pinch to scale, drag to rotate. Tap &quot;View in your space&quot; for AR.</p>
            </div>
            <ARViewer 
              modelUrl={product.model3D} 
              alt={product.name}
              poster={product.image}
            />
          </motion.div>

          {/* Right: Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col h-full"
          >
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-primary/20 text-primary text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest leading-none">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-accent text-xs font-bold">
                  <Flame size={12} fill="currentColor" />
                  {product.calories} kcal
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-tight">
                {product.name}
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed mb-8">
                {product.description}
              </p>
              <div className="text-4xl font-black text-primary mb-12">
                ${product.price.toFixed(2)}
              </div>
            </div>

            {/* Features Row */}
            <div className="grid grid-cols-3 gap-4 mb-12">
              <div className="glass p-4 rounded-2xl text-center">
                <ShieldCheck size={24} className="mx-auto text-primary mb-2" />
                <div className="text-[10px] font-bold uppercase tracking-widest">Fresh Ingredients</div>
              </div>
              <div className="glass p-4 rounded-2xl text-center">
                <Clock size={24} className="mx-auto text-accent mb-2" />
                <div className="text-[10px] font-bold uppercase tracking-widest">15-20 min</div>
              </div>
              <div className="glass p-4 rounded-2xl text-center">
                <Box size={24} className="mx-auto text-primary mb-2" />
                <div className="text-[10px] font-bold uppercase tracking-widest">AR Ready</div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-auto flex flex-col gap-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-primary hover:bg-primary/80 text-white py-6 rounded-3xl font-black text-xl flex items-center justify-center gap-3 glow-hover shadow-2xl shadow-primary/20 transition-all active:scale-95"
              >
                <ShoppingCart size={24} /> Add to Cart
              </button>
              <p className="text-center text-xs text-gray-500 font-medium">
                Experience high-fidelity 3D modeling for your next meal.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Box({ size, className }: { size: number, className: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
      <path d="m3.3 7 8.7 5 8.7-5"/>
      <path d="M12 22V12"/>
    </svg>
  );
}
