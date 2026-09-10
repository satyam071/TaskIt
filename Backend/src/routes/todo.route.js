const express = require("express");
const todoController = require("../Controllers/todo.controller")
const authMiddleware = require("../middleware/auth.middleware")

const router = express.Router();

router.post("/",todoController.postTodo)
router.get("/",authMiddleware.authToken,todoController.getAllTodos)
router.get("/:headingId",authMiddleware.authToken,todoController.getTodoByHeading)
router.patch("/:headingId",authMiddleware.authToken,todoController.updateTodoByHeading)
router.delete("/:headingId",authMiddleware.authToken,todoController.deleteTodo)
router.post("/:headingId/tasks",authMiddleware.authToken,todoController.postTasks)
router.patch("/:headingId/tasks/:taskId",authMiddleware.authToken,todoController.updateTask)
router.patch("/:headingId/tasks/:taskId/status",authMiddleware.authToken,todoController.updateStatus)
router.delete("/:headingId/tasks/:taskId",authMiddleware.authToken,todoController.deleteTask)
// router.post("/:headingId",todoController.getListByHeading)

module.exports = router


// 6a98fbb87b6f936de138d13a
// 6a98fbb87b6f936de138d13c