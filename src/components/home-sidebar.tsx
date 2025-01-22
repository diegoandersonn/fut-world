import { useContext } from "react";
import { TeamsContext } from "../context/TeamsContext";
import { Plus } from "lucide-react";

export default function Sidebar() {
  const { teams } = useContext(TeamsContext);
  return (
    <div className="bg-neutral-950 text-white rounded-md ml-2 p-6 flex flex-col gap-4">
      <div className="flex justify-between items-center text-zinc-300">
        <h1 className="text-lg font-medium">Times</h1>
        <button>
          <Plus />
        </button>
      </div>
      <div className="flex flex-col">
        {teams.map((team) => (
          <div className="flex flex-col">
            <div>
              <p>{team.teamName}</p>
            </div>
            <div className="flex gap-1 text-xs text-zinc-300">
              <p>{team.teamCountry.name}</p>
              <p>{team.teamStadium}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
