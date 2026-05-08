import { useState } from "react";
import { useTodosStore } from "../stores/useTodosStore";
import { FaPlus } from "react-icons/fa";
import "../App.scss";

export default function InsertNewTodo() {
  const [isHover, setIsHover] = useState<boolean>(false);
  
  const newTodo = useTodosStore((s) => s.newTodo);
  const setNewTodo = useTodosStore((s) => s.setNewTodo);
  
  const createNewTodo = useTodosStore((s) => s.createNewTodo);

  return (
    <div className="todo__add-todo">
      <button
        type="button"
        className={`todo__add-btn ${isHover && "todo__add-btn--hover"}`}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={() => createNewTodo()}
      >
        {isHover && <FaPlus />}
      </button>
      <input
        type="text"
        placeholder="Create a new Todo..."
        className="todo__add-input"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
    </div>
  );
}
