import axios from "axios";

const api = axios.create({
  baseURL: "https://restcountries.com/v3.1",
});

export default async function getFlagImage(countryName: string) {
  const response = await api.get("/all");
  const countries = response.data;
  const selectedCountry = countries.find(
    (country) => country.name.common === countryName
  );
  return selectedCountry?.flags.png;
}
