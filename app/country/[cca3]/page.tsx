import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Users, Maximize, MapPin, Globe2, Languages, Coins, Network, Navigation } from 'lucide-react';
import { getCountryByCode, getBorderCountries } from '@/lib/api';
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

  // Chegaradosh davlatlarni yuklash
  let borderCountries: import('@/types').Country[] = [];
  if (country.borders && country.borders.length > 0) {
    borderCountries = await getBorderCountries(country.borders);
  }

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

      {/* Hero Header Section */}
      <div className="relative w-full h-[400px] md:h-[500px] rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl mb-8 group border border-slate-200 dark:border-slate-800">
        <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/10 transition-colors z-10" />
        <Image
          src={getFlagUrl(country, 'svg')}
          alt={country.flags.alt || `Flag of ${country.name.common}`}
          fill
          sizes="100vw"
          className="object-cover blur-[2px] opacity-80 scale-105"
          referrerPolicy="no-referrer"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent z-10" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 z-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 sm:gap-8">
            <div className="relative w-32 h-24 sm:w-48 sm:h-32 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white/20 shrink-0 border border-slate-200">
              <Image
                src={getFlagUrl(country, 'svg')}
                alt={country.flags.alt || `Flag of ${country.name.common}`}
                fill
                sizes="(max-width: 768px) 128px, 192px"
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-2 drop-shadow-lg">
                {country.name.common}
              </h1>
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-300 drop-shadow-md">
                {country.name.official}
              </h2>
            </div>
          </div>
          
          <div className="shrink-0 flex items-center justify-center sm:justify-start gap-3 bg-slate-900/40 backdrop-blur-md p-2 rounded-2xl border border-white/20">
            {country.maps?.googleMaps && (
              <a
                href={country.maps.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-col items-center justify-center w-14 h-14 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors cursor-pointer group/nav text-[10px] font-bold"
                title="Xaritada ko'rish"
              >
                <Navigation className="w-5 h-5 mb-1 group-hover/nav:scale-110 transition-transform" />
                XARITA
              </a>
            )}
            <div className="w-px h-10 bg-white/20 mx-1"></div>
            <ShareButton countryName={country.name.common} />
            <FavoriteButton cca3={country.cca3} countryName={country.name.common} />
          </div>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Core Stats Bento Box */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-[2rem] sm:rounded-[3rem] shadow-sm border border-slate-200 dark:border-slate-800 transition-colors">
          <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <span className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">📊</span>
            Asosiy ko'rsatkichlar
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <StatCard 
              icon={<MapPin className="w-6 h-6" />} 
              label="Poytaxt" 
              value={country.capital?.[0] || 'N/A'} 
            />
            <StatCard 
              icon={<Users className="w-6 h-6" />} 
              label="Aholi" 
              value={formatNumber(country.population)} 
            />
            <StatCard 
              icon={<Maximize className="w-6 h-6" />} 
              label="Maydoni (km²)" 
              value={formatNumber(country.area)} 
            />
            <StatCard 
              icon={<Globe2 className="w-6 h-6" />} 
              label="Mintaqa" 
              value={country.region} 
            />
            <StatCard 
              icon={<Network className="w-6 h-6" />} 
              label="Quyi mintaqa" 
              value={country.subregion || 'N/A'} 
            />
            <StatCard 
              icon={<MapPin className="w-6 h-6" />} 
              label="Qit&apos;a" 
              value={country.continents ? country.continents.join(', ') : 'N/A'} 
            />
          </div>
        </div>

        {/* Identity & Culture Bento Box */}
        <div className="bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-[2rem] sm:rounded-[3rem] shadow-sm border border-slate-200 dark:border-slate-800 transition-colors flex flex-col">
          <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <span className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl">🎭</span>
            Kultura va Iqtisod
          </h3>
          <div className="flex flex-col gap-4 flex-grow">
            <StatCard 
              icon={<Languages className="w-6 h-6" />} 
              label="Tillar" 
              value={languagesList} 
            />
            <StatCard 
              icon={<Coins className="w-6 h-6" />} 
              label="Valyuta" 
              value={currenciesList} 
            />
            <StatCard 
              icon={<Globe2 className="w-6 h-6" />} 
              label="Vaqt mintaqasi" 
              value={country.timezones ? country.timezones.join(', ') : 'N/A'} 
            />
            <StatCard 
              icon={<Network className="w-6 h-6" />} 
              label="Internet Domeni" 
              value={tldList} 
            />
          </div>
        </div>

      </div>

      {/* Chegaradosh davlatlar bo'limi */}
      {borderCountries.length > 0 && (
        <div className="mt-8 bg-white dark:bg-slate-900 rounded-[2rem] sm:rounded-[3rem] shadow-sm border border-slate-200 dark:border-slate-800 p-8 sm:p-10 transition-colors duration-300">
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <span className="p-3 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-xl">🗺️</span>
            Chegaradosh davlatlar
          </h3>
          <div className="flex flex-wrap gap-4">
            {borderCountries.map((borderCountry) => (
              <BorderCountry key={borderCountry.cca3} countryData={borderCountry} />
            ))}
          </div>
        </div>
      )}

      {/* Geografik joylashuv Xaritasi */}
      {country.latlng && country.latlng.length === 2 && (
        <div className="mt-8 bg-white dark:bg-slate-900 rounded-[2rem] sm:rounded-[3rem] shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors duration-300">
          <div className="p-8 sm:p-10 pb-6">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
              <span className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl">📍</span>
              Xaritadagi joylashuvi
            </h3>
          </div>
          <div className="w-full h-[400px] relative bg-slate-100 dark:bg-slate-800">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              className="grayscale-[20%] contrast-[1.1]"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${country.latlng[1] - 10}%2C${country.latlng[0] - 10}%2C${country.latlng[1] + 10}%2C${country.latlng[0] + 10}&layer=mapnik&marker=${country.latlng[0]}%2C${country.latlng[1]}`}
            ></iframe>
          </div>
          <div className="p-6 sm:p-8 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 text-sm xl:text-base text-slate-500 dark:text-slate-400 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <span className="bg-white dark:bg-slate-900 px-4 py-2 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">Kenglik: <b className="text-slate-900 dark:text-white">{country.latlng[0].toFixed(2)}</b> / Uzunlik: <b className="text-slate-900 dark:text-white">{country.latlng[1].toFixed(2)}</b></span>
            {country.maps?.openStreetMaps && (
              <a href={country.maps.openStreetMaps} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-semibold transition-colors focus:ring-4 focus:ring-blue-500/30">
                To&apos;liq xaritani ochish <Navigation className="w-4 h-4 ml-1" />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
