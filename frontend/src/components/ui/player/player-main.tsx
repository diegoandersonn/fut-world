import PlayerMainHeader from "./main-header";
import PlayerMainFooter from "./main-footer";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PlayerType } from "../../../../../shared/types/playerType";

export default function PlayerMain() {
  const location = useLocation();
  const playerName = location.state?.player.name;
  const API_URL = import.meta.env.VITE_API_URL;
  const { data: player, isLoading } = useQuery<PlayerType>({
    queryKey: ["get-players", playerName],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/players?filter=${playerName}`);
      const data = await response.json();
      return data[0];
    },
  });
  if (isLoading) return <p>Loading...</p>;
  if (!player) return <p>Player not found</p>;
  return (
    <div className="flex-1 flex flex-col bg-neutral-950 w-full mr-2 text-white rounded-md gap-28">
      <PlayerMainHeader player={player} />
      <PlayerMainFooter player={player} />
    </div>
  );
}
