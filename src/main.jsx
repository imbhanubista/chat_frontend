import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routing from "./routes/Routing";
import { BrowserRouter } from "react-router-dom";

// const App = () => <Routing />;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastContainer
        theme="dark"
        position="top-right"
        draggable
        pauseOnFocusLoss={false}
        autoClose={1000}
      />
      <Routing />
    </BrowserRouter>
  </React.StrictMode>
);
