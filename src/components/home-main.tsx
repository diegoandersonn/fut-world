import { useContext } from "react";
import { PlayersContext } from "../context/PlayersContext";
import MainFooterTable from "./ui/main-footer-table";

export default function HomeMain() {
  const { players } = useContext(PlayersContext);

  return (
    <div className="flex-1 bg-neutral-950 text-white rounded-md p-12 mr-2">
      <MainFooterTable players={players} />
    </div>
  );
}
