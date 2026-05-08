import { useLoadTodos } from "./hooks";
import { useThemeStore, useTodosStore } from "./stores";
import { Header, Footer, TodoItem, InsertNewTodo } from "./components";
import "./App.scss";

export default function App() {
  useLoadTodos();

  const theme = useThemeStore((s) => s.theme);
  const todos = useTodosStore((s) => s.todos);

  return (
    <div className={`todo__content ${theme}`}>
      <Header />

      <InsertNewTodo />

      <div className="todo__todo-list">
        {todos.map((t) => (
          <TodoItem key={t._id} todo={t} />
        ))}
      </div>

      <Footer />
    </div>
  );
}
