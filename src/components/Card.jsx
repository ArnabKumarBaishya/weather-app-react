import React, { useEffect, useState } from "react";
import axios from "axios";

function Card({ city }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formatTime = (timestamp, timezone) => {
    const date = new Date((timestamp + timezone) * 1000);
    return date.toUTCString().slice(-12, -4);
  };

  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5a9299a24729e96f2fceaeef20ede331&units=metric`
        );
        setData(res.data);
      } catch (err) {
        setError("❌ City not found or API error");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!data) return <p className="flex justify-center">Enter a city to get weather info</p>;

  const { main, weather, wind, sys, coord, clouds, visibility, timezone, name } = data;
  const icon = weather[0].icon;

  return (
    <div className="flex flex-row justify-center">

    <div className="max-w-md mx-auto mt-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="Weather" />
      <h3>{name}, {sys.country}</h3>
      <p><strong>🌡️ Temperature:</strong> {main.temp}°C (Feels like {main.feels_like}°C)</p>
      <p><strong>🔻 Min:</strong> {main.temp_min}°C | <strong>🔺 Max:</strong> {main.temp_max}°C</p>
      <p><strong>💧 Humidity:</strong> {main.humidity}%</p>
      <p><strong>📊 Pressure:</strong> {main.pressure} hPa</p>
      <p><strong>👁️ Visibility:</strong> {visibility / 1000} km</p>
      <p><strong>☁️ Clouds:</strong> {clouds.all}%</p>
      <p>
        <strong>🌬️ Wind:</strong> {wind.speed} m/s, Deg {wind.deg}°{" "}
        {wind.gust ? `(Gust: ${wind.gust} m/s)` : ""}
      </p>
      <p><strong>📍 Coordinates:</strong> [{coord.lat}, {coord.lon}]</p>
      <p><strong>☁️ Condition:</strong> {weather[0].main} ({weather[0].description})</p>
      <p>
        <strong>🌅 Sunrise:</strong> {formatTime(sys.sunrise, timezone)} |{" "}
        <strong>🌇 Sunset:</strong> {formatTime(sys.sunset, timezone)}
      </p>
      <p>
        <strong>🕒 Timezone:</strong> UTC {timezone / 3600 >= 0 ? "+" : ""}
        {timezone / 3600}
      </p>
    </div>
    </div>
  );
}

export default Card;
