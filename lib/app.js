const express = require("express");
const api = require("./api");


function create_app() {
    const app = express();

    app.use(express.static("static"));
    app.use("/api", api);

    // eslint-disable-next-line no-unused-vars
    app.use((request, response, next) => {
        response.status(404).json({status: 404, message: "Requested content not found."});
    });

    return app;
}

module.exports = create_app;
