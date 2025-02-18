import { TeamType } from "../../../shared/types/teamType";

export class TeamDatabase {
  #players: Map<string, TeamType> = new Map();

  create(player: TeamType) {
    this.#players.set(player.id, player);
  }

  update(playerId: string, player: TeamType) {
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
          return player.name.includes(filter);
        }
        return true;
      });
  }
}
