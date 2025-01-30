import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { TeamsContext } from "../context/TeamsContext";
import { PlayersContext } from "../context/PlayersContext";
import TeamMainHeader from "./ui/team-main-header";
import TeamMainFooter from "./ui/team-main-footer";

export default function TeamMain() {
  const { teams } = useContext(TeamsContext);
  const location = useLocation();
  let team = location.state?.team;
  team = teams.find((t) => t.id === team.id);
  const { players } = useContext(PlayersContext);
  const teamPlayers =
    players.filter((player) => team.id === player.teamId) || [];
  return (
    <div className="flex-1 flex flex-col bg-neutral-950 w-full mr-2 text-white rounded-md gap-28">
      <TeamMainHeader team={team} />
      <TeamMainFooter team={team} players={teamPlayers} />
    </div>
  );
}
