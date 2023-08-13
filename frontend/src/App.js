import logo from "./logo.svg";
import "./App.css";
import SignInPage from "./signIn/SignInPage";
import Home from "./home/home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DataListPage from "./Pages/DataListPage";
import ProtectedRoute from "./routes/protected/ProtectedRoute";
import SignUpPage from "./Pages/SignUpPage";
import ProfileUpdate from "./profile_update/ProfileUpdate";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<SignInPage />} />
          <Route path="/signup" exact element={<SignUpPage />} />
          <Route
            path="/home"
            exact
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/list"
            exact
            element={
              <ProtectedRoute>
                <DataListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editProfile"
            exact
            element={
              <ProtectedRoute>
                <ProfileUpdate />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
