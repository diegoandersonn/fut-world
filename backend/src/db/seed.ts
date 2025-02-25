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
  data.forEach((country: any) => {
    array.push({
      name: countryParser(country.name.common),
      flag: country.flags.png,
      abbreviation: country.fifa,
      id: uuidv4(),
    });
  });
  const unitedKingdom = [
    {
      name: "England",
      abbreviation: "ENG",
      flag: "https://flagcdn.com/w320/gb-eng.png",
      id: uuidv4(),
    },
    {
      name: "Scotland",
      flag: "https://flagcdn.com/w320/gb-sct.png",
      abbreviation: "SCO",
      id: uuidv4(),
    },
    {
      name: "Wales",
      abbreviation: "WAL",
      flag: "https://flagcdn.com/w320/gb-wls.png",
      id: uuidv4(),
    },
    {
      name: "Northern Ireland",
      flag: "https://flagcdn.com/w320/gb-nir.png",
      abbreviation: "NIR",
      id: uuidv4(),
    },
  ];
  unitedKingdom.forEach((country) => {
    array.push({
      name: country.name,
      flag: country.flag,
      abbreviation: country.abbreviation,
      id: country.id,
    });
  });
  return array;
}

function countryParser(country: string): string {
  if (country === "Bosnia and Herzegovina") return "Bosnia-Herzegovina";
  if (country === "Cape Verde") return "Cape Verde Islands";
  if (country === "United States") return "USA";
  if (country === "Czechia") return "Czech Republic";
  if (country === "Bosnia and Herzegovina") return "Bosnia-Herzegovina";
  return country;
}

async function getCountry(country: string) {
  const response = await fetch(
    `${process.env.DB_URL}/countries?filter=${country}`
  );
  const data = await response.json();
  return data;
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
    data.teams.map(async (team: any) => {
      const country = await getCountry(team.area.name);
      const newTeam: TeamType = {
        name: team.shortName,
        country: country[0],
        stadium: team.venue,
        id: uuidv4(),
        manager: team.coach.name,
        logo: team.crest,
        league: league === "PL/teams" ? "Premier League" : league === "PD/teams" ? "La Liga" : "Default League",
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
    data.teams.map(async (team: any) => {
      if (team.shortName === teamParam.name) {
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

  const leagues = ["PL/teams", "PD/teams"];
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
