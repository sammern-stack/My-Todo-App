import { useTodosStore } from "../stores";

type FilterOptionsProps = {
  activeFilter: "all" | "completed" | "active";
};

// Utility: Capitalize string
function capitalizeStr(word: string) {
  return word[0].toUpperCase() + word.slice(1);
}

export default function FilterOption({ activeFilter }: FilterOptionsProps) {
  const filter = useTodosStore((s) => s.filter);
  const filterTodos = useTodosStore((s) => s.filterTodos);

  return (
    <label
      className="todo__list-filter"
      onClick={() => filterTodos(activeFilter)}
    >
      <input
        type="radio"
        name="todo-filter"
        checked={filter === activeFilter}
      />
      {capitalizeStr(activeFilter)}
    </label>
  );
}
