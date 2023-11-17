import { createBrowserRouter, redirect } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/login";
import Register from "../pages/Register";
import DashBoard from "../pages/DashBoard";
import DetailRoom from "../pages/DetailRoom";
// import Transaction from "../pages/Transaction";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
    loader: async () => {
      if (localStorage.access_token) {
        return redirect("/");
      }
      return null;
    },
  },
  {
    path: "/login",
    element: <Login />,
    loader: async () => {
      if (localStorage.access_token) {
        return redirect("/");
      }
      return null;
    },
  },
  {
    element: <DashBoard />,
    loader: async () => {
      if (!localStorage.access_token) {
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/room/:roomId",
        element: <DetailRoom />,
      },
      // {
      //   path: "/transaction",
      //   element: <Transaction />,
      // },
    ],
  },
]);

export default router;
