'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useFavorites } from '@/hooks/useFavorites';
import { Country } from '@/types';
import CountryCard from '@/components/CountryCard';
import LoadingComponent from '@/components/Loading';
import { HeartCrack, Trash2 } from 'lucide-react';

// Sevimli davlatlar sahifasi komponenti (Client Component)
export default function FavoritesPage() {
  const { favorites, clearFavorites, isLoaded } = useFavorites();
  const [favoriteCountries, setFavoriteCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Komponent yuklanganda ro'yxatdagi sevimlilarga mos API ma'lumotlarini olish
  useEffect(() => {
    if (!isLoaded) return;

    let isMounted = true;

    async function loadFavorites() {
      setIsLoading(true);
      try {
        const promises = favorites.map(async (code) => {
          const response = await fetch(`/api/countries/${encodeURIComponent(code)}`);
          if (!response.ok) return null;
          return response.json() as Promise<Country>;
        });
        const results = await Promise.all(promises);

        if (isMounted) {
          setFavoriteCountries(results.filter((country): country is Country => country !== null));
        }
      } catch (error) {
        console.error("Failed to load favorites", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    if (favorites.length > 0) {
      loadFavorites();
    } else {
      // Ro'yxat bo'sh bo'lganda state ni tozalash
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFavoriteCountries([]);
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [favorites, isLoaded]);

  // Agar malumotlar olinayotgan bo'lsa
  if (!isLoaded || isLoading) {
    return <LoadingComponent />;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
          <span>❤️</span> Sevimli Davlatlar <span className="text-lg font-medium text-slate-500 dark:text-slate-400 ml-1">({favoriteCountries.length})</span>
        </h1>
        {favoriteCountries.length > 0 && (
          <button
            onClick={clearFavorites}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-red-600 dark:text-red-500 font-medium rounded-lg hover:bg-red-50 dark:hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-red-100 dark:focus:ring-red-900/40 transition-colors shadow-sm"
          >
            <Trash2 className="w-4 h-4" />
            Hammasini tozalash
          </button>
        )}
      </div>

      {favoriteCountries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteCountries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 border text-center py-24 rounded-3xl shadow-sm border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center max-w-2xl mx-auto mt-12 transition-colors duration-300">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-full mb-4">
            <HeartCrack className="w-10 h-10 text-slate-300 dark:text-slate-500" />
          </div>
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">Hali sevimli davlat qo&apos;shilmagan ❤️</h3>
          <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-sm text-center">
            Asosiy sahifaga o&apos;ting va o&apos;zingizga yoqqan davlatlarni sevimli ro&apos;yxatiga qo&apos;shing.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 transition-colors focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 shadow-sm"
          >
            Bosh sahifaga o&apos;tish
          </Link>
        </div>
      )}
    </div>
  );
}
