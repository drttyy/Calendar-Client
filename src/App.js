import "./App.css";
import MainPage from "./pages/MainPage";
import { Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import CalendarPage from "./pages/CalendarPage";
import ProfilePage from "./pages/ProfilePage";
import ProfileEditPage from "./pages/ProfileEditPage";
import CompanyPage from "./pages/CompanyPage";
import CreateAppointment from "./pages/CreateAppointmentPage";
import CreateCompanyPage from "./pages/CreateCompanyPage";
import CompanyDetailsPage from "./pages/CompanyDetailsPage";
import CreateCompanyAppointmentPage from "./pages/CreateCompanyAppointmentPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/edit/:profileId" element={<ProfileEditPage />} />
        <Route path="/company" element={<CompanyPage />} />
        <Route path="/appointment-create" element={<CreateAppointment />} />
        <Route path="/create-company" element={<CreateCompanyPage />} />
        <Route path="/company/:id" element={<CompanyDetailsPage />} />
        <Route
          path="/company/:id/appointment-create"
          element={<CreateCompanyAppointmentPage />}
        />

        {/* <Route path="*" element={<ErrorPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
