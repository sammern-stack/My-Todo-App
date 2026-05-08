import { useEffect } from "react";
import { useThemeStore } from "./stores/useThemeStore";
import { useTodosStore } from "./stores/useTodosStore";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TodoItem from "./components/TodoItem";
import InsertNewTodo from "./components/InsertNewTodo";
import "./App.scss";

export default function App() {
  const theme = useThemeStore((s) => s.theme);

  const todos = useTodosStore((s) => s.todos);
  const getAllTodos = useTodosStore((s) => s.getAllTodos);

  useEffect(() => {
    getAllTodos();
  }, []);

  return (
    <div className={`todo__content ${theme}`}>
      <Header />

      <InsertNewTodo />

      <div className="todo__todo-list">
        {todos.slice(1).map((t) => (
          <TodoItem todo={t} />
        ))}
      </div>

      <Footer />
    </div>
  );
}
