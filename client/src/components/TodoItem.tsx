import { useTodosStore } from "../stores";
import { FaCheck } from "react-icons/fa";
import { LiaTimesSolid } from "react-icons/lia";
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
          checked={isCompleted}
          onChange={() => toggleTodoStage(todo._id)}
        />
        <span className="checkmark">
          <FaCheck className="check-icon" size={12} />
        </span>
        {todo.todo}
      </label>
      <div className="todo__todo-remove" onClick={() => removeTodo(todo._id)}>
        <LiaTimesSolid />
      </div>
    </div>
  );
}
