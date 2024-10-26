import "./index.css";
import { Toaster } from 'react-hot-toast';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/signup";
import Signin from "./pages/login";
import MyProjects from "./pages/myProjects";
import SavedProj from "./pages/SavedProj";
import ProjectForm from "./pages/newProjects";
import NewProjects from "./pages/newProjects";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import PublicRoute from "./utils/PublicRoute";
import Editproj from "./pages/Editproj";
import Details from "./pages/Details";
import Chat from "./pages/Chat";
import Error from "./pages/Error";
import Header from "./components/Header"; // Assuming you have a Header component
import { AuthProvider } from "./context/AuthContext"; // Import the AuthProvider
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import DMPage from "./CommunitySupport/DM/DMPage";

function AppContent() {
  const location = useLocation();

  // List of routes where you don't want the Header to appear
  const hideHeaderRoutes = ["/login", "/register", "/", "*", "/error"];

  return (
    <>
    <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
      {/* Conditionally render the Header */}
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <Routes>
        {/* Public routes */}
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Signin />
            </PublicRoute>
          }
        />
        <Route path="/" element={<Landing />} />

        {/* Protected routes, only accessible when logged in */}
        <Route
          path="/home"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/my-projects"
          element={
            <ProtectedRoutes>
              <MyProjects />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/new-project"
          element={
            <ProtectedRoutes>
              <ProjectForm />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/save"
          element={
            <ProtectedRoutes>
              <SavedProj />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/edit-project"
          element={
            <ProtectedRoutes>
              <Editproj />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/details/:id"
          element={
            <ProtectedRoutes>
              <Details />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoutes>
              <Chat />
            </ProtectedRoutes>
          }
        />

        <Route path="/chat/dm" element={<DMPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          }
        />
        {/* Error route */}
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      {" "}
      {/* Wrap your app with AuthProvider */}
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
