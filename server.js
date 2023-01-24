const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const create_app = require("./lib/app.js");

const argv = yargs(hideBin(process.argv))
    .usage("Usage: $0 -h [host] -p [port]")
    .option("host", {
        description: "hostname to host server at",
        type: "string",
        "alias": "h"
    })
    .option("port", {
        description: "port to host server on",
        type: "integer",
        alias: "p"
    })
    .demandOption(["host", "port"])
    .argv;

let { host, port } = argv;

const app = create_app();

const server = app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});

process.on("SIGINT", () => {
    console.log("Closing server...");
    server.close();
    process.exit();
});