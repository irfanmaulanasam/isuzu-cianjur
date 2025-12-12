'use client';

import { useState, useMemo, useRef, useEffect } from "react";

export default function ModelCombobox ({
  label,                  // string
  value,                  // selectedModel (string)
  onChange,               // (newValue: string) => void
  models,                 // array of { model: string, ... }
  placeholder = "Cari / pilih model...",
  className = "",
  helperText = "",
})  {
  const [query, setQuery] = useState(value || "");
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (value !== query){
        setQuery(value || "");
    }
  }, [value]);

  // filter sederhana (contains, case-insensitive)
  const filteredModels = useMemo(() => {
    if (!query) return models;
    const lower = query.toLowerCase();
    return models.filter((item) =>
      item.model.toLowerCase().includes(lower)
    );
  }, [query, models]);

  // click outside => tutup dropdown
  useEffect(() => {
    const handler = (e) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (modelName) => {
    setQuery(modelName);
    onChange?.(modelName);
    setOpen(false);
  };

  return (
    <div className="mb-6" ref={containerRef}>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">
        {label}
      </span>

      <div className="relative">
        <input
          type="text"
          value={query}
          placeholder={placeholder}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          className={
            className ||
            "w-full px-4 py-2 border border-gray-300 rounded-lg " +
              "dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 " +
              "shadow-sm focus:ring-blue-500 focus:border-blue-500 pr-10"
          }
        />

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
        >
          ▼
        </button>

        {open && (
          <div className="absolute z-20 mt-1 w-full max-h-60 overflow-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
            {filteredModels.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                Model tidak ditemukan
              </div>
            ) : (
              filteredModels.map((item) => (
                <button
                  key={item.model}
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault(); // cegah blur sebelum select
                    handleSelect(item.model);
                  }}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-100"
                >
                  {item.model}
                </button>
              ))
            )}
          </div>
        )}
      </div>
      {helperText && (
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {helperText}
        </p>
      )}
    </div>
  );
};