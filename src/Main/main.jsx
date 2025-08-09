import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../CSS_File/index.css";
import { RouterProvider } from "react-router";
import router from "../RouterSetup/Router";
import AuthProvider from "../AuthProvider/AuthProviders";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
