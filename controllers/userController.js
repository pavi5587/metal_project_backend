const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();



const postUser = async (req, res) => {
    const { name, email, mobileNumber, password, country, city, state, gender } =
        req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        mobileNumber,
        country,
        city,
        state,
        gender,
    });

    try {
        await newUser.save();
        res.status(201).json({ message: "User Registered" });
    } catch (error) {
        res.status(400).json({ message: "Error Registering User" });
    }
}

const getUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log("user", user);

    if (!user) return res.status(400).json({ message: "User Not Found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );


    res.json({ token, user });
};




module.exports = { getUser, postUser };