import { CountryType } from "./countryType.ts";

export type TeamType = {
  name: string;
  country: CountryType;
  stadium: string;
  id: string;
  logo: string;
  manager: string;
  league: string;
};