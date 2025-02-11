import { useLocation } from "react-router-dom";
import TeamMainHeader from "./ui/team-main-header";
import TeamMainFooter from "./ui/team-main-footer";
import { useEffect, useState } from "react";
import { TeamType } from "../types/teamType";

export default function TeamMain() {
  const location = useLocation();
  const [teams, setTeams] = useState<TeamType[]>([]);
  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;
    const fetchTeams = async () => {
      const response = await fetch(`${API_URL}/teams`);
      const teamsData = await response.json();
      setTeams(teamsData);
    };
    fetchTeams();
  }, []);
  let team = location.state?.team;
  team = teams.find((t) => t.id === team.id);
  return (
    <div className="flex-1 flex flex-col bg-neutral-950 w-full mr-2 text-white rounded-md gap-28">
      <TeamMainHeader team={team} />
      <TeamMainFooter team={team} />
    </div>
  );
}
