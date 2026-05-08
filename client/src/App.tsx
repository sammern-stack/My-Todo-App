import { useEffect } from "react";
import { useThemeStore, useTodosStore } from "./stores";
import { Header, Footer, TodoItem, InsertNewTodo } from "./components";
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
