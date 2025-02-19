import { PencilLine, Send, Share } from "lucide-react";
import { PlayerType } from "../../../../../shared/types/playerType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import MainHeaderForm from "./main-header-form";
import { useState } from "react";

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
  const [isEditing, setIsEditing] = useState<boolean>(false);
  function toggleEditMode() {
    if (isEditing) {
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  }

  const updateName = useMutation({
    mutationFn: async (name: string) => {
      const updatedPlayer: PlayerType = {
        ...player,
        name: name,
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
      queryClient.invalidateQueries({ queryKey: ["get-players"] });
    },
  });
  return (
    <div className="flex justify-between">
      <div className="flex m-4 items-center justify-center gap-3">
        <div>
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
        {isEditing ? (
          <>
            <input
              type="text"
              value={player.name}
              onChange={(e) => updateName.mutate(e.target.value)}
              className="text-3xl bg-transparent border-b border-white outline-none w-full"
              style={{ width: `${player.name.length}ch` }}
            />
            <button type="submit" onClick={toggleEditMode}>
              <Send />
            </button>
          </>
        ) : (
          <>
            <h1 className="text-3xl">{player.name}</h1>
            <button onClick={toggleEditMode}>
              <PencilLine />
            </button>
          </>
        )}
      </div>
      <div className="flex items-center m-4">
        <MainHeaderForm player={player} />
      </div>
    </div>
  );
}
