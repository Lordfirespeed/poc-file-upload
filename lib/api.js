const express = require("express");
const bodyParser = require("body-parser");

const api_router = express.Router();

api_router.use(bodyParser.json({ extended: false }));

api_router.route("/")
    .get((request, response) => {
        response.status(400);
        response.json({status: 400, message: "Please specify a method."});
    });

api_router.route("/*")
    .all((request, response) => {
        response.status(400).json({status: 400, message: "Unknown API route or wrong request method."});
    });

module.exports = api_router;
