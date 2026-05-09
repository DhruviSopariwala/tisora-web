"use client";

import dynamic from "next/dynamic";

// ssr: false must be used inside a Client Component.
// This ensures LoadingScreen only mounts in the browser so the
// AnimatePresence exit doesn't fire immediately on hydration.
const LoadingScreen = dynamic(() => import("./LoadingScreen"), {
  ssr: false,
});

export default function LoadingScreenWrapper() {
  return <LoadingScreen />;
}
