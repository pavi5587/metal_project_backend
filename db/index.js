const mongoose = require("mongoose");

mongoose
    .connect(
        "mongodb://localhost:27017/metals"
    )
    .then(() => console.log("Connected MongoDB"))
    .catch((e) => console.log(e));