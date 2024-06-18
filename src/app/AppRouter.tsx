import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { APP_PATHS } from "../configs/RouterPaths";
import Home from "../pages/Home/Home";
import Quiz from "../pages/Quiz/Quiz";
import ErrorHTTP from "../pages/ErrorHTTP/ErrorHTTP";
import QuizResults from "../pages/QuizResults/QuizResults";
import ErrorInternal from "../pages/ErrorInternal/ErrorInteral";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route errorElement={<ErrorHTTP />}>
            <Route path={APP_PATHS.home} element={<Home />} />
            <Route path={APP_PATHS.quiz}>
                <Route index element={<Quiz />} />
                <Route path={APP_PATHS.quizResult} element={<QuizResults />} />
            </Route>
            <Route path={APP_PATHS.error} element={<ErrorInternal />} />
        </Route>
    )
);

const AppRouter = () => {
    return <RouterProvider router={router} />;
};

export default AppRouter;
