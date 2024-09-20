import React from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import CheckPassword from "./pages/CheckPassword";
import CheckEmail from "./pages/CheckEmail";
import Home from "./pages/Home";
import Message from "./components/Message";
import AuthLayout from "./layout/AuthLayout";

const App = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "register",
        element: (
          <AuthLayout>
            <RegisterPage />
          </AuthLayout>
        ),
      },
      {
        path: "email",
        element: (
          <AuthLayout>
            <CheckEmail />
          </AuthLayout>
        ),
      },
      {
        path: "password",
        element: (
          <AuthLayout>
            <CheckPassword />
          </AuthLayout>
        ),
      },
      {
        path: "",
        element: <Home />,
        children: [
          {
            path: ":userId",
            element: <Message />,
          },
        ],
      },
    ],
  },
]);

export default App;
