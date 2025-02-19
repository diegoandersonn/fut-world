import { fastify } from "fastify";
import { PlayerDatabase } from "../db/player-database";
import { TeamDatabase } from "../db/team-database";
import { CountryDatabase } from "../db/country-database";
import { SeedDatabase } from "../db/seed";
import fastifyCors from "@fastify/cors";
import Routes from "./routes";

export const server = fastify();
const playerDatabase = new PlayerDatabase();
const teamDatabase = new TeamDatabase();
const countryDatabase = new CountryDatabase();

server.register(Routes);
server.decorate("playerDatabase", playerDatabase);
server.decorate("teamDatabase", teamDatabase);
server.decorate("countryDatabase", countryDatabase);
server.register(fastifyCors, {
  origin: "http://localhost:5174",
});

server.listen(
  {
    port: 8080,
  },
  async (err, address) => {
    if (err) console.log(err);
    console.log("Server rodando na porta 8080");
    try {
      await SeedDatabase();
      console.log("Banco de dados preenchido");
    } catch (e) {
      console.log("Erro ao prencher" + e);
    }
  }
);
