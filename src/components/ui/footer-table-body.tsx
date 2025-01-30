import { useState, useEffect, useContext } from "react";
import getFlagImage from "../../utils/getFlagImage";
import { PlayerType } from "../../types/playerType";
import { Pencil, Trash2 } from "lucide-react";
import { PlayersContext } from "../../context/PlayersContext";

type Props = {
  teamPlayers: PlayerType[];
  onEdit: (player: PlayerType) => void;
};

export default function FooterTableBody({ teamPlayers, onEdit }: Props) {
  const [flags, setFlags] = useState<{ [key: string]: string }>({});
  const { removePlayer } = useContext(PlayersContext);

  useEffect(() => {
    const fetchFlags = async () => {
      const flagUrls: { [key: string]: string } = {};
      for (const player of teamPlayers) {
        const flagUrl = await getFlagImage(player.nationality);
        flagUrls[player.nationality] = flagUrl || "";
      }
      setFlags(flagUrls);
    };

    if (teamPlayers.length > 0) {
      fetchFlags();
    }
  }, [teamPlayers]);
  return (
    <tbody>
      {teamPlayers.length > 0 ? (
        teamPlayers.map((player) => (
          <tr
            key={player.id}
            className="hover:bg-neutral-800 transition-colors"
          >
            <td className="px-4 py-2 border-t border-gray-700">
              {player.name}
            </td>
            <td className="px-4 py-2 border-t border-gray-700">{player.age}</td>
            <td className="px-4 py-2 border-t border-gray-700">
              <div className="flex items-center gap-1">
                {player.nationality}
                <img
                  src={flags[player.nationality || ""]}
                  className="w-4 h-3"
                  alt=""
                />
              </div>
            </td>
            <td className="px-4 py-2 border-t border-gray-700">
              {player.position}
            </td>
            <td className="px-4 py-2 border-t border-gray-700">
              {player.overall}
            </td>
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
