import { PlayerType } from "../../../shared/types/playerType";
import { CountryType } from "../../../shared/types/countryType";
import defaultPlayerPicture from "../assets/defaultplayerpicture.jpg";
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
    `${process.env.API_URL}/competitions/${league}?limit=${5}`,
    {
      headers: JSON.parse(process.env.HEADERS || "{}"),
    }
  );
  const data = await response.json();
  console.log(data);
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
      console.log("time adicionado");
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
    console.error("Teams data not found!");
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
              picture: "../assets/defaultplayerpicture.jpg",
              team: teamParam,
            };
            server.playerDatabase.create(newPlayer);
          })
        );
      }
    })
  );
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

async function getCountry(country: string) {
  const response = await fetch(
    `${process.env.DB_URL}/countries?filter=${country}`
  );
  const data = await response.json();
  return data;
}

async function teste123(teams: TeamType[]) {
  for (const team of teams) {
    await fetchPlayers("PL/teams", team);
  }
}

export async function SeedDatabase() {
  const countries = await fetchCountries();
  countries.forEach((country: CountryType) => {
    server.countryDatabase.create(country);
  });
  console.log("Países adicionados com sucesso!");

  const teams = await fetchTeams("PL/teams");
  teams.forEach((team: TeamType) => server.teamDatabase.create(team));
  console.log("Times adicionados com sucesso!");
  // teams = await fetchTeams("BSA/teams");
  // teams.forEach((team: TeamType) => server.teamDatabase.create(team));
  // teams = await fetchTeams("PD/teams");
  // teams.forEach((team: TeamType) => server.teamDatabase.create(team));
  await teste123(teams);
  console.log("Jogadores adicionados com sucesso!");

  console.log("Banco de dados populado com sucesso!");
}
