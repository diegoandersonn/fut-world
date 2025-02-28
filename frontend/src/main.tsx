import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Player from "./pages/player/Player.tsx";
import { createRoot } from "react-dom/client";
import Home from "./pages/home/Home.tsx";
import Team from "./pages/team/Team.tsx";
import "./index.css";
import Toast from "./components/ui/toast/toast.tsx";
import { OrderProvider } from "./contexts/order-context.tsx";
import { PlayerPickProvider } from "./contexts/player-pick-context.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <OrderProvider>
      <PlayerPickProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Team/*" element={<Team />} />
            <Route path="/Player/*" element={<Player />} />
          </Routes>
        </BrowserRouter>
        <Toast />
      </PlayerPickProvider>
    </OrderProvider>
  </QueryClientProvider>
);
