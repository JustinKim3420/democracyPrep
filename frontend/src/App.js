import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from "./components/Search";
import StudentsPage from "./components/StudentsPage";
import SchoolPage from "./components/SchoolPage";
import HomeroomPage from "./components/HomeroomPage";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/school/:schoolName/homeroom/:homeroom" element = {<HomeroomPage />}/>
          <Route path="/school/:schoolName" element = {<SchoolPage />}/>
          <Route path="/id/:studentID" element = {<StudentsPage />}/>
          <Route path="/" element={<Search />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
