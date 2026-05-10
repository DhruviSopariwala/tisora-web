"use client";

import { motion } from "framer-motion";

// Beautiful, organic Bezier curves mimicking natural Eucalyptus & Olive leaves
const EUCALYPTUS_PATHS = [
  // 0: Elegant elongated curved leaf
  "M50,95 C30,70 20,40 45,5 C55,0 75,20 80,50 C85,80 65,95 50,95 Z",
  // 1: Soft rounded ovate leaf (Silver dollar)
  "M50,95 C25,85 15,50 40,15 C60,-5 85,25 80,60 C75,85 65,95 50,95 Z",
  // 2: Wavy natural leaf
  "M50,95 C25,75 35,35 60,5 C70,10 85,45 65,80 C55,95 55,95 50,95 Z",
  // 3: Delicate slender leaf
  "M50,95 C35,70 30,30 50,5 C70,30 65,70 50,95 Z"
];

const DelicateLeaf = ({ className, style, width, height, pathIndex = 0, blur, opacity = 0.75 }: any) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className}
      style={{
        width,
        height,
        filter: blur ? `blur(${blur}px)` : 'drop-shadow(0px 10px 20px rgba(0,0,0,0.02))',
        opacity,
        ...style
      }}
    >
      <defs>
        <linearGradient id={`leafGrad-${pathIndex}`} x1="0%" y1="0%" x2="100%" y2="100%">
          {/* Milky sage green / Soft cream pastel gradient */}
          <stop offset="0%" stopColor="#F8FAF7" />
          <stop offset="45%" stopColor="#E2E9DC" />
          <stop offset="100%" stopColor="#BACBAF" />
        </linearGradient>
      </defs>
      <path 
        d={EUCALYPTUS_PATHS[pathIndex % EUCALYPTUS_PATHS.length]} 
        fill={`url(#leafGrad-${pathIndex})`} 
      />
      {/* Delicate central vein */}
      <path 
        d="M50,95 C45,70 45,40 50,15" 
        stroke="#FFFFFF" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        fill="none" 
        opacity="0.3"
      />
    </svg>
  );
};

