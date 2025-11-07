import { useState, useEffect } from "react";

export default function WeatherCard({ weather }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!weather) return null;

  const { name, main, weather: weatherData, sys, timezone } = weather;
  const temperature = Math.round(main.temp);
  const condition = weatherData[0].main;
  const description = weatherData[0].description;
  const humidity = main.humidity;
  const icon = weatherData[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

  // Calculate local time for the city
  const cityTime = new Date(currentTime.getTime() + (timezone * 1000));
  const hours = cityTime.getUTCHours();
  const minutes = cityTime.getUTCMinutes();
  const seconds = cityTime.getUTCSeconds();
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  const formattedDate = cityTime.toUTCString().split(' ').slice(0, 4).join(' ');

  return (
    <div className="relative group max-w-md mx-auto mb-6">
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
      
      {/* Card */}
      <div className="relative bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-slate-700/50 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          {/* Location & Time */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-3xl font-bold text-slate-100 flex items-center gap-2">
                📍 {name}, {sys.country}
              </h2>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-slate-400 capitalize text-lg">{description}</p>
              <div className="text-right">
                <p className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent tabular-nums">
                  ⏰ {formattedTime}
                </p>
                <p className="text-xs text-slate-500 mt-1">{formattedDate}</p>
              </div>
            </div>
          </div>

          {/* Weather Icon & Temperature */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-xl opacity-30"></div>
                <img src={iconUrl} alt={condition} className="w-32 h-32 relative drop-shadow-2xl" />
              </div>
              <div>
                <p className="text-7xl font-bold bg-gradient-to-br from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {temperature}°
                </p>
                <p className="text-slate-400 text-lg mt-1">
                  Feels like {Math.round(main.feels_like)}°C
                </p>
              </div>
            </div>
          </div>

          {/* Weather Details */}
          <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-700/50">
            <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-700/30">
              <p className="text-slate-400 text-xs mb-1">Humidity</p>
              <p className="text-xl font-bold text-cyan-400">💧 {humidity}%</p>
            </div>
            <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-700/30">
              <p className="text-slate-400 text-xs mb-1">Condition</p>
              <p className="text-xl font-bold text-purple-400">🌤️ {condition}</p>
            </div>
            <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-700/30">
              <p className="text-slate-400 text-xs mb-1">Timezone</p>
              <p className="text-xl font-bold text-pink-400">🌍 UTC{timezone >= 0 ? '+' : ''}{(timezone / 3600).toFixed(0)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
