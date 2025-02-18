import { PlayerType } from "../types/playerType";
import { TeamType } from "../types/teamType";
import { server } from "../http/server";
import { v4 as uuidv4 } from "uuid";

import.meta.env.VITE_API_URL;
import.meta.env.HEADERS;

async function fetchTeams(league: string) {
  const response = await fetch(`${API_URL}/competitions/${league}`, {
    headers: HEADERS,
  });
  const data = await response.json();
  let teamsArray: TeamType[];
  return (teamsArray = data.teams.map((team) => ({
    name: team.shortName,
    country: { name: team.area.name, flag: team.area.flag },
    stadium: team.venue,
    id: uuidv4(),
    manager: team.coach.name,
    logo: team.crest,
    league: "Default League",
  })));
}

function calculateAge(dateOfBirth: string): string {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age.toString();
}

async function fetchPlayers(league: string) {
  const response = await fetch(`${API_URL}/competitions/${league}`, {
    headers: HEADERS,
  });
  const data = await response.json();
  let players: PlayerType[] = data.teams.flatMap((team) =>
    team.squad.map((player) => ({
      age: calculateAge(player.dateOfBirth),
      atb1: 80,
      atb2: 80,
      atb3: 80,
      atb4: 80,
      atb5: 80,
      atb6: 80,
      overall: 80,
      country: { name: player.nationality, flag: team.area.flag },
      id: uuidv4(),
      name: player.name,
      position: player.position,
      team: {
        name: team.shortName,
        country: { name: team.area.name, flag: team.area.flag },
        stadium: team.venue,
        id: uuidv4(),
        manager: team.coach.name,
        logo: team.crest,
        league: "Default League",
      },
    }))
  );
  return players;
}

export async function SeedDatabase() {
  let teams = await fetchTeams("PL/teams");
  teams.forEach((team: TeamType) => server.teamDatabase.create(team));
  teams = await fetchTeams("BSA/teams");
  teams.forEach((team: TeamType) => server.teamDatabase.create(team));
  teams = await fetchTeams("PD/teams");
  teams.forEach((team: TeamType) => server.teamDatabase.create(team));
  console.log("Banco de dados populado com sucesso!");

  let players = await fetchPlayers("PL/teams");
  players.forEach((player: PlayerType) => server.playerDatabase.create(player));
  players = await fetchPlayers("BSA/teams");
  players.forEach((player: PlayerType) => server.playerDatabase.create(player));
  players = await fetchPlayers("PD/teams");
  players.forEach((player: PlayerType) => server.playerDatabase.create(player));
  console.log("Banco de dados populado com sucesso!");
}
