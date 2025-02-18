import { CountryType } from "./countryType.ts";
import { TeamType } from "./teamType.ts";

export type PlayerType = {
    name: string;
    age: string;
    country: CountryType;
    position: string;
    overall: number;
    id: string;
    team: TeamType;
    atb1: number;
    atb2: number;
    atb3: number;
    atb4: number;
    atb5: number;
    atb6: number;
  };