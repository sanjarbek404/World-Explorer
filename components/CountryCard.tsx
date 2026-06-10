import Image from 'next/image';
import Link from 'next/link';
import { Country } from '@/types';
import { formatNumber, getFlagUrl } from '@/utils/formatters';

interface CountryCardProps {
  country: Country;
}

// Bitta davlatni ro'yxatda kartochka ko'rinishida chiqaruvchi komponent
export default function CountryCard({ country }: CountryCardProps) {
  return (
    <Link href={`/country/${country.cca3}`} className="group block focus:outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 rounded-2xl rounded-t-2xl relative transition-all duration-300">
      <div className="flex flex-col bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-800 overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1 h-full relative z-10 group-hover:border-blue-200 dark:group-hover:border-slate-700">
        
        {/* Yuqori qism: Davlat bayrog'i */}
        <div className="relative w-full h-44 bg-slate-100 dark:bg-slate-800 aspect-[3/2] overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-slate-900/0 transition-colors z-10 dark:bg-white/5" />
          <Image
            src={getFlagUrl(country, 'png')}
            alt={country.flags.alt || `Flag of ${country.name.common}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </div>
        
        {/* Pastki qism: Ma'lumotlar */}
        <div className="p-6 flex-grow flex flex-col justify-between transition-colors duration-300 bg-white dark:bg-slate-900">
          <div>
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-slate-100 mb-4 leading-tight line-clamp-1 transition-colors" title={country.name.common}>
              {country.name.common}
            </h3>
            <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <p className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg">
                <span className="font-semibold text-slate-800 dark:text-slate-300">Aholi:</span> 
                <span className="font-medium text-slate-700 dark:text-slate-300">{formatNumber(country.population)}</span>
              </p>
              <p className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg">
                <span className="font-semibold text-slate-800 dark:text-slate-300">Region:</span> 
                <span className="font-medium text-slate-700 dark:text-slate-300">{country.region}</span>
              </p>
              <p className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg" title={country.capital?.[0] || 'N/A'}>
                <span className="font-semibold text-slate-800 dark:text-slate-300">Poytaxt:</span> 
                <span className="font-medium text-slate-700 dark:text-slate-300 line-clamp-1 text-right">{country.capital?.[0] || 'N/A'}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
