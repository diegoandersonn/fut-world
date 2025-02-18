import { FastifyInstance } from "fastify";
import { CountryType } from "../../../../../shared/types/countryType";

export default async function CreateCountry(server: FastifyInstance) {
  server.post<{ Body: CountryType }>("/countries", (request, reply) => {
    const country = request.body;
    server.countryDatabase.create(country);
    return reply.status(201).send(country);
  });
}