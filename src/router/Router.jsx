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
import DetailsPage from "../pages/DetailsPage";
import MarathonRegister from "../pages/MarathonRegister";
import Loading from "../pages/Loading";


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
                element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
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
                element: <PrivateRoute><Description></Description></PrivateRoute>,
                
            },
            {
                path: '/details/:id',
                // loader: async ({params})=> {
                //     const res = await axiosInterceptor.get(`/marathon/${params.id}`);
                //     return res.data;
                // },
                loader: ({params})=> fetch(`https://b11a11-server-side-jayedalnahian.vercel.app/marathon/${params.id}`),
                hydrateFallbackElement: <Loading></Loading>,
                element: <PrivateRoute><DetailsPage></DetailsPage></PrivateRoute>
            },
            {
                path: "/updateMarathon/:id",
                loader: ({ params }) => fetch(`https://b11a11-server-side-jayedalnahian.vercel.app/marathon/${params.id}`),
                hydrateFallbackElement: <Loading></Loading>,
                element: <PrivateRoute><UpdateMarathon></UpdateMarathon></PrivateRoute>
            },
            {
                path: "/marathonRegister/:id",
                loader: ({ params }) => fetch(`https://b11a11-server-side-jayedalnahian.vercel.app/marathon/${params.id}`),
                hydrateFallbackElement: <Loading></Loading>,
                element: <PrivateRoute><MarathonRegister></MarathonRegister></PrivateRoute>
            },
        ]
    },
]);


export default router;