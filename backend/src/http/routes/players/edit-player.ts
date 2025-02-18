import { FastifyInstance } from "fastify";
import { PlayerType } from "../../../../../shared/types/playerType";

export default async function EditPlayer(server: FastifyInstance) {
  server.put<{ Body: PlayerType; Params: { id: string } }>(
    "/players/:id",
    (request, reply) => {
      const { id } = request.params;
      const player = request.body;
      server.playerDatabase.update(id, player);
      return reply.status(204).send();
    }
  );
}
