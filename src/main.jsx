import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Login } from './Login.jsx';
import { Register } from './Register.jsx';
import { AuthProvider } from './AuthProvider.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <div className='bg-white text-black'>
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  </StrictMode>,
)
