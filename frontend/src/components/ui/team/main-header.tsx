import { Share, Send, PencilLine } from "lucide-react";
import { TeamType } from "../../../types/teamType";
import { useState } from "react";
import MainHeaderForm from "../main-header-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  team: TeamType;
};

export default function TeamMainHeader({ team }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  const updateLogo = useMutation({
    mutationFn: async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const fileURL = URL.createObjectURL(file);
        const updatedTeam = { ...team, logo: fileURL };
        const API_URL = import.meta.env.VITE_API_URL;
        await fetch(`${API_URL}/teams/${team.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTeam),
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-teams"] });
    },
  });

  function toggleEditMode() {
    if (isEditing) {
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  }

  const updateName = useMutation({
    mutationFn: async ({ field, value }: { field: string; value: string }) => {
      const updatedTeam = { ...team, [field]: value };
      const API_URL = import.meta.env.VITE_API_URL;

      await fetch(`${API_URL}/teams/${team.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTeam),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-teams"] });
    },
  });

  return team ? (
    <div className="flex justify-between">
      <div className="m-4">
        <div className="flex items-center justify-center gap-3">
          <button className="w-36 h-36 bg-slate-50 hover:bg-neutral-500 rounded-full group relative">
            <img
              src={team.logo}
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
              onChange={(e) => updateLogo.mutate(e)}
            />
          </button>
          {isEditing ? (
            <>
              <input
                type="text"
                value={team.name}
                onChange={(e) =>
                  updateName.mutate({ field: "name", value: e.target.value })
                }
                className="text-3xl bg-transparent border-b border-white outline-none w-full"
                style={{ width: `${team.name.length}ch` }}
              />
              <button type="submit" onClick={toggleEditMode}>
                <Send />
              </button>
            </>
          ) : (
            <>
              <h1 className="text-3xl">{team.name}</h1>
              <button onClick={toggleEditMode}>
                <PencilLine />
              </button>
            </>
          )}
        </div>
      </div>
      <div className="flex items-center m-4">
        <MainHeaderForm team={team} />
      </div>
    </div>
  ) : (
    <p>loading...</p>
  );
}
