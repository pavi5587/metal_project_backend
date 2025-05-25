const express = require("express");
const metalRateRouter = express.Router();
const authenticateToken = require("../middleware/auth");

const {
    getMetalRate, getMetalRateById, addMetalRate, updateMetalRate, deleteMetalRate, getMetalRateLatest
} = require("../controllers/metalRateController");

metalRateRouter.get("/", authenticateToken, getMetalRate);
metalRateRouter.get("/latest", authenticateToken, getMetalRateLatest);
metalRateRouter.get("/:id", authenticateToken, getMetalRateById);
metalRateRouter.post("/add", authenticateToken, addMetalRate);
metalRateRouter.put("/update/:id", authenticateToken, updateMetalRate);
metalRateRouter.delete("/delete/:id", authenticateToken, deleteMetalRate);


module.exports = metalRateRouter;