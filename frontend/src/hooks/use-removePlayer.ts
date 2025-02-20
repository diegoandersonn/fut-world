import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlayerType } from "../../../shared/types/playerType";

export const useRemovePlayer = () => {
  const queryClient = useQueryClient();
  const API_URL = import.meta.env.VITE_API_URL;
  return useMutation({
    mutationFn: async (player: PlayerType) => {
      await fetch(`${API_URL}/players/${player.id}`, { method: "DELETE" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-players"] });
    },
  });
};
