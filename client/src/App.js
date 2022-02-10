import { useContext } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import { AuthContext } from "./context/Authcontext";
import Messenger from "./pages/messenger/Messenger";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Register />} />
        <Route
          exact
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />
        <Route
          exact
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route
          exact
          path="/messenger"
          element={!user ? <Navigate to="/" /> : <Messenger />}
        />
        <Route exact path="/profile/:username" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
