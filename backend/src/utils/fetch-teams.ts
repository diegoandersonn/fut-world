import { v4 as uuidv4 } from "uuid";
import { TeamType } from "../../../shared/types/teamType";
import { getCountry } from "../db/seed";

export default async function fetchTeams(league: string) {
  const response = await fetch(
    `${process.env.API_URL}/competitions/${league}`,
    {
      headers: JSON.parse(process.env.HEADERS || "{}"),
    }
  );
  const data = await response.json();
  if (!data.teams) {
    console.log(data.teams);
    console.log("Tentativa de adicionar os times falhou");
    return;
  }
  const teamsArray: TeamType[] = await Promise.all(
    data.teams.map(async (team: any) => {
      const country = await getCountry(team.area.name);
      const newTeam: TeamType = {
        name: team.shortName,
        country: country[0],
        stadium: team.venue,
        id: uuidv4(),
        manager: team.coach.name,
        logo: team.crest,
        league:
          league === "PL/teams"
            ? "Premier League"
            : league === "PD/teams"
            ? "La Liga"
            : league === "BL1/teams"
            ? "Bundesliga"
            : league === "SA/teams"
            ? "Serie A"
            : "Default League",
      };
      console.log("Time " + newTeam.name + " Adicionado!");
      return newTeam;
    })
  );
  return teamsArray;
}
