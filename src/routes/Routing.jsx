import { Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import PrivateRoute from "./PrivateRoute";
import Login from "../components/login/Login";
import Register from "../components/register/Register";
import Home from "../views/Home";
import Dashboard from "../components/dashboard/Dashboard";
import Chatroom from "../components/chatroom/Chatroom";
import NonLoggedInOnlyRoute from "./NonLoggedInOnlyRoute";
import store from "../store";
const Routing = () => {
  const tokenData = store((state) => state.token);
  const isLoggedIn = tokenData ? true : false;

  return (
    <App path="/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <NonLoggedInOnlyRoute isLoggedIn={isLoggedIn}>
              <Login />
            </NonLoggedInOnlyRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        {/* Private Routes */}
        {/* dashboard route */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* chatroom route */}
        <Route
          path="/chatroom/:id"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Chatroom />
            </PrivateRoute>
          }
        />

        {/* 404 page */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </App>
  );
};

export default Routing;
