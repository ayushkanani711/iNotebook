import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import NoteState from "./context/notes/NOtesState";
import Alert from "./components/Alert";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Footer from "./components/Footer";

function App() {

  return (
    <NoteState>
      <Router>

        <Navbar />
        <Alert />

        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
      
      <Footer/>
    </NoteState>
  );
}

export default App;
