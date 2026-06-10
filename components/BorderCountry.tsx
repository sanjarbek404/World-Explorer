import Link from 'next/link';
import Image from 'next/image';
import { Country } from '@/types';
import { getFlagUrl } from '@/utils/formatters';

interface BorderCountryProps {
  countryData: Country;
}

// Chegaradosh davlat sahifasiga o'tkazuvchi tugma komponenti
export default function BorderCountry({ countryData }: BorderCountryProps) {
  return (
    <Link 
      href={`/country/${countryData.cca3}`}
      className="inline-flex items-center gap-3 pr-5 pl-2 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-full text-base font-bold text-slate-700 dark:text-slate-300 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-blue-300 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all duration-300 group hover:-translate-y-0.5"
    >
      <div className="relative w-8 h-8 rounded-full overflow-hidden shadow-sm shrink-0 border border-slate-100 dark:border-slate-700">
        <Image
          src={getFlagUrl(countryData, 'svg')}
          alt={countryData.name.common}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <span className="truncate max-w-[150px] sm:max-w-none">{countryData.name.common}</span>
    </Link>
  );
}

