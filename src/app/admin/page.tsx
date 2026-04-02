'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc, Timestamp } from 'firebase/firestore';
import { 
  BarChart3, 
  Package, 
  Clock, 
  CheckCircle2, 
  Trash2, 
  LayoutDashboard, 
  ShoppingBag,
  ArrowRight,
  TrendingUp,
  Settings
} from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

interface Order {
  id: string;
  customer: {
    name: string;
    table: string;
    phone: string;
  };
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'Preparing' | 'Ready' | 'Served';
  createdAt: Timestamp;
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Order[];
      setOrders(ordersData);
      setLoading(false);
    }, (error) => {
      console.error("Firestore error:", error);
      toast.error("Failed to connect to real-time orders.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateStatus = async (orderId: string, currentStatus: string) => {
    let nextStatus: Order['status'] = 'Preparing';
    if (currentStatus === 'Preparing') nextStatus = 'Ready';
    else if (currentStatus === 'Ready') nextStatus = 'Served';
    else return;

    try {
      await updateDoc(doc(db, 'orders', orderId), { status: nextStatus });
    } catch (error) {
      toast.error("Status update failed");
    }
  };

  const deleteOrder = async (orderId: string) => {
    if (confirm("Permanently remove this order?")) {
      try {
        await deleteDoc(doc(db, 'orders', orderId));
        toast.success("Order archived.");
      } catch (error) {
        toast.error("Delete failed.");
      }
    }
  };

  const stats = {
    totalOrders: orders.length,
    activeOrders: orders.filter(o => o.status !== 'Served').length,
    revenue: orders.reduce((acc, o) => acc + o.total, 0),
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      {/* Sidebar */}
      <aside className="w-20 md:w-64 border-r border-white/5 p-6 flex flex-col gap-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white rotate-6 transition-transform hover:rotate-0">
            <LayoutDashboard size={20} />
          </div>
          <span className="hidden md:block font-black text-xl tracking-tighter uppercase">Admin Panel</span>
        </div>
        
        <nav className="flex flex-col gap-4">
          <button className="flex items-center gap-4 p-4 bg-primary/10 text-primary rounded-2xl w-full text-left font-bold transition-all border border-primary/20">
            <ShoppingBag size={20} />
            <span className="hidden md:block">Orders</span>
          </button>
          <button className="flex items-center gap-4 p-4 text-gray-500 hover:text-white rounded-2xl w-full text-left font-bold transition-all border border-transparent hover:border-white/10">
            <BarChart3 size={20} />
            <span className="hidden md:block">Analytics</span>
          </button>
          <button className="flex items-center gap-4 p-4 text-gray-500 hover:text-white rounded-2xl w-full text-left font-bold transition-all border border-transparent hover:border-white/10 mt-auto">
            <Settings size={20} />
            <span className="hidden md:block">Settings</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black mb-2 tracking-tighter">LIVE KITCHEN FEED</h1>
            <p className="text-gray-500 font-medium">Real-time AR smart menu orders.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-3xl flex flex-col items-center">
              <span className="text-[10px] text-gray-500 font-black tracking-widest uppercase">Active</span>
              <span className="text-2xl font-black text-primary">{stats.activeOrders}</span>
            </div>
            <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-3xl flex flex-col items-center">
              <span className="text-[10px] text-gray-500 font-black tracking-widest uppercase">Revenue</span>
              <span className="text-2xl font-black text-accent">${stats.revenue.toFixed(0)}</span>
            </div>
          </div>
        </header>

        {loading ? (
          <div className="py-24 text-center text-primary animate-pulse font-black text-xl tracking-widest">
            CONNECTING TO FIRESTORE...
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
            <AnimatePresence mode='popLayout'>
              {orders.map((order) => (
                <motion.div
                  key={order.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-[#1A1A1A] border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden group"
                >
                  {/* Status Indicator */}
                  <div className={`absolute top-0 right-0 px-6 py-2 rounded-bl-3xl text-[10px] font-black uppercase tracking-widest ${
                    order.status === 'Preparing' ? 'bg-orange-500/20 text-orange-400' :
                    order.status === 'Ready' ? 'bg-green-500/20 text-green-400' :
                    'bg-zinc-500/20 text-zinc-400'
                  }`}>
                    {order.status}
                  </div>

                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <div className="text-xs text-gray-500 font-bold mb-1 uppercase tracking-widest">Table {order.customer.table}</div>
                      <h3 className="text-2xl font-black">{order.customer.name}</h3>
                      <div className="text-xs text-gray-600 mt-1 capitalize">
                        {order.createdAt?.toDate ? format(order.createdAt.toDate(), 'hh:mm a') : 'Just now'}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-white/5 p-3 rounded-2xl border border-white/5 border-dashed">
                        <div>
                          <span className="font-bold text-white">{item.name}</span>
                          <span className="text-xs text-primary font-black ml-2 leading-none uppercase">x{item.quantity}</span>
                        </div>
                        <span className="text-xs text-gray-500 font-bold tracking-tighter">${item.price}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center mb-10 pt-4 border-t border-white/5">
                    <span className="text-xs font-bold text-gray-500 uppercase">Grand Total</span>
                    <span className="text-2xl font-black text-white">${order.total.toFixed(2)}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {order.status !== 'Served' ? (
                      <button
                        onClick={() => updateStatus(order.id, order.status)}
                        className="bg-primary hover:bg-primary/80 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all glow-hover active:scale-95"
                      >
                        {order.status === 'Preparing' ? <Clock size={16} /> : <CheckCircle2 size={16} />}
                        {order.status === 'Preparing' ? 'Mark Ready' : 'Mark Served'}
                      </button>
                    ) : (
                      <div className="bg-zinc-800 text-zinc-500 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                        <CheckCircle2 size={16} /> Order Served
                      </div>
                    )}
                    <button
                      onClick={() => deleteOrder(order.id)}
                      className="bg-white/5 hover:bg-red-500/20 hover:text-red-500 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center transition-all border border-white/5"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {orders.length === 0 && (
              <div className="col-span-full py-48 text-center glass rounded-[40px]">
                <TrendingUp size={64} className="mx-auto text-gray-800 mb-6" />
                <h3 className="text-2xl font-black text-gray-500">Wait-list is empty.</h3>
                <p className="text-gray-600 mt-2">New orders from the AR menu will appear here instantly.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
