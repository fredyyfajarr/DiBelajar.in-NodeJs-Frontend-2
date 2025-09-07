// src/components/backgrounds/HomeBackground.jsx
import React from "react";
import { motion } from "framer-motion";

const HomeBackground = () => {
  return (
    <>
      {/* Polka Dots Pattern */}
      <div className="absolute inset-0 opacity-45 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute w-5 h-5 bg-gradient-to-br from-purple-500/50 to-pink-500/50 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Wave Lines */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="line1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9333EA" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#EC4899" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#A855F7" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          <motion.path
            d="M0,400 Q300,200 600,350 T1200,300"
            stroke="url(#line1)"
            strokeWidth="4"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
        </svg>
      </div>

      {/* Floating Bubbles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={`bubble-${i}`}
            className="absolute rounded-full bg-gradient-to-br from-white/50 to-purple-300/30 backdrop-blur-sm border border-pink-300/40 shadow-lg"
            style={{
              width: `${25 + Math.random() * 50}px`,
              height: `${25 + Math.random() * 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${100 + Math.random() * 20}%`,
            }}
            animate={{
              y: [-30, -900],
              x: [0, Math.random() * 120 - 60],
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              repeat: Infinity,
              delay: Math.random() * 6,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Abstract Gradient Blobs */}
      <div className="absolute inset-0 opacity-30 blur-3xl pointer-events-none">
        <motion.div
          className="absolute w-[400px] h-[400px] bg-purple-400/40 rounded-full"
          style={{ top: "10%", left: "5%" }}
          animate={{
            x: [0, 60, -60, 0],
            y: [0, -40, 40, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[300px] h-[300px] bg-pink-300/40 rounded-full"
          style={{ bottom: "15%", right: "10%" }}
          animate={{
            x: [0, -40, 40, 0],
            y: [0, 50, -50, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            delay: 2,
            ease: "easeInOut",
          }}
        />
      </div>
    </>
  );
};

export default HomeBackground;
