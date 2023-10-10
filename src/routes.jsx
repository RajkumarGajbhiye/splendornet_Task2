import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";


const routes = [
  {
    path: "/",
    element: <Registration/>
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/home",
    element: <Home />
  }
];

export default routes;
