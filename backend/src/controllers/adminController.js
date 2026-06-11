const User = require("../models/User");
const Task = require("../models/Task");
const ActivityLog = require("../models/ActivityLog");

// get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");

        res.status(200).json({
            success: true,
            count: users.length,
            users,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// update user status
const updateUserStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "User status updated",
            user,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//delete user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(
            req.params.id
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//view all tasks
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find()
            .populate("user", "name email role");

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

//delete tasks
const deleteAnyTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        await Task.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Task deleted successfully by admin",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//get acticity logs
const getActivityLogs = async (req, res) => {
    try {
        const logs = await ActivityLog.find()
            .populate("user", "name email role")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: logs.length,
            logs,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getAllUsers,
    updateUserStatus,
    deleteUser,
    getAllTasks,
    deleteAnyTask,
    getActivityLogs,
};