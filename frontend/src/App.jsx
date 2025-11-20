import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import CreateEvent from './pages/CreateEvent';
import EventDashboard from './pages/EventDashboard';
import HostGallery from './pages/HostGallery';
import EventGallery from './pages/EventGallery';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
//import NotFound from './pages/NotFound';

// Redirect component for backward compatibility with old /events/:id route
function EventsRedirect() {
  const { id } = useParams();
  return <Navigate to={`/event/${id}`} replace />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* Redirect old /events/:id to /event/:id for backward compatibility */}
          <Route path="/events/:id" element={<EventsRedirect />} />
          <Route path="/event/:id" element={<EventGallery />} />
          
          {/* Protected routes - require authentication */}
          <Route
            path="/create-event"
            element={
              <ProtectedRoute>
                <CreateEvent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <EventDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/host/event/:id"
            element={
              <ProtectedRoute>
                <HostGallery />
              </ProtectedRoute>
            }
          />
          
          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          {/*<Route path="*" element={<NotFound />} />*/}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
