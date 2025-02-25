import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInPage from "@/auth/sign-in";
import Home from "@/home";
import { ClerkProvider } from "@clerk/clerk-react";
import Dashboard from "./dashboard/index.tsx";
import EditResume from "./dashboard/resume/[resumeId]/edit/index.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import React Query

// Create a React Query client
const queryClient = new QueryClient();

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/resume/:resumeId/edit",
        element: <EditResume />,
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
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      {/* Wrap the RouterProvider with QueryClientProvider */}
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ClerkProvider>
  </StrictMode>
);