const express = require("express");
const { registerController, loginController, logoutController } = require("../controllers/auth.controller");
const { registerValidation, validate, loginValidation } = require("../validators/auth.validator");
const { isAuthenticated } = require("../middlewares/auth.middleware");

const authRouter = express.Router();

/**
 * @route /api/auth/register
 * @description Register a new user account
 * @access public
 * @body {username, email, password}
 */
authRouter.post("/register", registerValidation, validate, registerController);

/**
 * @route /api/auth/login
 * @description Login's an user account
 * @access public
 * @body {email, password}
 */
authRouter.post("/login", loginValidation, validate, loginController);

/**
 * @route /api/auth/logout
 * @description Logout's an user account
 * @access private
 */
authRouter.get("/logout", isAuthenticated, logoutController);

module.exports = authRouter;