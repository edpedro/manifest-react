import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./router";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          className="toast-container"
        />
      </BrowserRouter>
    </>
  );
}

export default App;
