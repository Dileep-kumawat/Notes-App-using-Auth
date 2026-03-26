const express = require("express");
const { isAuthenticated } = require("../middlewares/auth.middleware");
const { createController, deleteController, updateController, getController } = require("../controllers/notes.controller");

const notesRouter = express.Router();

/**
 * @route POST /api/notes/create
 * @description Creates a new note for the authenticated user.
 * @access private
 * @body {title, description}
 */
notesRouter.post("/create", isAuthenticated, createController);

/**
 * @route DELETE /api/notes/:id
 * @description Deletes an existing note for the authenticated user.
 * @access private
 */
notesRouter.delete("/:id", isAuthenticated, deleteController);

/**
 * @route PATCH /api/notes/:id
 * @description Updates an existing note for the authenticated user.
 * @access private
 * @body {title,description}
 */
notesRouter.patch("/:id", isAuthenticated, updateController);

/**
 * @route GET /api/notes/
 * @description Retrive all the notes of the user
 * @access private
 */
notesRouter.get("/", isAuthenticated, getController);

module.exports = notesRouter;