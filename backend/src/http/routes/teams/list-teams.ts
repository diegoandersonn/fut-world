import { FastifyInstance } from "fastify";

export default async function ListTeams(server: FastifyInstance) {
  server.get<{ Querystring: { filter?: string } }>(
    "/teams",
    (request, reply) => {
      const { filter } = request.query;
      const teams = server.teamDatabase.list(filter);
      return teams;
    }
  );
}
