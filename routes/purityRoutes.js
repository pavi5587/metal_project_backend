const express = require("express");
const purityRouter = express.Router();
const authenticateToken = require("../middleware/auth");

const {
    getPurity, getPurityById, addPurity, updatePurity, deletePurity
} = require("../controllers/purityController");

purityRouter.get("/", authenticateToken, getPurity);
purityRouter.get("/:id", authenticateToken, getPurityById);
purityRouter.post("/add", authenticateToken, addPurity);
purityRouter.put("/update/:id", authenticateToken, updatePurity);
purityRouter.delete("/delete/:id", authenticateToken, deletePurity);

module.exports = purityRouter;