import { useLoadTodos } from "./hooks";
import { useThemeStore, useTodosStore } from "./stores";
import { Header, Footer, TodoItem, InsertNewTodo } from "./components";
import "./App.scss";

export default function App() {
  useLoadTodos();

  const theme = useThemeStore((s) => s.theme);
  const todos = useTodosStore((s) => s.todos);
  const resetTodos = useTodosStore((s) => s.resetTodos);

  return (
    <div className={`todo__content ${theme}`}>
      <Header />

      <InsertNewTodo />

      <div className="todo__list-content">
        <div className="todo__list">
          {todos.map((t) => (
            <TodoItem key={t._id} todo={t} />
          ))}
        </div>

        <div className="todo__list-options">
          <div className="todo__list-items-left">x items left</div>

          <div className="todo__list-filters">
            <div className="todo__list-filter">All</div>
            <div className="todo__list-filter">Completed</div>
            <div className="todo__list-filter">Active</div>
          </div>

          <div
            className="todo__list-clear-completed"
            onClick={() => resetTodos()}
          >
            Clear completed
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
