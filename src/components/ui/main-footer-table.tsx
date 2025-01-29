import { Pencil, Trash2 } from "lucide-react";
import EditPlayerDialog from "./edit-player-dialog";
import { useState, useEffect, useRef } from "react";
import getFlagImage from "../../utils/getFlagImage";
import { PlayerType } from "../../types/playerType";

type Props = {
  teamPlayers: PlayerType[];
};

export default function MainFooterTable({ teamPlayers }: Props) {
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerType | null>(null);
  const [flags, setFlags] = useState<{ [key: string]: string }>({});
  const editDialogRef = useRef<HTMLDialogElement>(null);

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

  function toggleEditDialog(player: PlayerType) {
    setSelectedPlayer(player);
    console.log(editDialogRef);
    if (editDialogRef.current) {
      if (editDialogRef.current.hasAttribute("open")) {
        editDialogRef.current.close();
      } else {
        editDialogRef.current.showModal();
      }
    }
  }

  return (
    <>
      <table className="w-full table-auto border-collapse text-left bg-neutral-950 text-white">
        <thead>
          <tr className="text-sm uppercase text-gray-300">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Age</th>
            <th className="px-4 py-2">Nationality</th>
            <th className="px-4 py-2">Position</th>
            <th className="px-4 py-2">Overall</th>
            <th className="px-4 py-2">Edit</th>
            <th className="px-4 py-2">Remove</th>
          </tr>
        </thead>
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
                <td className="px-4 py-2 border-t border-gray-700">
                  {player.age}
                </td>
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
                    onClick={() => toggleEditDialog(player)}
                    className="text-emerald-500 hover:text-emerald-300"
                  >
                    <Pencil />
                  </button>
                </td>
                <td className="px-4 py-2 border-t border-gray-700">
                  <button className="text-red-500 hover:text-red-300">
                    <Trash2 />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-400">
                Não há jogadores no time.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {selectedPlayer && (
        <EditPlayerDialog ref={editDialogRef} player={selectedPlayer} />
      )}
    </>
  );
}
