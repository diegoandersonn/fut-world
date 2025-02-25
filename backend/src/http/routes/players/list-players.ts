import { FastifyInstance } from "fastify";

export default async function ListPlayers(server: FastifyInstance) {
  server.get<{
    Querystring: {
      filter?: string;
      type?: string;
      orderBy?: string;
      order?: "Ascending" | "Descending";
    };
  }>("/players", (request, reply) => {
    const { filter, type, orderBy, order } = request.query;
    console.log({ order, orderBy });
    const orderAA = {
      order: order,
      value: orderBy,
    };
    const players = server.playerDatabase.list(filter, type, orderAA);
    return players;
  });
}
