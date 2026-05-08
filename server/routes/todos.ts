const express = require("express");

const {
  getTodos,
  createTodo,
  updateTodo,
  toggleTodo,
  deleteTodo,
  resetTodos
} = require("../controllers/todosControllers");

const router = express.Router();

router.get("/", getTodos);
router.put("/reset", resetTodos);
router.post("/", createTodo);

router.patch("/:id", updateTodo);
router.patch("/:id/stage", toggleTodo);

router.delete("/:id", deleteTodo);

module.exports = router;
