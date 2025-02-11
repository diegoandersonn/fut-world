import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateTeam from "./pages/create-team/CreateTeam.tsx";
import Home from "./pages/home/Home.tsx";
import Team from "./pages/team/Team.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Team/*" element={<Team />} />
          <Route path="/CreateTeam/" element={<CreateTeam />} />
        </Routes>
  </BrowserRouter>
);
