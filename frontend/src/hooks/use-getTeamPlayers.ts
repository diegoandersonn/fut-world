import { useQuery } from "@tanstack/react-query";
import { PlayerType } from "../../../shared/types/playerType";
import { TeamType } from "../../../shared/types/teamType";
import { OrderType } from "../../../shared/types/orderType";

export const useGetTeamPlayers = (
  team: TeamType | undefined,
  name: string | null,
  order: OrderType | null
) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { data: playersResponse } = useQuery<PlayerType[]>({
    queryKey: ["get-players", name || "", team?.name || "all"],
    queryFn: async () => {
      const url = new URL(`${API_URL}/players`);
      if (name) url.searchParams.append("filter", name);
      if (team?.name) url.searchParams.append("type", team.name);
      if (order?.value) {
        url.searchParams.append("orderBy", order.value);
        url.searchParams.append("order", order.order);
      }

      const response = await fetch(url.toString());
      return await response.json();
    },
  });
  return playersResponse;
};
