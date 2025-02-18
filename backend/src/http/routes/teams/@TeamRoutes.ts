import { server } from "../../server.ts";
import CreateTeam from "./create-team.ts";
import DeleteTeam from "./delete-team.ts";
import EditTeam from "./edit-team.ts";
import ListTeams from "./list-teams.ts";


export default async function TeamRoutes() {
  server.register(CreateTeam);
  server.register(EditTeam);
  server.register(DeleteTeam);
  server.register(ListTeams);
}
