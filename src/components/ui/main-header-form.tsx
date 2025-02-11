import { TeamType } from "../../types/teamType";

type Props = {
  team: TeamType;
};

export default function MainHeaderForm({ team }: Props) {
  async function handleFieldChange(
    e: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) {
    const editedTeam = { ...team, [value]: e.target.value };
    const API_URL = import.meta.env.VITE_API_URL;
    try {
      await fetch(`${API_URL}/teams/${team.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedTeam),
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form action="" className="grid grid-cols-2 gap-4">
      <div className="flex items-center justify-between gap-2">
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
      <div className="flex items-center justify-between gap-2">
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
      <div className="flex items-center justify-between gap-2">
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
      <div className="flex items-center justify-between gap-2">
        <label htmlFor="teamManager" className="text-zinc-400 font-semibold">
          Team League
        </label>
        <input
          type="text"
          className="text-sm p-1 outline-none rounded-md border-2 border-zinc-400 bg-transparent"
          value={team.league}
          onChange={(e) => handleFieldChange(e, "league")}
        />
      </div>
    </form>
  );
}
