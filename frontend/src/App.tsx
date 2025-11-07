import { BrowserRouter, Routes, Route } from "react-router"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import Navbar from "./components/Navbar"

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
