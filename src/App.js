import { useEffect, useState } from "react";
import {
  Navigate, Route, Routes
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import AiModals from "./pages/AiModels";
import AllAnalysis from "./pages/AllAnalysis";
import AnalysisJobs from "./pages/Analysis";
import AnalysisDetailsIndex from "./pages/AnalysisDetails";
import Camera from "./pages/Camera";
import Charts from "./pages/Charts";
import Home from "./pages/Home";
import NewAnalysis from "./pages/NewAnalysis";
import SnapShot from "./pages/Snapshots";
import Streaming from "./pages/Streaming";
import VideoImages from "./pages/VideoImages";

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
