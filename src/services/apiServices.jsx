import apiURLS from "./apiURLS/apiURLS";
import { authApi, afterAuthApi } from "./apiHelpers/apiHelpers";

// service for user register
export const registerUser = async (data) => {
  let response = await authApi(
    apiURLS.users.register.url,
    apiURLS.users.register.method,
    data
  );
  return response;
};

// service for user login
export const loginUser = async (data) => {
  let response = await authApi(
    apiURLS.users.login.url,
    apiURLS.users.login.method,
    data
  );
  return response;
};

// service for chat room
export const createChatroom = async (data) => {
  let response = await afterAuthApi(
    apiURLS.chat.chatRoom.url,
    apiURLS.chat.chatRoom.method,
    data
  );
  return response;
};

// service for get chat room
export const getChatroom = async () => {
  let response = await afterAuthApi(
    apiURLS.chat.getChatRoom.url,
    apiURLS.chat.getChatRoom.method
  );
  return response;
};
