import { PlayerType } from "../types/playerType.ts";

export class PlayerDatabase {
  #players: Map<string, PlayerType> = new Map();

  create(player: PlayerType) {
    this.#players.set(player.id, player);
  }

  update(playerId: string, player: PlayerType) {
    this.#players.set(playerId, player);
  }

  delete(playerId: string) {
    this.#players.delete(playerId);
  }

  list(filter?: string) {
    return Array.from(this.#players.entries())
      .map((playerArray) => {
        const data = playerArray[1];
        return { ...data };
      })
      .filter((player) => {
        if (filter) {
          return player.team.name.includes(filter);
        }
        return true;
      });
  }
}
