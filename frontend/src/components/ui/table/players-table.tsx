import TableHead from "./table-head";
import TableBody from "./table-body";
import { TeamType } from "../../../../../shared/types/teamType";

type Props = {
  team?: TeamType;
};

export default function PlayersTable({ team }: Props) {
  return (
    <>
      <table className="w-full table-auto border-collapse text-left bg-neutral-950 text-white">
        <TableHead />
        <TableBody team={team} />
      </table>
    </>
  );
}
