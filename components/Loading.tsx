// Ma'lumotlar yuklanayotgan vaqtda ko'rsatiladigan skelet (skeleton) animatsiyasi
export default function Loading() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="flex flex-col bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
            {/* Bayroq skeleti */}
            <div className="w-full h-44 bg-slate-200 dark:bg-slate-800 animate-pulse" />
            
            {/* Ma'lumotlar skeleti */}
            <div className="p-6 space-y-5">
              <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse w-3/4" />
              <div className="space-y-3">
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md animate-pulse w-1/2" />
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md animate-pulse w-2/3" />
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md animate-pulse w-1/3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
