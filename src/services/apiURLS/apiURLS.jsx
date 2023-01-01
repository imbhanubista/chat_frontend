const apiURLS = {
  users: {
    login: {
      method: "POST",
      url: "/user/login",
    },
    register: {
      method: "POST",
      url: "/user/register",
    },
  },
  chat: {
    chatRoom: {
      method: "POST",
      url: "/auth/chat",
    },
    getChatRoom: {
      method: "GET",
      url: "/auth/chatroom",
    },
  },
};

export default apiURLS;
