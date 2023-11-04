import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Landing from "./components/Landing"
import Welcome from "./components/Welcome"
import Login from "./components/Login"
import Signup from "./components/Signup"
import ErrorPage from "./components/ErrorPage"
import ForgetPassword from './components/ForgetPassword';
import { IconContext } from "react-icons"

function App() {

  return (
    <Router>
      <IconContext.Provider value ={{style: {verticalAlign: "middle"} }}>
        <Header />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgetpassword" element = {<ForgetPassword />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>  

        <Footer />  
      </IconContext.Provider>
    </Router>
  );
}

export default App;


// on utilise IconContext.Provider pour englober notre app. Cela sert uniquement à center les icons qu'on importe
// de react-icons. Dans la doc de react c'est précisé qu'il faut utiliser un provider et passé par IconContext car on ne peut pas agir
// directement sur le style de l'icone dans CSS