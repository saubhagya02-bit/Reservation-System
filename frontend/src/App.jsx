import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import RoomsPage from "./pages/RoomsPage";
import ReservationsPage from "./pages/ReservationsPage";
import AdminPage from "./pages/AdminPage";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Navbar />

          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/rooms" element={<RoomsPage />} />

              <Route
                path="/reservations"
                element={
                  <ProtectedRoute role="USER">
                    <ReservationsPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin"
                element={
                  <ProtectedRoute role="ADMIN">
                    <AdminPage />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500,
              style: {
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.875rem",
                borderRadius: "10px",
                padding: "0.75rem 1rem",
              },
              success: {
                iconTheme: { primary: "#16a34a", secondary: "#f0fdf4" },
              },
              error: {
                iconTheme: { primary: "#dc2626", secondary: "#fef2f2" },
              },
            }}
          />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
