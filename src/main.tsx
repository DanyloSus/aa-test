import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import Main from "./Routes/Main.tsx";
import Account from "./Routes/Account.tsx";
import Profile from "./Routes/Profile.tsx";

const router = createBrowserRouter([
  // creating router
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true, // path /
        element: <Main />,
      },
      {
        path: ":accountID",
        element: <Account />,
        children: [],
      },
      {
        path: ":accountID/:profileID",
        element: <Profile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
