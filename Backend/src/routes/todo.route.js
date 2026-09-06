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
router.delete("/:headingId/tasks/:taskId",authMiddleware.authToken,todoController.deleteTask)
// router.post("/:headingId",todoController.getListByHeading)

module.exports = router
