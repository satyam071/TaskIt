import axios from "axios";
import { BASE_URL } from "./BASE_URL";

export const getTodos = async () => {
  const url = BASE_URL + "/api/todo/";
  try {
    const todos = await axios.get(url, {
      withCredentials: true,
    });
    return todos.data;
  } catch (error) {
    console.log(error);
  }
};
