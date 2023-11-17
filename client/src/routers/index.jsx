import { createBrowserRouter, redirect } from "react-router-dom";
import HomePages from "../pages/HomePages";
import LoginPages from "../pages/LoginPages";
import RegisterPages from "../pages/RegisterPages";
import DashBoard from "../pages/DashBoard";
import DetailRoom from "../pages/DetailRoom";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <RegisterPages />,
    loader: async () => {
      if (localStorage.access_token) {
        return redirect("/");
      }
      return null;
    },
  },
  {
    path: "/login",
    element: <LoginPages />,
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
        element: <HomePages />,
      },
      {
        path: "/room/:roomId",
        element: <DetailRoom />,
      },
    ],
  },
]);

export default router;
