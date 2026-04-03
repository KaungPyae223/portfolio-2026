"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Quote, Sparkles, Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const quotes = [
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Believe you can and you're halfway there. - Theodore Roosevelt",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
  "Your time is limited, so don't waste it living someone else's life. - Steve Jobs",
  "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
  "It does not matter how slowly you go as long as you do not stop. - Confucius",
  "Everything you've ever wanted is on the other side of fear. - George Addair",
  "Success usually comes to those who are too busy to be looking for it. - Henry David Thoreau",
  "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
  "The best way to predict the future is to create it. - Peter Drucker",
];

const IntroPage = () => {
  const [time, setTime] = useState(new Date());
  const [quote, setQuote] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
  };

  const containerVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 md:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-3xl w-full"
      >
        <Card className="relative overflow-hidden border-0 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] rounded-[2.5rem]">
          {/* Animated Background Gradient */}
          <div className="absolute inset-0 -z-10 bg-linear-to-br from-yellow-500/5 via-transparent to-primary/5 dark:from-yellow-500/10 dark:to-primary/10 animate-pulse" />
          
          {/* Decorative Floating Icon */}
          <div className="absolute -top-10 -right-10 opacity-5 dark:opacity-10 rotate-12">
            <Sparkles size={250} className="text-yellow-600" />
          </div>

          <CardContent className="p-8 md:p-14 space-y-10 relative z-10">
            {/* Top Section: Welcome & Status */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <motion.div variants={itemVariants} className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 rounded-full border border-yellow-500/20 mb-2">
                  <Sparkles size={14} className="animate-spin-slow" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Administrator</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
                    Welcome <span className="text-yellow-500">Back!</span>
                </h1>
                <p className="text-gray-500 dark:text-gray-400 font-medium md:text-lg">
                    Have a productive day ahead.
                </p>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="flex items-center gap-4 bg-white/50 dark:bg-gray-800/50 p-4 rounded-3xl border border-gray-100 dark:border-gray-700/50 shadow-sm"
              >
                <div className="p-3 bg-yellow-500 rounded-2xl text-white shadow-lg shadow-yellow-500/30">
                  <Calendar size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-gray-400 tracking-tighter">Current Date</p>
                  <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{formatDate(time)}</p>
                </div>
              </motion.div>
            </div>

            {/* Middle Section: Big Clock Display */}
            <motion.div 
              variants={itemVariants}
              className="group relative"
            >
              <div className="absolute inset-0 bg-yellow-500/10 dark:bg-yellow-500/5 blur-3xl rounded-full scale-75 group-hover:scale-90 transition-transform duration-700" />
              <div className="relative flex flex-col items-center justify-center py-10 border-y border-gray-100/50 dark:border-gray-800/50">
                <div className="flex items-center gap-3 text-gray-400 mb-2">
                    <Clock size={16} />
                    <span className="text-xs font-bold uppercase tracking-[0.3em]">System Time</span>
                </div>
                <div className="text-6xl md:text-8xl font-black text-gray-900 dark:text-white tabular-nums tracking-tighter">
                  {formatTime(time)}
                </div>
                <div className="mt-4 px-4 py-1.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl">
                    Live Feed
                </div>
              </div>
            </motion.div>

            {/* Bottom Section: Quote of the Moment */}
            <motion.div 
                variants={itemVariants}
                className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="h-[2px] w-8 bg-yellow-500" />
                <span className="text-xs font-black uppercase text-yellow-600 dark:text-yellow-400 tracking-widest">Quote of the moment</span>
              </div>
              
              <div className="relative">
                <Quote className="absolute -top-6 -left-6 text-gray-100 dark:text-gray-800 h-16 w-16 -z-10" />
                <p className="text-xl md:text-2xl font-semibold leading-relaxed text-gray-700 dark:text-gray-300 italic">
                  {quote.split(' - ')[0]}
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-6 h-px bg-gray-300 dark:bg-gray-700" />
                  <span className="text-sm font-bold text-gray-400 group-hover:text-yellow-500 transition-colors">
                    {quote.split(' - ')[1]}
                  </span>
                </div>
              </div>

              <motion.div 
                whileHover={{ x: 5 }}
                className="pt-4 flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest cursor-pointer hover:text-yellow-500 transition-colors"
                onClick={() => setQuote(quotes[Math.floor(Math.random() * quotes.length)])}
              >
                <span>New Inspiration</span>
                <ArrowRight size={14} />
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};


export default IntroPage;