const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

const port = process.env.NODE_env || 3000;

mongoose
    .connect("mongodb://localhost/metadata")
    .then(() => console.log("connected to mangodb"))
    .then(err => console.error("failed to connect to mangodb", err));

    app.use(cors())


 



const listen = app.listen(port, () => console.log('listening on port' + listen.address().port))