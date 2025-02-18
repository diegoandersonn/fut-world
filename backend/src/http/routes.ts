import CountryRoutes from "./routes/countries/@CountryRoutes";
import PlayerRoutes from "./routes/players/@PlayerRoutes";
import TeamRoutes from "./routes/teams/@TeamRoutes";
import { server } from "./server";

export default async function Routes() {
  server.register(PlayerRoutes);
  server.register(TeamRoutes);
  server.register(CountryRoutes);
}
