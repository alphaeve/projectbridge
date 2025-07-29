import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PostProject from "./pages/PostProject";
import ChatRoom from "./pages/ChatRoom";
import ApplyProject from "./pages/ApplyProject";
import ProjectBrowse from "./pages/ProjectBrowse";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import PostSection from "./components/PostSection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivatePolicy";
import Terms from "./pages/Terms";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />  
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Pages (Requires Login) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["student", "coder"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/post-project"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <PostProject />
              </ProtectedRoute>
            }
          />

          <Route
            path="/projects"
            element={
              <ProtectedRoute allowedRoles={["coder", "student"]}>
                <ProjectBrowse />
              </ProtectedRoute>
            }
          />

          <Route
            path="/project/:id/apply"
            element={
              <ProtectedRoute allowedRoles={["coder"]}>
                <ApplyProject />
              </ProtectedRoute>
            }
          />

          <Route
            path="/chat/:id"
            element={
              <ProtectedRoute allowedRoles={["student", "coder"]}>
                <ChatRoom />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posts"
            element={
              <ProtectedRoute allowedRoles={["student", "coder"]}>
                <PostSection />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
