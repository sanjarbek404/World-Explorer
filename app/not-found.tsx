import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h2 className="text-6xl font-bold tracking-tight text-slate-800 mb-4">404</h2>
      <p className="text-xl text-slate-600 mb-8">Sahifa topilmadi 🔍</p>
      <Link 
        href="/"
        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
      >
        <Home className="h-5 w-5" />
        <span>Bosh sahifaga qaytish</span>
      </Link>
    </div>
  );
}
