import { PlayerType } from "../../../shared/types/playerType";
import { OrderType } from "../../../shared/types/orderType";

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

  list(filter?: string, type?: string, order?: OrderType) {
    const players = Array.from(this.#players.entries())
      .map((playerArray) => {
        const data = playerArray[1];
        return { ...data };
      })
      .filter((player) => {
        const matchesFilter = filter ? player.name.includes(filter) : true;
        const matchesType = type ? player.team.name.includes(type) : true;
        return matchesFilter && matchesType;
      });
    if (order) {
      if (order.order === "Ascending") {
        return players.sort((a, b) => {
          return a[order.value].localeCompare(b[order.value]);
        });
      } else {
        return players.sort((a, b) => {
          return b[order.value].localeCompare(a[order.value]);
        });
      }
    }
    return players;
  }
  orderBy() {
    return Array.from(this.#players.values()).sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  }
}
