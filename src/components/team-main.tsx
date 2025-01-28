import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { TeamsContext } from "../context/TeamsContext";
import TeamMainHeader from "./ui/team-main-header";
import TeamMainFooter from "./ui/team-main-footer";
import { PlayersContext } from "../context/PlayersContext";

export default function TeamMain() {
  const { teams } = useContext(TeamsContext);
  const location = useLocation();
  let team = location.state?.team;
  team = teams.find((t) => t.id === team.id);
  const { players } = useContext(PlayersContext);
  const teamPlayers = players.filter((player) => team.id === player.teamId) || [];
  console.log(players);
  return (
    <div className="flex flex-col bg-neutral-950 w-full mr-2 text-white rounded-md gap-28">
      <TeamMainHeader team={team} />
      <TeamMainFooter team={team} teamPlayers={teamPlayers} />
    </div>
  );
}
