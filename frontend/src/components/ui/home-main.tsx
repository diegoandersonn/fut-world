import PlayersTable from "./table/players-table";

export default function HomeMain() {
  return (
    <div className="flex-1 bg-neutral-950 text-white rounded-md p-12 mr-2 overflow-auto scrollbar-thumb">
      <div>
        <form action="">
          <input type="text" className="p-3 h-8 text-white text-sm bg-neutral-950 border border-zinc-400 rounded-md hover:scale-110 focus:outline-none" placeholder="Name" />
        </form>
      </div>
      <PlayersTable />
    </div>
  );
}
