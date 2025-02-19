import { PlayerType } from "../../../shared/types/playerType";

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

  list(filter?: string, type?: string) {
    return Array.from(this.#players.entries())
      .map((playerArray) => {
        const data = playerArray[1];
        return { ...data };
      })
      .filter((player) => {
        const matchesFilter = filter ? player.name.includes(filter) : true;
        const matchesType = type ? player.team.name.includes(type) : true;
        return matchesFilter && matchesType;
      });
  }
}
