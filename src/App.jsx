import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
// import Users from "./pages/users"
import Signup from "./pages/signup";

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/users" element={<Users/>}/> */}
      </Routes>
    </>
  )
}

export default App
