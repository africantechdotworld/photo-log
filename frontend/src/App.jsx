import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import CreateEvent from './pages/CreateEvent';
//import EventDashboard from './pages/EventDashboard';
//import HostGallery from './pages/HostGallery';
//import EventGallery from './pages/EventGallery';
//import AdminLogin from './pages/AdminLogin';
//import AdminDashboard from './pages/AdminDashboard';
//import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/create-event" element={<CreateEvent />} />
        {/*<Route path="/dashboard" element={<EventDashboard />} />
        <Route path="/host/event/:id" element={<HostGallery />} />
        <Route path="/event/:id" element={<EventGallery />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />*/}
      </Routes>
    </Router>
  );
}

export default App;
