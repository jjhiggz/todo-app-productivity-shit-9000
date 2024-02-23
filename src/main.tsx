import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./routes/Home.tsx";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginPage } from "./routes/Login.tsx";
import { AuthProvider } from "./providers/auth.provider.tsx";
import { Layout } from "./routes/Layout.tsx";
import {
  ProtectedRoute,
  ReverseProtectedRoute,
} from "./utils/protectedRoute.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" Component={Layout}>
            <Route
              path="/"
              Component={() => (
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              )}
            ></Route>
            <Route
              path="/login"
              Component={() => (
                <ReverseProtectedRoute>
                  <LoginPage />
                </ReverseProtectedRoute>
              )}
            ></Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>,
);
