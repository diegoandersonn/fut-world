import PlayerFilter from "./player-filter";
import { TableBody, TableHead, Table } from "./table/table";

export default function HomeMain() {
  return (
    <div className="flex-1 flex flex-col gap-8 bg-neutral-950 text-white rounded-md p-12 mr-2">
      <PlayerFilter />
      <div className="overflow-y-auto scrollbar-thumb">
        <Table>
          <TableHead />
          <TableBody />
        </Table>
      </div>
    </div>
  );
}
