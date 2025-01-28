import PlayerDialog from "./player-dialog";
import { PlayerType } from "../../types/playerType";
import { TeamType } from "../../types/teamType";
import { useEffect, useRef, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import getFlagImage from "../../utils/getFlagImage";

type Props = {
  team: TeamType;
  teamPlayers: PlayerType[];
};

export default function TeamMainFooter({ team, teamPlayers }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
    const [flags, setFlags] = useState<{ [key: string]: string }>({});
  
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

  function toggleDialog() {
    if (dialogRef.current) {
      if (dialogRef.current.hasAttribute("open")) {
        dialogRef.current.close();
      } else {
        dialogRef.current.showModal();
      }
    }
  }
  return (
    <div className="flex flex-col gap-2 p-4 text-zinc-400">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Jogadores</h1>
        <button
          onClick={toggleDialog}
          className="hover:text-white hover:scale-110"
        >
          <Plus size={30} />
        </button>
        <PlayerDialog ref={dialogRef} team={team} />
      </div>
      <table className="w-full table-auto border-collapse text-left bg-neutral-950 text-white">
        <thead>
          <tr className="text-sm uppercase text-gray-300">
            <th className="px-4 py-2">Nome</th>
            <th className="px-4 py-2">Idade</th>
            <th className="px-4 py-2">Nacionalidade</th>
            <th className="px-4 py-2">Posição</th>
            <th className="px-4 py-2">Overall</th>
            <th className="px-4 py-2">Editar</th>
            <th className="px-4 py-2">Remover</th>
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
                Não há jogadores no time.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
