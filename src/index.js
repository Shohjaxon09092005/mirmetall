import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './Components/ErrorPage';
import Home from './Pages/Home';


const appRouter=createBrowserRouter([{
  element:<App/>,
  path:"/",
  errorElement:<ErrorPage/>,
  children:[
    {
      path:"/",
      element:<Home/>
    }
  ]
}])
const root=ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
   <RouterProvider router={appRouter}/>
  </React.StrictMode>
);

