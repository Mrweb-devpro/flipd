import "@fontsource/kode-mono/400.css"; // Defaults to weight 400

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Profile from "./pages/Profile";
import ProtectedRoute from "./pages/ProtectedRoute";
import Jotter from "./pages/Jotter";
import { ModalProvider } from "./context/ModalProvider";
import PageNotfound from "./pages/PageNotFound";
import { ErrorBoundary } from "react-error-boundary";
import NotificationProvider from "./context/NotificationProvider";
import StoreUserProvider from "./context/StoreUserProvider";

function App() {
  const queryClient = new QueryClient();

  return (
    // <AuthProvider>

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
                  <StoreUserProvider>
                    <NotificationProvider>
                      <Dashboard />
                    </NotificationProvider>
                  </StoreUserProvider>
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
    // </AuthProvider>
  );
}

export default App;
