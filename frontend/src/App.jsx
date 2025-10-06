import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from "./pages/About"
import Contact from "./pages/Dashboard"
import Signin from "./pages/Signin"
import Signup from './pages/Signup';

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/dashboard" element={<About />} />
        <Route path="/send" element={<Contact />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
