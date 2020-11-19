import React from "react";
import Language from "./Language";

const Country = ({ country, weather }) => {
  const { name, capital, population, languages, flag } = country;
  const { temperature, weather_icons, wind_speed, wind_dir } = weather;

  console.log("goldy", weather);
  return (
    <div>
      <h1>{name}</h1>
      <p>
        Capital: {capital}
        <br />
        Population: {population}
      </p>
      <h2>Spoken Languages</h2>
      <ul>
        {languages.map((language) => (
          <Language key={language.iso639_1} language={language.name} />
        ))}
      </ul>
      <img src={flag} alt="Flag" width="200px" />
      <h2>Weather in {capital}</h2>
      <strong>Temperature: </strong>
      {temperature} Celcius
      <br />
      <img src={weather_icons[0]} alt="Weather icon" />
      <br />
      <strong>Wind: </strong>
      {wind_speed} mph direction {wind_dir}
    </div>
  );
};

export default Country;
