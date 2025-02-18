import { Share } from "lucide-react";
import { PlayerType } from "../../../../../shared/types/playerType"; 
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  player: PlayerType;
};

export default function PlayerMainHeader({ player }: Props) {
  const API_URL = import.meta.env.VITE_API_URL;
  const queryClient = useQueryClient();
  const updatePic = useMutation({
    mutationFn: async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;
      const picture = URL.createObjectURL(file);
      const updatedTeam: PlayerType = {
        ...player,
        picture: picture,
      };
      await fetch(`${API_URL}/players/${player.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTeam),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-players"] });
    },
  });
  return (
    <div className="flex justify-between">
      <div className="m-4">
        <div className="flex items-center justify-center gap-3">
          <button className="w-36 h-36 bg-slate-50 hover:bg-neutral-500 rounded-full group relative">
            <img
              src={player.picture}
              alt=""
              className="w-full h-full rounded-full group-hover:brightness-50"
            />
            <Share
              size={30}
              className="invisible group-hover:visible absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => updatePic.mutate(e)}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
