import { Route, Routes } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import RequireAuth from "./Components/RequireAuth/RequireAuth";
import Page404 from "./Components/UI/Page404/Page404";
import { default as Analysis, default as AnalysisJobs } from "./pages/Analysis";
import AnalysisDetailsIndex from "./pages/AnalysisDetails";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Charts from "./pages/Charts";
import Home from "./pages/Home";
import Media from "./pages/Media";
import NewAnalysis from "./pages/NewAnalysis";
import Settings from "./pages/Settings/Settings";
import SnapShot from "./pages/Snapshots";
import Sources from "./pages/Sources";
import Streaming from "./pages/Streaming";
import Workflows from "./pages/Workflows/Workflows";

toast.configure();

function App() {
  return (
    <div className="min-h-screen bg-[#f2f9ff] dark:bg-black">
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
          path="sources"
          element={
            <RequireAuth>
              <Sources />
            </RequireAuth>
          }
        />
        <Route
          path="media"
          element={
            <RequireAuth>
              <Media />
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
          path="workflows"
          element={
            <RequireAuth>
              <Workflows />
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
          path="analysis"
          element={
            <RequireAuth>
              <Analysis />
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
        <Route
          path="settings"
          element={
            <RequireAuth>
              <Settings />
            </RequireAuth>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
