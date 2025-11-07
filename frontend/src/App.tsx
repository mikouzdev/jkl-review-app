import { BrowserRouter, Routes, Route } from "react-router"
import RegisterPage from "./pages/RegisterPage"
import Navbar from "./components/Navbar"

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
