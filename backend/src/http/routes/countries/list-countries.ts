import { FastifyInstance } from "fastify";

export default async function ListCountries(server: FastifyInstance) {
  server.get<{ Querystring: { filter?: string } }>(
    "/countries",
    (request, reply) => {
      const { filter } = request.query;
      const countries = server.countryDatabase.list(filter);
      return countries;
    }
  );
}
