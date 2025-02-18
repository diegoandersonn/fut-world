import { FastifyInstance } from "fastify";

export default async function DeleteTeam(server: FastifyInstance) {
  server.delete<{ Params: { id: string } }>(
    "/teams/:id",
    (request, reply) => {
      const { id } = request.params;
      server.teamDatabase.delete(id);
      return reply.status(204).send();
    }
  );
}
