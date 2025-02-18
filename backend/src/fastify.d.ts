import { PlayerDatabase } from "./player-database.ts";
import { TeamDatabase } from "./team-database.ts";

declare module "fastify" {
  interface FastifyInstance {
    playerDatabase: PlayerDatabase;
    teamDatabase: TeamDatabase;
  }
}
