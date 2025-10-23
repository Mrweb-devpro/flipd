import "@fontsource/kode-mono/400.css"; // Defaults to weight 400

import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Jotter from "./pages/Jotter";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/UserProfile";
import PageNotfound from "./pages/PageNotFound";
import ProtectedRoute from "./pages/ProtectedRoute";

import { ModalProvider } from "./context/ModalProvider";
import NotificationProvider from "./context/NotificationProvider";
import AuthUserStoreProvider from "./context/AuthUserStoreProvider";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/jotter" element={<Jotter />} />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AuthUserStoreProvider>
                    <NotificationProvider>
                      <Dashboard />
                    </NotificationProvider>
                  </AuthUserStoreProvider>
                </ProtectedRoute>
              }
            >
              <Route index element={<Home />} />
              <Route path="/profile">
                <Route index element={<Profile />} />
                <Route
                  path=":username"
                  element={
                    <ErrorBoundary
                      fallback={<PageNotfound type="User-Not-Found" />}
                    >
                      <UserProfile />
                    </ErrorBoundary>
                  }
                />
              </Route>
            </Route>
            <Route path="*" element={<PageNotfound />} />
          </Routes>
        </BrowserRouter>
      </ModalProvider>
    </QueryClientProvider>
  );
}

export default App;
