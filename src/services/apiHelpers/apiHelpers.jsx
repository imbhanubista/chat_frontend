import axios from "axios";
import store from "../../store";
export const BASE_URL = "http://localhost:3030/api";

// get token from the store and send it to the server

export const authApi = async (url, method, data) => {
  let response = await axios({
    method,
    url: `${BASE_URL}${url}`,
    data,
  });
  return response.data;
};

export const afterAuthApi = async (url, method, data) => {
  const token = store.getState().token;
  console.log(token, "token");
  let response = await axios({
    method,
    url: `${BASE_URL}${url}`,
    data,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
