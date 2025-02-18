import { server } from "../../server.ts";
import CreatePlayer from "./create-player.ts";
import DeletePlayer from "./delete-player.ts";
import EditPlayer from "./edit-player.ts";
import ListPlayers from "./list-players.ts";


export default async function PlayerRoutes() {
  server.register(CreatePlayer);
  server.register(EditPlayer);
  server.register(DeletePlayer);
  server.register(ListPlayers);
}
