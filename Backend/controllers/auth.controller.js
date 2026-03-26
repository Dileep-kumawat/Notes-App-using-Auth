const bcrypt = require("bcryptjs");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function registerController(req, res) {
    try {
        const { username, email, password } = req.body;

        const isUserAlreadyExist = await userModel.findOne({
            email
        });

        if (isUserAlreadyExist) {
            return res.status(409).json({
                "msg": "User already exist",
                "success": false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            email,
            password: hashedPassword
        });

        const token = jwt.sign({
            userId: user._id,
            email
        }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.cookie("token", token);

        res.status(201).json({
            "msg": "user registration successful",
            "success": true,
            user
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                msg: "Email already in use",
                success: false
            });
        }

        return res.status(500).json({
            msg: "Internal server error",
            success: false
        });
    }
}

async function loginController(req, res) {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({
            email
        });

        if (!user) {
            return res.status(404).json({
                "msg": "User not exist",
                "success": false
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                msg: "Invalid credentials",
                success: false
            });
        }

        const token = jwt.sign({
            userId: user._id,
            email
        }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.cookie("token", token);

        res.status(200).json({
            "msg": "user Login successful",
            "success": true,
            user
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                msg: "Email already in use",
                success: false
            });
        }

        return res.status(500).json({
            msg: "Internal server error",
            success: false
        });
    }
}

async function logoutController(req, res) {
    res.clearCookie("token");

    res.status(200).json({
        "msg": "Logout successfull",
        "success": true
    });
}

async function getMeController(req, res) {
    try {
        const user = await userModel.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({
                "msg": "User not exist",
                "success": false
            });
        }

        res.status(200).json({
            "msg": "user retrived successful",
            "success": true,
            user
        });

    } catch (error) {
        return res.status(500).json({
            msg: "Internal server error",
            success: false
        });
    }
}

module.exports = {
    registerController,
    loginController,
    logoutController,
    getMeController
}