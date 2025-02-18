import { PlayerType } from "../../../types/playerType";
import { Pencil, Trash2 } from "lucide-react";
import { FlagCell, ImageCell, TableCell } from "./table";
import { TeamType } from "../../../types/teamType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

type Props = {
  team?: TeamType;
};

export default function TableBody({ team }: Props) {
  const queryClient = useQueryClient();
  const API_URL = import.meta.env.VITE_API_URL;

  const { data: playersResponse } = useQuery<PlayerType[]>({
    queryKey: ["get-players", team?.name || "all"],
    queryFn: async () => {
      const response = await fetch(
        `${API_URL}/players?filter=${team?.name || ""}`
      );
      return response.json();
    },
  });

  const removePlayer = useMutation({
    mutationFn: async (player: PlayerType) => {
      await fetch(`${API_URL}/players/${player.id}`, { method: "DELETE" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-players"] });
    },
  });

  return (
    <tbody>
      {playersResponse && playersResponse.length > 0 ? (
        playersResponse.map((player) => (
          <tr
            key={player.id}
            className="hover:bg-neutral-800 transition-colors"
          >
            <ImageCell content={player.picture} />
            <TableCell content={player.name} />
            <FlagCell entity={player} type="player" />
            <FlagCell entity={player.team} type="team" />
            <TableCell content={player.age} />
            <TableCell content={player.position} />
            <TableCell content={player.overall} />
            <td className="px-4 py-2 border-t border-gray-700">
              <Link
                to={`/Player/${player.name}`}
                state={{ player }}
                className="text-emerald-500 hover:text-emerald-300"
              >
                <Pencil />
              </Link>
            </td>
            <td className="px-4 py-2 border-t border-gray-700">
              <button
                className="text-red-500 hover:text-red-300"
                onClick={() => removePlayer.mutate(player)}
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
