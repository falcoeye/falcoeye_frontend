import { Route, Routes } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import RequireAuth from "./Components/RequireAuth/RequireAuth";
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

toast.configure();

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      <Route
        path="Camera"
        element={
          <RequireAuth>
            <Camera />
          </RequireAuth>
        }
      />
      <Route
        path="VideoImages"
        element={
          <RequireAuth>
            <VideoImages />
          </RequireAuth>
        }
      />
      <Route
        path="Streaming/:id"
        element={
          <RequireAuth>
            <Streaming />
          </RequireAuth>
        }
      />
      <Route
        path="analysis-jobs"
        element={
          <RequireAuth>
            <AnalysisJobs />
          </RequireAuth>
        }
      />
      <Route
        path="snap-shot"
        element={
          <RequireAuth>
            <SnapShot />
          </RequireAuth>
        }
      />
      <Route
        path="new-analysis"
        element={
          <RequireAuth>
            <NewAnalysis />
          </RequireAuth>
        }
      />
      <Route
        path="ai-store"
        element={
          <RequireAuth>
            <AiModals />
          </RequireAuth>
        }
      />
      <Route
        path="analysis-details"
        element={
          <RequireAuth>
            <AnalysisDetailsIndex />
          </RequireAuth>
        }
      />
      <Route
        path="all-analysis"
        element={
          <RequireAuth>
            <AllAnalysis />
          </RequireAuth>
        }
      />
      <Route
        path="charts"
        element={
          <RequireAuth>
            <Charts />
          </RequireAuth>
        }
      />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
