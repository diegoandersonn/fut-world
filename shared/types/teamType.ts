import { CountryType } from "./countryType";
import { PlayerType } from "./playerType";

export type TeamType = {
  name: string;
  country: CountryType;
  stadium: string;
  id: string;
  logo: string;
  manager: string;
  league: string;
};
