import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from "./components/Search";
import ResultsPage from "./components/ResultsPage";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/id/:studentID" element = {<ResultsPage />}/>
          <Route path="/" element={<Search />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
