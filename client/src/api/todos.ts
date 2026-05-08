import axios from "axios";

const BASE_URL = "http://localhost:3001/MyTodos";

export const getTodos = async () => {
  try {
    const res = await axios.get(BASE_URL);
    return { ok: true, data: res.data };
  } catch (err: any) {
    console.log(err);
    return {
      ok: false,
      error:
        err.response?.data?.message ||
        "An error occur while fetching the todos",
    };
  }
};

export const createTodo = async (todo: string) => {
  try {
    const res = await axios.post(BASE_URL, { todo });
    return { ok: true, data: res.data };
  } catch (err: any) {
    console.log(err);
    return {
      ok: false,
      error:
        err.response?.data?.message || "An error occur while creating the todo",
    };
  }
};

export const updateTodo = async (id: string, newTodo: string) => {
  try {
    const res = await axios.patch(`${BASE_URL}/${id}`, { newTodo });
    return { ok: true, data: res.data };
  } catch (err: any) {
    console.log(err);
    return {
      ok: false,
      error:
        err.response?.data?.message || "An error occur while updating the todo",
    };
  }
};

export const toggleTodo = async (id: string) => {
  try {
    const res = await axios.patch(`${BASE_URL}/${id}/stage`);
    return { ok: true, data: res.data };
  } catch (err: any) {
    console.log(err);
    return {
      ok: false,
      error:
        err.response?.data?.message || "An error occur while toggling the todo",
    };
  }
};

export const deleteTodo = async (id: string) => {
  try {
    const res = await axios.delete(`${BASE_URL}/${id}`);
    return { ok: true, data: res.data };
  } catch (err: any) {
    console.log(err);
    return {
      ok: false,
      error:
        err.response?.data?.message || "An error occur while deleting the todo",
    };
  }
};
