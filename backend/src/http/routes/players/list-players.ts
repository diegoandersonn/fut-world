import { FastifyInstance } from "fastify";

export default async function ListPlayers(server: FastifyInstance) {
  server.get<{ Querystring: { filter?: string } }>(
    "/players",
    (request, reply) => {
      const { filter } = request.query;
      const players = server.playerDatabase.list(filter);
      return players;
    }
  );
}
