const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer({dest: "upload"});  // specify the location for uploaded files to be placed into
const api_router = express.Router();

api_router.use(bodyParser.json());
api_router.use(bodyParser.urlencoded({ extended: true }));

api_router.route("/")
    .get((request, response) => {
        response.status(400);
        response.json({status: 400, message: "Please specify a method."});
    });

/* the following syntax seems odd. What we are doing is defining *two* pieces of middleware for the route;
one which processes the file upload, where the field in JSON containing the file was called "avatar", and a second
one to then use the uploaded file etc. */
api_router.route("/avatar")
    .post(
        upload.single("avatar"),
        (request, response) => {
            let tmp_path = request.file.path; // since there is only a single upload, it is stored here
            console.log(tmp_path);
            console.log(request.body);
            response.json({status: 200, message: "coolio"});
        }
    );

/* This syntax is functionally equivalent to the above but allows for multiple file fields / uploads per field
if you like. */
api_router.route("/avatar_different")
    .post(
        upload.fields([
            {name: "avatar", maxCount: 1}
        ]),
        (request, response) => {
            let tmp_path = request.files.avatar[0]; /* since there are multiple fields each with potentially multiple
            uploads, there is an array of files for each field */
            console.log(tmp_path);
            console.log(request.body);
            response.json({status: 200, message: "coolio"});
        }
    );

api_router.route("/*")
    .all((request, response) => {
        response.status(400).json({status: 400, message: "Unknown API route or wrong request method."});
    });

module.exports = api_router;
