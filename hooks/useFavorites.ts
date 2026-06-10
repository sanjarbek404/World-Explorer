'use client';

import { useState, useEffect } from 'react';

// Sevimli davlatlarni LocalStorage da saqlab turuvchi custom hook
export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  // LocalStorage dan ma'lumotlar o'qib olinganini tekshirish uchun (Hydration hatoligini oldini olish maqsadida)
  const [isLoaded, setIsLoaded] = useState(false);

  // Komponent birinchi marta o'rnatilganda LocalStorage dagi ma'lumotlarni o'qiymiz
  useEffect(() => {
    try {
      const stored = localStorage.getItem('worldExplorerFavorites');
      if (stored) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFavorites(JSON.parse(stored));
      }
    } catch (e) {
      console.error('LocalStorage dan oqishda xatolik:', e);
    }
    setIsLoaded(true);
  }, []);

  // Sevimlilar ro'yxati o'zgarsa, darhol LocalStorage ga saqlaymiz
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('worldExplorerFavorites', JSON.stringify(favorites));
    }
  }, [favorites, isLoaded]);

  // Davlatni sevimlilarga qo'shish yoki olib tashlash
  const toggleFavorite = (cca3: string) => {
    setFavorites((prev) => 
      prev.includes(cca3) 
        ? prev.filter((code) => code !== cca3)  // Agar mavjud bo'lsa o'chiramiz
        : [...prev, cca3] // Aks holda qo'shamiz
    );
  };

  // Davlat sevimlilar qatorida bormi yoki yo'qligini tekshirish
  const isFavorite = (cca3: string) => favorites.includes(cca3);
  
  // Barcha sevimlilarni tozalash amaliyoti
  const clearFavorites = () => setFavorites([]);

  return { favorites, toggleFavorite, isFavorite, clearFavorites, isLoaded };
}
