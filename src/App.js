import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Error from "./Components/Error";
import "bootstrap/dist/css/bootstrap.min.css";
import Registration from "./Components/Registration";
import Login from "./Components/Login";
import Success from "./Components/Success";
import Home from "./Components/Home";
import Cart from "./Components/Cart";
import Header from "./Components/Header";
import Profile from "./Components/Profile";

const AppContent = () => {
  const location = useLocation();

  const isRegistrationOrLogin =
    location.pathname === "/" || location.pathname === "/login";

  return (
    <div className="App">
      {!isRegistrationOrLogin && <Header />}
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
