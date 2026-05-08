import { useEffect, useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useThemeStore } from "./stores/useThemeStore";
import { useTodosStore } from "./stores/useTodosStore";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.scss";

export default function App() {
  const theme = useThemeStore((s) => s.theme);

  const newTodo = useTodosStore((s) => s.newTodo)
  const setNewTodo = useTodosStore((s) => s.setNewTodo)

  const todos = useTodosStore((s) => s.todos);
  const getAllTodos = useTodosStore((s) => s.getAllTodos);
  const createNewTodo = useTodosStore((s) => s.createNewTodo);
  const toggleTodoStage = useTodosStore((s) => s.toggleTodoStage);
  const deleteSelectedTodo = useTodosStore((s) => s.deleteSelectedTodo);

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
        {todos.slice(1).map(({ _id, todo, stage }) => (
          <div key={_id} className="todo__todo-item">
            <div className="todo__todo-content">
              <input
                type="checkbox"
                className="todo__completedCheckbox"
                checked={stage === "complete" ? true : false}
                onChange={() => toggleTodoStage(_id)}
              />
              <div className="todo__todo-name">{todo}</div>
            </div>
            <div
              className="todo__todo-remove"
              onClick={() => deleteSelectedTodo(_id)}
            >
              <FaTimes />
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
