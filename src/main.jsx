import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Layout/Root';
import ErrorPage from './Pages/ErrorPage';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import AuthProvider from './Shared/AuthProvider';
import { Toaster } from 'react-hot-toast';
import EmployeePage from './Pages/Employee/EmployeePage';
import HrPage from './Pages/Hr/HrPage';
import Payment from './Pages/Hr/Payment/Payment';
import RequestedAsset from './Pages/Employee/RequestedAsset';
import Dashboard from './Layout/Dashboard';
import AssetList from './Pages/Hr/AssetList/AssetList';
import AddAsset from './Pages/Hr/AddAsset/AddAsset';
import AllRequest from './Pages/Hr/AllRequest/AllRequest';
import AddEmployee from './Pages/Hr/AddEmployee/AddEmployee';
import EmployeeList from './Pages/Hr/EmployeeList/EmployeeList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home> 
      },
      {
        path: '/employee',
        element: <EmployeePage></EmployeePage> 
      },
      {
        path: '/HRmanager',
        element: <HrPage></HrPage>
      },
      {
        path: '/payment',
        element: <Payment></Payment>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/request',
        element: <RequestedAsset></RequestedAsset>
      },
      
    ]
  },
  // hr only
  {
    path: '/dashboard',
    element: <Dashboard></Dashboard>,
    children:[
      {
        path: 'assetList',
        element: <AssetList></AssetList>
      },
      {
        path: 'addAsset',
        element: <AddAsset></AddAsset>
      },
      {
        path: 'allRequest',
        element: <AllRequest></AllRequest>
      },
      {
        path: 'employeeList',
        element: <EmployeeList></EmployeeList>
      },
      {
        path: 'addEmployee',
        element: <AddEmployee></AddEmployee>
      },
    ]
  }
]);

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <QueryClientProvider client={queryClient}>
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
</QueryClientProvider>
<Toaster />
  </React.StrictMode>,
)
