import { useLoadTodos } from "./hooks";
import { useThemeStore, useTodosStore } from "./stores";

import {
  Header,
  Footer,
  TodoItem,
  InsertNewTodo,
  FilterOption,
} from "./components";

import "./App.scss";

export default function App() {
  useLoadTodos();

  const theme = useThemeStore((s) => s.theme);
  const todos = useTodosStore((s) => s.todos);
  const remainingTodos = useTodosStore((s) => s.remainingTodos);
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
          <div className="todo__list-items-left">
            {remainingTodos} items left
          </div>

          <div className="todo__list-filters">
            <FilterOption activeFilter={"all"} />
            <FilterOption activeFilter={"completed"} />
            <FilterOption activeFilter={"active"} />
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
