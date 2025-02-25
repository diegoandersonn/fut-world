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
    if (order)
      return players.sort((a, b) => {
        let valueA: string;
        let valueB: string;
        if (order.value === "name") {
          valueA = a.name;
          valueB = b.name;
          return order.order === "Ascending"
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        } else if (order.value === "team") {
          valueA = a.team.name;
          valueB = b.team.name;
          return order.order === "Ascending"
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        } else if (order.value === "country") {
          valueA = a.country?.name ?? "Unknown Country";
          valueB = b.country?.name ?? "Unknown Country";
          return order.order === "Ascending"
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        } else return 0;
      });
    return players;
  }
}
