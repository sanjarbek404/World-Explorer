import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Users, Maximize, MapPin, Globe2, Languages, Coins, Network, Navigation } from 'lucide-react';
import { getCountryByCode } from '@/lib/api';
import { formatNumber, getFlagUrl } from '@/utils/formatters';
import FavoriteButton from '@/components/FavoriteButton';
import ShareButton from '@/components/ShareButton';
import StatCard from '@/components/StatCard';
import BorderCountry from '@/components/BorderCountry';

interface CountryPageProps {
  params: Promise<{ cca3: string }>;
}

export async function generateMetadata({ params }: CountryPageProps) {
  const resolvedParams = await params;
  const country = await getCountryByCode(resolvedParams.cca3);
  if (!country) return { title: 'Not Found | WorldExplorer' };

  return {
    title: `${country.name.common}`,
    description: `${country.name.common} haqida ma'lumot - aholi, poytaxt, tillar va valyutalar.`,
  };
}

// Bitta davlatning barcha ma'lumotlarini ko'rsatadigan sahifa komponenti (Server Component)
export default async function CountryPage({ params }: CountryPageProps) {
  const resolvedParams = await params;
  // API orqali davlat ma'lumotlarini olish
  const country = await getCountryByCode(resolvedParams.cca3);

  // Agar davlat topilmasa, 404 sahifaga yo'naltirish
  if (!country) return notFound();

  // Ma'lumotlarni xavfsiz formatlash
  const languagesList = country.languages 
    ? Object.values(country.languages).join(', ') 
    : 'N/A';
  
  const currenciesList = country.currencies 
    ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(', ') 
    : 'N/A';

  const tldList = country.tld ? country.tld.join(', ') : 'N/A';

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Orqaga qaytish tugmasi */}
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors font-medium rounded-lg px-2 py-1 -ml-2 select-none"
      >
        <ArrowLeft className="w-4 h-4" />
        ← Orqaga
      </Link>

      {/* Asosiy ma'lumotlar kartasi */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors duration-300">
        <div className="md:flex">
          {/* Bayroq qismi */}
          <div className="md:w-1/2 lg:w-2/5 p-6 sm:p-8 bg-slate-50 dark:bg-slate-950 border-r border-slate-100 dark:border-slate-800 flex items-center justify-center min-h-[300px] transition-colors duration-300">
            <div className="relative w-full shadow-lg rounded-2xl overflow-hidden aspect-[3/2] ring-1 ring-slate-200 dark:ring-slate-800">
              <Image
                src={getFlagUrl(country, 'svg')}
                alt={country.flags.alt || `Flag of ${country.name.common}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          
          {/* Ma'lumotlar qismi */}
          <div className="md:w-1/2 lg:w-3/5 p-8 lg:p-10 flex flex-col justify-center">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
              <div>
                <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">
                  {country.name.common}
                </h1>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <h2 className="text-xl text-slate-500 dark:text-slate-400 font-medium">
                    {country.name.official}
                  </h2>
                  {country.maps?.googleMaps && (
                    <a
                      href={country.maps.googleMaps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800/40 transition-colors self-start sm:self-auto"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      Xaritada ko&apos;rish
                    </a>
                  )}
                </div>
              </div>
              <div className="shrink-0 flex items-center justify-center gap-3">
                {/* Ulashish va Sevimliga qo'shish tugmalari */}
                <ShareButton countryName={country.name.common} />
                <FavoriteButton cca3={country.cca3} countryName={country.name.common} />
              </div>
            </div>

            {/* Statistika kartalari grid tizimi */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
              <div className="space-y-5">
                <StatCard 
                  icon={<MapPin className="w-5 h-5" />} 
                  label="Poytaxt" 
                  value={country.capital ? country.capital.join(', ') : 'N/A'} 
                />
                <StatCard 
                  icon={<Globe2 className="w-5 h-5" />} 
                  label="Mintaqa" 
                  value={country.region} 
                />
                <StatCard 
                  icon={<Network className="w-5 h-5" />} 
                  label="Quyi mintaqa" 
                  value={country.subregion || 'N/A'} 
                />
                <StatCard 
                  icon={<Maximize className="w-5 h-5" />} 
                  label="Maydon (km²)" 
                  value={formatNumber(country.area)} 
                />
              </div>
              <div className="space-y-5">
                <StatCard 
                  icon={<Users className="w-5 h-5" />} 
                  label="Aholi" 
                  value={formatNumber(country.population)} 
                />
                <StatCard 
                  icon={<Languages className="w-5 h-5" />} 
                  label="Tillar" 
                  value={languagesList} 
                />
                <StatCard 
                  icon={<Coins className="w-5 h-5" />} 
                  label="Valyutalar" 
                  value={currenciesList} 
                />
                <StatCard 
                  icon={<Globe2 className="w-5 h-5" />} 
                  label="Top-level domena" 
                  value={tldList} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chegaradosh davlatlar bo'limi */}
      {country.borders && country.borders.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 transition-colors duration-300">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-slate-400" />
            Chegaradosh davlatlar
          </h3>
          <div className="flex flex-wrap gap-3">
            {country.borders.map((code) => (
              <BorderCountry key={code} code={code} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
