import { PlayerType } from "../../types/playerType";
import { Pencil, Trash2 } from "lucide-react";
import TableCell from "./table-cell";
import FlagCell from "./flag-cell";
import { TeamType } from "../../types/teamType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type Props = {
  team?: TeamType;
  onEdit: (player: PlayerType) => void;
};

export default function TableBody({ onEdit, team }: Props) {
  const queryClient = useQueryClient();
  const API_URL = import.meta.env.VITE_API_URL;
  
  const {data: teamsResponse } = useQuery<TeamType[]>({
    queryKey: ["get-teams"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/teams`);
      const data = await response.json();
      return data;
    },
  });

  const {data: playersResponse } = useQuery<PlayerType[]>({
    queryKey: ["get-players", team?.name],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/players?filter=${team?.name || ""}`);
      return response.json();
    },
    enabled: !!team, 
  });

  const removePlayer = useMutation({
    mutationFn: async (playerId: string) => {
      await fetch(`${API_URL}/players/${playerId}`, { method: "DELETE" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [["get-players"]] });
    },
  });

  return (
    <tbody>
      {playersResponse && playersResponse.length > 0  ? (
        playersResponse.map((player) => (
          <tr
            key={player.id}
            className="hover:bg-neutral-800 transition-colors"
          >
            <TableCell content={player.name} />
            <FlagCell entity={player} entities={playersResponse} type="player" />
            <FlagCell entity={player.team} entities={teamsResponse || []} type="team" />
            <TableCell content={player.age} />
            <TableCell content={player.position} />
            <TableCell content={player.overall} />
            <td className="px-4 py-2 border-t border-gray-700">
              <button
                onClick={() => onEdit(player)}
                className="text-emerald-500 hover:text-emerald-300"
              >
                <Pencil />
              </button>
            </td>
            <td className="px-4 py-2 border-t border-gray-700">
              <button
                className="text-red-500 hover:text-red-300"
                onClick={() => removePlayer.mutate(player.id)}
              >
                <Trash2 />
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={7} className="text-center py-4 text-gray-400">
            Não há jogadores no time.
          </td>
        </tr>
      )}
    </tbody>
  );
}
