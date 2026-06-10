import LoadingComponent from '@/components/Loading';

export default function Loading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="w-32 h-8 bg-slate-200 rounded-md"></div>
      
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden h-auto min-h-[400px]">
        <div className="md:flex">
          <div className="md:w-1/2 lg:w-2/5 p-6 bg-slate-50 border-r border-slate-100 min-h-[300px]">
            <div className="w-full h-full bg-slate-200 rounded-xl"></div>
          </div>
          <div className="md:w-1/2 lg:w-3/5 p-8 lg:p-10 space-y-6">
            <div className="space-y-3">
              <div className="h-10 bg-slate-200 rounded-lg w-1/2"></div>
              <div className="h-6 bg-slate-200 rounded-lg w-1/3"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-16 bg-slate-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
