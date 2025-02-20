import { DialogContainer, DialogContent, DialogHeader } from "./dialog/dialog";
import { PlayerType } from "../../../../shared/types/playerType";
import { forwardRef, useState } from "react";
import { useGetTeams } from "../../hooks/use-getTeams";
import { Repeat } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TeamType } from "../../../../shared/types/teamType";
import { toast } from "react-toastify";

type Props = {
  player: PlayerType;
};

const TransferPlayerDialog = forwardRef<HTMLDialogElement, Props>(
  ({ player }, ref) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const queryClient = useQueryClient();
    const updatePlayer = useMutation({
      mutationFn: async (newTeam: TeamType | null) => {
        if (!newTeam) return;
        const updatedPlayer = {
          ...player,
          team: newTeam,
        };
        await fetch(`${API_URL}/players/${player.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPlayer),
        });
      },
      onSuccess: () => {
        toast.success("Jogador transferido!")
        queryClient.invalidateQueries({ queryKey: ["get-players"] });
        if (ref && typeof ref !== "function" && ref.current) {
          ref.current.close();
        }
      },
    });
    const teams = useGetTeams();
    const [newTeam, setNewTeam] = useState<TeamType | null>(null);
    return (
      <DialogContainer ref={ref}>
        <DialogHeader text="Transfer Player" ref={ref} />
        <DialogContent>
          <div className="flex gap-4 p-12 items-center">
            <div className="flex flex-col items-center gap-4">
              <div className="border-2 border-zinc-500 rounded-full p-4">
                <img
                  src={player.team.logo}
                  alt="Player Team Logo"
                  className="w-32 h-32"
                />
              </div>
              <p className="text-2xl font-bold text-zinc-400">
                {player.team.name}
              </p>
            </div>
            <button>
              <Repeat
                size={40}
                className="hover:text-white hover:scale-125"
                onClick={() => updatePlayer.mutate(newTeam)}
              />
            </button>
            <div className="flex flex-col items-center gap-4">
              <div className="border-2 border-zinc-500 rounded-full p-4">
                <img
                  src={newTeam?.logo}
                  alt=""
                  className="w-32 h-32 rounded-full"
                />
              </div>
              <select
                className="h-8 text-white bg-neutral-950 border border-zinc-400 rounded-md hover:scale-110 focus:outline-none"
                onChange={(e) => {
                  const newTeam = teams?.find(
                    (team) => team.id === e.target.value
                  );
                  setNewTeam(newTeam || null);
                }}
              >
                <option value="">{player.team.name}</option>
                {teams?.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </DialogContent>
      </DialogContainer>
    );
  }
);

export default TransferPlayerDialog;
