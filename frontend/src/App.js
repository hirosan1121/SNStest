
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Search from "./pages/search/Search";
import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom"
import { AuthContext } from "./state/AuthContext";
import { useContext } from "react";
import './input.css'




function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route path = "/" element={user ?<Home /> : <Register />} />
        <Route path = "/login" element={user ? <Navigate to ="/" /> : <Login />} />
        <Route path = "/register" element={user ? <Navigate to ="/" /> : <Register />} />
        <Route path = "/profile/:username" element={<Profile />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  )
}

export default App;
