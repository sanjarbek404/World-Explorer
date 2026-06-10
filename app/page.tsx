import { getAllCountries } from '@/lib/api';
import CountriesClient from '@/components/CountriesClient';

export default async function Home() {
  // Barcha davlatlar ro'yxatini API'dan olish (Server tomonda)
  const countries = await getAllCountries();

  return (
    <div className="w-full">
      {/* Client Component ga ma'lumotlarni uzatish, shu orqali saralash va filtrlash amalga oshiriladi */}
      <CountriesClient initialCountries={countries} />
    </div>
  );
}

