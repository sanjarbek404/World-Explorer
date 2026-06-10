'use client';

import { ArrowUpDown } from 'lucide-react';

interface SortDropdownProps {
  value: string;
  onChange: (val: string) => void;
}

// Saralash amaliyoti uchun Dropdown bo'limi
export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="relative group">
      {/* Ko'rsatkich belgisi */}
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 dark:text-slate-500 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors">
        <ArrowUpDown className="h-4 w-4" />
      </div>
      
      {/* Dropdown tanlamasi */}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 pl-11 pr-5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50 focus:border-blue-500 dark:focus:border-blue-400 shadow-sm text-slate-700 dark:text-slate-200 font-semibold cursor-pointer transition-colors"
        aria-label="Saralash turi"
      >
        <option value="name-asc" className="font-medium text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800">A-Z (Alifbo bo&apos;yicha)</option>
        <option value="pop-desc" className="font-medium text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800">Aholi (Ko&apos;pdan kamga)</option>
        <option value="pop-asc" className="font-medium text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800">Aholi (Kamdan ko&apos;pga)</option>
        <option value="area-desc" className="font-medium text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800">Maydoni (Kattadan kichikga)</option>
      </select>
    </div>
  );
}
