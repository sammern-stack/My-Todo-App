import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useThemeStore } from "./stores/useThemeStore";
import { useTodosStore } from "./stores/useTodosStore";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TodoItem from "./components/TodoItem";
import "./App.scss";

export default function App() {
  const theme = useThemeStore((s) => s.theme);

  const newTodo = useTodosStore((s) => s.newTodo);
  const setNewTodo = useTodosStore((s) => s.setNewTodo);

  const todos = useTodosStore((s) => s.todos);
  const getAllTodos = useTodosStore((s) => s.getAllTodos);
  const createNewTodo = useTodosStore((s) => s.createNewTodo);

  const [isHover, setIsHover] = useState<boolean>(false);

  useEffect(() => {
    getAllTodos();
  }, []);

  return (
    <div className={`todo__content ${theme}`}>
      <Header />

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

      <div className="todo__todo-list">
        {todos.slice(1).map((t) => (
          <TodoItem todo={t} />
        ))}
      </div>

      <Footer />
    </div>
  );
}
