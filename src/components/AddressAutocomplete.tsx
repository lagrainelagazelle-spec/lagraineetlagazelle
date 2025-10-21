"use client";

import { useEffect, useRef, useState } from "react";

interface AddressAutocompleteProps {
  value: string;
  onChange: (next: string) => void;
  onSelect?: (addr: {
    label: string;
    housenumber?: string;
    street?: string;
    postcode?: string;
    city?: string;
  }) => void;
  placeholder?: string;
  id?: string;
}

type AdresseFeature = {
  properties: {
    label: string;
    housenumber?: string;
    street?: string;
    postcode?: string;
    city?: string;
  };
};

export default function AddressAutocomplete({ value, onChange, onSelect, placeholder, id }: AddressAutocompleteProps) {
  const [query, setQuery] = useState<string>(value || "");
  const [suggestions, setSuggestions] = useState<AdresseFeature["properties"][]>([]);
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const debounceRef = useRef<number | null>(null);

  useEffect(() => {
    setQuery(value || "");
  }, [value]);

  useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      if (!containerRef.current) return;
      const t = e.target as Node;
      if (!containerRef.current.contains(t)) setOpen(false);
    };
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler, { passive: true });
    document.addEventListener("keydown", keyHandler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
      document.removeEventListener("keydown", keyHandler);
    };
  }, []);

  const performSearch = async (q: string) => {
    if (!q || q.trim().length < 3) {
      setSuggestions([]);
      return;
    }
    try {
      const url = `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(q)}&limit=5`;
      const res = await fetch(url);
      const data = await res.json();
      const list = (data?.features as AdresseFeature[] | undefined)?.map((f) => f.properties) || [];
      setSuggestions(list);
      setOpen(list.length > 0);
      setHighlight(-1);
    } catch {
      // ignore network errors silently
    }
  };

  const onInputChange = (next: string) => {
    setQuery(next);
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => performSearch(next), 250);
  };

  const selectAddress = (props: AdresseFeature["properties"]) => {
    onChange(props.label);
    if (onSelect) onSelect({
      label: props.label,
      housenumber: props.housenumber,
      street: props.street,
      postcode: props.postcode,
      city: props.city,
    });
    setQuery(props.label);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => (h + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => (h - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter") {
      if (highlight >= 0 && highlight < suggestions.length) {
        e.preventDefault();
        selectAddress(suggestions[highlight]);
      }
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <input
        id={id}
        value={query}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyDown={onKeyDown}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-brand-secondary focus:border-brand-secondary sm:text-sm"
      />
      {open && suggestions.length > 0 && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
          <ul className="py-1 max-h-64 overflow-auto">
            {suggestions.map((s, idx) => (
              <li key={`${s.label}-${idx}`}>
                <button
                  type="button"
                  onClick={() => selectAddress(s)}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${highlight === idx ? 'bg-gray-50' : ''}`}
                >
                  <span className="block font-medium">{s.label}</span>
                  {(s.postcode || s.city) && (
                    <span className="block text-xs text-brand-text/70">{[s.postcode, s.city].filter(Boolean).join(' ')}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}


