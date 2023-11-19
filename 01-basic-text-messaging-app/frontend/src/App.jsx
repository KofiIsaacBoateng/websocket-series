import { Routes, Route, Navigate } from "react-router-dom";
import Chat from "./pages/chat/Chat";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { useUserContext } from "./context/UserContext";

function App() {
  const { user } = useUserContext();
  return (
    <Routes>
      <Route path="/" element={user ? <Chat /> : <Navigate to="/login" />} />
      <Route path="/signup" element={user ? <Navigate to="/" /> : <SignUp />} />
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
    </Routes>
  );
}

export default App;
