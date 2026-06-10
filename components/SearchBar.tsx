'use client';

import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

// Bosh sahifadagi qidiruv qismi (input qutisi)
export default function SearchBar({ value, onChange, placeholder = 'Davlat nomini qidiring...' }: SearchBarProps) {
  return (
    <div className="relative w-full sm:max-w-md group">
      {/* Qidiruv ikonasi */}
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-slate-400 dark:text-slate-500 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors" />
      </div>
      
      {/* Qidiruv inputi */}
      <input
        type="text"
        className="block w-full pl-11 pr-11 py-3 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 shadow-sm focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50 focus:border-blue-500 dark:focus:border-blue-400 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 transition-all outline-none"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      
      {/* Tozalash tugmasi (FAQAT qiymat kiritilganda chiqadi) */}
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 pr-3 my-1 flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 focus:outline-none focus:text-slate-600 dark:focus:text-slate-300 rounded-lg group"
          aria-label="Qidiruvni tozalash"
        >
          <div className="p-1 rounded-md group-hover:bg-slate-100 dark:group-hover:bg-slate-800 transition-colors">
            <X className="h-4 w-4" />
          </div>
        </button>
      )}
    </div>
  );
}
