'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye, Flame, Info } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import Link from 'next/link';

interface MenuCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  calories: number;
  model3D: string;
}

const MenuCard: React.FC<MenuCardProps> = ({ id, name, price, image, description, calories, model3D }) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({ id, name, price, image, quantity: 1, model3D });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.4 }}
      className="group relative bg-[#1A1A1A] rounded-3xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-500 shadow-xl"
    >
      {/* Product Image */}
      <div className="relative h-56 w-full overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1">
          <Flame className="w-4 h-4 text-primary" fill="currentColor" />
          <span className="text-xs font-semibold">{calories} cal</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{name}</h3>
          <span className="text-xl font-bold text-primary">${price.toFixed(2)}</span>
        </div>
        <p className="text-sm text-gray-400 mb-6 line-clamp-2">{description}</p>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Link 
            href={`/product/${id}`}
            className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white rounded-xl py-3 font-semibold text-sm transition-all border border-white/10"
          >
            <Eye className="w-4 h-4" />
            View in AR
          </Link>
          <button
            onClick={handleAddToCart}
            className="w-12 h-12 flex items-center justify-center bg-primary hover:bg-primary/80 text-white rounded-xl transition-all glow-hover active:scale-95"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuCard;
