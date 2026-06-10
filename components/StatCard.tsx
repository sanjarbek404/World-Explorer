import { ReactNode } from 'react';

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string | ReactNode;
}

// Bitta statistika ma'lumotni chiqaruvchi kichik karta komponenti
export default function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <div className="flex flex-col items-start gap-3 p-5 rounded-3xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 transition-all duration-300 hover:border-blue-200 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-900 group">
      
      {/* Ma'lumot qismi */}
      <div className="flex flex-col min-w-0 w-full">
        <span className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">{label}</span>
        <span className="font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-slate-100 truncate w-full" title={typeof value === 'string' ? value : undefined}>
          {value}
        </span>
      </div>
    </div>
  );
}
