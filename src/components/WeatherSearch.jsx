import { useState } from "react";

export default function WeatherSearch({ onSearch, onLocationClick }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mb-8 px-2">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur opacity-20"></div>
        <div className="relative flex flex-col sm:flex-row gap-2 bg-slate-800/50 backdrop-blur-xl rounded-3xl sm:rounded-full p-3 border border-slate-700/50 shadow-2xl">
          <div className="flex gap-2 flex-1">
            <button
              type="button"
              onClick={onLocationClick}
              className="px-4 sm:px-5 py-3 bg-slate-700/50 hover:bg-slate-700 text-cyan-400 rounded-full font-semibold transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 group"
              title="Use my location"
            >
              <span className="text-xl group-hover:animate-spin">🧭</span>
            </button>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name..."
              className="flex-1 px-4 sm:px-6 py-3 bg-transparent text-slate-100 placeholder-slate-400 focus:outline-none font-medium text-sm sm:text-base"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-full font-semibold transition-all duration-200 shadow-lg hover:shadow-cyan-500/50 hover:scale-105 active:scale-95"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
