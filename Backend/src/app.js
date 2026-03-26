const express = require("express");
const cookieParser = require("cookie-parser");
const authRouter = require("../routes/auth.route");
const notesRouter = require("../routes/notes.route");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_ENDPOINT,
    credentials: true
}));
app.use(morgan("dev"));

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