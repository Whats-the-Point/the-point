import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import IndexRoutes from "./routes/IndexRoutes";

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
      <IndexRoutes />
    </BrowserRouter >
  );
}

export default App;
