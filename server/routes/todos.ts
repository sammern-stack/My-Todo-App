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
router.post("/", createTodo);

router.patch("/:id/stage", toggleTodo);
router.patch("/:id", updateTodo);

router.delete("/:id", deleteTodo);

router.put("/reset", resetTodos);

module.exports = router;
