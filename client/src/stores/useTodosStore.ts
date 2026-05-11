import { create } from "zustand";
import {
  createTodo,
  deleteTodo,
  getTodos,
  resetTodos,
  toggleTodo,
} from "../api/todos";

interface todo {
  _id: string;
  todo: string;
  stage: "complete" | "incomplete";
}

type filters = "all" | "completed" | "active";

type todosTypes = {
  newTodo: string;
  setNewTodo: (todo: string) => void;

  todos: Array<todo>;
  getAllTodos: () => void;
  createNewTodo: () => void;
  toggleTodoStage: (id: string) => void;
  removeTodo: (id: string) => void;
  resetTodos: () => void;

  filter: filters;
  setFilter: (filter: filters) => void;
  filterTodos: (filter: filters) => void;

  remainingTodos: number;
  setRemainingTodos: () => void;
};

export const useTodosStore = create<todosTypes>((set, get) => ({
  newTodo: "",
  setNewTodo: (todo: string) => set({ newTodo: todo }),

  todos: [],

  getAllTodos: async () => {
    const todos = await fetchTodos();
    set({ todos: todos });
    get().setRemainingTodos();
  },

  createNewTodo: async () => {
    const { newTodo } = get();

    if (!newTodo.trim()) return;

    const todo = newTodo.trim();
    const res = await createTodo(todo);

    if (!res.ok) {
      console.log(res.error);
      return;
    }

    set((prev) => ({ todos: [...prev.todos, res.data] }));
    set({ newTodo: "" });
    get().setRemainingTodos();
  },

  toggleTodoStage: async (id: string) => {
    const res = await toggleTodo(id);

    if (!res.ok) {
      console.log(res.error);
      return;
    }

    set((prev) => ({
      todos: prev.todos.map((t) => (t._id === id ? res.data : t)),
    }));
    get().setRemainingTodos();
  },

  removeTodo: async (id: string) => {
    const res = await deleteTodo(id);

    if (!res.ok) {
      console.log(res.error);
      return;
    }

    set((prev) => ({ todos: prev.todos.filter((t: todo) => t._id !== id) }));
    get().setRemainingTodos();
  },

  resetTodos: async () => {
    const res = await resetTodos();

    if (!res.ok) {
      console.log(res.error);
      return;
    }

    set({ todos: res.data });
    get().setRemainingTodos();
  },

  remainingTodos: 0,
  setRemainingTodos: () => {
    const { todos } = get();
    const remaining = todos.filter((t) => t.stage === "incomplete");
    set({ remainingTodos: remaining.length });
  },

  filter: "all",
  setFilter: (filter) => set({ filter: filter }),

  filterTodos: async (filter) => {
    switch (filter) {
      case "all":
        get().getAllTodos();
        set({ filter: "all" });
        break;
      case "completed":
        const completedTodos = await fetchTodos();
        set({
          todos: completedTodos.filter((t: todo) => t.stage === "complete"),
        });
        set({ filter: "completed" });
        break;
      case "active":
        const activeTodos = await fetchTodos();
        set({
          todos: activeTodos.filter((t: todo) => t.stage === "incomplete"),
        });
        set({ filter: "active" });
        break;
      default:
        break;
    }
  },
}));

// Utility: fetch raw todos
async function fetchTodos() {
  const res = await getTodos();

  if (!res.ok) {
    console.log(res.error);
    return;
  }

  return res.data;
}
