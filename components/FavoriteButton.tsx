'use client';

import { Heart } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';
import { clsx } from 'clsx';

interface FavoriteButtonProps {
  cca3: string;
  countryName: string;
}

// Sevimlilarni qo'shish yoki o'chirish uchun tugma komponenti
export default function FavoriteButton({ cca3, countryName }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites();
  
  // Hydration tugallanmaguncha yuklanar ikonkani ko'rsatamiz
  if (!isLoaded) {
    return <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 animate-pulse"></div>;
  }

  const isFav = isFavorite(cca3);

  return (
    <button
      onClick={() => toggleFavorite(cca3)}
      className="p-3.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-4 focus:ring-red-100 dark:focus:ring-red-900/40 shadow-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 group"
      aria-label={isFav ? `${countryName}ni sevimlilardan o'chirish` : `${countryName}ni sevimlilarga qo'shish`}
      title={isFav ? "Sevimli emas" : "Sevimliga qo'shish"}
    >
      <Heart
        className={clsx(
          "w-6 h-6 transition-all duration-300 transform",
          isFav 
            ? "fill-red-500 text-red-500 scale-110" 
            : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 scale-100"
        )}
      />
    </button>
  );
}
