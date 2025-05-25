const express = require("express");
const userRouter = express.Router();


const {
    getUser, postUser
} = require("../controllers/userController");

userRouter.post("/login", getUser);
userRouter.post("/register", postUser);


module.exports = userRouter;