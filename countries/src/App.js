import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Country from "./components/Country";
import Countries from "./components/Countries";

const App = () => {
  const weather_api_key = process.env.REACT_APP_WEATHER_API_KEY;

  const [countries, setCountries] = useState([]);
  const [newSearch, setNewSearch] = useState("");
  const [countriesResults, setCountriesResults] = useState([]);
  const [countryToShow, setCountryToShow] = useState({});
  const [countryToShowWeather, setCountryToShowWeather] = useState({});
  const [city, setCity] = useState("");

  // Define countries-fetch hook
  // Returns an array of country objects
  const countriesHook = () => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  };

  // Define weather-fetch hook
  // Returns an array of weather object
  const weatherHook = () => {
    // Do not send API query if no city is chosen
    if (city !== "") {
      const weatherQuery = `http://api.weatherstack.com/current?access_key=${weather_api_key}&query=${city}`;
      axios.get(weatherQuery).then((response) => {
        console.log("this", response.data.current, response);
        setCountryToShowWeather(response.data.current);
      });
    }
  };

  useEffect(countriesHook, []);
  useEffect(weatherHook, [city, weather_api_key]);

  // This function is called when there are changes in the search box
  const handleSearchChange = (event) => {
    setNewSearch(event.target.value);

    // Reset values
    setCountryToShow({});
    setCountryToShowWeather({});
    setCity("");

    // Store matching country objects here
    let countryNamesToShow = [];

    // Only get the matching countries if the input is not blank
    if (event.target.value !== "") {
      // Call getCountries function to retrieve an array of matching country objects
      const countriesResult = getCountries(event.target.value);

      // Only push country objects if their total is at least 1, but not more than 10
      if (countriesResult.length >= 1 && countriesResult.length <= 10) {
        countriesResult.forEach((countryResult) => {
          countryNamesToShow.push(countryResult);
        });

        // If country object is the lone result, set country to show and city specifically
        if (countriesResult.length === 1) {
          setCountryToShow(countriesResult[0]);
          setCity(countriesResult[0].capital);
        }
      }
    }

    setCountriesResults(countryNamesToShow);
  };

  // This function returns an array of matching country objects
  const getCountries = (value) => {
    return countries.filter((country) =>
      country.name.toLowerCase().includes(value.toLowerCase())
    );
  };

  // This function is called when show button is clicked; set country to show and city specifically
  const handleButtonClick = (country) => {
    setCountryToShow(country);
    setCity(country.capital);
  };

  return (
    <div className="App">
      <header className="App-header"></header>
      <Filter value={newSearch} onChange={handleSearchChange} />
      {countriesResults.length === 0 ? (
        <p>Nothing to see here</p>
      ) : countriesResults.length === 1 ? (
        <br />
      ) : (
        <Countries countries={countriesResults} onClick={handleButtonClick} />
      )}

      {Object.entries(countryToShow).length !== 0 &&
      Object.entries(countryToShowWeather).length !== 0 ? (
        <Country country={countryToShow} weather={countryToShowWeather} />
      ) : (
        <br />
      )}
    </div>
  );
};

export default App;
