import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import UserPage from "./pages/User/UserPage";
import Dashboard from './features/Dashboard/Dashboard';
import Inventory from './features/Inventory/inventoryPage';
import Orders from './features/Orders/orderPage';
import Settings from './features/Settings/userSettingPage';
import NotificationList from './features/Notification/NotificationList';
import NotificationDetail from './features/Notification/NotificationDetail';
import LandingPage from "./pages/Landing_Page/LandingPage";
import './App.css';
import SignupPage from "./pages/Register_Page/SignupPage";

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
          <Route path="settings" element={<Settings />} />
           <Route path="notifications" element={<NotificationList />} />
          <Route path="notifications/:id" element={<NotificationDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
