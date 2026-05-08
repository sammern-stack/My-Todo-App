import { useTodosStore } from "../stores";
import { FaTimes } from "react-icons/fa";
import "../App.scss";

type todoTypes = {
  _id: string;
  todo: string;
  stage: "complete" | "incomplete";
};

export default function TodoItem({ todo }: { todo: todoTypes }) {
  const toggleTodoStage = useTodosStore((s) => s.toggleTodoStage);
  const removeTodo = useTodosStore((s) => s.removeTodo);

  const isCompleted = todo.stage === "complete";

  return (
    <div className="todo__todo-item">
      <label className="todo__todo-content">
        <input
          type="checkbox"
          className="todo__completedCheckbox"
          checked={isCompleted}
          onChange={() => toggleTodoStage(todo._id)}
        />
        {todo.todo}
      </label>
      <div className="todo__todo-remove" onClick={() => removeTodo(todo._id)}>
        <FaTimes />
      </div>
    </div>
  );
}
