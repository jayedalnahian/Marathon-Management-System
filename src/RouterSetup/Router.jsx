import { createBrowserRouter } from "react-router";
import MainLayout from "../Components/Layouts/MainLayout/MainLayout";
import NotFound from "../Pages/404Page/NotFound";
import Home from "../Pages/HomePage/Home";
import Login from "../Pages/LoginPage/Login";
import Register from "../pages/UserRegisterPage/Register";
import Dashboard from "../Pages/DashBoard/Dashboard";
import PrivateRoute from "../PrivateRoutes/PrivateRoute";
import Marathons from "../pages/AllMarathonsPage/Marathons";
import Profile from "../Pages/ProfilePage/Profile";
import Description from "../Pages/DescriptionPage/Description";
import UpdateMarathon from "../pages/UpdateMarathonPage/UpdateMarathon";
import DetailsPage from "../Pages/DetailsPage/DetailsPage";
import MarathonRegister from "../pages/MarathonRegisterPage/MarathonRegister";
import Loading from "../Components/LoadingComponents/Loading";
import AddMarathon from "../Pages/DashBoard/AddMarathon/AddMarathon";
import MyMarathons from "../Pages/DashBoard/MyMarathons/MyMarathons";
import AppliedMarathons from "../Pages/DashBoard/AppliedMarathons/AppliedMarathons";
import AboutPage from "../Pages/AboutPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/about",
        element: <AboutPage></AboutPage>
      },
      {
        path: "/register",
        element: <Register></Register>,
      },

      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        ),
        children: [
          {
            path: "add-marathon",
            element: <AddMarathon />,
          },
          {
            path: "my-marathons",
            element: <MyMarathons />,
          },
          {
            path: "applied-marathons",
            element: <AppliedMarathons />,
          },
          {
            index: true,
            element: <AddMarathon />, // Default route
          },
        ],
      },
      {
        path: "/marathons",
        element: (
          <PrivateRoute>
            <Marathons></Marathons>
          </PrivateRoute>
        ),
      },
      
      {
        path: "/description",
        element: (
          <PrivateRoute>
            <Description></Description>
          </PrivateRoute>
        ),
      },
      {
        path: "/marathons/:id",
        element:<PrivateRoute><DetailsPage></DetailsPage></PrivateRoute>
       ,
      },
      {
        path: "/updateMarathon/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/marathon/${params.id}`),
        hydrateFallbackElement: <Loading></Loading>,
        element: (
          <PrivateRoute>
            <UpdateMarathon></UpdateMarathon>
          </PrivateRoute>
        ),
      },
      {
        path: "/marathonRegister/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/marathon/${params.id}`),
        hydrateFallbackElement: <Loading></Loading>,
        element: (
          <PrivateRoute>
            <MarathonRegister></MarathonRegister>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
