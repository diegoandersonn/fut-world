import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlayerType } from "../../../../../shared/types/playerType";
import { CountryType } from "../../../../../shared/types/countryType";
import { useGetCountries } from "../../../hooks/use-getCountries";

type Props = {
  player: PlayerType;
};

export default function MainHeaderForm({ player }: Props) {
  const API_URL = import.meta.env.VITE_API_URL;
  const countries = useGetCountries();
  const queryClient = useQueryClient();
  const updatePlayer = useMutation({
    mutationFn: async ({
      field,
      value,
    }: {
      field: string;
      value: string | CountryType;
    }) => {
      const updatedPlayer = { ...player, [field]: value };
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
          className="text-sm p-1 w-44 outline-none rounded-md border-2 border-zinc-400 bg-transparent"
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
        <select
          value={player.country.name}
          className="text-sm p-1 w-44 outline-none rounded-md border-2 border-zinc-400 bg-transparent transition-all"
          onChange={(e) => {
            const selectedCountry = countries?.find(
              (c) => c.name === e.target.value
            );
            if (selectedCountry) {
              const country: CountryType = selectedCountry;
              updatePlayer.mutate({
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
        <label htmlFor="position" className="text-zinc-400 font-semibold">
          Player Position
        </label>
        <input
          type="text"
          className="text-sm p-1 w-44 outline-none rounded-md border-2 border-zinc-400 bg-transparent"
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
          className="text-sm p-1 w-44 outline-none rounded-md border-2 border-zinc-400 bg-transparent"
          value={player.overall}
          onChange={(e) =>
            updatePlayer.mutate({ field: "Overall", value: e.target.value })
          }
        />
      </div>
    </form>
  );
}
