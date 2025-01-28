import { useContext, useEffect, useState } from "react";
import { PlayersContext } from "../context/PlayersContext";
import { Pencil, Trash2 } from "lucide-react";
import getFlagImage from "../utils/getFlagImage";

export default function HomeMain() {
  const { players } = useContext(PlayersContext);
  const [playerFlags, setPlayerFlags] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchFlags = async () => {
      const flagUrls: { [key: string]: string } = {};
      for (const player of players) {
        const flagUrl = await getFlagImage(player.nationality);
        flagUrls[player.nationality] = flagUrl || "";
      }
      setPlayerFlags(flagUrls);
    };

    if (players.length > 0) {
      fetchFlags();
    }
  }, [players]);
  
  return (
    <div className="flex-1 bg-neutral-950 text-white rounded-md p-12 mr-2">
      <table className="w-full table-auto border-collapse text-left bg-neutral-950 text-white">
        <thead>
          <tr className="text-sm uppercase text-gray-300">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Nationality</th>
            <th className="px-4 py-2">Team</th>
            <th className="px-4 py-2">Age</th>
            <th className="px-4 py-2">Position</th>
            <th className="px-4 py-2">Overall</th>
            <th className="px-4 py-2">Edit</th>
            <th className="px-4 py-2">Remove</th>
          </tr>
        </thead>
        <tbody>
          {players.length > 0 ? (
            players.map((player) => (
              <tr
                key={player.id}
                className="hover:bg-neutral-800 transition-colors"
              >
                <td className="px-4 py-2 border-t border-gray-700">
                  {player.name}
                </td>
                <td className="px-4 py-2 border-t border-gray-700">
                  <div className="flex items-center gap-1">
                    {player.nationality}
                    <img
                      src={playerFlags[player.nationality || ""]}
                      className="w-4 h-3"
                      alt=""
                    />
                  </div>
                </td>
                <td className="px-4 py-2 border-t border-gray-700">
                  {player.team}
                </td>
                <td className="px-4 py-2 border-t border-gray-700">
                  {player.age}
                </td>
                <td className="px-4 py-2 border-t border-gray-700">
                  {player.position}
                </td>
                <td className="px-4 py-2 border-t border-gray-700">
                  {player.overall}
                </td>
                <td className="px-4 py-2 border-t border-gray-700">
                  <button className="text-emerald-500 hover:text-emerald-300">
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
                Não há jogadores criados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
