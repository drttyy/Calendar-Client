import "./App.css";
import MainPage from "./pages/MainPage";
import { Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import CalendarPage from "./pages/CalendarPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/profile/:profileId" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
