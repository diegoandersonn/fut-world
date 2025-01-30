import { useContext } from "react";
import { PlayerType } from "../../types/playerType";
import { Pencil, Trash2 } from "lucide-react";
import { PlayersContext } from "../../context/PlayersContext";
import TableCell from "./table-cell";
import FlagCell from "./flag-cell";
import { TeamsContext } from "../../context/TeamsContext";

type Props = {
  players: PlayerType[];
  onEdit: (player: PlayerType) => void;
};

export default function TableBody({ players, onEdit }: Props) {
  const { removePlayer } = useContext(PlayersContext);
  const { teams } = useContext(TeamsContext);
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
