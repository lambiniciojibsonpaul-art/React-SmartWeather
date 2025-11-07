export function getTravelSuggestions(temp, condition) {
  if (condition.includes("rain")) {
    return "Rainy weather — pack an umbrella and plan indoor activities ☔";
  } else if (temp > 30) {
    return "Hot day — wear light clothes and stay hydrated 🕶️";
  } else if (temp > 20 && condition.includes("clear")) {
    return "Perfect for travel! Bring your camera and enjoy the sunshine 🌤️";
  } else if (temp < 15) {
    return "Cool weather — bring a jacket and warm layers 🧥";
  } else {
    return "Weather looks moderate — a great day for light outdoor activities 🚶";
  }
}
