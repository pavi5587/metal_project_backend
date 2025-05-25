const express = require("express");
const cors = require("cors")
const purityRouter = require("./routes/purityRoutes");
const metalRateRouter = require("./routes/metalRateRoutes")
const userRouter = require("./routes/userroutes")

require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/purity", purityRouter);
app.use("/api/rate", metalRateRouter);
app.use("/api", userRouter);


app.listen(4000, () => console.log(`App is running at 4000`))