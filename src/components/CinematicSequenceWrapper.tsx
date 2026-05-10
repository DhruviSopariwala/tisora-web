"use client";

import dynamic from "next/dynamic";

// CinematicSequence uses scroll/mouse MotionValues that produce floating-point
// transforms. SSR values differ from client values causing hydration mismatches.
// ssr:false ensures it only renders in the browser.
const CinematicSequence = dynamic(() => import("./CinematicSequence"), { ssr: false });

export default function CinematicSequenceWrapper() {
  return <CinematicSequence />;
}
