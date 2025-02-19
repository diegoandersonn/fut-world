import PlayerDialog from "../player-dialog";
import { TeamType } from "../../../../../shared/types/teamType"; 
import { useRef } from "react";
import { Plus } from "lucide-react";
import PlayersTable from "../table/players-table";

type Props = {
  team: TeamType;
};

export default function TeamMainFooter({ team }: Props) {
  const playerDialogRef = useRef<HTMLDialogElement>(null);

  function togglePlayerDialog() {
    if (playerDialogRef.current) {
      if (playerDialogRef.current.hasAttribute("open")) {
        playerDialogRef.current.close();
      } else {
        playerDialogRef.current.showModal();
      }
    }
  }
  return (
    <div className="flex flex-col gap-2 p-4 text-zinc-400">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Jogadores</h1>
        <button
          onClick={togglePlayerDialog}
          className="hover:text-white hover:scale-110"
        >
          <Plus size={30} />
        </button>
        <PlayerDialog ref={playerDialogRef} team={team} />
      </div>
      <PlayersTable team={team} />
    </div>
  );
}
