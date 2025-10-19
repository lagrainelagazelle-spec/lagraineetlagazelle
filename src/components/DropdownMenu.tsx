"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function DropdownMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (!rootRef.current) return;
      const target = event.target as Node;
      if (!rootRef.current.contains(target)) {
        setOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside, { passive: true });
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const close = () => setOpen(false);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="text-sm font-bold px-4 py-2 rounded-md border-2 border-brand-primary border-[#1AA39A] text-brand-primary text-[#1AA39A] bg-transparent hover:bg-brand-primary hover:bg-[#1AA39A] hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-secondary"
      >
        Menu
      </button>
      {open && (
        <div className="menu-panel absolute left-0 mt-2 w-56 rounded-md border border-gray-200 bg-white shadow-lg z-50">
          <div className="py-2">
            <Link href="/menu#menu-top" onClick={close} className="block px-3 py-2 text-sm font-semibold hover:bg-gray-50">
              La Graine
            </Link>
            <Link href="/menu#la-graine" onClick={close} className="block px-6 py-2 text-sm hover:bg-gray-50">
              Couscous
            </Link>
            <Link href="/menu#les-tajines" onClick={close} className="block px-6 py-2 text-sm hover:bg-gray-50">
              Tajines
            </Link>
            <div className="mt-2 border-t" />
            <Link href="/menu#la-gazelle" onClick={close} className="block px-3 py-2 text-sm font-semibold hover:bg-gray-50">
              La Gazelle
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}


