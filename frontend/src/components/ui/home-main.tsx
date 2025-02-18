import PlayersTable from "./table/players-table";

export default function HomeMain() {
  return (
    <div className="flex-1 bg-neutral-950 text-white rounded-md p-12 mr-2 overflow-auto scrollbar-thumb">
      <PlayersTable />
    </div>
  );
}
