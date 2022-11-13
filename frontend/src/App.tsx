import { useEffect } from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";

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
        <Link to="/settings">Settings Page</Link>
        <br />
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

function SettingsPage() {
  return (
    <div>
      <h1>Settings Page</h1>
      <ul>
        <li>My profile</li>
        <li>Music</li>
        <li>About</li>
      </ul>
    </div>
  );
}

function HomePage() {
  const style = { padding: "8px" };
  return (
    <div style={style}>
      <h1>React TS Home</h1>
      <p>Welcome to the homepage</p>
    </div>
  );
}

export default App;
