import { PlayerType } from "../../../shared/types/playerType";
import { CountryType } from "../../../shared/types/countryType";
import { TeamType } from "../../../shared/types/teamType";
import { server } from "../http/server";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
dotenv.config();

async function fetchCountries() {
  const response = await fetch(`${process.env.COUNTRY_URL}`);
  const data = await response.json();
  const array: CountryType[] = [];
  data.forEach((country) => {
    array.push({
      name:
        country.name.common === "United Kingdom"
          ? "England"
          : country.name.common,
      flag: country.flags.png,
      abbreviation:
        country.name.common === "United Kingdom" ? "ENG" : country.fifa,
      id: uuidv4(),
    });
  });

  return array;
}

async function fetchTeams(league: string) {
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
    data.teams.map(async (team) => {
      const country = await getCountry(team.area.name);
      const newTeam: TeamType = {
        name: team.shortName,
        country: country[0],
        stadium: team.venue,
        id: uuidv4(),
        manager: team.coach.name,
        logo: team.crest,
        league: "Default League",
      };
      console.log("Time " + newTeam.name + " Adicionado!");
      return newTeam;
    })
  );
  return teamsArray;
}

async function fetchPlayers(league: string, teamParam: TeamType) {
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
    data.teams.map(async (team) => {
      if (team.shortName === teamParam.name) {
        await Promise.all(
          team.squad.map(async (player) => {
            const country = await getCountry(player.nationality);
            const newPlayer: PlayerType = {
              name: player.name,
              position: getPosition(player.position),
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

function getPosition(position: string): string {
  console.log(position);
  return position;
}

async function getCountry(country: string) {
  const response = await fetch(
    `${process.env.DB_URL}/countries?filter=${country}`
  );
  const data = await response.json();
  return data;
}

async function teste123(teams: TeamType[], league: string) {
  for (const team of teams) {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    await fetchPlayers(league, team);
  }
}

export async function SeedDatabase() {
  const countries = await fetchCountries();
  countries.forEach((country: CountryType) => {
    server.countryDatabase.create(country);
  });
  console.log("Países adicionados com sucesso!");

  const leagues = ["PD/teams", "PL/teams"];
  for (const league of leagues) {
    console.log("Adicionando a liga " + league);
    await new Promise((resolve) => setTimeout(resolve, 10000));
    let teams = await fetchTeams(league);
    if (!teams) return;
    teams.forEach((team: TeamType) => server.teamDatabase.create(team));
    console.log("Times adicionados com sucesso!");
    await new Promise((resolve) => setTimeout(resolve, 10000));
    await teste123(teams, league);
    console.log("Jogadores adicionados com sucesso!");
    console.log(league + " adicionada!");
  }
}
