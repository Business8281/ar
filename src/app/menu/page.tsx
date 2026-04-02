'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ArrowLeft } from 'lucide-react';
import MenuCard from '@/components/MenuCard';
import { MENU_ITEMS } from '@/lib/data';
import Link from 'next/link';

const categories = ['All', 'Burgers', 'Pizza', 'Biryani', 'Drinks'];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen py-24 px-6 md:px-12 bg-[#0F0F0F]">
      <div className="container mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-8">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-primary font-bold mb-4 hover:underline">
              <ArrowLeft size={16} /> Back to Home
            </Link>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white">
              CRAFTED <span className="text-primary italic">FOR YOU.</span>
            </h1>
          </div>

          {/* Search Bar */}
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search cravings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 transition-all font-medium"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-xl font-bold transition-all ${
                activeCategory === category 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          <AnimatePresence mode='popLayout'>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <MenuCard {...item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-2xl font-bold text-gray-500">No items found for your hunt.</p>
            <button 
              onClick={() => {setActiveCategory('All'); setSearchQuery('');}}
              className="text-primary font-bold mt-4 hover:underline"
            >
              Show all delicacies
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
