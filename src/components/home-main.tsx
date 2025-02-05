import { useContext } from "react";
import { PlayersContext } from "../context/PlayersContext";
import PlayersTable from "./ui/players-table";

export default function HomeMain() {
  const { players } = useContext(PlayersContext);

  return (
    <div className="flex-1 bg-neutral-950 text-white rounded-md p-12 mr-2 overflow-auto scrollbar-thumb">
      <PlayersTable players={players} />
    </div>
  );
}
