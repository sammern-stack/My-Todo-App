import type { Request, Response } from 'express';

const MyTodosModel = require("../models/MyTodos");

const getTodos = async (req: Request, res: Response) => {
  try {
    const data = await MyTodosModel.find();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

const createTodo = async (req: Request, res: Response) => {
  try {
    const { todo } = req.body;

    const newTodo = new MyTodosModel({ todo });
    const savedTodo = await newTodo.save();

    res.status(201).json(savedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create todo" });
  }
};

const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { newTodo } = req.body;

    const todo = await MyTodosModel.findById(id);

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    todo.todo = newTodo;
    const updatedTodo = await todo.save();

    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update todo" });
  }
};

const toggleTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const todo = await MyTodosModel.findById(id);

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    todo.stage = todo.stage === "complete" ? "incomplete" : "complete";
    const updatedTodo = await todo.save();

    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to toggle todo" });
  }
};

const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedTodo = await MyTodosModel.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res
      .status(200)
      .json({ message: "Todo deleted successfully", todo: deletedTodo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete todo" });
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  toggleTodo,
  deleteTodo,
};
