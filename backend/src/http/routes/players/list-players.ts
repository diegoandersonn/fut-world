import { FastifyInstance } from "fastify";

export default async function ListPlayers(server: FastifyInstance) {
  server.get<{
    Querystring: {
      filter?: string;
      type?: string;
      orderBy?: "team" | "country" | "name";
      order?: "Ascending" | "Descending";
    };
  }>("/players", (request, reply) => {
    const { filter, type, orderBy, order } = request.query;
    const players = server.playerDatabase.list(filter, type, {
      order: order,
      value: orderBy,
    });
    return players;
  });
}
