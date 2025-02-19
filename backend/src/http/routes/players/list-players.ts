import { FastifyInstance } from "fastify";

export default async function ListPlayers(server: FastifyInstance) {
  server.get<{ Querystring: { filter?: string, type?: string } }>(
    "/players",
    (request, reply) => {
      const { filter, type } = request.query;
      const players = server.playerDatabase.list(filter, type);
      return players;
    }
  );
}