export default function FloatingLeaves() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      
      {/* ── FOREGROUND BLURRED BRANCH (Right - Top) ── */}
      <motion.div
        className="absolute top-[-10%] right-[-10%]"
        initial={{ rotate: -15 }}
        animate={{ rotate: [-15, -12, -15], x: [0, -10, 0], y: [0, 15, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
        style={{ zIndex: 20, width: 500, height: 500 }}
      >
        {/* Extremely delicate, blurred stem */}
        <svg width="500" height="500" viewBox="0 0 500 500" className="absolute top-0 right-0" style={{ filter: 'blur(12px)', opacity: 0.5 }}>
          <path d="M500,0 C400,100 300,200 150,350" stroke="#C4D1BA" strokeWidth="2" fill="none" />
          <path d="M280,220 C320,280 350,300 400,320" stroke="#C4D1BA" strokeWidth="1.5" fill="none" />
        </svg>
        
        {/* Large, soft Eucalyptus leaves with heavy blur for cinematic depth */}
        <DelicateLeaf width={220} height={220} pathIndex={1} blur={14} opacity={0.7} style={{ position: 'absolute', top: 220, left: 80, transform: 'rotate(110deg)' }} />
        <DelicateLeaf width={180} height={180} pathIndex={0} blur={10} opacity={0.65} style={{ position: 'absolute', top: 120, left: 240, transform: 'rotate(145deg)' }} />
        <DelicateLeaf width={260} height={260} pathIndex={2} blur={16} opacity={0.75} style={{ position: 'absolute', top: 10, left: 200, transform: 'rotate(90deg)' }} />
      </motion.div>

      {/* ── CRISP MIDGROUND BRANCH (Left) ── */}
      <motion.div
        className="absolute top-[15%] left-[-15%]"
        initial={{ rotate: 8 }}
        animate={{ rotate: [8, 11, 8], x: [0, 15, 0] }}
        transition={{ duration: 45, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{ zIndex: 15, width: 400, height: 500 }}
      >
        {/* Hairline delicate stems */}
        <svg width="400" height="500" viewBox="0 0 400 500" className="absolute top-0 left-0" style={{ opacity: 0.6 }}>
          <path d="M-50,450 C50,400 100,200 250,50" stroke="#C4D1BA" strokeWidth="1.5" fill="none" />
          <path d="M80,275 C120,270 160,280 200,310" stroke="#C4D1BA" strokeWidth="1" fill="none" />
          <path d="M150,165 C180,140 220,120 260,110" stroke="#C4D1BA" strokeWidth="1" fill="none" />
        </svg>
        
        <DelicateLeaf width={150} height={150} pathIndex={0} blur={1} opacity={0.85} style={{ position: 'absolute', top: 10, left: 220, transform: 'rotate(25deg)' }} />
        <DelicateLeaf width={130} height={130} pathIndex={1} blur={1.5} opacity={0.8} style={{ position: 'absolute', top: 110, left: 140, transform: 'rotate(-20deg)' }} />
        <DelicateLeaf width={170} height={170} pathIndex={2} blur={2.5} opacity={0.75} style={{ position: 'absolute', top: 250, left: 170, transform: 'rotate(15deg)' }} />
        <DelicateLeaf width={110} height={110} pathIndex={3} blur={1} opacity={0.85} style={{ position: 'absolute', top: 230, left: 40, transform: 'rotate(65deg)' }} />
      </motion.div>

      {/* ── BOTTOM CORNER DEPTH LEAF (Right) ── */}
      <motion.div
        className="absolute bottom-[-10%] right-[5%]"
        initial={{ rotate: -25 }}
        animate={{ rotate: [-25, -20, -25], y: [0, -15, 0] }}
        transition={{ duration: 50, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{ zIndex: 25 }}
      >
        <DelicateLeaf width={320} height={320} pathIndex={1} blur={12} opacity={0.55} style={{ transform: 'rotate(-30deg)' }} />
      </motion.div>

      {/* ── FLOATING SINGLE LEAVES (Center & Scattered) ── */}
      {[
        // Tiny floating leaves (very slow, very subtle, sparse)
        { id: 1, x: 28, y: 70, w: 50, h: 50, p: 0, r: 45, blur: 0.5, op: 0.8, dur: 45, del: 2 },
        { id: 2, x: 72, y: 25, w: 60, h: 60, p: 1, r: -20, blur: 1, op: 0.75, dur: 48, del: 5 },
        { id: 3, x: 62, y: 80, w: 55, h: 55, p: 2, r: 15, blur: 1.5, op: 0.7, dur: 42, del: 1 },
        { id: 4, x: 38, y: 20, w: 45, h: 45, p: 3, r: -60, blur: 2, op: 0.65, dur: 46, del: 7 },
        
        // Depth floating leaves (very blurry, far background)
        { id: 5, x: 75, y: 65, w: 110, h: 110, p: 0, r: 30, blur: 8, op: 0.45, dur: 40, del: 3 },
        { id: 6, x: 18, y: 35, w: 130, h: 130, p: 1, r: -45, blur: 10, op: 0.4, dur: 38, del: 0 },
      ].map((leaf) => (
        <motion.div
          key={leaf.id}
          className="absolute"
          style={{
            left: `${leaf.x}%`,
            top: `${leaf.y}%`,
            zIndex: leaf.blur < 3 ? 10 : 0
          }}
          initial={{ rotate: leaf.r, y: 0, x: 0 }}
          animate={{ 
            y: [0, -30, 0, 30, 0], 
            x: [0, 15, 0, -15, 0],
            rotate: [leaf.r, leaf.r + 8, leaf.r - 8, leaf.r]
          }}
          transition={{
            duration: leaf.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: leaf.del,
          }}
        >
          <DelicateLeaf 
            width={leaf.w} 
            height={leaf.h} 
            pathIndex={leaf.p}
            blur={leaf.blur} 
            opacity={leaf.op}
          />
        </motion.div>
      ))}
    </div>
  );
}
