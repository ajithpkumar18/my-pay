import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from "./components/About"
import Contact from "./components/Contact"
import Home from "./components/Home"
import Signup from './components/Signup';

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Home />} />
        <Route path="/dashboard" element={<About />} />
        <Route path="/send" element={<Contact />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
