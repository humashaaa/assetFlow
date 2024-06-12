import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Layout/Root";
import ErrorPage from "./Pages/ErrorPage";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import AuthProvider from "./Shared/AuthProvider";
import { Toaster } from "react-hot-toast";
import EmployeePage from "./Pages/Employee/EmployeePage";
import HrPage from "./Pages/Hr/HrPage";
import Payment from "./Pages/Hr/Payment/Payment";
import RequestedAsset from "./Pages/Employee/RequestedAsset";
import Dashboard from "./Layout/Dashboard";
import AssetList from "./Pages/Hr/AssetList/AssetList";
import AddAsset from "./Pages/Hr/AddAsset/AddAsset";
import AllRequest from "./Pages/Hr/AllRequest/AllRequest";
import AddEmployee from "./Pages/Hr/AddEmployee/AddEmployee";
import EmployeeList from "./Pages/Hr/EmployeeList/EmployeeList";
import UpdateList from "./Pages/Hr/AssetList/UpdateList";
import MyAsset from "./Pages/Employee/MyAsset/MyAsset";
import HrRoute from "./Shared/HrRoute";
import MyTeam from "./Pages/Employee/MyTeam/MyTeam";
import PrivateRoute from "./Shared/PrivateRoute";
import Profile from "./Pages/Profile";
import { HelmetProvider } from "react-helmet-async";
// import EmployeeRoute from './Shared/EmployeeRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/employee",
        element: <EmployeePage></EmployeePage>,
      },
      {
        path: "/HRmanager",
        element: <HrPage role="hr"></HrPage>,
      },
      {
        path: "/payment",
        element: <Payment></Payment>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/myProfile",
        element: <Profile></Profile>,
      },
    ],
  },
  // hr only
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "assetList",
        element: (
          <HrRoute>
            <AssetList></AssetList>
          </HrRoute>
        ),
      },
      {
        path: "addAsset",
        element: (
          <HrRoute>
            <AddAsset></AddAsset>
          </HrRoute>
        ),
      },
      {
        path: "allRequest",
        element: (
          <HrRoute>
            <AllRequest></AllRequest>
          </HrRoute>
        ),
      },
      {
        path: "employeeList",
        element: (
          <HrRoute>
            <EmployeeList></EmployeeList>
          </HrRoute>
        ),
      },
      {
        path: "addEmployee",
        element: (
          <HrRoute>
            <AddEmployee></AddEmployee>
          </HrRoute>
        ),
      },
      {
        path: "update/:id",
        element: (
          <HrRoute>
            <UpdateList></UpdateList>
          </HrRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_URL}/asset-detail/${params.id}`),
      },
      {
        path: "requestAsset",
        element: <MyAsset></MyAsset>,
      },
      {
        path: "myAsset",
        element: <RequestedAsset></RequestedAsset>,
      },
      {
        path: "team",
        element: <MyTeam></MyTeam>,
      },
    ],
  },
]);

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </HelmetProvider>
    </QueryClientProvider>
    <Toaster />
  </React.StrictMode>
);
