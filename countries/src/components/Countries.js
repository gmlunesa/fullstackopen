import React from "react";

const Countries = ({ countries, onClick }) => {
  return countries.map((country) => (
    <div key={country.name}>
      {country.name}
      <button onClick={() => onClick(country)}>Show</button>
    </div>
  ));
};

export default Countries;
