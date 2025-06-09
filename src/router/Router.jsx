import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "../routes/PrivateRoute";
import Marathons from "../pages/Marathons";
import Profile from "../pages/Profile";
import Description from "../pages/Description";
import UpdateMarathon from "../pages/UpdateMarathon";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <NotFound></NotFound>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/dashboard",
                element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
            },
            {
                path: "/marathons",
                element: <PrivateRoute><Marathons></Marathons></PrivateRoute>
            },
            {
                path: "/profile",
                element: <PrivateRoute><Profile></Profile></PrivateRoute>
            },
            {
                path: "/description",
                element: <Description></Description>
            },
            {
                path: "/updateMarathon/:id",
                element: <UpdateMarathon></UpdateMarathon>
            },
        ]
    },
]);


export default router;