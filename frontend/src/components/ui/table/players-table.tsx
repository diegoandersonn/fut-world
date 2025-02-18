import TableHead from "./table-head";
import TableBody from "./table-body";
import { TeamType } from "../../../../../shared/types/teamType"; 

type Props = {
  team?: TeamType;
};

export default function PlayersTable({ team }: Props) {
  // const editDialogRef = useRef<HTMLDialogElement>(null);
  // const [selectedPlayer, setSelectedPlayer] = useState<PlayerType | null>(null);
  // function toggleEditDialog(player: PlayerType) {
  //   setSelectedPlayer(player);
  //   if (editDialogRef.current) {
  //     editDialogRef.current.showModal();
  //   }
  // }
  return (
    <>
      <table className="w-full table-auto border-collapse text-left bg-neutral-950 text-white">
        <TableHead />
        <TableBody team={team} />
      </table>
      {/* {selectedPlayer && (
        <EditPlayerDialog ref={editDialogRef} player={selectedPlayer} />
      )} */}
    </>
  );
}
