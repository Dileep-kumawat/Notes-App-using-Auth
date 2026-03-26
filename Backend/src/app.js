const express = require("express");
const cookieParser = require("cookie-parser");
const authRouter = require("../routes/auth.route");
const notesRouter = require("../routes/notes.route");

const app = express();

app.use(express.json());
app.use(cookieParser());

/**
 * @routes Authentication api/auth
 * @description Authentication routes
 */
app.use("/api/auth", authRouter);

/**
 * @routes Authentication api/auth
 * @description Authentication routes
 */
app.use("/api/notes", notesRouter);

module.exports = app;