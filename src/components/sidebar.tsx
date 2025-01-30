import { useContext, useEffect, useState } from "react";
import { TeamsContext } from "../context/TeamsContext";
import getFlagImage from "../utils/getFlagImage";
import { Link } from "react-router-dom";
import { Plus, Trash } from "lucide-react";

export default function Sidebar() {
  const [selectedTeam, setSelectedTeam] = useState("");
  const { teams } = useContext(TeamsContext);
  const [flags, setFlags] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchFlags = async () => {
      const flagUrls: { [key: string]: string } = {};
      for (const team of teams) {
        const flagUrl = await getFlagImage(team.country);
        flagUrls[team.country] = flagUrl || "";
      }
      setFlags(flagUrls);
    };

    if (teams.length > 0) {
      fetchFlags();
    }
  }, [teams]);

  return (
    <div className="bg-neutral-950 rounded-md ml-2 p-5 flex flex-col gap-4 min-w-72 text-zinc-300">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-medium hover:text-white hover:scale-105">
          Teams
        </h1>
        <Link to="/CreateTeam">
          <Plus className="hover:text-white hover:scale-125" />
        </Link>
      </div>
      <div className="flex flex-col">
        {teams.map((team, index) => (
          <Link
            to={`/Team/${team.name}`}
            state={{ team }}
            onClick={() => setSelectedTeam(team.id)}
            key={index}
            className={
              team.id !== selectedTeam
                ? "group flex p-3 rounded-md gap-3 cursor-pointer hover:bg-neutral-800"
                : "group flex p-3 rounded-md gap-3 cursor-pointer bg-neutral-800"
            }
          >
            <div>
              <img src={team.logo} alt="" className="w-14 h-14 rounded-md" />
            </div>
            <div className="flex flex-col flex-1">
              <div>
                <h1
                  className={
                    team.id === selectedTeam
                      ? "font-semibold text-emerald-500"
                      : "font-semibold text-zinc-300 group-hover:text-emerald-500"
                  }
                >
                  {team.name}
                </h1>
              </div>
              <div className="flex gap-2 text-xs text-zinc-500">
                <div className="flex items-center gap-1">
                  <p className="truncate">{team.country}</p>
                  <img
                    src={flags[team.country] || ""}
                    alt=""
                    className="w-4 h-3"
                  />
                </div>
                <p className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                  {team.stadium}
                </p>
              </div>
            </div>
              <div className="flex items-center">
            <Trash size={22} className="text-zinc-400 hover:text-white hover:scale-110"/>
              </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
