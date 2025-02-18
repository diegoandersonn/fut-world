import { PlayerDatabase } from "./player-database.ts";
import { TeamDatabase } from "./team-database.ts";
import { CountryDatabase } from "./db/country-database.js";

declare module "fastify" {
  interface FastifyInstance {
    playerDatabase: PlayerDatabase;
    teamDatabase: TeamDatabase;
    countryDatabase: CountryDatabase;
  }
}
