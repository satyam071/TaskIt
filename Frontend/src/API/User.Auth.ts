import axios from "axios";
import { BASE_URL } from "./BASE_URL";

interface User {
  username: string;
  password: string;
}

export const RegisterApi = async (user: User) => {
  const url = BASE_URL + "/api/auth/register";
  console.log("This is the user", user);

  try {
    const response = await axios.post(url, user, {
      withCredentials: true,
    });
    console.log("Login Successfully");
    return response.data;
  } catch (error) {
    console.log("Login Not Successfully");
    // return error;
  }
};
export const LoginApi = async (user: User) => {
  const url = BASE_URL + "/api/auth/login";

  try {
    const response = await axios.post(url, user, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
