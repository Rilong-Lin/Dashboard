const cors = require('cors');
const express = require('express');
const axios = require('axios');
const app = express.Router();

app.post("/weather", (req, res) => {
    const API_KEY = '429736441cf3572838aa10530929f7cd';
    let City = req.body.city;
    console.log(City);
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${City}&units=metric&appid=${API_KEY}`;
    axios.get(URL)
        .catch(error => {
            console.log("error in serveur")
        })
        .then((response) => {
            console.log(response.data)
            return res.send({
                message: response.data,
                status:200
            })
        })
})

app.post("/covid", (req, res) => {
    let userInput = req.body.user;
    const URL = `https://disease.sh/v3/covid-19/countries/${userInput}`;

    axios.get(URL)
        .catch(error => {
            console.log(error);
        })
        .then((response) => {
            console.log(response.data);
            return res.send({
                message: response.data,
                status: 200
            })
        })
})

app.post("/currency", (req, res) => {
    let from = req.body.currency;
    const URL = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`;

    axios.get(URL)
        .catch(error => {
            console.log(error);
        })
        .then((response) => {
            console.log(response.data);
            return res.send({
                message: response.data,
                status: 200
            })
        })
})

module.exports = app;
