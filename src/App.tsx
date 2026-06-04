import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import Home from "./Components/Home";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Navbar from "./Components/Navbar";
import Error from "./Components/Error";
import UserDetails from "./Components/UserDetails";
import Developer from "./Components/devloper";
import TodoApp from "./Components/TodoApp";

const AppLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/developer",
        element: <Developer name={"abhishek"} age={30} />,
      },
      {
        path: "/user/:id",
        element: <UserDetails />,
      },
      {
        path: "/todos",
        element: <TodoApp />,
      },
    ],
    errorElement: <Error />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
