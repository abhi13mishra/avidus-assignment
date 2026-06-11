const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
    createTask,
    getMyTasks,
    updateTask,
    deleteTask,
} = require("../controllers/taskController");

const router = express.Router();

//create task
router.post(
    "/",
    authMiddleware,
    createTask
);

//get tasks
router.get(
    "/",
    authMiddleware,
    getMyTasks
);

//update task
router.put(
    "/:id",
    authMiddleware,
    updateTask
);

//delete task
router.delete(
    "/:id",
    authMiddleware,
    deleteTask
);

module.exports = router;