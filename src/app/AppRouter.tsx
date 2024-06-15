import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { APP_PATHS } from "../configs/RouterPaths";
import Home from "../pages/Home";
import Quiz from "../pages/Quiz";
import Error from "../pages/Error";
import QuizResults from "../pages/QuizResults";

const router = createBrowserRouter([
    {
        path: APP_PATHS.home,
        element: <Home />,
        errorElement: <Error />,
    },
    {
        path: APP_PATHS.quiz,
        errorElement: <Error />,
        children: [
            {
                path: "",
                element: <Quiz />,
            },
            {
                path: "results",
                element: <QuizResults />,
            },
        ],
    },
]);

const AppRouter = () => {
    return <RouterProvider router={router} />;
};

export default AppRouter;
