'use client';

import { clsx } from 'clsx'; // Classlarni qulay boshqarish uchun

interface RegionFilterProps {
  selected: string;
  onChange: (region: string) => void;
}

// Barcha hududlar (Qit'alar) ro'yxati
const REGIONS = ['Barchasi', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

// Region (Qit'alar) bo'yicha filterlovchi komponent
export default function RegionFilter({ selected, onChange }: RegionFilterProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Mintaqalar:</h3>
      <div className="flex flex-wrap items-center gap-2 lg:gap-3 bg-white dark:bg-slate-900 p-2 rounded-[1.5rem] border border-slate-200 dark:border-slate-800 shadow-sm w-fit">
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
                "px-5 py-2.5 rounded-full text-sm font-bold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 duration-300",
                isSelected 
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-100" 
                  : "bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
              )}
              aria-pressed={isSelected}
            >
              {region}
            </button>
          );
        })}
      </div>
    </div>
  );
}
