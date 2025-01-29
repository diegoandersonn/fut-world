import { TeamsContext } from "../../context/TeamsContext";
import { useContext } from "react";
import { TeamType } from "../../types/teamType";

type Props = {
  team: TeamType;
};

export default function MainHeaderForm({ team }: Props) {
  const { updateTeam } = useContext(TeamsContext);
  function handleFieldChange(
    e: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) {
    updateTeam({ ...team, [value]: e.target.value });
  }

  return (
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
        <label htmlFor="teamManager" className="text-zinc-400 font-semibold">
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
  );
}
