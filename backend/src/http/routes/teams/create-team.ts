import { FastifyInstance } from "fastify";
import { TeamType } from "../../../types/teamType.ts";

export default async function CreateTeam(server: FastifyInstance) {
  server.post<{ Body: TeamType }>("/teams", (request, reply) => {
    const team = request.body;
    server.teamDatabase.create(team);
    return reply.status(201).send();
  });
}