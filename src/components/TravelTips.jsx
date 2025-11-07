import { getTravelSuggestions } from "../utils/getTravelSuggestions";

export default function TravelTips({ weather }) {
  if (!weather) return null;

  const temperature = Math.round(weather.main.temp);
  const condition = weather.weather[0].main.toLowerCase();
  const suggestion = getTravelSuggestions(temperature, condition);

  return (
    <div className="relative group max-w-md mx-auto mt-6">
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
      
      {/* Card */}
      <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-slate-700/50 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-3">
            <span className="text-3xl">💡</span>
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Travel Suggestions
            </span>
          </h3>
          <p className="text-slate-300 text-lg leading-relaxed font-medium">
            {suggestion}
          </p>
        </div>
      </div>
    </div>
  );
}
