import { useEffect } from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import CallbackGoogle from "./pages/authentication/CallbackGoogle";
import CompleteProfile from "./pages/authentication/CompleteProfile";
import HomePage from "./pages/homePage/HomePage";

const style = { display: "flex", gap: "8px", padding: "8px" };

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
      <nav style={style}>
        <Link to="/">Home</Link>
        <br />
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login/callback" element={<CallbackGoogle />} />
        <Route path="/register" element={<CompleteProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
