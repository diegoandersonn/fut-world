import { server } from "../../server";
import CreateCountry from "./create-country";
import ListCountries from "./list-countries";


export default async function CountryRoutes() {
  server.register(CreateCountry);
  server.register(ListCountries);
}
