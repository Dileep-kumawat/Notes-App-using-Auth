const noteModel = require("../models/note.model");
const mongoose = require("mongoose");

async function createController(req, res) {
    try {
        const { title, description } = req.body;

        const note = await noteModel.create({
            title,
            description,
            userId: req.user.userId
        });

        return res.status(201).json({
            'msg': "Note created successfully",
            "success": true,
            note
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Internal server error",
            success: false
        });
    }
}

async function deleteController(req, res) {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: "Invalid note ID",
                success: false
            });
        }

        const note = await noteModel.findOneAndDelete({
            _id: id,
            userId: req.user.userId
        });

        if (!note) {
            return res.status(404).json({
                msg: "Note not found or not authorized",
                success: false
            });
        }

        return res.status(200).json({
            msg: "Note deleted successfully",
            success: true,
            note
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Internal server error",
            success: false
        });
    }
}

async function updateController(req, res) {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: "Invalid note ID",
                success: false
            });
        }

        const note = await noteModel.findOneAndUpdate({
            _id: id,
            userId: req.user.userId
        },{
            title,
            description
        });

        if (!note) {
            return res.status(404).json({
                msg: "Note not found or not authorized",
                success: false
            });
        }

        return res.status(200).json({
            msg: "Note Updated successfully",
            success: true,
            note
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Internal server error",
            success: false
        });
    }
}

async function getController(req, res) {
    try {
        const notes = await noteModel.find({
            userId : req.user.userId
        });

        return res.status(200).json({
            msg: "Note Retrived successfully",
            success: true,
            notes
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Internal server error",
            success: false
        });
    }
}

module.exports = {
    createController,
    deleteController,
    updateController,
    getController
}