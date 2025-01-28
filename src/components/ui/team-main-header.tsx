import { Share, Send, PencilLine } from "lucide-react";
import { TeamType } from "../../types/teamType";
import { useContext, useState } from "react";
import { TeamsContext } from "../../context/TeamsContext";

type Props = {
  team: TeamType;
};

export default function TeamMainHeader({ team }: Props) {
  const { updateTeam } = useContext(TeamsContext);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setTeamName] = useState("");

  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      const updatedTeam = { ...team, logo: fileURL };
      updateTeam(updatedTeam);
    }
  }

  function toggleEditMode() {
    if (isEditing) {
      setIsEditing(false);
    } else {
      setTeamName(team.name);
      setIsEditing(true);
    }
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTeamName(e.target.value);
  }

  function submitNameChange() {
    updateTeam({ ...team, name: name });
    setIsEditing(false);
  }

  function handleFieldChange(
    e: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) {
    updateTeam({ ...team, [value]: e.target.value });
  }
  return (
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
              onChange={handleLogoChange}
            />
          </button>
          {isEditing ? (
            <>
              <input
                type="text"
                value={team.name}
                onChange={(e) => handleNameChange(e)}
                className="text-3xl bg-transparent border-b border-white outline-none w-full"
                style={{ width: `${team.name.length}ch` }}
              />
              <button type="submit" onClick={submitNameChange}>
                <Send />
              </button>
              <button onClick={toggleEditMode}>
                <PencilLine />
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
        <form action="" className="grid grid-cols-2 gap-2">
          <div className="flex gap-2 items-center">
            <label htmlFor="stadium" className="text-zinc-400 font-semibold">
              Team Stadium
            </label>
            <input
              type="text"
              className="text-sm p-1 outline-none rounded-md border-2 border-zinc-400 bg-transparent"
              value={team.stadium}
              onChange={(e) => handleFieldChange(e, "stadium")}
            />
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="country" className="text-zinc-400 font-semibold">
              Team Country
            </label>
            <input
              type="text"
              className="text-sm p-1 outline-none rounded-md border-2 border-zinc-400 bg-transparent"
              value={team.country}
              onChange={(e) => handleFieldChange(e, "country")}
            />
          </div>
          <div className="flex gap-2 items-center">
            <label
              htmlFor="teamManager"
              className="text-zinc-400 font-semibold"
            >
              Team Manager
            </label>
            <input
              type="text"
              className="text-sm p-1 outline-none rounded-md border-2 border-zinc-400 bg-transparent"
              value={team.manager}
              onChange={(e) => handleFieldChange(e, "manager")}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
