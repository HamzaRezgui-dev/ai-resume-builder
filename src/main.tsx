import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import SignInPage from "@/auth/sign-in";
import Home from "@/home";

const router = createBrowserRouter(([
    {
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />
            }
        ]
    },
    {
        path: '/auth/sign-in',
        element: <SignInPage />
    }
]))
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
