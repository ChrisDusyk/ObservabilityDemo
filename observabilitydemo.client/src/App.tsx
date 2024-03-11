import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StudentList from "./pages/student/StudentList";
import ErrorPage from "./components/ErrorPage";
import Home from "./pages/Home";
import { SidenavProvider } from "./components/sidenav/SidenavContext";
import Layout from "./components/Layout";
import EditStudent from "./pages/student/EditStudent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
      {
        path: "students/:id",
        element: <EditStudent />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SidenavProvider>
        <RouterProvider router={router} />
      </SidenavProvider>
    </QueryClientProvider>
  );
}

export default App;
