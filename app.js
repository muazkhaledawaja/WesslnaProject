const express = require("express");
const createError = require("http-errors");
const dotenv = require("dotenv").config();
var bodyParser = require("body-parser");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize DB
require("./initDB")();

app.get("/", (req, res) => {
    res.json({
        message: "it works now ya fgff sahar !",
        env_name: process.env.NAME,
    });
});

const CustomerRoute = require("./Routes/Customer.route");
const SellerRoute = require("./Routes/Seller.route");

app.use("/api/v1", CustomerRoute);
app.use("/api/v1", SellerRoute);

app.use(bodyParser.json()); // to support JSON-encoded bodies

app.use(express.raw());

app.use(
    bodyParser.urlencoded({
        // to support URL-encoded bodies
        extended: false,
    })
);

//404 handler and pass to error handler
app.use((req, res, next) => {
    next(new createError.NotFound());
});

//Error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server started on port " + PORT + "...");
});