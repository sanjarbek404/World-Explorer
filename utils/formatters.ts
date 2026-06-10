import { Country } from '@/types';

// Sonlarni qulayroq formatda ko'rsatuvchi funksiya (Masalan: 1234567 -> 1,234,567)
export function formatNumber(num: number | undefined): string {
  if (num === undefined || num === null) return 'N/A';
  return new Intl.NumberFormat('en-US').format(num);
}

// Buzuq yoki taqiqlangan manbalardan bayroqlarni o'rniga flagcdn'dan chiroyli bayroqlarni tortib keluvchi yordamchi funksiya
export function getFlagUrl(country: Country, type: 'png' | 'svg' = 'png'): string {
  let url = type === 'png' ? country.flags?.png : country.flags?.svg;
  
  if (!url) {
    url = country.flags?.png || country.flags?.svg;
  }
  
  // Wikimedia linklarida ayrim muammolar yoki blocklar bo'lishi mumkinligi bois
  // Barqaror qadalgan (fallback) manbadan foydalanish tavsiya etiladi (flagcdn)
  if (url && url.includes('upload.wikimedia.org')) {
    if (country.cca2) {
      return type === 'png' 
        ? `https://flagcdn.com/w320/${country.cca2.toLowerCase()}.png`
        : `https://flagcdn.com/${country.cca2.toLowerCase()}.svg`;
    }
  }
  return url || '';
}
