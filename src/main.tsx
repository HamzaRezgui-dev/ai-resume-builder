import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInPage from "@/auth/sign-in";
import Home from "@/home";
import { ClerkProvider } from "@clerk/clerk-react";
import Dashboard from "./dashboard/index.tsx";

const PUNISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth/sign-in",
    element: <SignInPage />,
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUNISHABLE_KEY}>
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>
);
