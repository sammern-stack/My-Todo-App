import { useEffect } from "react";
import { useTodosStore } from "../stores";

export function useLoadTodos() {
  const getAllTodos = useTodosStore((s) => s.getAllTodos);

  useEffect(() => {
    getAllTodos();
  }, []);
}
