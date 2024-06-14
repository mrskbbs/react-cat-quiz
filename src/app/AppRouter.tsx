import { createBrowserRouter, RouterProvider } from "react-router-dom";
import APP_PATHS from "../configs/RouterPaths";
import Home from "../pages/Home";
import Quiz from "../pages/Quiz";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
    {
        path: APP_PATHS.home,
        element: <Home />,
        errorElement: <NotFound />,
    },
    {
        path: APP_PATHS.quiz,
        element: <Quiz />,
    },
]);

const AppRouter = () => {
    return <RouterProvider router={router} />;
};

export default AppRouter;
