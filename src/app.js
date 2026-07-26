const express = require("express");
const app = express(); // creating an instance of an server 
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());

module.exports = app ;