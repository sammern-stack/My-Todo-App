const express = require("express");

const {
  getTodos,
  createTodo,
  updateTodo,
  toggleTodo,
  deleteTodo,
} = require("../controllers/myTodosController");

const router = express.Router();

router.get("/", getTodos);

router.post("/", createTodo);

router.patch("/:id", updateTodo);
router.patch("/:id/stage", toggleTodo);

router.delete("/:id", deleteTodo);

module.exports = router;
