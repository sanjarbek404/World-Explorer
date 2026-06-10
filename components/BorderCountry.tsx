import Link from 'next/link';

interface BorderCountryProps {
  code: string;
}

// Chegaradosh davlat sahifasiga o'tkazuvchi tugma komponenti
export default function BorderCountry({ code }: BorderCountryProps) {
  return (
    <Link 
      href={`/country/${code}`}
      className="inline-flex items-center justify-center px-5 py-2.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-blue-300 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all duration-300"
    >
      {code}
    </Link>
  );
}
