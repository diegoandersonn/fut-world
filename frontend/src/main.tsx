import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CreateTeam from "./pages/create-team/CreateTeam.tsx";
import Home from "./pages/home/Home.tsx";
import Team from "./pages/team/Team.tsx";
import "./index.css";
import Player from "./pages/player/Player.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Team/*" element={<Team />} />
        <Route path="/Player/*" element={<Player />} />
        <Route path="/CreateTeam/" element={<CreateTeam />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);
