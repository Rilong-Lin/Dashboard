const cors = require('cors');
const express = require('express');
const PORT = process.env.PORT || 8080;
var requestIp = require('request-ip');
var moment = require('moment');
var mongoose = require('mongoose');

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use(cors())

const uri = "mongodb+srv://lucasnora:lucasnoradashboard@cluster0.fl8qw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const uri = "mongodb+srv://rilongrobin:azerty@cluster0.im9ii.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true});
const connection = mongoose.connection;
connection.once('open',() => {
    console.log("Connexion to db is done");
});

app.get('/', (req, res) => {
    res.json({ message: "From server!" });
})

app.get('/about.json', (req, res) => {
    var ip = requestIp.getClientIp(req);
    res.json({
        "client": {
            "host": ip,
        },
        "server": {
            "current_time": moment().unix(),
            "services": [{
                "name": "weather",
                "widgets": [{
                    "name": "display_temperature",
                    "description": "Display city temperature",
                    "params": [{
                        "name": "city",
                        "type": "string"
                    },
                    {
                        "name": "refresh_time",
                        "type": "integer"
                    }]
                },
                {
                    "name": "covid_tracker",
                    "description": "Display covid tracker",
                    "params": [{
                        "name": "country",
                        "type": "string"
                    },
                    {
                        "name": "refresh_time",
                        "type": "integer"
                    }]
                },
                {
                    "name": "money_converter",
                    "description": "Display currency converter",
                    "params": [{
                        "name": "number",
                        "type": "int"
                    },
                    {
                        "name": "refresh_time",
                        "type": "integer"
                    }]
                },
                {
                    "name": "spotify",
                    "description": "Display Spotify user playlists",
                    "params": [{
                        "name": "playlist",
                        "type": "string"
                    },
                    {
                        "name": "description",
                        "type": "string"
                    },
                    {
                        "name": "refresh_time",
                        "type": "integer"
                    }]
                },
                {
                    "name": "youtube",
                    "widgets": [{
                        "name": "youtube_sub_like",
                        "description": "Display video/youtube's sub and like",
                        "params": [{
                            "name": "video",
                            "type": "string"
                        },
                        {
                            "name": "youtuber",
                            "type": "string"
                        },
                        {
                            "name": "refresh_time",
                            "type": "integer"
                        }]
                    },
                    {
                        "name": "youtube_last_video",
                        "description": "Display last youtuber video",
                        "params": [{
                            "name": "video",
                            "type": "string"
                        },
                        {
                            "name": "refresh_time",
                            "type": "integer"
                        }]
                    }]
                },
            ]
        }]
    }})
})

const services = require("./services");
const user = require("./connexion");
app.use('/services', services);
app.use('/user', user);

// app.get('/', (req, res) => {
//   let dbStatus = getDb() ? 'connected' : 'not connected'
//   res.send(`Server running. MongoDB status: ${dbStatus}`)
// })

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
