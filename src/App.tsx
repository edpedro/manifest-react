import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./router";
import { ToastContainer } from "react-toastify";
import AppProvider from "./contexts";
import { GlobalLoader } from "./components/Loader";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppProvider>
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
          <GlobalLoader />
        </AppProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
