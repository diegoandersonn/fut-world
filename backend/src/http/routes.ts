import PlayerRoutes from "./routes/players/@PlayerRoutes.ts";
import TeamRoutes from "./routes/teams/@TeamRoutes.ts";
import { server } from "./server.ts";

export default async function Routes() {
  server.register(PlayerRoutes);
  server.register(TeamRoutes);
}
