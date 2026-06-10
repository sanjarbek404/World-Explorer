'use client';

import { clsx } from 'clsx'; // Classlarni qulay boshqarish uchun

interface RegionFilterProps {
  selected: string;
  onChange: (region: string) => void;
}

// Barcha hududlar (Qit'alar) ro'yxati
const REGIONS = ['Barchasi', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

// Viloyatlar (Qit'alar) bo'yicha filterlovchi komponent
export default function RegionFilter({ selected, onChange }: RegionFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 lg:gap-3">
      {REGIONS.map((region) => {
        // Aslida API dagi hudud nomiga moslashtiramiz ('Barchasi' => '')
        const regionValue = region === 'Barchasi' ? '' : region;
        // Tanlanganligini tekshirish
        const isSelected = selected === regionValue;
        
        return (
          <button
            key={region}
            onClick={() => onChange(regionValue)}
            className={clsx(
              "px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-950 duration-200",
              isSelected 
                ? "bg-slate-800 dark:bg-white text-white dark:text-slate-900 focus:ring-slate-800 dark:focus:ring-white scale-105" 
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white focus:ring-slate-300 dark:focus:ring-slate-700"
            )}
            aria-pressed={isSelected}
          >
            {region}
          </button>
        );
      })}
    </div>
  );
}
