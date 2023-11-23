const express = require('express');
const app =express();
require("dotenv").config({ path:"./.env" });

// Using Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));


// Importing Routes
const contacts =require("./routes/contacts")

// Using Routes
app.use("/api/v1", contacts);


module.exports = app;