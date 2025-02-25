import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetTeams } from "../../hooks/use-getTeams";
import { Link } from "react-router-dom";
import { Trash } from "lucide-react";
import { useState } from "react";

export default function SidebarList() {
  const [selectedTeam, setSelectedTeam] = useState("");
  const teams = useGetTeams();
  const API_URL = import.meta.env.VITE_API_URL;
  const queryClient = useQueryClient();
  const removeTeam = useMutation({
    mutationFn: async (teamId: string) => {
      await fetch(`${API_URL}/teams/${teamId}`, { method: "DELETE" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-teams"] });
    },
  });

  return (
    <div className="flex flex-col overflow-y-auto scrollbar-thumb">
      {teams?.map((team, index) => (
        <div
          key={index}
          className={
            team.id !== selectedTeam
              ? "flex p-3 group rounded-md hover:bg-neutral-800"
              : "flex p-3 group rounded-md bg-neutral-800"
          }
        >
          <Link
            to={`/Team/${team.name}`}
            state={{ team }}
            onClick={() => setSelectedTeam(team.id)}
            className="flex flex-1 gap-3 cursor-pointer"
          >
            <div className="w-14 h-14 bg-slate-50 hover:bg-neutral-500 rounded-md group relative">
              <img src={team.logo} alt="" className="w-14 h-14 rounded-md" />
            </div>
            <div className="flex flex-col flex-1 overflow-hidden">
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
              <div className="flex gap-2 text-xs text-zinc-500 overflow-y-auto">
                <div className="flex items-center gap-1 whitespace-nowrap">
                  <p>{team.country.name ?? "Default Country"}</p>
                  <img src={team.country.flag} alt="asdasd" className="w-4 h-3" />
                </div>
                <div className="truncate max-w-[120px]">{team.stadium}</div>
              </div>
            </div>
          </Link>
          <button
            onClick={() => removeTeam.mutate(team.id)}
            className="flex items-center"
          >
            <Trash
              size={22}
              className="text-zinc-400 hover:text-white hover:scale-110"
            />
          </button>
        </div>
      ))}
    </div>
  );
}
