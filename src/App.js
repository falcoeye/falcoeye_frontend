import { useContext } from "react";
import {
  Navigate, Route, Routes
} from "react-router-dom";
import AiModals from "./pages/AiModels";
import AllAnalysis from "./pages/AllAnalysis";
import AnalysisJobs from "./pages/Analysis";
import AnalysisDetailsIndex from "./pages/AnalysisDetails";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Camera from "./pages/Camera";
import Charts from "./pages/Charts";
import Home from "./pages/Home";
import NewAnalysis from "./pages/NewAnalysis";
import SnapShot from "./pages/Snapshots";
import Streaming from "./pages/Streaming";
import VideoImages from "./pages/VideoImages";
import AuthContext from "./store/auth-context";

function App() {

  const authCtx = useContext(AuthContext)
  const { isLoggedIn } = authCtx

  return (
    <>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Navigate replace to="/login" />} />
        <Route path="/Camera" element={isLoggedIn ? <Camera /> : <Navigate replace to="/login" />} />
        <Route path="/VideoImages" element={isLoggedIn ? <VideoImages /> : <Navigate replace to="/login" />} />
        <Route path="/Streaming/:id" element={isLoggedIn ? <Streaming /> : <Navigate replace to="/login" />} />
        <Route path="/analysis-jobs" element={isLoggedIn ? <AnalysisJobs /> : <Navigate replace to="/login" />} />
        <Route path="/snap-shot" element={isLoggedIn ? <SnapShot /> : <Navigate replace to="/login" />} />
        <Route path="/new-analysis" element={isLoggedIn ? <NewAnalysis /> : <Navigate replace to="/login" />} />
        <Route path="/ai-store" element={isLoggedIn ? <AiModals /> : <Navigate replace to="/login" />} />
        <Route path="/analysis-details" element={isLoggedIn ? <AnalysisDetailsIndex /> : <Navigate replace to="/login" />} />
        <Route path="/all-analysis" element={isLoggedIn ? <AllAnalysis /> : <Navigate replace to="/login" />} />
        <Route path="/charts" element={isLoggedIn ? <Charts /> : <Navigate replace to="/login" />} />
        <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate replace to="/" />} />
        <Route path="/signup" element={!isLoggedIn ? <Signup /> : <Navigate replace to="/" />} />
      </Routes>
    </>
  );
}

export default App;
