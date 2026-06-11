const Task = require("../models/Task");
const logActivity = require("../utils/logActivity");

const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;

        const task = await Task.create({
            title,
            description,
            user: req.user.id,
        });

        await logActivity(
            req.user.id,
            "Task Created"
        );

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            task,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getMyTasks = async (req, res) => {
    try {
        const tasks = await Task.find({
            user: req.user.id,
        });

        res.status(200).json({
            success: true,
            count: tasks.length,
            tasks,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        if (task.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Access denied",
            });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        await logActivity(
            req.user.id,
            "Task Updated"
        );

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            task: updatedTask,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        if (task.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Access denied",
            });
        }

        await Task.findByIdAndDelete(req.params.id);

        await logActivity(
            req.user.id,
            "Task Deleted"
        );

        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createTask,
    getMyTasks,
    updateTask,
    deleteTask,
};