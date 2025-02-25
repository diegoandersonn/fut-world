import { useQuery } from "@tanstack/react-query";
import { CountryType } from "../../../shared/types/countryType";

export const useGetCountries = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { data } = useQuery<CountryType[]>({
    queryKey: ["get-countries"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/countries`);
      return await response.json();
    },
  });
  return data;
};
