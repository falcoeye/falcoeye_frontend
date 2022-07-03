import { useEffect, useState } from "react";
import {
  Navigate, Route, Routes
} from "react-router-dom";
import Login from "../src/Components/Views/Auth/Login";
import Signup from "../src/Components/Views/Auth/Signup";
import AiModals from "./Components/Views/AiModels";
import AllAnalysis from "./Components/Views/AllAnalysis";
import AnalysisJobs from "./Components/Views/Analysis";
import AnalysisDetailsIndex from "./Components/Views/AnalysisDetails";
import Camera from "./Components/Views/Camera";
import Charts from "./Components/Views/Charts";
import Home from "./Components/Views/Home";
import NewAnalysis from "./Components/Views/NewAnalysis";
import SnapShot from "./Components/Views/Snapshots";
import Streaming from "./Components/Views/Streaming";
import VideoImages from "./Components/Views/VideoImages";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={authenticated ? <Home /> : <Navigate replace to="/login" />} />
        <Route path="/Camera" element={authenticated ? <Camera /> : <Navigate replace to="/login" />} />
        <Route path="/VideoImages" element={authenticated ? <VideoImages /> : <Navigate replace to="/login" />} />
        <Route path="/Streaming/:id" element={authenticated ? <Streaming /> : <Navigate replace to="/login" />} />
        <Route path="/analysis-jobs" element={authenticated ? <AnalysisJobs /> : <Navigate replace to="/login" />} />
        <Route path="/snap-shot" element={authenticated ? <SnapShot /> : <Navigate replace to="/login" />} />
        <Route path="/new-analysis" element={authenticated ? <NewAnalysis /> : <Navigate replace to="/login" />} />
        <Route path="/ai-store" element={authenticated ? <AiModals /> : <Navigate replace to="/login" />} />
        <Route path="/analysis-details" element={authenticated ? <AnalysisDetailsIndex /> : <Navigate replace to="/login" />} />
        <Route path="/all-analysis" element={authenticated ? <AllAnalysis /> : <Navigate replace to="/login" />} />
        <Route path="/charts" element={authenticated ? <Charts /> : <Navigate replace to="/login" />} />
        <Route path="/login" element={!authenticated ? <Login /> : <Navigate replace to="/" />} />
        <Route path="/signup" element={!authenticated ? <Signup /> : <Navigate replace to="/" />} />
      </Routes>
    </>
  );
}

export default App;
