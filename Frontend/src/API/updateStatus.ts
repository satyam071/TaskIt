import axios from "axios";
import { BASE_URL } from "./BASE_URL";

interface Todo {
  headingId: string;
  taskId: string;
  
}

export const updateStatus = async ( headingId:string, taskId:string, status : boolean) => {
  const url = BASE_URL + `/api/todo/${headingId}/tasks/${taskId}/status`;

  try {
    const response = await axios.patch(
      url,
      {
        status: !status,
      },
      {
        withCredentials: true,
      },
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};
