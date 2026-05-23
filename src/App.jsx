import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const getWeather = async () => {

    if (city.trim() === "") {
      setError("Please enter a city name");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setWeather(null);

      const apiKey = "9fd5f79698f1b33ba3fb7b61507d2585";

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      const data = await response.json();

      console.log(data);

      if (response.status !== 200) {
        setError(data.message || "City not found");
      } else {
        setWeather(data);
      }

    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-all duration-500 ${
        darkMode
          ? "bg-gradient-to-r from-slate-800 to-slate-900"
          : "bg-gradient-to-r from-blue-400 to-indigo-500"
      }`}
    >

      <div
        className={`backdrop-blur-lg border shadow-2xl rounded-3xl p-8 w-full max-w-md transition-all duration-500 ${
          darkMode
            ? "bg-white/10 border-white/20 text-white"
            : "bg-white/20 border-white/30 text-white"
        }`}
      >

        {/* Header */}
        <div className="flex justify-between items-center mb-6">

          <h1 className="text-4xl font-bold">
            🌦 Weather App
          </h1>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-black/30 px-4 py-2 rounded-xl hover:scale-105 transition"
          >
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>

        </div>

        {/* Search Section */}
        <div className="flex gap-2">

          <input
            type="text"
            placeholder="Enter city"
            className="w-full p-3 rounded-xl outline-none text-black bg-white"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getWeather();
              }
            }}
          />

          <button
            onClick={getWeather}
            className="bg-black text-white px-5 rounded-xl hover:bg-gray-800 transition"
          >
            Search
          </button>

        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center mt-4 text-lg">
            Loading...
          </p>
        )}

        {/* Error */}
        {error && (
          <p className="text-red-300 text-center mt-4">
            {error}
          </p>
        )}

        {/* Weather Data */}
        {weather && weather.main && (

          <div className="mt-8 text-center">

            <h2 className="text-3xl font-bold">
              {weather.name}
            </h2>

            {/* Weather Icon */}
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Weather Icon"
              className="mx-auto"
            />

            {/* Temperature */}
            <p className="text-5xl font-bold">
              {Math.round(weather.main.temp)}°C
            </p>

            {/* Weather Info */}
            <div className="mt-6 space-y-3 text-lg">

              <p>
                💧 Humidity: {weather.main.humidity}%
              </p>

              <p>
                🌥 Condition: {weather.weather[0].main}
              </p>

              <p>
                🌬 Wind Speed: {weather.wind.speed} km/h
              </p>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default App;