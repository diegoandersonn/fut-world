import { useQuery } from "@tanstack/react-query";
import { TeamType } from "../../../shared/types/teamType";

export const useGetTeams = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { data } = useQuery<TeamType[]>({
    queryKey: ["get-teams"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/teams`);
      const data = await response.json();
      return data;
    },
  });
  return data;
};
