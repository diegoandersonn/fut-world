import { useEffect, useState } from "react";
import { PlayerType } from "../../types/playerType";
import { Pencil, Trash2 } from "lucide-react";
import TableCell from "./table-cell";
import FlagCell from "./flag-cell";
import { TeamType } from "../../types/teamType";

type Props = {
  team?: TeamType;
  onEdit: (player: PlayerType) => void;
};

export default function TableBody({ onEdit, team }: Props) {
  const [players, setPlayers] = useState<PlayerType[]>([]);
  const [teams, setTeams] = useState<TeamType[]>([]);
  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchTeam = async () => {
      const response = await fetch(`${API_URL}/teams`);
      const data = await response.json();
      setTeams(data);
    };
    fetchTeam();
    if (team) {
      const fetchPlayer = async () => {
        const response = await fetch(`${API_URL}/players?filter=${team.name}`);
        const data = await response.json();
        setPlayers(data);
      };
      fetchPlayer();
    } else {
      const fetchPlayer = async () => {
        const response = await fetch(`${API_URL}/players`);
        const data = await response.json();
        setPlayers(data);
      };
      fetchPlayer();
    }
  }, [API_URL, team]);

  async function removePlayer(player: PlayerType) {
    try {
      const response = await fetch(`${API_URL}/players/${player.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const players =  await response.json()
        setPlayers(players);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <tbody>
      {players.length > 0 ? (
        players.map((player) => (
          <tr
            key={player.id}
            className="hover:bg-neutral-800 transition-colors"
          >
            <TableCell content={player.name} />
            <FlagCell entity={player} entities={players} type="player" />
            <FlagCell entity={player.team} entities={teams} type="team" />
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
                onClick={() => removePlayer(player)}
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
