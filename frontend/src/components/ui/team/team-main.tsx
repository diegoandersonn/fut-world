import { useLocation } from "react-router-dom";
import TeamMainHeader from "./main-header";
import TeamMainFooter from "./main-footer";
import { useQuery } from "@tanstack/react-query";
import { TeamType } from "../../../../../shared/types/teamType";

export default function TeamMain() {
  const location = useLocation();
  const API_URL = import.meta.env.VITE_API_URL;
  const teamName = location.state?.team.name;
  const { data: team, isLoading } = useQuery<TeamType[]>({
    queryKey: ["get-teams", teamName],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/teams?filter=${teamName}`);
      return await response.json();
    },
  });
  if(isLoading) return <p>Loading...</p>;
  if (!team) return <p>Time não encontrado</p>;
  return (
    <div className="flex-1 flex flex-col bg-neutral-950 w-full mr-2 text-white rounded-md gap-28">
      <TeamMainHeader team={team[0]} />
      <div className="overflow-y-auto scrollbar-thumb">
        <TeamMainFooter team={team[0]} />
      </div>
    </div>
  );
}
