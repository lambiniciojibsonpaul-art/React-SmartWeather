export default function LoadingSpinner() {
  return (
    <div className="flex flex-col justify-center items-center py-12">
      <div className="relative">
        {/* Outer ring */}
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-cyan-500"></div>
        {/* Inner ring */}
        <div className="absolute top-2 left-2 animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500 animate-reverse"></div>
      </div>
      <p className="mt-6 text-slate-400 font-medium animate-pulse">Loading weather data...</p>
    </div>
  );
}
