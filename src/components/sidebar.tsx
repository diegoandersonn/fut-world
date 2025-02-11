import { useEffect, useState } from "react";
import getFlagImage from "../utils/getFlagImage";
import { Link } from "react-router-dom";
import { Plus, Trash } from "lucide-react";
import { TeamType } from "../types/teamType";

export default function Sidebar() {
  const [selectedTeam, setSelectedTeam] = useState("");
  const [flags, setFlags] = useState<{ [key: string]: string }>({});
  const [teams, setTeams] = useState<TeamType[]>([]);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;

    const fetchTeams = async () => {
      const response = await fetch(`${API_URL}/teams`);
      const teamsData = await response.json();
      setTeams(teamsData);
      fetchFlags(teamsData);
    };

    const fetchFlags = async (teamsData: TeamType[]) => {
      const flagUrls: { [key: string]: string } = {};
      for (const team of teamsData) {
        const flagUrl = await getFlagImage(team.country);
        flagUrls[team.country] = flagUrl || "";
      }
      setFlags(flagUrls);
    };

    fetchTeams();
  }, []);

  return (
    <div className="bg-neutral-950 rounded-md ml-2 p-5 flex flex-col gap-4 w-96 text-zinc-300 overflow-auto scrollbar-thumb">
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
            <div className="w-14 h-14 bg-slate-50 hover:bg-neutral-500 rounded-md group relative">
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
                  <p>{team.country}</p>
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
              <button onClick={() => console.log('oi')}>
                <Trash
                  size={22}
                  className="text-zinc-400 hover:text-white hover:scale-110"
                />
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
