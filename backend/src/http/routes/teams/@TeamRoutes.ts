import { server } from "../../server";
import CreateTeam from "./create-team";
import DeleteTeam from "./delete-team";
import EditTeam from "./edit-team";
import ListTeams from "./list-teams";


export default async function TeamRoutes() {
  server.register(CreateTeam);
  server.register(EditTeam);
  server.register(DeleteTeam);
  server.register(ListTeams);
}
