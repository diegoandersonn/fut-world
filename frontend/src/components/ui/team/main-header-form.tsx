import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TeamType } from "../../../../../shared/types/teamType";
import { CountryType } from "../../../../../shared/types/countryType";
import { useGetCountries } from "../../../hooks/use-getCountries";

type Props = {
  team: TeamType;
};

export default function MainHeaderForm({ team }: Props) {
  const API_URL = import.meta.env.VITE_API_URL;
  const queryClient = useQueryClient();
  const updateTeam = useMutation({
    mutationFn: async ({
      field,
      value,
    }: {
      field: string;
      value: string | CountryType;
    }) => {
      const updatedTeam = { ...team, [field]: value };
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
  const countries = useGetCountries();

  return (
    <form action="PUT" className="grid grid-cols-2 gap-4">
      <div className="flex items-center justify-between gap-2">
        <label htmlFor="stadium" className="text-zinc-400 font-semibold">
          Team Stadium
        </label>
        <input
          type="text"
          className="text-sm p-1 outline-none w-52 rounded-md border-2 border-zinc-400 bg-transparent"
          value={team.stadium}
          onChange={(e) =>
            updateTeam.mutate({ field: "stadium", value: e.target.value })
          }
        />
      </div>
      <div className="flex items-center justify-between gap-2">
        <label htmlFor="country" className="text-zinc-400 font-semibold">
          Team Country
        </label>
        <select
          value={team.country.name}
          className="text-sm p-1 w-52 outline-none rounded-md border-2 border-zinc-400 bg-transparent transition-all"
          onChange={(e) => {
            const selectedCountry = countries?.find(
              (c) => c.name === e.target.value
            );
            if (selectedCountry) {
              const country: CountryType = selectedCountry;
              updateTeam.mutate({
                field: "country",
                value: country,
              });
            }
          }}
        >
          {countries?.map((country) => (
            <option
              key={country.id}
              value={country.name}
              className="bg-zinc-800 text-white"
            >
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center justify-between gap-2">
        <label htmlFor="teamManager" className="text-zinc-400 font-semibold">
          Team Manager
        </label>
        <input
          type="text"
          className="text-sm p-1 outline-none w-52 rounded-md border-2 border-zinc-400 bg-transparent"
          value={team.manager}
          onChange={(e) =>
            updateTeam.mutate({ field: "manager", value: e.target.value })
          }
        />
      </div>
      <div className="flex items-center justify-between gap-2">
        <label htmlFor="teamManager" className="text-zinc-400 font-semibold">
          Team League
        </label>
        <input
          type="text"
          className="text-sm p-1 outline-none w-52 rounded-md border-2 border-zinc-400 bg-transparent"
          value={team.league}
          onChange={(e) =>
            updateTeam.mutate({ field: "league", value: e.target.value })
          }
        />
      </div>
    </form>
  );
}
