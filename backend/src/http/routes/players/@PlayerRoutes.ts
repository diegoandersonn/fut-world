import { server } from "../../server";
import CreatePlayer from "./create-player";
import DeletePlayer from "./delete-player";
import EditPlayer from "./edit-player";
import ListPlayers from "./list-players";

export default async function PlayerRoutes() {
  server.register(CreatePlayer);
  server.register(EditPlayer);
  server.register(DeletePlayer);
  server.register(ListPlayers);
}
