import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import RequireAuth from "./Components/RequireAuth/RequireAuth";
import Page404 from "./Components/UI/Page404/Page404";
import useDarkMode from "./hooks/useDarkMode";
import Analysis from "./pages/Analysis";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Home from "./pages/Home";
import Media from "./pages/Media";
import Profile from "./pages/Profile/Profile";
import Sources from "./pages/Sources";
import Workflows from "./pages/Workflows";

function App() {
  useDarkMode();

  return (
    <Fragment>
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover={false}
        progress={undefined}
        draggable={false}
      />
      <div className="min-h-screen bg-[#f2f9ff] dark:bg-slate-900">
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
            path="workflows"
            element={
              <RequireAuth>
                <Workflows />
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
            path="profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </Fragment>
  );
}

export default App;
