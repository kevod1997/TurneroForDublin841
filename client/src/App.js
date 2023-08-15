import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./pages/Footer";
import Carrousel from "./components/Carrousel";
import Home from "./pages/Home";
import { TurnProvider } from "./context/TurnContext";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/Admin/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import AdminPage from "./pages/Admin/AdminPage";
import { AdminProvider } from "./context/AdminContext";


function App() {
  const notDisplayLayout =
    window.location.pathname === "/login" ||
    window.location.pathname.startsWith("/admin");

  return (
    <>
      <AuthProvider>
        <TurnProvider>
          <AdminProvider>
            <BrowserRouter>
              {!notDisplayLayout && (
                <>
                  <NavBar />
                  <Carrousel />
                </>
              )}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/admin" element={<AdminPage />} />
                </Route>
              </Routes>
              {!notDisplayLayout && <Footer />}
            </BrowserRouter>
          </AdminProvider>
        </TurnProvider>
      </AuthProvider>
    </>
  );
}

export default App;
