import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home.tsx";
import CreateTeam from "./pages/create-team/CreateTeam.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/CreateTeam/" element={<CreateTeam />} />
    </Routes>
  </BrowserRouter>
);
