import { PlayerType } from "../../../shared/types/playerType";
import { CountryType } from "../../../shared/types/countryType";
import { TeamType } from "../../../shared/types/teamType";
import { server } from "../http/server";
import dotenv from "dotenv";
import fetchPlayers from "../utils/fetch-players";
import fetchCountries from "../utils/fetch-countries";
import fetchTeams from "../utils/fetch-teams";
dotenv.config();

export async function getCountry(country: string) {
  const response = await fetch(
    `${process.env.DB_URL}/countries?filter=${country}`
  );
  const data = await response.json();
  return data;
}

async function fetchTimeout(teams: TeamType[], league: string) {
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

  const leagues = ["PL/teams", "PD/teams", "BL1/teams", "SA/teams"];
  for (const league of leagues) {
    console.log("Adicionando a liga " + league);
    await new Promise((resolve) => setTimeout(resolve, 10000));
    let teams = await fetchTeams(league);
    if (!teams) return;
    teams.forEach((team: TeamType) => server.teamDatabase.create(team));
    console.log("Times adicionados com sucesso!");
    await new Promise((resolve) => setTimeout(resolve, 10000));
    await fetchTimeout(teams, league);
    console.log("Jogadores adicionados com sucesso!");
    console.log(league + " adicionada!");
  }
}
