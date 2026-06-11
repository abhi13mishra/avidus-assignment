const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
    getAllUsers,
    updateUserStatus,
    deleteUser,
    getAllTasks,
    deleteAnyTask,
    getActivityLogs,
} = require("../controllers/adminController");

const router = express.Router();

//get all user
router.get(
    "/users",
    authMiddleware,
    adminMiddleware,
    getAllUsers
);

//update user status
router.patch(
    "/users/:id/status",
    authMiddleware,
    adminMiddleware,
    updateUserStatus
);

//delete user
router.delete(
    "/users/:id",
    authMiddleware,
    adminMiddleware,
    deleteUser
);

//view all tasks
router.get(
    "/tasks",
    authMiddleware,
    adminMiddleware,
    getAllTasks
);

//delete any tasks
router.delete(
    "/tasks/:id",
    authMiddleware,
    adminMiddleware,
    deleteAnyTask
);

//get acticity logs
router.get(
    "/logs",
    authMiddleware,
    adminMiddleware,
    getActivityLogs
);

module.exports = router;