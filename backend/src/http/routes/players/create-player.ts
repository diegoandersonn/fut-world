import { FastifyInstance } from "fastify";
import { PlayerType } from "../../../types/playerType.ts";

export default async function CreatePlayer(server: FastifyInstance) {
  server.post<{ Body: PlayerType }>("/players", (request, reply) => {
    const player = request.body;
    server.playerDatabase.create(player);
    return reply.status(201).send(player);
  });
}