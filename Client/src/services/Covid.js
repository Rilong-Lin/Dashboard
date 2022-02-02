import React, { useState } from "react";
import "./Covid.css"
import axios from 'axios';

const Covid = props => {
  const [country, setCountry] = useState("");
  const [cases, setCases] = useState("");
  const [recovered, setRecovered] = useState("");
  const [deaths, setDeaths] = useState("");
  const [todayCases, setTodayCases] = useState("");
  const [userInput, setUserInput] = useState("");

  const setData = ({
    country,
    cases,
    deaths,
    recovered,
    todayCases,
  }) => {
    setCountry(country);
    setCases(cases);
    setRecovered(recovered);
    setDeaths(deaths);
    setTodayCases(todayCases);
  };

  const handleSearch = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (props) => {
    props.preventDefault();
    axios.post("http://localhost:8080/services/covid", {user: userInput})
      .then((response) => {
        setData(response.data.message);
      })
  };

  return (
    <div className="Covid">
      <div className="main-container">
        <form onSubmit={handleSubmit}>
          <input onChange={handleSearch} type="text" className="search" placeholder="Country Name ..." />
        </form>
      </div>
      <div className="country-infos">
        <p>Country Name : {country} </p>
        <p>Cases : {cases}</p>
        <p>Deaths : {deaths}</p>
        <p>Recovered : {recovered}</p>
        <p>Cases Today : {todayCases}</p>
      </div>
    </div>
  );
};

export default Covid;
