import { useLocation, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing.jsx";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import Menu from "./components/Menu.jsx";
import About from "./pages/About.jsx";
import Projects from "./pages/Projects.jsx";
import ProjectDetails from "./pages/ProjectDetails.jsx";
import Contact from "./pages/Contact.jsx";
import Blogs from "./pages/Blogs.jsx";
import AdminPage from "./adminPage/Home.jsx";
import ProjectsPage from "./adminPage/Projects.jsx";
import BlogsPage from "./adminPage/Blogs.jsx";
import Login from "./pages/Login.jsx";

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  // Check for authentication (for protected routes)
  const isAuthenticated = sessionStorage.getItem("authToken");

  // ProtectedRoute Component Logic
  const ProtectedRoute = ({ element: Component, ...rest }) => {
    return isAuthenticated ? (
      <Component {...rest} />
    ) : (
      <Navigate to="/login" replace />
    );
  };

  return (
    <>
      {!isAdminPage && <Menu />}
      {!isAdminPage && <NavBar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes for Admin */}
        <Route path="/admin" element={<ProtectedRoute element={AdminPage} />} />
        <Route
          path="/admin/projects"
          element={<ProtectedRoute element={ProjectsPage} />}
        />
        <Route
          path="/admin/blogs"
          element={<ProtectedRoute element={BlogsPage} />}
        />

        {/* Login Route */}
      </Routes>

      {!isAdminPage && <Footer />}
    </>
  );
}

export default App;
