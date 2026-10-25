"use client";

import { useEffect, useRef, useState } from "react";

export function PageScrollbar() {
  const [metrics, setMetrics] = useState({ top: 0, height: 0, max: 0, value: 0 });
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const drag = useRef<{ y: number; scroll: number } | null>(null);
  const hovering = useRef(false);
  const focused = useRef(false);

  const show = () => {
    setVisible(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (!drag.current && !hovering.current && !focused.current) setVisible(false);
    }, 1200);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.customScrollbar = "true";
    let frame = 0;
    const measure = () => {
      frame = 0;
      const viewport = window.innerHeight;
      const total = root.scrollHeight;
      const track = Math.max(0, viewport - 8);
      const max = Math.max(0, total - viewport);
      const height = Math.min(track, Math.max(28, track * viewport / total));
      setMetrics({ height, max, value: Math.max(0, Math.min(max, window.scrollY)), top: max ? (track - height) * Math.max(0, Math.min(max, window.scrollY)) / max : 0 });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(measure); };
    const scroll = () => { show(); schedule(); };
    const edge = (event: PointerEvent) => {
      if (event.pointerType !== "touch" && event.clientX >= window.innerWidth - 16) show();
    };
    measure();
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("wheel", show, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("pointermove", edge, { passive: true });
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      clearTimeout(timer.current);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("wheel", show);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("pointermove", edge);
      delete root.dataset.customScrollbar;
    };
  }, []);

  const finishDrag = () => { drag.current = null; show(); };
  return <div className="page-scrollbar" data-visible={visible && metrics.max > 0 ? "true" : undefined}
    hidden={metrics.max === 0} role="scrollbar" aria-label="Page scroll" aria-controls="page-content"
    aria-orientation="vertical" aria-valuemin={0} aria-valuemax={Math.round(metrics.max)}
    aria-valuenow={Math.round(metrics.value)} tabIndex={0}
    onPointerEnter={() => { hovering.current = true; show(); }}
    onPointerLeave={() => { hovering.current = false; show(); }}
    onFocus={() => { focused.current = true; show(); }}
    onBlur={() => { focused.current = false; show(); }}
    onPointerDown={event => {
      if (event.button !== 0) return;
      event.preventDefault();
      event.currentTarget.setPointerCapture(event.pointerId);
      const y = event.clientY - 4;
      if (y < metrics.top || y > metrics.top + metrics.height) {
        const travel = Math.max(1, window.innerHeight - 8 - metrics.height);
        window.scrollTo({ top: Math.max(0, Math.min(metrics.max, (y - metrics.height / 2) / travel * metrics.max)), behavior: "instant" });
      }
      drag.current = { y: event.clientY, scroll: window.scrollY };
      show();
    }}
    onPointerMove={event => {
      if (!drag.current) return;
      const travel = Math.max(1, window.innerHeight - 8 - metrics.height);
      window.scrollTo({ top: drag.current.scroll + (event.clientY - drag.current.y) * metrics.max / travel, behavior: "instant" });
    }}
    onPointerUp={finishDrag} onPointerCancel={finishDrag} onLostPointerCapture={finishDrag}
    onKeyDown={event => {
      const steps: Record<string, number> = { ArrowDown: 40, ArrowUp: -40, PageDown: innerHeight * .9, PageUp: -innerHeight * .9, " ": innerHeight * (event.shiftKey ? -.9 : .9) };
      if (event.key === "Home" || event.key === "End") {
        event.preventDefault();
        window.scrollTo({ top: event.key === "Home" ? 0 : metrics.max, behavior: "instant" });
      } else if (event.key in steps) {
        event.preventDefault();
        window.scrollBy({ top: steps[event.key], behavior: "instant" });
      }
      show();
    }}>
    <span className="page-scrollbar-thumb" style={{ height: metrics.height, transform: `translateY(${metrics.top}px)` }} />
  </div>;
}
