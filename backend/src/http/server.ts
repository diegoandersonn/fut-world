import { fastify } from "fastify";
import { PlayerDatabase } from "../db/player-database.ts";
import { TeamDatabase } from "../db/team-database.ts";
import { SeedDatabase } from "../db/seed.ts";
import fastifyCors from "@fastify/cors";
import Routes from "./routes.ts";

export const server = fastify();
const playerDatabase = new PlayerDatabase();
const teamDatabase = new TeamDatabase();

server.register(Routes);
server.decorate("playerDatabase", playerDatabase);
server.decorate("teamDatabase", teamDatabase);
server.register(fastifyCors, {
  origin: "http://localhost:5173",
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
