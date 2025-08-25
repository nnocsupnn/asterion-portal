import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import UserPage from "./pages/User/UserPage";
import Dashboard from './layouts/Dashboard';
import Inventory from './layouts/Inventory';
import Orders from './layouts/Orders';
import Settings from './layouts/Settings';
// import Settings from './features/Settings/userSettingPage';
// import NotificationList from './features/Notification/NotificationList';
// import NotificationDetail from './features/Notification/NotificationDetail';
import LandingPage from "./pages/Landing_Page/LandingPage";
import './App.css';
import SignupPage from "./pages/Register_Page/SignupPage";
import PlatformSync from "./layouts/PlatformSync";
import Reports from "./layouts/Reports";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage/>}/>
        {/* User routes */}
        <Route path="/user" element={<UserPage />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="orders" element={<Orders />} />
          <Route path="platforms" element={<PlatformSync/>} />
          <Route path="reports" element={<Reports/>} />
          <Route path="settings" element={<Settings />} />
           {/* <Route path="notifications" element={<NotificationList />} />
          <Route path="notifications/:id" element={<NotificationDetail />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
