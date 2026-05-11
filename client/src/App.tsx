import { useLoadTodos } from "./hooks";
import { useThemeStore, useTodosStore } from "./stores";
import { Header, Footer, TodoItem, InsertNewTodo } from "./components";
import "./App.scss";

export default function App() {
  useLoadTodos();

  const theme = useThemeStore((s) => s.theme);
  const todos = useTodosStore((s) => s.todos);
  const remainingTodos = useTodosStore((s) => s.remainingTodos);
  const resetTodos = useTodosStore((s) => s.resetTodos);
  const filter = useTodosStore((s) => s.filter);
  const filterTodos = useTodosStore((s) => s.filterTodos);

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
          <div className="todo__list-items-left">
            {remainingTodos} items left
          </div>

          <div className="todo__list-filters">
            <label
              className="todo__list-filter"
              onClick={() => filterTodos("all")}
            >
              <input
                type="radio"
                name="todo-filter"
                checked={filter === "all"}
              />
              All
            </label>
            <label
              className="todo__list-filter"
              onClick={() => filterTodos("completed")}
            >
              <input
                type="radio"
                name="todo-filter"
                checked={filter === "completed"}
              />
              Completed
            </label>
            <label
              className="todo__list-filter"
              onClick={() => filterTodos("active")}
            >
              <input
                type="radio"
                name="todo-filter"
                checked={filter === "active"}
              />
              Active
            </label>
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
