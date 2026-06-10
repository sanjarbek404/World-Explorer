import { useState, useEffect } from 'react';

// Foydalanuvchi qidiruvga yoqqanda keraksiz API chaqiruvlari yoki ko'p ishlarni oldini oluvchi custom hook (Kechiktiruvchi)
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Belgilangan vaqtdan so'ng qiymatni o'zgartirish
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Agar vaqt o'tmasidan oldin value o'zgarsa, oldingi taymer yopiladi 
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
