"use client";

import { useState, useEffect, useRef } from "react";

export default function SearchBar({ games, searchTerm, onSearch }) {
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);
  const skipNextEffect = useRef(false);

  useEffect(() => {
    if (skipNextEffect.current) {
      skipNextEffect.current = false;
      return;
    }

    if (!searchTerm) {
      setSuggestions([]);
      return;
    }

    const term = searchTerm.toLowerCase();

    // Build matches, then de-duplicate
    const matchesRaw = games
      .map((g) => (g.title ?? "").trim())
      .filter((t) => t.toLowerCase().includes(term));

    const seen = new Set();
    const matches = [];
    for (const t of matchesRaw) {
      const key = t.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        matches.push(t);
      }
    }

    // If the only matches are duplicates of the exact same title, hide the list
    if (matches.length > 0 && matches.every((m) => m.toLowerCase() === term)) {
      setSuggestions([]);
    } else {
      setSuggestions(matches.slice(0, 5));
    }
  }, [searchTerm, games]);

  const handleSelect = (title) => {
    // prevent the next effect run from regenerating suggestions
    skipNextEffect.current = true;
    onSearch(title);
    setSuggestions([]);
    inputRef.current?.blur();
  };

  return (
    <div className="relative w-full sm:w-64">
      <input
        ref={inputRef}
        type="text"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search titles..."
        className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring"
      />

      {suggestions.length > 0 && (
        <ul className="absolute z-50 w-full bg-white border rounded mt-1 max-h-40 overflow-auto shadow-lg">
          {suggestions.map((title) => (
            <li
              key={title.toLowerCase()}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect(title);
              }}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
