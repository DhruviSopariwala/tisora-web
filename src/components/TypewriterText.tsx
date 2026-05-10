"use client";

import { useEffect, useRef, useState } from "react";

interface TypewriterTextProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
  onDone?: () => void;
}

export default function TypewriterText({
  text,
  delay = 0,
  speed = 55,
  className = "",
  style,
  onDone,
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  // Stable ref — prevents stale closure and infinite loop
  const onDoneRef = useRef(onDone);
  useEffect(() => { onDoneRef.current = onDone; }, [onDone]);

  // Reset if text prop changes mid-animation
  useEffect(() => {
    const t = setTimeout(() => {
      setDisplayed("");
      setDone(false);
      setStarted(false);
    }, 0);
    return () => clearTimeout(t);
  }, [text]);

  // Start after delay
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay, text]); // re-run delay when text resets

  // Type characters one by one
  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) {
      // Guard: only fire onDone once
      if (!done) {
        const t = setTimeout(() => setDone(true), 0);
        onDoneRef.current?.();
        return () => clearTimeout(t);
      }
      return;
    }
    const t = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [started, displayed, text, speed, done]);

  return (
    <span className={className} style={style}>
      {displayed}
      <span
        className="inline-block w-[3px] ml-[2px] rounded-sm align-middle"
        style={{
          height: "0.85em",
          background: "currentColor",
          opacity: done ? 1 : 0.9,
          animation: "tisora-blink 1s step-end infinite",
        }}
      />
    </span>
  );
}
