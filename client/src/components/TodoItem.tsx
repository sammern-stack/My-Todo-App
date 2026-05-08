import { useTodosStore } from "../stores/useTodosStore";
import { FaTimes } from "react-icons/fa";
import "../App.scss";

type todoTypes = {
  _id: string;
  todo: string;
  stage: string;
};

export default function TodoItem({ todo }: { todo: todoTypes }) {
  const toggleTodoStage = useTodosStore((s) => s.toggleTodoStage);
  const deleteSelectedTodo = useTodosStore((s) => s.deleteSelectedTodo);

  return (
    <div className="todo__todo-item">
      <div className="todo__todo-content">
        <input
          type="checkbox"
          className="todo__completedCheckbox"
          checked={todo.stage === "complete" ? true : false}
          onChange={() => toggleTodoStage(todo._id)}
        />
        <div className="todo__todo-name">{todo.todo}</div>
      </div>
      <div
        className="todo__todo-remove"
        onClick={() => deleteSelectedTodo(todo._id)}
      >
        <FaTimes />
      </div>
    </div>
  );
}
