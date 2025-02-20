import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Player from "./pages/player/Player.tsx";
import { createRoot } from "react-dom/client";
import Home from "./pages/home/Home.tsx";
import Team from "./pages/team/Team.tsx";
import "./index.css";
import Toast from "./components/ui/toast/toast.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Team/*" element={<Team />} />
        <Route path="/Player/*" element={<Player />} />
      </Routes>
    </BrowserRouter>
    <Toast />
  </QueryClientProvider>
);
