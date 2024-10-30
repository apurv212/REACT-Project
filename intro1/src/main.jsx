import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Content from './pages/Content.jsx';
import About from './pages/About.jsx';
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
    },
    {
        path: "/Content",
        element:<Content/>,
      },
      {
        path: "/About",
        element: <About/>
      }
  ]);


createRoot(document.getElementById('root')).render(
  <div>
      <RouterProvider router={router} />
  
    </div>
)
