import { Navigate } from "react-router-dom";

const NonLoggedInOnlyRoute = ({ isLoggedIn, children }) => {
  return !isLoggedIn ? children : <Navigate to="/dashboard" />;
};

export default NonLoggedInOnlyRoute;
