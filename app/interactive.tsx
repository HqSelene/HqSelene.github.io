"use client";

import { useEffect, useRef, useState } from "react";

const practices = [
  "human–AI relationships",
  "participatory systems",
  "emotional spaces",
  "data as a material",
];

export function RotatingPractice() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % practices.length);
    }, 2400);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <span className="rotating-practice" aria-live="polite">
      <span key={practices[index]}>{practices[index]}</span>
    </span>
  );
}

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextDark = saved ? saved === "dark" : prefersDark;
    document.documentElement.dataset.theme = nextDark ? "dark" : "light";
    const frame = window.requestAnimationFrame(() => setDark(nextDark));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function toggleTheme() {
    const nextDark = !dark;
    setDark(nextDark);
    document.documentElement.dataset.theme = nextDark ? "dark" : "light";
    window.localStorage.setItem(
      "portfolio-theme",
      nextDark ? "dark" : "light",
    );
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
    >
      <span className="theme-toggle-icon" aria-hidden="true">
        {dark ? "☀" : "☾"}
      </span>
      <span>{dark ? "Light" : "Night"}</span>
    </button>
  );
}

export function CosmicLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let frame = 0;
    let width = 0;
    let height = 0;
    let animation = 0;

    const stars = Array.from({ length: 95 }, (_, index) => ({
      x: ((index * 73) % 101) / 101,
      y: ((index * 47) % 97) / 97,
      size: 0.7 + ((index * 11) % 16) / 10,
      speed: 0.025 + ((index * 7) % 9) / 100,
      phase: (index * 0.63) % (Math.PI * 2),
    }));

    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function draw() {
      const isDark = document.documentElement.dataset.theme === "dark";
      context.clearRect(0, 0, width, height);

      stars.forEach((star, index) => {
        const pulse = reduceMotion
          ? 0.65
          : 0.42 + Math.sin(frame * star.speed + star.phase) * 0.28;
        const x = star.x * width;
        const drift = reduceMotion ? 0 : (frame * star.speed * 0.18) % height;
        const y = (star.y * height - drift + height) % height;
        const color =
          index % 7 === 0
            ? isDark
              ? "247,135,206"
              : "26,69,200"
            : isDark
              ? "226,225,142"
              : "90,75,160";

        context.fillStyle = `rgba(${color}, ${Math.max(0.1, pulse)})`;

        if (index % 9 === 0) {
          context.save();
          context.translate(x, y);
          context.rotate(Math.PI / 4);
          context.fillRect(-star.size, -star.size, star.size * 2, star.size * 2);
          context.restore();
        } else {
          context.beginPath();
          context.arc(x, y, star.size, 0, Math.PI * 2);
          context.fill();
        }
      });

      frame += 1;
      animation = window.requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animation);
    };
  }, []);

  return <canvas ref={canvasRef} className="cosmic-layer" aria-hidden="true" />;
}
