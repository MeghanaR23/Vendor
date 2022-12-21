require("dotenv").config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router= require('./src/router');
const path = require("path");

const app = express();
const port = process.env.PORT || 4545;
app.use(express.json());
app.use(cors());
app.use(router);

app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function(_, res) {
    res.sendFile(
        path.join(__dirname, "./client/build/index.html"),
        function (err) {
            if(err) {
                res.status(500).send(err)
            }
        }
    )
})

mongoose.connect(process.env.MONGO_URI).then(() =>{
console.log('Start at the port '+port);
app.listen(port);
})

module.exports = app;