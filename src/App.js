import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Landing from "./components/Landing"
import Welcome from "./components/Welcome"
import Login from "./components/Login"
import Signup from "./components/Signup"
import ErrorPage from "./components/ErrorPage"

function App() {
  return (
    <Router>
      <Header />

    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>  

      <Footer />  
    </Router>
  );
}

export default App;
