const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
    getAllUsers,
    updateUserStatus,
    deleteUser,
    getAllTasks,
} = require("../controllers/adminController");

const router = express.Router();

//for get all user
router.get(
    "/users",
    authMiddleware,
    adminMiddleware,
    getAllUsers
);

//for update user status
router.patch(
    "/users/:id/status",
    authMiddleware,
    adminMiddleware,
    updateUserStatus
);

//for delete user
router.delete(
    "/users/:id",
    authMiddleware,
    adminMiddleware,
    deleteUser
);

//for view all tasks
router.get(
    "/tasks",
    authMiddleware,
    adminMiddleware,
    getAllTasks
);

module.exports = router;