import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RoomList from "./pages/RoomList";
import BookingCalendar from "./pages/BookingCalendar";
import MyReservations from "./pages/MyReservations";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<RoomList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/rooms" element={isLoggedIn ? <RoomList /> : <Navigate to="/login" />} />
        <Route path="/calendar/:roomId" element={isLoggedIn ? <BookingCalendar /> : <Navigate to="/login" />} />
        <Route path="/my-reservations" element={isLoggedIn ? <MyReservations /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;