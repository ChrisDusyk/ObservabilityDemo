import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StudentList from "./pages/student/StudentList";
import ErrorPage from "./components/ErrorPage";
import Home from "./pages/Home";
import { SidenavProvider } from "./components/sidenav/SidenavContext";
import Layout from "./components/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "students",
        element: <StudentList />,
      },
    ],
  },
]);

function App() {
  return (
    <SidenavProvider>
      <RouterProvider router={router} />
    </SidenavProvider>
  );
}

export default App;
