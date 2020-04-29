const express = require("express");
const app = express();
const port = 8000;
const db = require("./config/mongoose");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// setting up routes
app.use("/", require("./routes"));

db();





// listen to port
app.listen(port, (err) => {
    if (err) {
        console.log("problem starting server");
    }
    console.log(`server is up and running on port :: ${port}`);
})