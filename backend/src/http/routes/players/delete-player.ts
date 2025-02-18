import { FastifyInstance } from "fastify";

export default async function DeletePlayer(server: FastifyInstance) {
  server.delete<{ Params: { id: string } }>(
    "/players/:id",
    (request, reply) => {
      const { id } = request.params;
      server.playerDatabase.delete(id);
      return reply.status(204).send();
    }
  );
}
