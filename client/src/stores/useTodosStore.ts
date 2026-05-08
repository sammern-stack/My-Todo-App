import { create } from "zustand";
import { createTodo, deleteTodo, getTodos, toggleTodo } from "../api/todos";

interface todo {
  _id: string;
  todo: string;
  stage: "complete" | "incomplete";
}

type todosTypes = {
  newTodo: string;
  setNewTodo: (todo: string) => void;

  todos: Array<todo>;
  getAllTodos: () => void;
  createNewTodo: () => void;
  toggleTodoStage: (id: string) => void;
  removeTodo: (id: string) => void;
};

export const useTodosStore = create<todosTypes>((set, get) => ({
  newTodo: "",
  setNewTodo: (todo: string) => set({ newTodo: todo }),

  todos: [],

  getAllTodos: async () => {
    const res = await getTodos();

    if (!res.ok) {
      console.log(res.error);
      return;
    }

    set({ todos: res.data });
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
  },

  removeTodo: async (id: string) => {
    const res = await deleteTodo(id);

    if (!res.ok) {
      console.log(res.error);
      return;
    }

    set((prev) => ({ todos: prev.todos.filter((t: todo) => t._id !== id) }));
  },
}));
