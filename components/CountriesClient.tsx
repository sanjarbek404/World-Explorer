'use client';

import { useState, useMemo } from 'react';
import { Country } from '@/types';
import CountryCard from './CountryCard';
import SearchBar from './SearchBar';
import RegionFilter from './RegionFilter';
import SortDropdown from './SortDropdown';
import { useDebounce } from '@/hooks/useDebounce';

interface CountriesClientProps {
  initialCountries: Country[];
}

// Bosh sahifadagi barcha ma'lumotlarni interaktiv ko'rsatish (Qidiruv, Filtr, Saralash) qismi
export default function CountriesClient({ initialCountries }: CountriesClientProps) {
  // Qidiruv va filtrlash uchun statelar
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [sortBy, setSortBy] = useState('name-asc');
  
  // Qidiruv inputidagi o'zgarishlarni biroz kechiktirib (debounce) amaliyotga tadbiq etish
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Filter va Saralash mantiqiy jarayoni (useMemo orqali keshlab qo'yiladi)
  const filteredCountries = useMemo(() => {
    let result = [...initialCountries];

    // 1. Region(Mintaqa) bo'yicha filter
    if (selectedRegion) {
      result = result.filter((c) => c.region === selectedRegion);
    }

    // 2. Qidiruv bo'yicha filter
    if (debouncedSearch) {
      const lowerQuery = debouncedSearch.toLowerCase();
      result = result.filter((c) => 
        c.name.common.toLowerCase().includes(lowerQuery) || 
        (c.name.official && c.name.official.toLowerCase().includes(lowerQuery))
      );
    }

    // 3. Natijalarni saralash (Sort)
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.common.localeCompare(b.name.common);
        case 'pop-desc':
          return b.population - a.population;
        case 'pop-asc':
          return a.population - b.population;
        case 'area-desc':
          return (b.area || 0) - (a.area || 0);
        default:
          return 0;
      }
    });

    return result;
  }, [initialCountries, selectedRegion, debouncedSearch, sortBy]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Yuqori qism: Qidiruv va Filtr */}
      <div className="flex flex-col gap-8">
        
        {/* Banner qismi */}
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 dark:bg-slate-950 px-8 py-12 md:py-16 sm:px-12 isolate shadow-lg border border-slate-800 transition-colors duration-300">
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#3b82f6] to-[#93c5fd] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-xl">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
                Dunyo bo&apos;ylab <span className="text-blue-400">sayohat</span>
              </h1>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                Butun dunyo davlatlari haqida to&apos;liq, eng so&apos;nggi va qiziqarli ma&apos;lumotlar platformasi. Poytaxtlar, aholi soni va geografik joylashuv bilan tanishing.
              </p>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-white font-medium border border-white/10 ring-1 ring-inset ring-white/20">
                <span className="text-xl">🌍</span> 
                {filteredCountries.length} ta davlat topildi
              </div>
            </div>
            
            {/* Qidiruv va Saralash qirrasi */}
            <div className="w-full md:w-[28rem] flex flex-col gap-4">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
              <SortDropdown value={sortBy} onChange={setSortBy} />
            </div>
          </div>
        </div>

        <div className="pt-2">
          {/* Mintaqa filtri */}
          <RegionFilter selected={selectedRegion} onChange={setSelectedRegion} />
        </div>
      </div>

      {/* Natijalar ko'rinishi */}
      {filteredCountries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8">
          {filteredCountries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      ) : (
        // Natija topilmaganda
        <div className="bg-white dark:bg-slate-900 border text-center py-24 rounded-3xl shadow-sm border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center transition-colors duration-300">
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-full mb-4">
            <p className="text-4xl">🔍</p>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Davlat topilmadi</h3>
          <p className="text-slate-500 dark:text-slate-400">Qidiruv so&apos;zini yoki filtrni o&apos;zgartirib ko&apos;ring.</p>
        </div>
      )}
    </div>
  );
}
