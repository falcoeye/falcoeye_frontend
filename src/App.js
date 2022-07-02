import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./Components/Views/Home";
import Camera from "./Components/Views/Camera";
import VideoImages from "./Components/Views/VideoImages";
import Streaming from "./Components/Views/Streaming";
import AnalysisJobs from "./Components/Views/Analysis";
import SnapShot from "./Components/Views/Snapshots";
import NewAnalysis from "./Components/Views/NewAnalysis";
import AiModals from "./Components/Views/AiModels";
import AnalysisDetailsIndex from "./Components/Views/AnalysisDetails";
import AllAnalysis from "./Components/Views/AllAnalysis";
import Charts from "./Components/Views/Charts";
import Login from "../src/Components/Views/Auth/Login";
import Signup from "../src/Components/Views/Auth/Signup";
import { useSelector } from "react-redux";

function App() {
   const [authenticated, setAuthenticated] = useState(true);
  // useEffect(() => {
  //   if (localStorage.getItem("user") !== null) {
  //     setAuthenticated(true);
  //   } else {
  //     setAuthenticated(false);
  //   }
  // }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={authenticated ? <Home /> : <Navigate replace to="/login" />  } />
        <Route path="/Camera" element={ authenticated ? <Camera /> : <Navigate replace to="/login" /> } />
        <Route path="/VideoImages" element={authenticated ? <VideoImages /> : <Navigate replace to="/login" /> } />
        <Route path="/Streaming/:id" element={authenticated ? <Streaming /> : <Navigate replace to="/login" />   } />
        <Route path="/analysis-jobs" element={authenticated ? <AnalysisJobs /> : <Navigate replace to="/login" /> } />
        <Route path="/snap-shot" element={authenticated ? <SnapShot /> : <Navigate replace to="/login" />  } />
        <Route path="/new-analysis" element={authenticated ? <NewAnalysis /> : <Navigate replace to="/login" />  } />
        <Route path="/ai-store" element={authenticated ? <AiModals /> : <Navigate replace to="/login" />  } />
        <Route path="/analysis-details" element={authenticated ? <AnalysisDetailsIndex /> : <Navigate replace to="/login" />  } />
        <Route path="/all-analysis" element={authenticated ? <AllAnalysis /> : <Navigate replace to="/login" />  } />
        <Route path="/charts" element={authenticated ? <Charts /> : <Navigate replace to="/login" />  } />
        <Route path="/login" element={!authenticated ? <Login /> : <Navigate replace to="/" />} />
         <Route path="/signup" element={!authenticated ? <Signup /> : <Navigate replace to="/" />} />
      </Routes>
    </>
  );
}

export default App;
