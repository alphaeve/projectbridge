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
import ExamPage from "./exam/ExamPage";
import CancelRefund from "./pages/CancelRefund";

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
              <ProtectedRoute allowedRoles={["client", "Developer"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/post-project"
            element={
              <ProtectedRoute allowedRoles={["client"]}>
                <PostProject />
              </ProtectedRoute>
            }
          />

          <Route
            path="/projects"
            element={
              <ProtectedRoute allowedRoles={["Developer", "client"]}>
                <ProjectBrowse />
              </ProtectedRoute>
            }
          />

          <Route
            path="/project/:id/apply"
            element={
              <ProtectedRoute allowedRoles={["Developer"]}>
                <ApplyProject />
              </ProtectedRoute>
            }
          />

          <Route
            path="/chat/:id"
            element={
              <ProtectedRoute allowedRoles={["client", "Developer"]}>
                <ChatRoom />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posts"
            element={
              <ProtectedRoute allowedRoles={["client", "Developer"]}>
                <PostSection />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/cancel-refund" element={<CancelRefund />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/exam" element={<ExamPage />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;


// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Dashboard from "./pages/Dashboard";
// import PostProject from "./pages/PostProject";
// import ChatRoom from "./pages/ChatRoom";
// import ApplyProject from "./pages/ApplyProject";
// import ProjectBrowse from "./pages/ProjectBrowse";
// import Navbar from "./components/Navbar";
// import { AuthProvider } from "./context/AuthContext";
// import PostSection from "./components/PostSection";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import PrivacyPolicy from "./pages/PrivatePolicy";
// import Terms from "./pages/Terms";

// function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Navbar />
//         <Routes>
//           {/* Public Pages */}
//           <Route path="/" element={<Home />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/post-project" element={<PostProject />} />
//           <Route path="/projects" element={<ProjectBrowse />} />
//           <Route path="/project/:id/apply" element={<ApplyProject />} />
//           <Route path="/chat/:id" element={<ChatRoom />} />
//           <Route path="/posts" element={<PostSection />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//           <Route path="/terms" element={<Terms />} />
//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }

// export default App;
