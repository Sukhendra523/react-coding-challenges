import React, { useCallback, useState } from "react";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = process.env.REACT_APP_WEATHER_API_KEY; // Replace with your OpenWeatherMap API key
  const fetchWeatherData = async (city) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error("City not found or API error. Please try again.");
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city) {
      fetchWeatherData(city);
    } else {
      setError("Please enter a city.");
    }
  };

  const handleInputChange = useCallback((e) => {
    setCity(e.target.value);
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>5 day weather forecast</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={handleInputChange}
          style={{ padding: "10px", marginRight: "10px" }}
        />
        <button type="submit" style={{ padding: "10px" }}>
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weatherData && (
        <div style={{ marginTop: "20px" }}>
          <h2>Current Weather in {weatherData.city.name}</h2>
          <p>Temperature: {weatherData.list[0].main.temp} °C</p>
          <p>Weather: {weatherData.list[0].weather[0].description}</p>

          <h3>5-Day Forecast</h3>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {weatherData.list.map((item, index) =>
              // (every 3 hour forecasting) 24h/3h == 8 weather forecast for each day
              // i.e. 0th index have first day weather forecast
              // ==> hence next day weather forcast will lies on 8th index
              index % 8 === 0 ? (
                <div
                  key={index}
                  style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    margin: "5px",
                  }}
                >
                  <p>{new Date(item.dt_txt).toLocaleDateString()}</p>
                  <p>Temp: {item.main.temp} °C</p>
                  <p>{item.weather[0].description}</p>
                </div>
              ) : null
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
