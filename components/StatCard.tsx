import { ReactNode } from 'react';

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string | ReactNode;
}

// Bitta statistika ma'lumotni chiqaruvchi kichik karta komponenti
export default function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <div className="flex items-start gap-4 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-sm transition-all duration-300 hover:border-blue-200 dark:hover:border-slate-700 hover:shadow-md group">
      {/* Ikonka qismi */}
      <div className="p-3 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl shrink-0 group-hover:bg-blue-50 dark:group-hover:bg-slate-700 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {icon}
      </div>
      
      {/* Ma'lumot qismi */}
      <div className="flex flex-col min-w-0 justify-center min-h-[48px]">
        <span className="text-sm font-semibold tracking-wide text-slate-500 dark:text-slate-400 mb-0.5">{label}</span>
        <span className="font-bold text-slate-900 dark:text-slate-100 truncate text-base" title={typeof value === 'string' ? value : undefined}>
          {value}
        </span>
      </div>
    </div>
  );
}
