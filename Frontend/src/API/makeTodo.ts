import axios from "axios";
import { BASE_URL } from "./BASE_URL";

interface Task {
  title: string;
  completed: boolean;
}

interface MakeTodoPayload {
  heading: string;
  tasks: Task[];
}

export const makeTodo = async ({ heading, tasks }: MakeTodoPayload) => {
  const url = BASE_URL + "/api/todo/";

  try {
    const response = await axios.post(url, {
      heading,
      tasks: tasks.map(({ title, completed }) => ({ title, completed })),
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};