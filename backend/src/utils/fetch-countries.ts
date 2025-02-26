import { v4 as uuidv4 } from "uuid";
import { CountryType } from "../../../shared/types/countryType";

export default async function fetchCountries() {
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
    {
      name: "Congo",
      flag: "https://flagcdn.com/w320/cg.png",
      abbreviation: "COG",
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
