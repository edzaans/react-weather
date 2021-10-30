// Import React and useState
import React, { useState } from "react";
import "./App.css";

// Declare api object with base URL and API key
const api = {
  key: "b62b1c5840125235c66e675bf10ce482",
  base: "http://api.openweathermap.org/data/2.5/",
};

// ------------------ Main function ----------------------

function App() {
  // Create state for search query
  const [query, setQuery] = useState("");
  // Create state for weather Object
  const [weather, setWeather] = useState({});

  // Declare Search event
  const search = (event) => {
    // Set event on key press
    if (event.key === "Enter") {
      // Fetch data from API using "api object" declared above
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          // Console log for troubleshooting returned data
          console.log(result.name);
        });
    }
  };

  //Declare months
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    // Declare days
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    // Assign returned data to variables
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    // Returns current date as a string
    return `${day} ${date} ${month} ${year}`;
  };

  // Main return function
  return (
    <div
      // Check if search field is NOT empty, assign CSS classes accordingly
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 15
            ? "app warm"
            : "app"
          : "app"
      }
    >
      {/* Create HTML elements */}
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            name=""
            id=""
            placeholder="Search..."
            /* Set query value from search bar with entered value */
            onChange={(e) => {
              return setQuery(e.target.value);
            }}
            value={query}
            /* Run search function on key press */
            onKeyPress={search}
          />
        </div>
        {/* Check if returned data object is NOT empty */}
        {typeof weather.main != "undefined" ? (
          /* Display returned data */
          <div>
            <div className="location-container">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}c</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
