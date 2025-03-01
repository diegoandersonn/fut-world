import { useLocation } from "react-router-dom";
import TeamMainHeader from "./main-header";
import TeamMainFooter from "./main-footer";
import { useQuery } from "@tanstack/react-query";
import { TeamType } from "../../../../../shared/types/teamType";

export default function TeamMain() {
  const location = useLocation();
  const API_URL = import.meta.env.VITE_API_URL;
  const teamName = location.state?.team.name;
  const { data: team, isLoading } = useQuery<TeamType>({
    queryKey: ["get-teams", teamName],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/teams?filter=${teamName}`);
      const data = await response.json();
      return data[0];
    },
  });
  if (isLoading) return <p>Loading...</p>;
  if (!team) return <p>Time não encontrado</p>;
  return (
    <div className="flex-1 flex flex-col bg-neutral-950 w-full h-full mr-2 text-white rounded-md overflow-y-auto scrollbar-thumb">
      <TeamMainHeader team={team} />
      <TeamMainFooter team={team} />
    </div>
  );
}
