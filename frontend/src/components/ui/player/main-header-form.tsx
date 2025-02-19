import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlayerType } from "../../../../../shared/types/playerType";

type Props = {
  player: PlayerType;
};

export default function MainHeaderForm({ player }: Props) {
  const API_URL = import.meta.env.VITE_API_URL;
  const queryClient = useQueryClient();
  const updatePlayer = useMutation({
    mutationFn: async ({ field, value }: { field: string; value: string }) => {
      const updatedPlayer= { ...player, [field]: value };
      await fetch(`${API_URL}/players/${player.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPlayer),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-players"] });
    },
  });

  return (
    <form action="PUT" className="grid grid-cols-2 gap-4">
      <div className="flex items-center justify-between gap-2">
        <label htmlFor="age" className="text-zinc-400 font-semibold">
          Player Age
        </label>
        <input
          type="text"
          className="text-sm p-1 outline-none rounded-md border-2 border-zinc-400 bg-transparent"
          value={player.age}
          onChange={(e) =>
            updatePlayer.mutate({ field: "age", value: e.target.value })
          }
        />
      </div>
      <div className="flex items-center justify-between gap-2">
        <label htmlFor="country" className="text-zinc-400 font-semibold">
        Player Country
        </label>
        <input
          type="text"
          className="text-sm p-1 outline-none rounded-md border-2 border-zinc-400 bg-transparent"
          value={player.country.name}
          onChange={(e) =>
            updatePlayer.mutate({ field: "country", value: e.target.value })
          }
        />
      </div>
      <div className="flex items-center justify-between gap-2">
        <label htmlFor="position" className="text-zinc-400 font-semibold">
        Player Position
        </label>
        <input
          type="text"
          className="text-sm p-1 outline-none rounded-md border-2 border-zinc-400 bg-transparent"
          value={player.position}
          onChange={(e) =>
            updatePlayer.mutate({ field: "position", value: e.target.value })
          }
        />
      </div>
      <div className="flex items-center justify-between gap-2">
        <label htmlFor="Overall" className="text-zinc-400 font-semibold">
        Player Overall
        </label>
        <input
          type="text"
          className="text-sm p-1 outline-none rounded-md border-2 border-zinc-400 bg-transparent"
          value={player.overall}
          onChange={(e) =>
            updatePlayer.mutate({ field: "Overall", value: e.target.value })
          }
        />
      </div>
    </form>
  );
}
