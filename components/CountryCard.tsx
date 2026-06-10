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
    <Link href={`/country/${country.cca3}`} className="group block focus:outline-none focus:ring-4 focus:ring-blue-500/30 rounded-[2rem] relative transition-all duration-300">
      <div className="flex flex-col bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-500 group-hover:-translate-y-1.5 h-full relative z-10">
        
        {/* Yuqori qism: Davlat bayrog'i */}
        <div className="relative w-full h-48 bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-slate-900/0 transition-colors z-10 dark:bg-white/5" />
          <Image
            src={getFlagUrl(country, 'png')}
            alt={country.flags.alt || `Flag of ${country.name.common}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          {/* Badge */}
          <div className="absolute top-4 right-4 z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 dark:text-slate-200 shadow-sm">
            {country.cca3}
          </div>
        </div>
        
        {/* Pastki qism: Ma'lumotlar */}
        <div className="p-6 flex-grow flex flex-col justify-between bg-white dark:bg-slate-900">
          <div>
            <h3 className="font-black text-xl text-slate-900 dark:text-white mb-5 leading-tight line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" title={country.name.common}>
              {country.name.common}
            </h3>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                <span className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0 text-blue-600 dark:text-blue-400">👥</span>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">Aholi</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{formatNumber(country.population)}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                <span className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-400">🌍</span>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">Mintaqa</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{country.region}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400" title={country.capital?.[0] || 'N/A'}>
                <span className="w-8 h-8 rounded-full bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center shrink-0 text-purple-600 dark:text-purple-400">🏛️</span>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">Poytaxt</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">{country.capital?.[0] || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
