import { useState } from "react";
import WeatherSearch from "./components/WeatherSearch";
import WeatherCard from "./components/WeatherCard";
import TravelTips from "./components/TravelTips";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
      
      if (!API_KEY || API_KEY === 'your_api_key_here') {
        throw new Error("API key is missing. Please add your OpenWeatherMap API key to the .env file.");
      }

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      const data = await response.json();

      if (!response.ok) {
        if (data.message) {
          throw new Error(`Error: ${data.message}`);
        }
        throw new Error("City not found. Please try again.");
      }

      setWeather(data);
    } catch (err) {
      setError(err.message);
      console.error("Weather API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-700"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-3 tracking-tight">
            Smart Weather & Travel Planner
          </h1>
          <p className="text-slate-400 text-lg font-medium">
            Get weather updates and travel suggestions for any city ✨
          </p>
        </header>

        {/* Search Component */}
        <WeatherSearch onSearch={fetchWeather} />

        {/* Loading State */}
        {loading && <LoadingSpinner />}

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 backdrop-blur-sm border border-red-500/30 text-red-300 px-6 py-4 rounded-2xl max-w-md mx-auto mb-6 shadow-lg">
            <p className="font-medium">❌ {error}</p>
          </div>
        )}

        {/* Weather Display */}
        {!loading && !error && weather && (
          <>
            <WeatherCard weather={weather} />
            <TravelTips weather={weather} />
          </>
        )}

        {/* Footer */}
        <footer className="text-center mt-16 text-slate-400">
          <p className="text-sm">
            Built with 💙 by <span className="font-semibold text-cyan-400">Jibson Paul Lambinicio</span>
          </p>
          <p className="text-xs mt-1 text-slate-500">Powered by OpenWeatherMap API</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
