import type {Metadata} from 'next';
import Link from 'next/link';
import './globals.css'; // Global styles
import { ThemeProvider } from '@/components/ThemeProvider';
import ThemeToggle from '@/components/ThemeToggle';
import ScrollToTop from '@/components/ScrollToTop';

export const metadata: Metadata = {
  title: {
    default: 'WorldExplorer',
    template: '%s | WorldExplorer',
  },
  description: "Dunyo Davlatlari Ma'lumotlar Platformasi - Butun dunyo davlatlari haqida to'liq va eng so'nggi ma'lumotlar. Poytaxtlar, aholi, mintaqalar va valyutalar ro'yxati.",
  keywords: ['world', 'countries', 'geography', 'rest countries', 'uzbekistan', 'davlatlar', 'dunyo xaritasi', 'aholi', 'poytaxtlar', 'sanjarbek otabekov'],
  authors: [{ name: 'Sanjarbek Otabekov' }],
  creator: 'Sanjarbek Otabekov',
  openGraph: {
    type: 'website',
    locale: 'uz_UZ',
    url: 'https://world-explorer.vercel.app',
    title: 'WorldExplorer',
    description: "Dunyo davlatlari haqida ma'lumotlar platformasi.",
    siteName: 'WorldExplorer',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {/* Asosiy Yuqori Navbar */}
          <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/60 dark:border-slate-800/60 shadow-sm backdrop-blur-md transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                
                {/* Sayt Logotipi */}
                <Link href="/" className="flex items-center gap-2 group">
                  <span className="text-2xl transition-transform group-hover:scale-110">🌍</span>
                  <span className="font-bold text-xl tracking-tight text-slate-800 dark:text-slate-100">
                    WorldExplorer
                  </span>
                </Link>
                
                {/* Navigatsiya Linklari */}
                <div className="flex items-center space-x-6">
                  <nav className="flex space-x-4 sm:space-x-6">
                    <Link 
                      href="/" 
                      className="text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors"
                    >
                      Bosh sahifa
                    </Link>
                    <Link 
                      href="/favorites" 
                      className="text-sm font-medium text-slate-600 hover:text-red-500 dark:text-slate-300 dark:hover:text-red-400 transition-colors flex items-center gap-1"
                    >
                      <span>Sevimlilar</span>
                      <span className="text-red-400">❤️</span>
                    </Link>
                  </nav>
                  
                  {/* Qorong'u/Yorug' Rejim Tugmasi */}
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </header>

          {/* Asosiy Kontent Bo'limi */}
          <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
            {children}
          </main>

          <ScrollToTop />

          {/* Sayt Podvali (Footer) */}
          <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-auto py-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center space-y-2">
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                REST Countries API • Next.js bilan qurilgan
              </p>
              <p className="text-slate-400 dark:text-slate-500 text-xs">
                © {new Date().getFullYear()} Sanjarbek Otabekov tomonidan tayyorlandi
              </p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
