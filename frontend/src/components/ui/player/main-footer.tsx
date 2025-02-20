import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlayerType } from "../../../../../shared/types/playerType";
import getOverall from "../../../utils/getOverall";

type Props = {
  player: PlayerType;
};

export default function PlayerMainFooter({ player }: Props) {
  const attributes = [
    { value: player.atb1, label: "Pace" },
    { value: player.atb2, label: "Shooting" },
    { value: player.atb3, label: "Passing" },
    { value: player.atb4, label: "Dribbling" },
    { value: player.atb5, label: "Defense" },
    { value: player.atb6, label: "Physical" },
  ];
  const API_URL = import.meta.env.VITE_API_URL;
  const queryClient = useQueryClient();
  const updatePlayer = useMutation({
    mutationFn: async ({ field, value }: { field: string; value: string }) => {
      const updatedPlayer: PlayerType = { ...player, [field]: value };
      const overall = Number(
        getOverall(
          updatedPlayer.position,
          updatedPlayer.atb1,
          updatedPlayer.atb2,
          updatedPlayer.atb3,
          updatedPlayer.atb4,
          updatedPlayer.atb5,
          updatedPlayer.atb6
        )
      );
      console.log(overall);
      updatedPlayer.overall = overall;
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
  console.log(player);
  return (
    <div className="flex items-center justify-center">
      <form method="PUT" className="grid grid-cols-3 gap-10">
        {attributes.map((atb, index) => (
          <div className="flex items-center justify-end gap-2" key={index}>
            <label
              htmlFor={atb.label}
              className="text-lg text-zinc-400 font-semibold"
            >
              {atb.label}
            </label>
            <input
              type="number"
              value={atb.value}
              min={1}
              max={99}
              className="text-lg p-1 outline-none rounded-md border-2 border-zinc-400 bg-transparent"
              onChange={(e) =>
                updatePlayer.mutate({
                  field: "atb" + (index + 1),
                  value: e.target.value,
                })
              }
            />
          </div>
        ))}
      </form>
    </div>
  );
}
