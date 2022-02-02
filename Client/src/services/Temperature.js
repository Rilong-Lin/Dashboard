import React, { useState } from 'react';
import "./Temperature.css"
import axios from 'axios';

const Temperature = props => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = async (e) => {
    if(e.key === 'Enter') {
        console.log(query);
        axios.post("http://localhost:8080/services/weather", {city: query})
            .then((response) => {
                setWeather(response.data.message);
                setQuery('');
            })
    }
  }
  return (
    <div className="Temperature">
        <div className="main-container">
            <input type="text"className="search"placeholder="Country Name ..."value={query}onChange={(e) => setQuery(e.target.value)}onKeyPress={search}/>
            {weather.main && (
                <div className="city">
                    <h2 className="city-name">
                        <span>{weather.name}</span>
                        <sup>{weather.sys.country}</sup>
                    </h2>
                    <div className="city-temp">
                        {Math.round(weather.main.temp)}
                        <sup>&deg;C</sup>
                    </div>
                    <div className="info">
                        <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                        <p>{weather.weather[0].description}</p>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};

export default Temperature;
