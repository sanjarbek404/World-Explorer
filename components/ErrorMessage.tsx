import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

// Xatolik yuz berganda ekranda chiqadigan komponent
export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-2xl p-8 flex flex-col items-center text-center max-w-lg mx-auto mt-12 mb-12 shadow-sm transition-colors duration-300">
      <div className="bg-red-100 dark:bg-red-900/50 p-4 rounded-full mb-5">
        <AlertTriangle className="h-10 w-10 text-red-600 dark:text-red-400" />
      </div>
      <h3 className="text-xl font-bold text-red-900 dark:text-red-400 mb-3">Xatolik yuz berdi</h3>
      <p className="text-red-700 dark:text-red-300 mb-8 font-medium">{message}</p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 dark:bg-red-700 text-white font-semibold rounded-xl hover:bg-red-700 dark:hover:bg-red-600 transition-colors focus:ring-4 focus:ring-red-100 dark:focus:ring-red-900 shadow-sm"
        >
          <RefreshCcw className="h-5 w-5" />
          <span>Qayta urinish</span>
        </button>
      )}
    </div>
  );
}
