'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Box, Smartphone, Utensils, Zap, ShieldCheck, Globe } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden px-6">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[120px] -z-10 rounded-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 blur-[100px] -z-10 rounded-full" />

        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-bold uppercase tracking-widest mb-6"
            >
              <Zap size={14} className="fill-primary" />
              The Future of Dining is Here
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-black leading-tight mb-6 tracking-tighter">
              Experience Food <br />
              <span className="text-primary italic">In Reality.</span>
            </h1>
            
            <p className="text-lg text-gray-400 mb-10 max-w-lg leading-relaxed">
              Scan a QR code, visualize your meal in high-definition AR right on your table, 
              and order with a single tap. The ultimate contactless dining experience.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/menu"
                className="bg-primary hover:bg-primary/80 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 glow-hover shadow-xl shadow-primary/20 transition-all active:scale-95 text-lg"
              >
                Explore Menu <ArrowRight size={20} />
              </Link>
              <button className="glass px-8 py-4 rounded-2xl font-bold text-white hover:bg-white/10 transition-all text-lg">
                Book a Demo
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative hidden md:block"
          >
            {/* Main Floating Image */}
            <motion.div
               animate={{ y: [0, -20, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="relative z-10"
            >
              <div className="w-[500px] h-[500px] bg-gradient-to-br from-primary/20 to-accent/10 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-3xl -z-10" />
              <img 
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop" 
                alt="Burger Hero" 
                className="w-full h-auto rounded-[40px] shadow-2xl border border-white/10 grayscale-[30%] hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>

            {/* Floaties */}
            <motion.div
              animate={{ y: [0, 15, 0], x: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -top-10 -right-10 glass p-6 rounded-3xl shadow-2xl z-20"
            >
              <Box className="text-primary mb-2" size={32} />
              <div className="font-bold text-sm">3D Food Assets</div>
              <div className="text-[10px] text-gray-400">High-Fidelity GLB</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -15, 0], x: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -left-10 glass p-6 rounded-3xl shadow-2xl z-20"
            >
              <Smartphone className="text-accent mb-2" size={32} />
              <div className="font-bold text-sm">Augmented Reality</div>
              <div className="text-[10px] text-gray-400">Markerless Placement</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 bg-[#0a0a0a]">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">REDEFINING THE <br /><span className="text-primary italic">RESTAURANT EXPERIENCE.</span></h2>
              <p className="text-gray-400">Our platform bridges the gap between digital convenience and physical flavor.</p>
            </div>
            <Link href="/menu" className="text-primary font-bold flex items-center gap-2 hover:underline">
              View full menu <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Box className="text-primary" />, title: "3D Visualization", desc: "Customers can view every dish in 360° before ordering." },
              { icon: <Smartphone className="text-accent" />, title: "Contactless", desc: "No physical menus. Purely digital, purely hygienic." },
              { icon: <Globe className="text-primary" />, title: "SaaS Scale", desc: "Deploy to hundreds of tables with a single dashboard." },
              { icon: <ShieldCheck className="text-accent" />, title: "Secure Payments", desc: "Integrated checkout with Razorpay for seamless bills." },
              { icon: <Utensils className="text-primary" />, title: "Kitchen Sync", desc: "Orders move from table to kitchen in milliseconds." },
              { icon: <Zap className="text-accent" />, title: "Instant AR", desc: "No app needed. Works directly in the mobile browser." }
            ].map((f, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="p-10 rounded-[32px] bg-white/5 border border-white/5 hover:border-primary/20 transition-all group"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
