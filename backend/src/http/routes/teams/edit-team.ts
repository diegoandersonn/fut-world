import { FastifyInstance } from "fastify";
import { TeamType } from "../../../types/teamType.ts";

export default async function EditTeam(server: FastifyInstance) {
  server.put<{ Body: TeamType; Params: { id: string } }>(
    "/teams/:id",
    (request, reply) => {
      const { id } = request.params;
      const team = request.body;
      server.teamDatabase.update(id, team);
      return reply.status(204).send();
    }
  );
}
