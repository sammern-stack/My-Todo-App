import { useEffect, useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useThemeStore } from "./stores/useThemeStore";
import { getTodos, createTodo, toggleTodo, deleteTodo } from "./api/todos";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.scss";

interface myTodo {
  _id: string;
  todo: string;
  stage: string;
}

export default function App() {
  const theme = useThemeStore((s) => s.theme);

  const [todos, setTodos] = useState<Array<myTodo>>([]);
  const [newTodo, setNewTodo] = useState("");
  const [isHover, setIsHover] = useState<boolean>(false);

  const fetchTodos = async () => {
    const res = await getTodos();

    if (!res.ok) {
      console.log(res.error);
      return;
    }

    setTodos(res.data);
  };

  const createNewTodo = async () => {
    if (!newTodo.trim()) return;

    const todo = newTodo.trim();
    const res = await createTodo(todo);

    if (!res.ok) {
      console.log(res.error);
      return;
    }

    setTodos((prev) => [...prev, res.data]);
    setNewTodo("");
  };

  const toggleTodoStage = async (id: string) => {
    const res = await toggleTodo(id);

    if (!res.ok) {
      console.log(res.error);
      return;
    }

    setTodos((prev) => prev.map((t) => (t._id === id ? res.data : t)));
  };

  const handleDeleteTodo = async (id: string) => {
    const res = await deleteTodo(id);

    if (!res.ok) {
      console.log(res.error);
      return;
    }

    setTodos((prev) => prev.filter((t) => t._id !== id));
  };

  useEffect(() => {
    fetchTodos();
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
              onClick={() => handleDeleteTodo(_id)}
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
