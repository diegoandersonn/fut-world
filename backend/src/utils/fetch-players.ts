import { PlayerType } from "../../../shared/types/playerType";
import { TeamType } from "../../../shared/types/teamType";
import { v4 as uuidv4 } from "uuid";
import { server } from "../http/server";
import { getCountry } from "../db/seed";

export default async function fetchPlayers(
  league: string,
  teamParam: TeamType
) {
  const response = await fetch(
    `${process.env.API_URL}/competitions/${league}`,
    {
      headers: JSON.parse(process.env.HEADERS || "{}"),
    }
  );
  const data = await response.json();
  if (!data.teams) {
    console.log(
      "Tentativa de adicionar os jogadores do time " +
        teamParam.name +
        " falhou"
    );
    return;
  }
  await Promise.all(
    data.teams.map(async (team: any) => {
      if (team.shortName === teamParam.name) {
          if (team.shortName === "Cagliari") console.log(team.squad);
        await Promise.all(
          team.squad.map(async (player: any) => {
            const country = await getCountry(player.nationality);
            if (!country[0].name) console.log(player.nationality);
            const newPlayer: PlayerType = {
              name: player.name,
              position: player.position,
              age: calculateAge(player.dateOfBirth),
              country: country[0],
              atb1: 80,
              atb2: 80,
              atb3: 80,
              atb4: 80,
              atb5: 80,
              atb6: 80,
              id: uuidv4(),
              overall: 80,
              picture: "/src/assets/defaultplayerpicture.jpg",
              team: teamParam,
            };
            server.playerDatabase.create(newPlayer);
          })
        );
      }
    })
  );
  console.log("Jogadores do " + teamParam.name + " adicionados");
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
