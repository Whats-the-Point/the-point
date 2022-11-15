import CallbackGoogle from "./pages/authentication/CallbackGoogle";
import CompleteProfile from "./pages/authentication/CompleteProfile";
import GetStarted from "./pages/authentication/GetStarted";
import HomePage from "./pages/homePage/HomePage";
import Layout from "./components/layouts/Layout";
import ActiveLayout from "./components/layouts/ActiveLayout";
import Missing from "./pages/Missing";
import Profile from "./pages/profile/Profile";
import Unauthorized from "./pages/Unauthorized";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import PersistLogin from "./components/PersistLogin";
import RequireAuth from "./components/RequireAuth";
import RequireNoAuth from "./components/RequireNoAuth";
import Dashboard from "./pages/dashboard/Dashboard";
import Friends from "./pages/friends/Friends";
import Scoreboard from "./pages/scoreboard/Scoreboard";

function App() {
  /**
   * During development we can still access the base path at `/`
   * And this hook will make sure that we land on the base `/app`
   * path which will mount our App as usual.
   * In production, Phoenix makes sure that the `/app` route is
   * always mounted within the first request.
   * */
  useEffect(() => {
    if (window.location.pathname === "/") {
      window.location.replace("/app");
    }
  }, []);

  return (
    <BrowserRouter basename="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route element={<RequireNoAuth />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/login/callback" element={<CallbackGoogle />} />
          </Route>

          {/* we want to protect these routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={["initiated"]} />}>
              <Route path="/register" element={<CompleteProfile />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={["active"]} />}>
              <Route element={<ActiveLayout />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/friends" element={<Friends />} />
                <Route path="/scoreboard" element={<Scoreboard />} />
              </Route>
            </Route>
          </Route>

        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
