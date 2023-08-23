import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
// import About from "./components/About";
import Friends from "./components/Friends";
import Timeline from "./components/Timeline";
import NoteState from "./context/notes/NoteState";

import Login from "./components/Login";
import Signup from "./components/Signup";
function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar></Navbar>
          <br />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home></Home>}></Route>
              <Route path="/friends" element={<Friends></Friends>}></Route>
              <Route path="/timeline" element={<Timeline></Timeline>}></Route>
              <Route path="/login" element={<Login></Login>}></Route>
              <Route path="/signup" element={<Signup></Signup>}></Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
