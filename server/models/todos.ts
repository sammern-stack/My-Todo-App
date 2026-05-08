const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  todo: String,
  stage: {
    type: String,
    enum: ["incomplete", "complete"],
    default: "incomplete",
  },
});

module.exports = mongoose.model("MyTodos", todoSchema, "MyTodos");
